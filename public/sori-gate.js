/* ============================================================
   급식소리함 공용 로그인 게이트 (sori-gate.js)
   - 급식소리함(aisori) 구글 로그인 + 프로필(이름·학교) 등록자만 앱 이용 허용
   - 학생·외부인 화면(사이니지, 학생 응답 등)은 각 앱이 window.SORI_GATE_SKIP=true 로 제외
   - 통과 시: window.SORI = { user, profile } 설정 + 'sori-ready' 이벤트 발생
   - 프로필에 학교 코드가 없으면 나이스 검색으로 1회 자동 매칭해 저장
   ============================================================ */
(function () {
  'use strict';
  if (window.SORI_GATE_SKIP) return;

  var PORTAL_URL = 'https://geupsik-soriham.vercel.app/';
  var SCHOOL_API = 'https://smart-meal-archive.vercel.app/api/schools';
  var SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  var CONFIG = {
    apiKey: 'AIzaSyBEagv2iP4sSJuDsjBB24A3FHFfAiiS8wA',
    authDomain: 'aisori.firebaseapp.com',
    projectId: 'aisori',
    storageBucket: 'aisori.firebasestorage.app',
    messagingSenderId: '829702954282',
    appId: '1:829702954282:web:7f38d1ca0e591d238d9253'
  };

  /* ---------- 오버레이 ---------- */
  var ov = document.createElement('div');
  ov.id = 'soriGateOverlay';
  ov.setAttribute('style',
    'position:fixed;inset:0;z-index:2147483000;background:#f4f7fb;display:flex;' +
    'align-items:center;justify-content:center;padding:20px;font-family:Pretendard,-apple-system,"Malgun Gothic",sans-serif;');
  ov.innerHTML =
    '<div style="max-width:420px;width:100%;background:#fff;border:1px solid #e2e8f0;border-radius:24px;' +
    'box-shadow:0 18px 40px rgba(15,23,42,.08);padding:34px 30px;text-align:center">' +
    '<div style="font-size:40px;margin-bottom:10px">🍚</div>' +
    '<h2 style="margin:0 0 6px;font-size:22px;color:#0f172a">급식소리함 로그인</h2>' +
    '<p id="soriGateMsg" style="margin:0 0 20px;color:#64748b;font-size:14px;line-height:1.6">' +
    '이 도구는 급식소리함 가입 선생님 전용이에요.<br>가입하신 구글 계정으로 로그인해주세요.</p>' +
    '<div id="soriGateBody"></div>' +
    '<p style="margin:18px 0 0;font-size:12px;color:#94a3b8">아직 회원이 아니신가요? ' +
    '<a href="' + PORTAL_URL + '" style="color:#2563eb;font-weight:700">급식소리함에서 가입하기</a></p>' +
    '</div>';

  function mount() {
    if (!document.getElementById('soriGateOverlay')) document.body.appendChild(ov);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  function body(html) {
    var el = document.getElementById('soriGateBody');
    if (el) el.innerHTML = html;
  }
  function msg(html) {
    var el = document.getElementById('soriGateMsg');
    if (el) el.innerHTML = html;
  }
  var BTN = 'width:100%;border:none;border-radius:14px;padding:14px;font-size:15px;font-weight:800;cursor:pointer;';

  /* ---------- SDK 로드 ---------- */
  function load(src) {
    return new Promise(function (ok, no) {
      var s = document.createElement('script');
      s.src = src; s.onload = ok; s.onerror = no;
      document.head.appendChild(s);
    });
  }

  body('<div style="color:#94a3b8;font-size:14px">확인 중…</div>');

  Promise.all([
    load(SDK + 'firebase-app-compat.js')
  ]).then(function () {
    return Promise.all([
      load(SDK + 'firebase-auth-compat.js'),
      load(SDK + 'firebase-firestore-compat.js')
    ]);
  }).then(start).catch(function () {
    msg('로그인 모듈을 불러오지 못했어요.<br>네트워크 확인 후 새로고침 해주세요.');
    body('');
  });

  function start() {
    var app = firebase.apps.length ? firebase.app() : firebase.initializeApp(CONFIG);
    var auth = firebase.auth(app);
    var db = firebase.firestore(app);

    function showLogin() {
      msg('이 도구는 급식소리함 가입 선생님 전용이에요.<br>가입하신 구글 계정으로 로그인해주세요.');
      body('<button id="soriGateLogin" style="' + BTN + 'background:#2563eb;color:#fff">구글로 로그인</button>');
      document.getElementById('soriGateLogin').onclick = function () {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (e) {
          msg('로그인에 실패했어요: ' + (e && e.message ? e.message : '') + '<br>다시 시도해주세요.');
        });
      };
    }

    function showNotMember(email) {
      msg('<b>' + (email || '이 계정') + '</b>은 급식소리함에 가입되어 있지 않아요.<br>' +
        '급식소리함에서 이름·학교를 등록하면 모든 도구를 쓸 수 있어요.');
      body(
        '<a href="' + PORTAL_URL + '" style="' + BTN + 'display:block;box-sizing:border-box;background:#2563eb;color:#fff;text-decoration:none;margin-bottom:8px">급식소리함 가입하러 가기</a>' +
        '<button id="soriGateSwitch" style="' + BTN + 'background:#f1f5f9;color:#334155">다른 계정으로 로그인</button>');
      document.getElementById('soriGateSwitch').onclick = function () {
        auth.signOut();
      };
    }

    /* 프로필에 학교 코드가 없으면 나이스에서 1회 자동 매칭 */
    function resolveSchool(uid, profile) {
      if (!profile.school || profile.schoolCode) return Promise.resolve(profile);
      var name = String(profile.school).trim();
      if (/유치원/.test(name)) return Promise.resolve(profile); // 유치원은 나이스 미제공
      return fetch(SCHOOL_API + '?q=' + encodeURIComponent(name) + '&all=1')
        .then(function (r) { return r.json(); })
        .then(function (list) {
          if (!Array.isArray(list)) return profile;
          var exact = list.filter(function (s) { return s.schoolName === name; });
          var pick = exact.length === 1 ? exact[0] : (list.length === 1 ? list[0] : null);
          if (!pick) return profile;
          var patch = {
            school: pick.schoolName,
            officeCode: pick.officeCode,
            officeName: pick.officeName,
            schoolCode: pick.schoolCode,
            schoolLevel: pick.level || '',
            schoolAddress: pick.address || ''
          };
          return db.collection('users').doc(uid).set(patch, { merge: true })
            .then(function () { return Object.assign({}, profile, patch); })
            .catch(function () { return Object.assign({}, profile, patch); });
        })
        .catch(function () { return profile; });
    }

    /* ── 접속 기록 (관리자 통계용) ──
       어느 도구를 언제 썼는지 users/{uid}·signups/{uid}에 누적.
       같은 도구를 30분 안에 다시 열면 1회로 셈(새로고침으로 부풀지 않게). */
    function appKey() {
      var h = location.hostname, p = location.pathname;
      if (h === 'geupsik-soriham.vercel.app') {
        if (p.indexOf('market-survey') >= 0) return '시장조사변환기';
        if (p.indexOf('inspection-price') >= 0) return '검수단가매칭';
        return '포털';
      }
      if (h === 'thfl4811-maker.github.io') {
        if (p.indexOf('choice-meal-menu-finder') >= 0) return '메뉴탐색기';
        if (p.indexOf('rice-order-planner') >= 0) return '쌀발주계산기';
        return 'GitHub앱';
      }
      var map = {
        'meal-poster-prompt-builder-five.vercel.app': '프롬프트생성기',
        'smart-meal-signage.vercel.app': '월간식단뷰어',
        'smart-meal-archive.vercel.app': '식단아카이브',
        'school-meal-survey-v2.vercel.app': '선호도조사기',
        'edu-finance-drafter-3.vercel.app': '품의서작성기'
      };
      return map[h] || h;
    }
    function track(user) {
      try {
        var key = appKey(), now = Date.now(), lk = 'sori_seen_' + key;
        var last = parseInt(localStorage.getItem(lk) || '0', 10);
        if (now - last < 30 * 60 * 1000) return;
        localStorage.setItem(lk, String(now));
        var FV = firebase.firestore.FieldValue;
        var iso = new Date(now).toISOString();
        var apps = {}; apps[key] = { lastAt: iso, count: FV.increment(1) };
        var patch = { lastSeenAt: iso, lastSeenApp: key, visitCount: FV.increment(1), apps: apps };
        db.collection('users').doc(user.uid).set(patch, { merge: true }).catch(function () {});
        db.collection('signups').doc(user.uid).set(patch, { merge: true }).catch(function () {});
      } catch (e) { /* 기록 실패는 앱 동작에 영향 주지 않음 */ }
    }

    function pass(user, profile) {
      track(user);
      window.SORI = { user: user, profile: profile };
      var el = document.getElementById('soriGateOverlay');
      if (el && el.parentNode) el.parentNode.removeChild(el);
      try {
        window.dispatchEvent(new CustomEvent('sori-ready', { detail: window.SORI }));
      } catch (e) { /* noop */ }
    }

    auth.onAuthStateChanged(function (user) {
      if (!user) { showLogin(); return; }
      body('<div style="color:#94a3b8;font-size:14px">가입 정보를 확인하는 중…</div>');
      db.collection('users').doc(user.uid).get().then(function (snap) {
        var p = snap.exists ? snap.data() : null;
        if (!p || !p.name || !p.school) { showNotMember(user.email); return; }
        resolveSchool(user.uid, p).then(function (profile) { pass(user, profile); });
      }).catch(function (e) {
        msg('가입 정보를 확인하지 못했어요.<br>' + (e && e.message ? e.message : '') );
        body('<button onclick="location.reload()" style="' + BTN + 'background:#2563eb;color:#fff">다시 시도</button>');
      });
    });
  }
})();
