import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="brand">
          <svg className="brand-hex" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 3 L28 10 V24 L16 31 L4 24 V10 Z" fill="none" stroke="#f5b942" strokeWidth="2" />
            <path d="M16 11 L22 14.5 V21.5 L16 25 L10 21.5 V14.5 Z" fill="#f5b942" />
          </svg>
          Toolhive
        </Link>
        <nav className="main-nav" aria-label="Primary">
          <NavLink to="/text" className={({ isActive }) => (isActive ? 'active' : '')}>Text</NavLink>
          <NavLink to="/calculators" className={({ isActive }) => (isActive ? 'active' : '')}>Calculators</NavLink>
          <NavLink to="/developer" className={({ isActive }) => (isActive ? 'active' : '')}>Developer</NavLink>
          <NavLink to="/visual" className={({ isActive }) => (isActive ? 'active' : '')}>Visual</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}
