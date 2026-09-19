import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

export default function QrCodeGenerator({ onUse }) {
  const [text, setText] = useState('https://example.com');
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!text.trim()) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      return;
    }
    QRCode.toCanvas(canvasRef.current, text, { width: 240, margin: 1, color: { dark: '#12140f', light: '#f1eee4' } }, (err) => {
      setError(err ? 'Could not generate a QR code for this input.' : null);
    });
  }, [text]);

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'toolhive-qr-code.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }

  return (
    <div>
      <label className="field-label" htmlFor="qr-input">Text or URL</label>
      <textarea
        id="qr-input"
        className="field-textarea"
        style={{ minHeight: 90, fontFamily: 'var(--font-body)' }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.length === 1) onUse?.();
        }}
        placeholder="https://your-link.com or any text"
      />
      {error && <div className="error-box">{error}</div>}

      <div style={{ display: 'flex', justifyContent: 'center', margin: '1.4rem 0', background: 'var(--bg-elevated)', border: '1px solid var(--line)', borderRadius: 8, padding: '1.2rem' }}>
        <canvas ref={canvasRef} width={240} height={240} />
      </div>

      <button type="button" className="btn btn-primary" onClick={download} disabled={!text.trim()}>
        Download PNG
      </button>
    </div>
  );
}
