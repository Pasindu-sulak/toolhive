import React, { useMemo, useState } from 'react';

export default function WordCounter({ onUse }) {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (trimmed ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
    const readingMinutes = words > 0 ? Math.max(1, Math.round(words / 200)) : 0;
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingMinutes };
  }, [text]);

  return (
    <div>
      <label className="field-label" htmlFor="wc-input">Your text</label>
      <textarea
        id="wc-input"
        className="field-textarea"
        placeholder="Paste or type your text here…"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.length === 1) onUse?.();
        }}
        style={{ fontFamily: 'var(--font-body)' }}
      />
      <div className="stat-row">
        <div className="stat"><div className="stat-num">{stats.words}</div><div className="stat-label">Words</div></div>
        <div className="stat"><div className="stat-num">{stats.chars}</div><div className="stat-label">Characters</div></div>
        <div className="stat"><div className="stat-num">{stats.charsNoSpaces}</div><div className="stat-label">No spaces</div></div>
        <div className="stat"><div className="stat-num">{stats.sentences}</div><div className="stat-label">Sentences</div></div>
        <div className="stat"><div className="stat-num">{stats.paragraphs}</div><div className="stat-label">Paragraphs</div></div>
        <div className="stat"><div className="stat-num">{stats.readingMinutes}</div><div className="stat-label">Min read</div></div>
      </div>
    </div>
  );
}
