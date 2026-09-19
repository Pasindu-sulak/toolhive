import React, { useState } from 'react';
import CopyButton from '../components/CopyButton.jsx';

function uuidv4() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function UuidGenerator({ onUse }) {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState(() => Array.from({ length: 5 }, uuidv4));

  function regenerate(n = count) {
    onUse?.();
    const total = Math.min(Math.max(parseInt(n, 10) || 1, 1), 100);
    setUuids(Array.from({ length: total }, uuidv4));
  }

  return (
    <div>
      <div className="field-row">
        <div>
          <label className="field-label" htmlFor="uuid-count">How many?</label>
          <input
            id="uuid-count"
            type="number"
            min="1"
            max="100"
            className="field-input"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => regenerate()}>Generate</button>

      <div className="result-box" style={{ maxHeight: 320, overflow: 'auto' }}>
        {uuids.map((u, i) => (
          <div key={i} style={{ padding: '0.15rem 0' }}>{u}</div>
        ))}
      </div>
      <CopyButton getText={() => uuids.join('\n')} label="Copy all" />
    </div>
  );
}
