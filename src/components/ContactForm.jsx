import { useState } from 'react';
import { FaCrosshairs, FaGithub, FaLinkedin, FaFileAlt, FaEnvelope } from 'react-icons/fa';
import './ContactForm.css';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('hello@veermehta.dev');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus('sending...');

    const formData = new FormData(form);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "");

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="links-section" className="section">
      <div className="section-header-row">
        <span className="section-index">05</span>
        <div>
          <h2 className="section-title"><span>Links</span></h2>
        </div>
      </div>

      <div className="links-section-grid">
        <div className="links-directory">
          <span className="links-col-heading">direct links</span>
          <div className="links-list">
            <a 
              href="https://vim-arena.veermehta.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="links-item highlight"
            >
              <div className="links-item-left">
                <FaCrosshairs className="links-item-icon" />
                <span className="links-item-name">
                  play my game <strong>vim-arena</strong>
                </span>
              </div>
              <span className="links-item-arrow">↗</span>
            </a>
            <a 
              href="https://github.com/veer-mehta" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="links-item"
            >
              <div className="links-item-left">
                <FaGithub className="links-item-icon" />
                <span className="links-item-name">
                  view my projects on <strong>github</strong>
                </span>
              </div>
              <span className="links-item-arrow">↗</span>
            </a>
            <a 
              href="https://linkedin.com/in/viirmehta" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="links-item"
            >
              <div className="links-item-left">
                <FaLinkedin className="links-item-icon" />
                <span className="links-item-name">
                  connect with me on <strong>linkedin</strong>
                </span>
              </div>
              <span className="links-item-arrow">↗</span>
            </a>
            <a 
              href="#email" 
              onClick={handleCopyEmail} 
              className="links-item"
            >
              <div className="links-item-left">
                <FaEnvelope className="links-item-icon" />
                <span className="links-item-name">
                  {emailCopied ? (
                    <strong>copied to clipboard</strong>
                  ) : (
                    <>
                      send an email to <strong>hello@veermehta.dev</strong>
                    </>
                  )}
                </span>
              </div>
              <span className="links-item-arrow">{emailCopied ? '!' : '↗'}</span>
            </a>
            <a 
              href="/VeerMehtaResume.pdf" 
              download 
              className="links-item"
            >
              <div className="links-item-left">
                <FaFileAlt className="links-item-icon" />
                <span className="links-item-name">
                  download my <strong>resume</strong>
                </span>
              </div>
              <span className="links-item-arrow">↓</span>
            </a>
          </div>
        </div>

        <div className="links-form-column">
          <span className="links-col-heading">send a message</span>
          <form onSubmit={handleSubmit} className="editorial-email-form">
            <div className="editorial-form-group">
              <label htmlFor="email" className="editorial-label">email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="hello@veermehta.dev" 
                className="editorial-input"
              />
            </div>
            <div className="editorial-form-group">
              <label htmlFor="message" className="editorial-label">message</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                placeholder="..." 
                rows="2"
                className="editorial-textarea"
              ></textarea>
            </div>
            <button type="submit" className="editorial-submit-btn" disabled={status === 'sending...'}>
              {status === 'sending...' ? 'sending...' : status === 'success' ? 'message sent!' : status === 'error' ? 'failed. try again' : 'send message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
