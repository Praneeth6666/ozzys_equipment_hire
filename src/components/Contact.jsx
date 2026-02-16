import { useState, useEffect } from 'react';
import './Contact.css';
import { QUOTE_STORAGE_KEY } from './Pricing';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(QUOTE_STORAGE_KEY);
      if (saved) {
        setMessage(saved);
        sessionStorage.removeItem(QUOTE_STORAGE_KEY);
      }
    } catch (_) {}
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        if (!res.ok) throw new Error('Send failed');
      } else {
        // Demo mode: simulate network delay then succeed
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-card">
          <div className="contact-content">
            <h2>Get in touch</h2>
            <p>
              Tell us about your event or campaign. We'll provide a tailored quote for mobile LED trailer
              hire across Melbourne and Victoria.
            </p>
            <div className="contact-details">
              <a href="mailto:ozzysequipmenthire@gmail.com" className="contact-link">
                ozzysequipmenthire@gmail.com
              </a>
              <a href="https://www.ozzysequipmenthire.com.au" target="_blank" rel="noopener noreferrer" className="contact-link">
                www.ozzysequipmenthire.com.au
              </a>
              <p className="contact-location">Based in Melbourne, serving Victoria</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={status === 'sending'}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'sending'}
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Event type, dates, location and any specific requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={status === 'sending'}
            />
            {status === 'success' && (
              <p className="form-message form-message--success">
                Thanks! We'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-message form-message--error">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
