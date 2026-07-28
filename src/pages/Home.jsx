import Hero from '../components/Hero';
import VillageMap from '../components/VillageMap';
import QuickTools from '../components/QuickTools';
import AboutPreview from '../components/AboutPreview';
import ContactPreview from '../components/ContactPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container">
        <VillageMap />
      </div>
      <QuickTools />
      <AboutPreview />
      <ContactPreview />
    </>
  );
}
