import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't scroll if user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      const scrollAmount = 100;
      if (e.key === 'j') {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'k') {
        window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'g' && e.shiftKey === false) {
        // Simple 'gg' check (could be improved with a timer, but let's start simple)
        // For now just handle 'G' (Shift+G)
      } else if (e.key === 'G') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
