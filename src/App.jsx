import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AllProjects from './pages/AllProjects';
import VimArenaPopup from './components/VimArenaPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      const scrollAmount = 100;
      if (e.key === 'j') {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'k') {
        window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'G') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Navbar onGameClick={() => setIsPopupOpen(prev => !prev)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/projects" element={<AllProjects />} />
      </Routes>
      <Footer />
      <VimArenaPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

export default App;
