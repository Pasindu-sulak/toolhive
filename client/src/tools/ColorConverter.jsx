import React, { useState } from 'react';
import CopyButton from '../components/CopyButton.jsx';

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn: h = 60 * (((gn - bn) / d) % 6); break;
      case gn: h = 60 * ((bn - rn) / d + 2); break;
      default: h = 60 * ((rn - gn) / d + 4);
    }
  }
  if (h < 0) h += 360;
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb({ h, s, l }) {
  const sn = s / 100, ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

export default function ColorConverter({ onUse }) {
  const [hex, setHex] = useState('#F5B942');
  const [rgb, setRgb] = useState({ r: 245, g: 185, b: 66 });
  const [hsl, setHsl] = useState({ h: 40, s: 89, l: 61 });
  const [error, setError] = useState(null);

  function fromHex(value) {
    onUse?.();
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      setError(null);
      setRgb(parsed);
      setHsl(rgbToHsl(parsed));
    } else {
      setError('Enter a valid HEX code, e.g. #3366FF');
    }
  }

  function fromRgbField(key, value) {
    onUse?.();
    const num = Math.max(0, Math.min(255, parseInt(value, 10) || 0));
    const next = { ...rgb, [key]: num };
    setRgb(next);
    setHex(rgbToHex(next));
    setHsl(rgbToHsl(next));
    setError(null);
  }

  function fromColorPicker(value) {
    fromHex(value);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', marginBottom: '1.4rem' }}>
        <div
          aria-hidden="true"
          style={{
            width: 64,
            height: 64,
            borderRadius: 8,
            border: '1px solid var(--line)',
            background: error ? 'transparent' : hex
          }}
        />
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(hex) ? hex : '#f5b942'}
          onChange={(e) => fromColorPicker(e.target.value)}
          aria-label="Pick a color visually"
          style={{ width: 48, height: 48, background: 'none', border: '1px solid var(--line)', borderRadius: 6, cursor: 'pointer' }}
        />
      </div>

      <label className="field-label" htmlFor="hex-input">HEX</label>
      <input id="hex-input" type="text" className="field-input" value={hex} onChange={(e) => fromHex(e.target.value)} style={{ marginBottom: '1rem', fontFamily: 'var(--font-mono)' }} />
      {error && <div className="error-box">{error}</div>}

      <label className="field-label">RGB</label>
      <div className="field-row">
        {['r', 'g', 'b'].map((k) => (
          <div key={k}>
            <input type="number" min="0" max="255" className="field-input" value={rgb[k]} onChange={(e) => fromRgbField(k, e.target.value)} />
          </div>
        ))}
      </div>

      <label className="field-label">HSL</label>
      <div className="result-box">
        hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
      </div>

      <div className="copy-row">
        <CopyButton getText={() => hex} label="Copy HEX" />
        <CopyButton getText={() => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} label="Copy RGB" />
        <CopyButton getText={() => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} label="Copy HSL" />
      </div>
    </div>
  );
}
