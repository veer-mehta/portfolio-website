import { useState } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [status, setStatus] = useState('');

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
    <section id="contact-form-section" className="section bg-dark-green">
      <div className="section-header-row">
        <span className="section-index">04</span>
        <div>
          <h2 className="section-title"><span>Contact</span></h2>
        </div>
      </div>

      <div className="contact-form-container">
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
              rows="3"
              className="editorial-textarea"
            ></textarea>
          </div>
          <button type="submit" className="editorial-submit-btn" disabled={status === 'sending...'}>
            {status === 'sending...' ? 'sending...' : status === 'success' ? 'message sent!' : status === 'error' ? 'failed. try again' : 'send message'}
          </button>
        </form>
      </div>
    </section>
  );
}
