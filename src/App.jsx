// ============================================================
// 급식소리함 로그인 흐름 수정본
// src/App.jsx에서
//   export default function App() {
// 부터
//   // ── 관리자 페이지 ──
// 바로 직전까지 이 코드로 교체하세요.
// ============================================================

export default function App() {
  const [user, setUser] = useState(undefined);
  // undefined = 로그인은 됐지만 프로필 조회 중
  // null      = 프로필 없음(최초 사용자)
  // object    = 기존 프로필 있음
  const [profile, setProfile] = useState(undefined);
  const [profileError, setProfileError] = useState('');
  const [view, setView] = useState('hub');

  useEffect(() => {
    const unsub = onAuth(async (u) => {
      setUser(u);
      setProfileError('');

      // 로그아웃 상태:
      // profile을 null로 바꿔 Loading에 걸리지 않도록 한다.
      if (!u) {
        setProfile(null);
        setView('hub');
        return;
      }

      // 로그인 성공 → Firebase 프로필 조회 시작
      setProfile(undefined);

      try {
        const p = await getProfile(u.uid);
        setProfile(p || null);
      } catch (e) {
        console.error('프로필 조회 오류:', e);
        setProfileError(
          `로그인은 성공했지만 사용자 정보를 불러오지 못했습니다.\n` +
          `오류코드: ${e?.code || 'unknown'}\n` +
          `${e?.message || ''}`
        );
        setProfile(null);
      }
    });

    return unsub;
  }, []);

  // 1. Firebase가 로그인 상태를 아직 확인 중
  if (user === undefined) {
    return <Loading text="로그인 상태를 확인하는 중..." />;
  }

  // 2. 로그아웃 상태 → 무조건 Google 로그인 화면
  // profile 값과 관계없이 로그인 화면을 먼저 보여준다.
  if (!user) {
    return <LoginScreen />;
  }

  // 3. Google 로그인은 성공했고 기존 프로필을 찾는 중
  if (profile === undefined) {
    return <Loading text="사용자 정보를 불러오는 중..." />;
  }

  // 4. 로그인은 됐지만 Firestore 프로필 조회 자체가 실패
  if (profileError) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="login-logo">⚠️</div>
          <h1 className="login-title">사용자 정보 불러오기 오류</h1>

          <div style={{
            marginTop:'16px',
            padding:'12px 14px',
            borderRadius:'9px',
            background:'#fff1f2',
            border:'1px solid #fecdd3',
            color:'#9f1239',
            fontSize:'12px',
            lineHeight:'1.65',
            textAlign:'left',
            whiteSpace:'pre-wrap',
            wordBreak:'break-word'
          }}>
            {profileError}
          </div>

          <button
            className="login-google"
            style={{marginTop:'16px', justifyContent:'center'}}
            onClick={() => logOut()}
          >
            다시 로그인하기
          </button>
        </div>
      </div>
    );
  }

  // 5. 최초 로그인 사용자
  // Firebase에 학교명/이름 프로필이 없을 때 딱 한 번만 표시
  if (!profile || !profile.name || !profile.school) {
    return <ProfileSetup user={user} onSaved={setProfile} />;
  }

  // 6. 기존 사용자
  // Google 로그인 → 저장된 프로필 발견 → 바로 급식소리함 허브
  return view === 'admin' && user.email === ADMIN_EMAIL
    ? (
      <AdminPage
        user={user}
        profile={profile}
        onBack={() => setView('hub')}
      />
    )
    : (
      <MainApp
        user={user}
        profile={profile}
        onAdmin={() => setView('admin')}
      />
    );
}


// ── 로딩 ──
function Loading({ text = '불러오는 중...' }) {
  return (
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      minHeight:'100vh',
      color:'var(--muted)',
      fontSize:'14px'
    }}>
      {text}
    </div>
  );
}


// Firebase Auth 오류를 사람이 읽기 쉽게 변환
function getLoginErrorMessage(error) {
  const code = error?.code || 'unknown';

  const messages = {
    'auth/popup-closed-by-user':
      'Google 로그인 창이 닫혔습니다. 다시 시도해 주세요.',

    'auth/cancelled-popup-request':
      '로그인 요청이 취소되었습니다. 잠시 후 다시 시도해 주세요.',

    'auth/popup-blocked':
      '브라우저가 Google 로그인 팝업을 차단했습니다. 이 사이트의 팝업을 허용한 뒤 다시 시도해 주세요.',

    'auth/unauthorized-domain':
      `현재 접속 주소가 Firebase 승인 도메인에 등록되어 있지 않습니다.
Firebase Console → Authentication → Settings → Authorized domains에
geupsik-soriham.vercel.app 을 추가해 주세요.`,

    'auth/operation-not-allowed':
      'Firebase Authentication에서 Google 로그인 제공업체가 활성화되어 있지 않습니다.',

    'auth/network-request-failed':
      '네트워크 연결 문제로 Google 로그인에 실패했습니다.',

    'auth/internal-error':
      'Firebase 로그인 처리 중 내부 오류가 발생했습니다.',

    'auth/account-exists-with-different-credential':
      '같은 이메일이 다른 로그인 방식으로 이미 등록되어 있습니다.',

    'auth/user-disabled':
      '현재 사용이 중지된 계정입니다.'
  };

  return {
    code,
    friendly: messages[code] || 'Google 로그인 중 오류가 발생했습니다.',
    detail: error?.message || ''
  };
}


// ── 로그인 ──
function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setLoginError(null);

    try {
      await signIn();

      // 성공한 경우 화면 이동을 직접 하지 않는다.
      // Firebase onAuthStateChanged가 사용자 변화를 감지하고
      // App에서 프로필 존재 여부를 판별해서 자동 이동한다.
    } catch (e) {
      console.error('Google 로그인 오류:', e);
      setLoginError(getLoginErrorMessage(e));
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">🌿</div>
        <h1 className="login-title">급식소리함</h1>

        <p className="login-sub">
          AI를 활용한 학교급식 업무 효율화 도구 모음
        </p>

        <button
          className="login-google"
          onClick={handleLogin}
          disabled={loading}
        >
          <GoogleLogo />
          {loading ? 'Google 로그인 중...' : 'Google 계정으로 시작하기'}
        </button>

        {/* 로그인 실패 시 화면에 실제 오류 표시 */}
        {loginError && (
          <div style={{
            marginTop:'14px',
            padding:'12px 14px',
            borderRadius:'9px',
            background:'#fff1f2',
            border:'1px solid #fecdd3',
            color:'#9f1239',
            fontSize:'12px',
            lineHeight:'1.65',
            textAlign:'left',
            wordBreak:'break-word'
          }}>
            <div style={{fontWeight:'700', marginBottom:'4px'}}>
              로그인을 완료하지 못했습니다.
            </div>

            <div>{loginError.friendly}</div>

            <div style={{marginTop:'7px'}}>
              <strong>오류코드:</strong> {loginError.code}
            </div>

            {loginError.detail && (
              <details style={{marginTop:'7px'}}>
                <summary style={{cursor:'pointer'}}>
                  개발자용 상세 오류 보기
                </summary>
                <div style={{
                  marginTop:'5px',
                  whiteSpace:'pre-wrap',
                  wordBreak:'break-word',
                  opacity:.85
                }}>
                  {loginError.detail}
                </div>
              </details>
            )}
          </div>
        )}

        <p className="login-note">
          무료사이트이며, 급식 행정기관 또는 교육청 사이트가 아닙니다.<br/>
          개인 연수·강의 등 이익창출 목적 활용은 허용하지 않습니다.
        </p>
      </div>
    </div>
  );
}


// ── 프로필 설정: 최초 로그인 시 딱 1회 ──
function ProfileSetup({ user, onSaved }) {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !school.trim() || saving) return;

    setSaving(true);
    setSaveError('');

    try {
      const data = {
        name: name.trim(),
        school: school.trim(),
        email: user.email || '',
        photoURL: user.photoURL || '',
        joinedAt: new Date().toISOString(),
      };

      // Firestore users/{uid} + signups/{uid} 저장
      await saveProfile(user.uid, data);

      // 저장 성공 즉시 App의 profile을 갱신
      // → 다시 입력화면을 거치지 않고 허브로 이동
      onSaved(data);

    } catch (e) {
      console.error('프로필 저장 오류:', e);

      setSaveError(
        `학교명과 이름을 저장하지 못했습니다.\n` +
        `오류코드: ${e?.code || 'unknown'}\n` +
        `${e?.message || ''}`
      );

      setSaving(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">👋</div>

        <h1 className="login-title">처음 오셨군요!</h1>

        <p
          className="login-sub"
          style={{marginBottom:'1.5rem'}}
        >
          최초 1회만 학교명과 이름을 입력해 주세요.
          다음 로그인부터는 Google 로그인 후 바로 급식소리함으로 이동합니다.
        </p>

        <div style={{marginBottom:'12px', textAlign:'left'}}>
          <label style={{
            display:'block',
            fontSize:'12px',
            fontWeight:'500',
            color:'var(--muted)',
            marginBottom:'5px'
          }}>
            학교명
          </label>

          <input
            autoFocus
            style={{
              width:'100%',
              padding:'10px 12px',
              border:'1px solid var(--border)',
              borderRadius:'8px',
              fontSize:'14px',
              fontFamily:'inherit',
              outline:'none'
            }}
            placeholder="예: 동탄중앙고등학교"
            value={school}
            onChange={e => setSchool(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                document.getElementById('name-input')?.focus();
              }
            }}
          />
        </div>

        <div style={{marginBottom:'16px', textAlign:'left'}}>
          <label style={{
            display:'block',
            fontSize:'12px',
            fontWeight:'500',
            color:'var(--muted)',
            marginBottom:'5px'
          }}>
            이름
          </label>

          <input
            id="name-input"
            style={{
              width:'100%',
              padding:'10px 12px',
              border:'1px solid var(--border)',
              borderRadius:'8px',
              fontSize:'14px',
              fontFamily:'inherit',
              outline:'none'
            }}
            placeholder="예: 홍길동"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSave();
            }}
          />
        </div>

        {saveError && (
          <div style={{
            marginBottom:'12px',
            padding:'10px 12px',
            borderRadius:'8px',
            background:'#fff1f2',
            border:'1px solid #fecdd3',
            color:'#9f1239',
            fontSize:'12px',
            lineHeight:'1.6',
            textAlign:'left',
            whiteSpace:'pre-wrap',
            wordBreak:'break-word'
          }}>
            {saveError}
          </div>
        )}

        <button
          className="btn-primary"
          style={{
            width:'100%',
            padding:'12px',
            border:'none',
            borderRadius:'9px',
            fontSize:'14px',
            fontWeight:'600',
            cursor:'pointer'
          }}
          onClick={handleSave}
          disabled={saving || !name.trim() || !school.trim()}
        >
          {saving ? '저장 중...' : '저장하고 급식소리함 시작하기'}
        </button>

        <p className="login-note" style={{marginTop:'12px'}}>
          학교명과 이름은 로그인 계정과 연결해 저장되며,
          다음 로그인 때 자동으로 불러옵니다.
        </p>
      </div>
    </div>
  );
}
