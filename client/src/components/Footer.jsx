import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Toolhive</h4>
            <p>Small, fast, free tools that run in your browser — no signup, no install.</p>
          </div>
          <div>
            <h4>Tools</h4>
            <ul>
              <li><Link to="/text">Text tools</Link></li>
              <li><Link to="/calculators">Calculators</Link></li>
              <li><Link to="/developer">Developer tools</Link></li>
              <li><Link to="/visual">Visual tools</Link></li>
            </ul>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms of service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Toolhive. All tools run locally in your browser.</span>
          <span>Made with the MERN stack.</span>
        </div>
      </div>
    </footer>
  );
}
