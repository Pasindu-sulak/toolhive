import React, { useEffect, useState } from 'react';
import CopyButton from '../components/CopyButton.jsx';

function toISODateTimeLocal(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function TimestampConverter({ onUse }) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [unit, setUnit] = useState('seconds');
  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState(toISODateTimeLocal(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  let tsResult = null;
  if (tsInput !== '') {
    const raw = parseFloat(tsInput);
    if (!Number.isNaN(raw)) {
      const ms = unit === 'milliseconds' ? raw : raw * 1000;
      const d = new Date(ms);
      if (!Number.isNaN(d.getTime())) {
        tsResult = { utc: d.toUTCString(), local: d.toString() };
      }
    }
  }

  let dateResult = null;
  if (dateInput) {
    const d = new Date(dateInput);
    if (!Number.isNaN(d.getTime())) {
      const seconds = Math.floor(d.getTime() / 1000);
      dateResult = { seconds, milliseconds: d.getTime() };
    }
  }

  return (
    <div>
      <div className="result-box" style={{ marginBottom: '1.4rem' }}>
        Current Unix timestamp: <strong>{now}</strong> seconds
      </div>

      <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Timestamp → Date</h3>
      <div className="field-row">
        <div>
          <label className="field-label" htmlFor="ts-input">Unix timestamp</label>
          <input
            id="ts-input"
            type="number"
            className="field-input"
            placeholder="e.g. 1732492800"
            value={tsInput}
            onChange={(e) => { setTsInput(e.target.value); onUse?.(); }}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="ts-unit">Unit</label>
          <select id="ts-unit" className="field-select" value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select>
        </div>
      </div>
      {tsResult && (
        <div className="result-box">
          UTC: {tsResult.utc}
          <br />
          Local: {tsResult.local}
        </div>
      )}

      <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '1.6rem' }}>Date → Timestamp</h3>
      <label className="field-label" htmlFor="date-input">Date &amp; time (your local timezone)</label>
      <input
        id="date-input"
        type="datetime-local"
        step="1"
        className="field-input"
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
      />
      {dateResult && (
        <div className="result-box">
          Seconds: {dateResult.seconds} · Milliseconds: {dateResult.milliseconds}
          <CopyButton getText={() => String(dateResult.seconds)} label="Copy seconds" />
        </div>
      )}
    </div>
  );
}
