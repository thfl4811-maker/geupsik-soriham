import { Link } from 'react-router-dom';
import { VeggieCharacter } from '../components/characters';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <VeggieCharacter name="onion" size={140} />
      <h1 style={{ margin: '20px 0 12px' }}>페이지를 찾을 수 없어요</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: '24px' }}>
        요청하신 페이지가 존재하지 않거나 이동되었어요.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          background: 'var(--mint-deep)',
          color: '#fff',
          fontWeight: 700,
          padding: '12px 24px',
          borderRadius: '999px',
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
