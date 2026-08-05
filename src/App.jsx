import { useState, useEffect } from 'react';
import { signIn, logOut, onAuth, saveProfile, getProfile, getAllSignups, ADMIN_EMAIL } from './firebase';
import { categories } from './data/tools';
import './index.css';

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

const colorMap = { green:'t-green', amber:'t-amber', blue:'t-blue', coral:'t-coral', purple:'t-purple', teal:'t-teal' };

export default function App() {
  const [user, setUser]       = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [view, setView]       = useState('hub'); // 'hub' | 'admin'

  useEffect(() => {
    const unsub = onAuth(async u => {
      setUser(u);
      if (u) {
        const p = await getProfile(u.uid);
        setProfile(p);
      } else {
        setProfile(undefined);
      }
    });
    return unsub;
  }, []);

  if (user === undefined || profile === undefined)
    return <Loading />;
  if (!user)
    return <LoginScreen />;
  if (!profile || !profile.name)
    return <ProfileSetup user={user} onSaved={setProfile} />;

  return view === 'admin' && user.email === ADMIN_EMAIL
    ? <AdminPage user={user} profile={profile} onBack={() => setView('hub')} />
    : <MainApp user={user} profile={profile} onAdmin={() => setView('admin')} />;
}

// ── 로딩 ──
function Loading() {
  return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',color:'var(--muted)',fontSize:'14px'}}>불러오는 중...</div>;
}

// ── 로그인 ──
function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try { await signIn(); }
    catch(e) { console.error(e); setLoading(false); }
  };
  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">🌿</div>
        <h1 className="login-title">급식소리함</h1>
        <p className="login-sub">AI를 활용한 학교급식 업무 효율화 도구 모음</p>
        <button className="login-google" onClick={handleLogin} disabled={loading}>
          <GoogleLogo />
          {loading ? '로그인 중...' : 'Google 계정으로 시작하기'}
        </button>
        <p className="login-note">
          무료사이트이며, 급식 행정기관 또는 교육청 사이트가 아닙니다.<br/>
          개인 연수·강의 등 이익창출 목적 활용은 허용하지 않습니다.
        </p>
      </div>
    </div>
  );
}

// ── 프로필 설정 (첫 로그인 시) ──
function ProfileSetup({ user, onSaved }) {
  const [name, setName]     = useState('');
  const [school, setSchool] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !school.trim()) return;
    setSaving(true);
    try {
      const data = {
        name: name.trim(),
        school: school.trim(),
        email: user.email,
        photoURL: user.photoURL || '',
        joinedAt: new Date().toISOString(),
      };
      await saveProfile(user.uid, data);
      onSaved(data);
    } catch(e) {
      console.error(e);
      setSaving(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">👋</div>
        <h1 className="login-title">처음 오셨군요!</h1>
        <p className="login-sub" style={{marginBottom:'1.5rem'}}>학교명과 이름을 입력하면 바로 시작할 수 있어요.</p>
        <div style={{marginBottom:'12px',textAlign:'left'}}>
          <label style={{display:'block',fontSize:'12px',fontWeight:'500',color:'var(--muted)',marginBottom:'5px'}}>학교명</label>
          <input
            style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border)',borderRadius:'8px',fontSize:'14px',fontFamily:'inherit',outline:'none'}}
            placeholder="예: 동탄중앙고등학교"
            value={school}
            onChange={e => setSchool(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && document.getElementById('name-input').focus()}
          />
        </div>
        <div style={{marginBottom:'16px',textAlign:'left'}}>
          <label style={{display:'block',fontSize:'12px',fontWeight:'500',color:'var(--muted)',marginBottom:'5px'}}>이름</label>
          <input
            id="name-input"
            style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border)',borderRadius:'8px',fontSize:'14px',fontFamily:'inherit',outline:'none'}}
            placeholder="예: 홍길동"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
        </div>
        <button
          className="btn-primary"
          style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}
          onClick={handleSave}
          disabled={saving || !name.trim() || !school.trim()}
        >
          {saving ? '저장 중...' : '시작하기'}
        </button>
        <p className="login-note" style={{marginTop:'12px'}}>입력 정보는 이 기기에만 저장되며 외부로 공개되지 않아요.</p>
      </div>
    </div>
  );
}

// ── 관리자 페이지 ──
function AdminPage({ user, profile, onBack }) {
  const [signups, setSignups] = useState(null);

  useEffect(() => {
    getAllSignups().then(setSignups).catch(console.error);
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-brand">급식소리함 🌿</span>
          <div className="nav-links">
            <span className="nav-link" style={{cursor:'pointer',color:'var(--muted)'}} onClick={onBack}>← 허브로 돌아가기</span>
          </div>
          <div className="nav-user">
            <span className="nav-user-name">관리자</span>
            <button className="btn btn-sm" onClick={logOut}>로그아웃</button>
          </div>
        </div>
      </nav>

      <div className="wrap" style={{padding:'2rem 1.5rem'}}>
        <h2 style={{fontSize:'20px',fontWeight:'700',marginBottom:'6px'}}>가입자 관리</h2>
        <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'1.5rem'}}>급식소리함에 가입한 선생님 목록이에요.</p>

        {signups === null ? (
          <p style={{color:'var(--muted)',fontSize:'13px'}}>불러오는 중...</p>
        ) : (
          <>
            <div style={{display:'flex',gap:'12px',marginBottom:'1.5rem'}}>
              <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:'10px',padding:'16px 20px',textAlign:'center'}}>
                <div style={{fontSize:'28px',fontWeight:'700',color:'var(--green)',lineHeight:1}}>{signups.length}</div>
                <div style={{fontSize:'12px',color:'var(--muted)',marginTop:'4px'}}>전체 가입자</div>
              </div>
            </div>

            <div style={{background:'var(--white)',border:'1px solid var(--border)',borderRadius:'12px',overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1.5fr auto',padding:'10px 16px',background:'var(--bg)',borderBottom:'1px solid var(--border)',fontSize:'12px',fontWeight:'600',color:'var(--muted)'}}>
                <span>이름</span><span>학교</span><span>이메일</span><span>가입일</span>
              </div>
              {signups.length === 0 ? (
                <div style={{padding:'2rem',textAlign:'center',color:'var(--muted)',fontSize:'13px'}}>아직 가입자가 없어요.</div>
              ) : signups.map((s, i) => (
                <div key={s.uid || i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1.5fr auto',padding:'12px 16px',borderBottom:'1px solid var(--border)',fontSize:'13px',alignItems:'center',gap:'8px'}}>
                  <span style={{fontWeight:'500'}}>{s.name}</span>
                  <span style={{color:'var(--muted)'}}>{s.school}</span>
                  <span style={{color:'var(--muted)',fontSize:'12px',wordBreak:'break-all'}}>{s.email}</span>
                  <span style={{color:'var(--muted)',fontSize:'11px',whiteSpace:'nowrap'}}>{s.joinedAt ? new Date(s.joinedAt).toLocaleDateString('ko-KR') : '-'}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ── 메인 허브 ──
function MainApp({ user, profile, onAdmin }) {
  const totalTools = categories.reduce((s,c) => s + c.tools.length, 0);
  const available  = categories.reduce((s,c) => s + c.tools.filter(t=>t.available).length, 0);
  const isAdmin    = user.email === ADMIN_EMAIL;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#home" onClick={e=>{e.preventDefault();scrollTo('home')}}>급식소리함 🌿</a>
          <div className="nav-links">
            {categories.map(c => (
              <a key={c.id} className="nav-link" href={`#${c.id}`} onClick={e=>{e.preventDefault();scrollTo(c.id)}}>{c.name}</a>
            ))}
          </div>
          <div className="nav-user">
            <span className="nav-user-name">{profile.school} · {profile.name}</span>
            {isAdmin && <button className="btn btn-sm" onClick={onAdmin} style={{color:'var(--green)',borderColor:'var(--green)'}}>관리자</button>}
            <button className="btn btn-sm" onClick={logOut}>로그아웃</button>
          </div>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-pill">✨ 영양교사 김소리 직접 제작</div>
          <h1 className="hero-title"><em>급식소리함</em></h1>
          <p className="hero-sub">AI를 활용한 학교급식 업무 효율화 도구 모음</p>
          <p className="hero-by">영양교사 김소리가 직접 만든 AI 업무도구와 운영자료를 담았습니다.</p>
          <div className="hero-stats">
            <div><div className="stat-num">{available}</div><div className="stat-label">이용 가능</div></div>
            <div><div className="stat-num">{totalTools - available}</div><div className="stat-label">배포 예정</div></div>
            <div><div className="stat-num">{categories.length}</div><div className="stat-label">카테고리</div></div>
            <div><div className="stat-num">{totalTools}</div><div className="stat-label">전체 도구</div></div>
          </div>
          <div className="hero-notice">
            무료사이트이며, 급식 행정기관 또는 교육청 사이트가 아닙니다.
            선생님들의 개인적인 업무지원을 위해서는 얼마든지 활용 가능하지만,
            개인 연수나 강의 등 이익창출을 위한 자료 및 저작권은 허용하지 않습니다.
          </div>
        </div>
      </section>

      <div className="wrap overview">
        <p className="eyebrow">카테고리 바로가기</p>
        <div className="cat-grid">
          {categories.map(c => (
            <a key={c.id} className={`cat-card ${colorMap[c.color]}`} href={`#${c.id}`} onClick={e=>{e.preventDefault();scrollTo(c.id)}}>
              <div className="cat-ico">{c.icon}</div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-meta">{c.tools.length}개 · {c.tools.filter(t=>t.available).length}개 이용</div>
            </a>
          ))}
        </div>
      </div>

      {categories.map(c => (
        <div key={c.id} className={`wrap tool-section ${colorMap[c.color]}`} id={c.id}>
          <div className="sec-head">
            <div className="sec-ico">{c.icon}</div>
            <span className="sec-title">{c.name}</span>
            <span className="sec-meta">{c.tools.length}개 · {c.tools.filter(t=>t.available).length}개 이용 가능</span>
          </div>
          <div className="tool-grid">
            {c.tools.map(t => (
              t.available
                ? <a key={t.id} className={`tool-card link ${colorMap[c.color]}`} href={t.url} target="_blank" rel="noopener noreferrer">
                    <div className="tool-ico">{c.icon}</div>
                    <div className="tool-text">
                      <div className="tool-name">{t.name}</div>
                      <div className="tool-desc">{t.desc}</div>
                    </div>
                    <span className="ext">↗</span>
                  </a>
                : <div key={t.id} className="tool-card soon">
                    <div className="tool-ico gray">·</div>
                    <div className="tool-text">
                      <div className="tool-name">{t.name}</div>
                      <div className="tool-desc">{t.desc}</div>
                    </div>
                    <span className="badge badge-soon">배포 예정</span>
                  </div>
            ))}
          </div>
        </div>
      ))}

      <div className="wrap about-wrap">
        <p className="eyebrow" style={{marginBottom:'1rem'}}>영양교사 소개</p>
        <div className="about-card">
          <div className="about-avatar">👩‍🍳</div>
          <div>
            <div className="about-name">김소리</div>
            <div className="about-role">영양교사</div>
            <ul className="about-list">
              <li>동탄중앙고등학교 영양교사</li>
              <li>2026 미래학교급식플랫폼 TF 팀장</li>
              <li>2025 경기도교육청 영양·식생활 교육 연구단 팀장</li>
              <li>업무효율화 및 우수사례 강의 다수 진행</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-brand">급식소리함 🌿</div>
        <div className="footer-copy">© 2025 급식소리함 · 영양교사 김소리 · All rights reserved.</div>
      </footer>
    </>
  );
}
