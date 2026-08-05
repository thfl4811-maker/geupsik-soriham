import { useState, useEffect } from 'react';
import { signIn, logOut, onAuth } from './firebase';
import { categories } from './data/tools';
import './index.css';

// Google 로고 SVG
const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

// 카테고리 아이콘
const colorMap = { green: 't-green', amber: 't-amber', blue: 't-blue', coral: 't-coral', purple: 't-purple', teal: 't-teal' };

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = 로딩중

  useEffect(() => {
    const unsub = onAuth(u => setUser(u));
    return unsub;
  }, []);

  if (user === undefined) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',color:'var(--muted)',fontSize:'14px'}}>불러오는 중...</div>;

  if (!user) return <LoginScreen />;

  return <MainApp user={user} />;
}

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

function MainApp({ user }) {
  const totalTools = categories.reduce((s, c) => s + c.tools.length, 0);
  const available  = categories.reduce((s, c) => s + c.tools.filter(t => t.available).length, 0);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  };

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#home" onClick={e=>{e.preventDefault();scrollTo('home')}}>급식소리함 🌿</a>
          <div className="nav-links">
            {categories.map(c => (
              <a key={c.id} className="nav-link" href={`#${c.id}`} onClick={e=>{e.preventDefault();scrollTo(c.id)}}>{c.name}</a>
            ))}
          </div>
          <div className="nav-user">
            <span className="nav-user-name">{user.displayName || user.email}</span>
            <button className="btn btn-sm" onClick={logOut}>로그아웃</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
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
        </div>
      </section>

      {/* 카테고리 요약 */}
      <div className="wrap overview">
        <p className="eyebrow">카테고리 바로가기</p>
        <div className="cat-grid">
          {categories.map(c => (
            <a key={c.id} className={`cat-card ${colorMap[c.color]}`} href={`#${c.id}`} onClick={e=>{e.preventDefault();scrollTo(c.id)}}>
              <div className="cat-ico" style={{background:`var(--cl)`}}>{c.icon}</div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-meta">{c.tools.length}개 도구 · {c.tools.filter(t=>t.available).length}개 이용</div>
            </a>
          ))}
        </div>
      </div>

      {/* 카테고리별 도구 */}
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
                    <div className="tool-ico gray">•</div>
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

      {/* 영양교사 소개 */}
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">급식소리함 🌿</div>
        <div className="footer-copy">© 2025 급식소리함 · 영양교사 김소리 · All rights reserved.</div>
      </footer>
    </>
  );
}
