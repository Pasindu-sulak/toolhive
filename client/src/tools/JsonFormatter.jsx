import React, { useState } from 'react';
import CopyButton from '../components/CopyButton.jsx';

export default function JsonFormatter({ onUse }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  function format() {
    onUse?.();
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  }

  function minify() {
    onUse?.();
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  }

  return (
    <div>
      <label className="field-label" htmlFor="json-input">Raw JSON</label>
      <textarea
        id="json-input"
        className="field-textarea"
        placeholder='{"example": true, "nested": {"a": 1, "b": [1,2,3]}}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem' }}>
        <button type="button" className="btn btn-primary" onClick={format}>Format</button>
        <button type="button" className="btn" onClick={minify}>Minify</button>
      </div>

      {error && <div className="error-box">Invalid JSON: {error}</div>}

      {output && !error && (
        <>
          <div className="result-box" style={{ whiteSpace: 'pre-wrap', maxHeight: 340, overflow: 'auto' }}>{output}</div>
          <CopyButton getText={() => output} />
        </>
      )}
    </div>
  );
}
