import SweetPotato from './SweetPotato';
import Broccoli from './Broccoli';
import Eggplant from './Eggplant';
import Carrot from './Carrot';
import Onion from './Onion';
import Corn from './Corn';

// 카테고리 character 값 → 컴포넌트 매핑
// 새 캐릭터를 추가하려면 컴포넌트를 만들고 이 객체에 등록하세요.
export const characterMap = {
  sweetpotato: SweetPotato,
  broccoli: Broccoli,
  eggplant: Eggplant,
  carrot: Carrot,
  onion: Onion,
  corn: Corn,
};

export function VeggieCharacter({ name, className, size }) {
  const Character = characterMap[name];
  if (!Character) return null;
  return <Character className={className} size={size} />;
}

export { SweetPotato, Broccoli, Eggplant, Carrot, Onion, Corn };
