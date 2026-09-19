import React, { useState } from 'react';
import Seo from '../components/Seo.jsx';
import { submitContact } from '../lib/api.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      await submitContact(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <>
      <Seo title="Contact Toolhive" description="Get in touch with the Toolhive team with feedback, tool suggestions, or questions." path="/contact" />
      <div className="container content-page">
        <h1>Contact us</h1>
        <p>Found a bug, have a tool idea, or want to ask something? Send a message below.</p>

        {status === 'sent' ? (
          <div className="form-success">Thanks — your message has been received. We'll get back to you if a reply is needed.</div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="field-label" htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                className="field-input"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="field-label" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                className="field-input"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="field-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                required
                className="field-textarea"
                style={{ fontFamily: 'var(--font-body)' }}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
              />
            </div>

            {status === 'error' && <div className="error-box">{error || 'Something went wrong — try again.'}</div>}

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
