import { useState, useEffect, useRef } from 'react';
import './Contact.css';
import { QUOTE_STORAGE_KEY, QUOTE_EVENT } from './Pricing';

const FORMSPREE_ID = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FORMSPREE_ID : '';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // added
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const messageRef = useRef(null);

  // Arriving at /#contact after a reload — e.g. a quote written just before nav.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(QUOTE_STORAGE_KEY);
      if (saved) {
        setMessage(saved);
        sessionStorage.removeItem(QUOTE_STORAGE_KEY);
      }
    } catch {}
  }, []);

  // "Request this quote" in the pricing calculator, same page load. The mount
  // effect above has already run by now, so the calculator fires this instead.
  useEffect(() => {
    function handleQuoteRequest(e) {
      let text = typeof e.detail === 'string' ? e.detail : '';
      try {
        text = text || sessionStorage.getItem(QUOTE_STORAGE_KEY) || '';
        sessionStorage.removeItem(QUOTE_STORAGE_KEY);
      } catch {}
      if (text) setMessage(text);
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      // Put the cursor in the pre-filled field so it's clearly editable.
      messageRef.current?.focus({ preventScroll: true });
    }
    window.addEventListener(QUOTE_EVENT, handleQuoteRequest);
    return () => window.removeEventListener(QUOTE_EVENT, handleQuoteRequest);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message }), // include phone
        });
        if (!res.ok) throw new Error('Send failed');
      } else {
        // Demo mode: simulate network delay then succeed
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus('success');
      setName('');
      setEmail('');
      setPhone(''); // reset
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact" aria-label="Contact Ozzy's Equipment Hire">
      <div className="container">
        <div className="contact-card">
          <div className="contact-content">
            <h2>Get in touch</h2>
            <p>
              Tell us about your VMS sign hire, LED trailer sign hire or LED screen trailer needs. We&apos;ll
              provide a tailored quote for Melbourne and Victoria.
            </p>
            <div className="contact-details">
              <a href="tel:+61469316068" className="contact-link">
                0469 316 068
              </a>
              <a
                href="mailto:ozzysequipmenthire@gmail.com"
                className="contact-link"
                rel="noopener noreferrer"
              >
                ozzysequipmenthire@gmail.com
              </a>
              <a
                href="https://www.ozzysequipmenthire.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                www.ozzysequipmenthire.com.au
              </a>
              <p className="contact-location">
                📍 Melbourne, VIC — VMS sign hire &amp; LED trailer sign hire delivered across Victoria
              </p>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-label="Equipment hire enquiry form"
            noValidate
          >
            <label htmlFor="name">Name <span aria-label="required">*</span></label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={status === 'sending'}
              aria-required="true"
            />

            <label htmlFor="email">Email <span aria-label="required">*</span></label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'sending'}
              aria-required="true"
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 0412 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === 'sending'}
              pattern="[0-9\s\-\+\(\)]+"
              aria-describedby="phone-hint"
            />
            <small id="phone-hint">Format: 0412 345 678</small>

            <label htmlFor="message">Message <span aria-label="required">*</span></label>
            <textarea
              id="message"
              ref={messageRef}
              rows="4"
              placeholder="Event type, dates, location and any specific requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={status === 'sending'}
              aria-required="true"
            />

            {status === 'success' && (
              <p className="form-message form-message--success" role="alert">
                ✓ Thanks! We'll get back to you within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="form-message form-message--error" role="alert">
                ✗ Something went wrong. Please try again or email us directly at ozzysequipmenthire@gmail.com
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}