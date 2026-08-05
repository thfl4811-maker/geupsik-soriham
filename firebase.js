import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEagv2iP4sSJuDsjBB24A3FHFfAiiS8wA",
  authDomain: "aisori.firebaseapp.com",
  projectId: "aisori",
  storageBucket: "aisori.firebasestorage.app",
  messagingSenderId: "829702954282",
  appId: "1:829702954282:web:7f38d1ca0e591d238d9253"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const ADMIN_EMAIL = 'thfl4811@gmail.com';

export function signIn() { return signInWithPopup(auth, provider); }
export function logOut() { return signOut(auth); }
export function onAuth(cb) { return onAuthStateChanged(auth, cb); }

// 유저 프로필 저장 (users + signups 두 곳에)
export async function saveProfile(uid, data) {
  const payload = { ...data, updatedAt: new Date().toISOString() };
  await setDoc(doc(db, 'users', uid), payload, { merge: true });
  await setDoc(doc(db, 'signups', uid), {
    name: data.name,
    school: data.school,
    email: data.email,
    joinedAt: data.joinedAt || new Date().toISOString(),
    uid,
  }, { merge: true });
}

// 프로필 불러오기
export async function getProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

// 관리자용: 전체 가입자 목록
export async function getAllSignups() {
  const q = query(collection(db, 'signups'), orderBy('joinedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}
