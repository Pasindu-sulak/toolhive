import React, { useState } from 'react';
import CopyButton from '../components/CopyButton.jsx';

const MODES = [
  { id: 'upper', label: 'UPPERCASE' },
  { id: 'lower', label: 'lowercase' },
  { id: 'title', label: 'Title Case' },
  { id: 'sentence', label: 'Sentence case' },
  { id: 'camel', label: 'camelCase' }
];

function convert(text, mode) {
  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence':
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case 'camel':
      return text
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^./, (c) => c.toLowerCase());
    default:
      return text;
  }
}

export default function CaseConverter({ onUse }) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('upper');

  const result = convert(text, mode);

  return (
    <div>
      <label className="field-label" htmlFor="cc-input">Your text</label>
      <textarea
        id="cc-input"
        className="field-textarea"
        placeholder="Paste text to convert…"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.length === 1) onUse?.();
        }}
        style={{ minHeight: 100, fontFamily: 'var(--font-body)' }}
      />
      <div className="tab-row" role="tablist" aria-label="Case style">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`tab-btn ${mode === m.id ? 'active' : ''}`}
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="result-box">{result || 'Converted text will appear here.'}</div>
      <CopyButton getText={() => result} />
    </div>
  );
}
