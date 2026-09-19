import React from 'react';

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

const icons = {
  'word-counter': (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M4 6h16M4 12h10M4 18h13" />
    </svg>
  ),
  'case-converter': (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M3 17l4-10 4 10M4.5 13h5M14 17V9h3.5a2.5 2.5 0 010 5H14M14 17h4" />
    </svg>
  ),
  'lorem-ipsum': (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M5 5h14v3H5zM5 11h14M5 14h9M5 17h14M5 20h6" />
    </svg>
  ),
  'percentage-calculator': (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M5 19L19 5M7 9a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  'bmi-calculator': (
    <svg viewBox="0 0 24 24" {...common}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 12l4-3" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  ),
  'tip-calculator': (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M4 8h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8z" />
      <path d="M4 8l2.5-4h11L20 8M9 13h6" />
    </svg>
  ),
  'age-calculator': (
    <svg viewBox="0 0 24 24" {...common}>
      <rect x="4" y="5" width="16" height="15" rx="1.5" />
      <path d="M4 9h16M8 3v4M16 3v4" />
      <circle cx="9" cy="14" r="1" fill="currentColor" />
      <circle cx="13" cy="14" r="1" fill="currentColor" />
      <circle cx="17" cy="14" r="1" fill="currentColor" />
    </svg>
  ),
  'json-formatter': (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M8 4c-2 0-3 1-3 3v3c0 1-.5 2-2 2 1.5 0 2 1 2 2v3c0 2 1 3 3 3M16 4c2 0 3 1 3 3v3c0 1 .5 2 2 2-1.5 0-2 1-2 2v3c0 2-1 3-3 3" />
    </svg>
  ),
  'timestamp-converter': (
    <svg viewBox="0 0 24 24" {...common}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2M9 2h6" />
    </svg>
  ),
  'password-generator': (
    <svg viewBox="0 0 24 24" {...common}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 018 0v3" />
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
    </svg>
  ),
  'uuid-generator': (
    <svg viewBox="0 0 24 24" {...common}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </svg>
  ),
  'color-converter': (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 3a9 8.5 0 100 17c1.5 0 2-1 2-2s-.5-1.5-.5-2.3c0-.7.5-1.2 1.2-1.2H16a4 4 0 004-4c0-4-3.6-7.5-8-7.5z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  ),
  'qr-code-generator': (
    <svg viewBox="0 0 24 24" {...common}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="0.5" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="0.5" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="0.5" />
      <path d="M14.5 14.5h2.5v2.5h-2.5zM19 14.5h1.5v1.5H19zM14.5 19h1.5v1.5h-1.5zM17.5 17.5h3v3h-3z" fill="currentColor" stroke="none" />
    </svg>
  )
};

export default function ToolIcon({ slug, className }) {
  const icon = icons[slug];
  if (!icon) return null;
  return <span className={className}>{icon}</span>;
}
