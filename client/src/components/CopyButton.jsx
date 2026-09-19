import React, { useState } from 'react';

export default function CopyButton({ getText, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = typeof getText === 'function' ? getText() : getText;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers without clipboard API permission
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <span className="copy-row">
      <button type="button" className="btn" onClick={handleCopy}>{label}</button>
      {copied && <span className="copy-feedback">Copied!</span>}
    </span>
  );
}
