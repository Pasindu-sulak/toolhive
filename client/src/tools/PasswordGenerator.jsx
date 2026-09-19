import React, { useState } from 'react';
import CopyButton from '../components/CopyButton.jsx';

const SETS = {
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  lower: 'abcdefghijkmnopqrstuvwxyz',
  numbers: '23456789',
  symbols: '!@#$%^&*()-_=+[]{}?'
};

function randomInt(max) {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % max;
}

function generatePassword(length, opts) {
  const pools = Object.keys(opts).filter((k) => opts[k]).map((k) => SETS[k]);
  if (pools.length === 0) return '';
  const all = pools.join('');
  let pwd = '';
  for (let i = 0; i < length; i += 1) {
    pwd += all[randomInt(all.length)];
  }
  return pwd;
}

function strengthLabel(length, opts) {
  const kinds = Object.values(opts).filter(Boolean).length;
  const score = length * kinds;
  if (score < 40) return { label: 'Weak', color: 'var(--danger)' };
  if (score < 80) return { label: 'Okay', color: 'var(--honey)' };
  return { label: 'Strong', color: 'var(--ok)' };
}

export default function PasswordGenerator({ onUse }) {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState(() => generatePassword(16, { upper: true, lower: true, numbers: true, symbols: true }));

  function regenerate(newLength = length, newOpts = opts) {
    onUse?.();
    setPassword(generatePassword(newLength, newOpts));
  }

  function toggleOpt(key) {
    const next = { ...opts, [key]: !opts[key] };
    const anyOn = Object.values(next).some(Boolean);
    if (!anyOn) return; // keep at least one set enabled
    setOpts(next);
    regenerate(length, next);
  }

  const strength = strengthLabel(length, opts);

  return (
    <div>
      <div className="result-box" style={{ fontSize: '1.15rem', letterSpacing: '0.03em' }}>
        {password || 'Select at least one character type'}
      </div>
      <div className="copy-row">
        <CopyButton getText={() => password} />
        <button type="button" className="btn" onClick={() => regenerate()}>Regenerate</button>
        <span style={{ color: strength.color, fontSize: '0.85rem', marginLeft: 'auto' }}>{strength.label}</span>
      </div>

      <label className="field-label" style={{ marginTop: '1.4rem' }} htmlFor="pw-length">Length — {length} characters</label>
      <input
        id="pw-length"
        type="range"
        min="6"
        max="48"
        value={length}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          setLength(v);
          regenerate(v, opts);
        }}
        style={{ width: '100%', accentColor: 'var(--honey)' }}
      />

      <div className="chip-row" style={{ marginTop: '1rem' }}>
        {[
          ['upper', 'A-Z'],
          ['lower', 'a-z'],
          ['numbers', '0-9'],
          ['symbols', '!@#$']
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`chip ${opts[key] ? 'active' : ''}`}
            style={{ cursor: 'pointer', background: 'none' }}
            onClick={() => toggleOpt(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
