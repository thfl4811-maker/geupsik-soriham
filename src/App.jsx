import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import UsageModal from './components/UsageModal';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Resources from './pages/Resources';
import Cases from './pages/Cases';
import About from './pages/About';
import Contact from './pages/Contact';
import Guide from './pages/Guide';
import NotFound from './pages/NotFound';

export default function App() {
  const [usageOpen, setUsageOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Header />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer onOpenUsage={() => setUsageOpen(true)} />
      <UsageModal open={usageOpen} onClose={() => setUsageOpen(false)} />
    </>
  );
}
