/* sori-ai.js — 급식"소리"함 도구 공용 AI 연결
 *
 * 경로 세 가지
 *   1) 각자 키   : 사용자가 넣은 Gemini 키로 브라우저에서 직접 호출 (기본)
 *   2) 복사      : 만들어진 프롬프트를 복사해 각자 쓰는 AI에 붙여넣기 (키 없어도 됨)
 *   3) 시험 경로 : 관리자에게만 보이는 서버 호출. 결과물 검증용이며 검증이 끝나면 지운다.
 *
 * 쓰는 법
 *   SoriAI.init({ mount:'#ai', endpoint:'/api/gen', admins:['...'],
 *                 userKey:true, copyTarget:'쓰시는 AI', onChange:fn })
 *   await SoriAI.run(prompt)   → 답 문자열
 *   SoriAI.copy(prompt)        → 클립보드로
 *   SoriAI.canRun()            → 지금 바로 만들 수 있는지
 */
(function(){
  const S = {
    key: '', ok: false, admin: false,
    opts: { mount:null, endpoint:null, admins:[], userKey:true, copyTarget:'쓰시는 AI', onChange:null }
  };

  const css = `
  .sai{background:#eef3ff;border:1px solid #cfdcfb;border-radius:14px;padding:16px 18px;margin-bottom:18px}
  .sai h3{font-size:15px;margin:0 0 4px;font-weight:700}
  .sai p{margin:0;font-size:13.5px;color:#4a5a76;line-height:1.6}
  .sai .row{display:flex;gap:8px;margin-top:10px}
  .sai input{flex:1;padding:10px 12px;border:1px solid #cfdcfb;border-radius:10px;background:#fff;font:inherit}
  .sai button{border:1px solid #1a4fd6;background:#1a4fd6;color:#fff;border-radius:10px;
    padding:10px 14px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit}
  .sai label.chk{display:flex;gap:8px;align-items:center;font-size:13px;color:#4a5a76;margin-top:9px}
  .sai label.chk input{flex:none;width:16px;height:16px;accent-color:#1a4fd6}
  .sai .state{font-size:13px;margin-top:9px;color:#4a5a76}
  .sai .state.ok{color:#0d7a53;font-weight:600}
  .sai .state.bad{color:#b4530a;font-weight:600}
  .sai .tiny{font-size:12.5px;color:#4a5a76;margin-top:10px;line-height:1.55}
  .sai .adm{margin-top:12px;padding-top:12px;border-top:1px dashed #b9caf0;font-size:13px;color:#123a9e}
  `;

  function el(id){ return document.getElementById(id); }
  function changed(){ if (typeof S.opts.onChange === 'function') S.opts.onChange(); }

  function render(){
    const box = document.querySelector(S.opts.mount);
    if (!box) return;
    const u = S.opts.userKey;
    box.className = 'sai';
    box.innerHTML = `
      <h3>AI 연결 ${u ? '<span style="font-weight:400;color:#4a5a76;font-size:13px">(선택)</span>' : ''}</h3>
      <p>${u
        ? '키를 연결하면 이 화면에서 바로 만들어집니다. 키가 없어도 <b>프롬프트 복사</b>를 눌러 ' + S.opts.copyTarget + '에 붙여넣으면 같은 결과를 얻을 수 있어요.'
        : '<b>프롬프트 복사</b>를 눌러 ' + S.opts.copyTarget + '에 붙여넣어 주세요.'}</p>
      ${u ? `
      <div class="row">
        <input id="sai-key" type="password" placeholder="AIza… 로 시작하는 Gemini 키" autocomplete="off">
        <button id="sai-check" type="button">연결 확인</button>
      </div>
      <label class="chk"><input type="checkbox" id="sai-save"> 이 브라우저에 기억하기 (공용 컴퓨터에서는 끄세요)</label>
      <div class="state" id="sai-state">키를 넣고 연결 확인을 눌러 주세요.</div>
      <p class="tiny">입력한 키는 급식"소리"함 서버로 보내지 않습니다. 이 브라우저에서 구글로 직접 요청할 때만 씁니다.
        키는 <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>에서 무료로 받을 수 있어요.</p>` : ''}
      <div class="adm" id="sai-adm" hidden>시험 경로가 열려 있습니다. 키 없이 <b>바로 만들기</b>가 동작합니다. (관리자 전용, 검증용)</div>
    `;
    if (!u) return;

    const saved = localStorage.getItem('sori_ai_key') || '';
    if (saved){ S.key = saved; el('sai-key').value = saved; el('sai-save').checked = true;
      el('sai-state').textContent = '저장된 키를 불러왔어요. 연결 확인을 눌러 보세요.'; }

    el('sai-check').onclick = async () => {
      S.key = el('sai-key').value.trim();
      const st = el('sai-state');
      if (!S.key){ st.className='state bad'; st.textContent='키를 먼저 넣어 주세요.'; return; }
      st.className='state'; st.textContent='확인하는 중…';
      try{
        await gemini('안녕이라고만 답해 주세요.');
        S.ok = true;
        st.className='state ok'; st.textContent='연결됐습니다. 이제 바로 만들 수 있어요.';
        if (el('sai-save').checked) localStorage.setItem('sori_ai_key', S.key);
        else localStorage.removeItem('sori_ai_key');
      }catch(e){
        S.ok = false;
        st.className='state bad'; st.textContent='연결되지 않았어요. 키를 다시 확인해 주세요. (' + e.message + ')';
      }
      changed();
    };
    el('sai-save').onchange = () => {
      if (!el('sai-save').checked) localStorage.removeItem('sori_ai_key');
      else if (S.key) localStorage.setItem('sori_ai_key', S.key);
    };
  }

  async function gemini(text){
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'x-goog-api-key': S.key },
      body: JSON.stringify({
        contents:[{ parts:[{ text }] }],
        generationConfig:{ temperature:0.5, maxOutputTokens:8192, thinkingConfig:{ thinkingBudget:0 } }
      })
    });
    if (r.status === 429) throw new Error('구글 쪽 요청 한도에 걸렸어요. 잠시 뒤에 다시 눌러 주세요');
    if (!r.ok) throw new Error('요청 실패 (' + r.status + ')');
    const d = await r.json();
    const out = (d.candidates?.[0]?.content?.parts || []).map(p=>p.text||'').join('');
    if (!out) throw new Error('빈 응답');
    return out;
  }

  async function server(text){
    const r = await fetch(S.opts.endpoint, {
      method:'POST', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ messages:[{ role:'user', text }] })
    });
    if (r.status === 429) throw new Error('잠시 뒤에 다시 눌러 주세요. 짧은 시간에 요청이 몰렸어요');
    if (!r.ok) throw new Error('연결이 원활하지 않아요 (' + r.status + ')');
    const d = await r.json();
    if (!d.answer) throw new Error('내용을 받지 못했어요');
    return d.answer;
  }

  window.SoriAI = {
    init(opts){
      Object.assign(S.opts, opts || {});
      if (!document.getElementById('sai-css')){
        const s = document.createElement('style');
        s.id = 'sai-css'; s.textContent = css; document.head.appendChild(s);
      }
      render();
      window.addEventListener('sori-ready', () => {
        const email = (window.SORI && window.SORI.email || '').toLowerCase();
        S.admin = S.opts.admins.map(x=>x.toLowerCase()).includes(email);
        const a = document.getElementById('sai-adm');
        if (a) a.hidden = !(S.admin && S.opts.endpoint);
        changed();
      });
    },
    canRun(){ return (S.opts.userKey && S.ok) || (S.admin && !!S.opts.endpoint); },
    isAdmin(){ return S.admin; },
    hasKey(){ return S.ok; },
    async run(prompt){
      if (S.opts.userKey && S.ok) return gemini(prompt);
      if (S.admin && S.opts.endpoint) return server(prompt);
      throw new Error('키를 연결하거나, 프롬프트를 복사해 ' + S.opts.copyTarget + '에 붙여넣어 주세요');
    },
    async copy(text){
      try{ await navigator.clipboard.writeText(text); return true; }
      catch{
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy'); ta.remove();
        return true;
      }
    }
  };
})();
