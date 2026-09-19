import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'toolhive_cookie_ack';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p>
        Toolhive uses cookies for basic site function and, once ads are live, Google AdSense may use
        cookies to serve ads. See our <Link to="/privacy">Privacy Policy</Link> for details.
      </p>
      <button type="button" className="btn btn-primary" onClick={dismiss}>
        Got it
      </button>
    </div>
  );
}
