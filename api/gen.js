// api/gen.js — 급식"소리"함 범용 생성 엔드포인트
// 무물위(api/ask.js)는 위생지침서 전용이라 학부모·학생용 자료 생성에 쓸 수 없어 따로 둔다.
// 환경변수: GEMINI_API_KEY (필수) / OPENAI_API_KEY (있으면 우선 사용)

const RATE = new Map();          // ip -> [timestamps]
const LIMIT = 20;                // 분당 요청 수
const WINDOW = 60 * 1000;

const SYSTEM = `너는 대한민국 학교급식 영양(교)사의 업무를 돕는 도우미다.

지켜야 할 것:
- 요청받은 출력 형식을 그대로 지킨다. 형식 밖의 인사말·설명·코드블록 표시를 붙이지 않는다.
- 사실 확인이 필요한 것을 지어내지 않는다. 특히 날짜, 법 조항 번호, 통계 수치, 영양소 함량, 온도·시간 기준은
  요청문에 주어진 자료 안에 있는 것만 쓴다. 주어지지 않았으면 그 부분을 빼거나 "확인 필요"라고 적는다.
- 학교에서 가정으로 나가는 문서라는 점을 의식해, 단정적인 건강 효능 주장이나 특정 식품·제품 홍보를 쓰지 않는다.
- 알레르기, 질환, 체중 관련 내용은 개별 지도가 필요하다는 점을 함께 적고, 특정 학생을 겨냥한 표현을 쓰지 않는다.
- 문장은 짧고 명확하게. 학교 문서 말투를 쓴다.`;

function rateOk(ip){
  const now = Date.now();
  const hits = (RATE.get(ip) || []).filter(t => now - t < WINDOW);
  if (hits.length >= LIMIT) return false;
  hits.push(now);
  RATE.set(ip, hits);
  if (RATE.size > 500) for (const [k, v] of RATE) if (!v.some(t => now - t < WINDOW)) RATE.delete(k);
  return true;
}

async function callGemini(key, text){
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [{ role: 'user', parts: [{ text }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 8192,
        thinkingConfig: { thinkingBudget: 0 }   // 2.5 계열: thinking 토큰이 출력 한도를 먹는 문제 방지
      }
    })
  });
  if (!r.ok) throw new Error('gemini ' + r.status);
  const d = await r.json();
  const c = d.candidates?.[0];
  const out = (c?.content?.parts || []).map(p => p.text || '').join('');
  if (!out) throw new Error('empty');
  return { answer: out, truncated: c?.finishReason === 'MAX_TOKENS', model: 'gemini-2.5-flash' };
}

async function callOpenAI(key, text){
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.5,
      max_tokens: 4000,
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: text }]
    })
  });
  if (!r.ok) throw new Error('openai ' + r.status);
  const d = await r.json();
  const out = d.choices?.[0]?.message?.content || '';
  if (!out) throw new Error('empty');
  return { answer: out, truncated: d.choices?.[0]?.finish_reason === 'length', model: 'gpt-4o-mini' };
}

export default async function handler(req, res){
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST만 받습니다' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!rateOk(ip)) return res.status(429).json({ error: '잠시 뒤에 다시 시도해 주세요' });

  try{
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const text = (body.messages || []).map(m => m.text || m.content || '').join('\n\n').trim();
    if (!text) return res.status(400).json({ error: '내용이 비어 있습니다' });
    if (text.length > 20000) return res.status(413).json({ error: '요청이 너무 깁니다' });

    const ok = process.env.OPENAI_API_KEY;
    const gk = process.env.GEMINI_API_KEY;
    if (!ok && !gk) return res.status(500).json({ error: 'API 키가 설정되지 않았습니다' });

    const out = ok ? await callOpenAI(ok, text) : await callGemini(gk, text);
    if (out.truncated) out.answer += '\n<p>※ 내용이 길어 일부가 잘렸습니다. 항목을 줄여서 다시 만들어 보세요.</p>';
    return res.status(200).json(out);
  }catch(e){
    console.error('gen error', e);
    return res.status(502).json({ error: '생성에 실패했습니다' });
  }
}
