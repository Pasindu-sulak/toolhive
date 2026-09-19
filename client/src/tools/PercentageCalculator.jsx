import React, { useState } from 'react';

const TABS = [
  { id: 'of', label: '% of a number' },
  { id: 'isWhatPercent', label: 'X is what % of Y' },
  { id: 'change', label: 'Increase / Decrease' }
];

export default function PercentageCalculator({ onUse }) {
  const [tab, setTab] = useState('of');

  const [pct, setPct] = useState('20');
  const [ofNum, setOfNum] = useState('150');

  const [x, setX] = useState('25');
  const [y, setY] = useState('200');

  const [from, setFrom] = useState('80');
  const [to, setTo] = useState('100');

  function handleFirstInput() {
    onUse?.();
  }

  let result = null;
  if (tab === 'of' && pct !== '' && ofNum !== '') {
    const val = (parseFloat(pct) / 100) * parseFloat(ofNum);
    if (!Number.isNaN(val)) result = `${pct}% of ${ofNum} is ${round(val)}`;
  } else if (tab === 'isWhatPercent' && x !== '' && y !== '' && parseFloat(y) !== 0) {
    const val = (parseFloat(x) / parseFloat(y)) * 100;
    if (!Number.isNaN(val)) result = `${x} is ${round(val)}% of ${y}`;
  } else if (tab === 'change' && from !== '' && to !== '' && parseFloat(from) !== 0) {
    const f = parseFloat(from);
    const t = parseFloat(to);
    const val = ((t - f) / f) * 100;
    if (!Number.isNaN(val)) {
      const dir = val >= 0 ? 'increase' : 'decrease';
      result = `That's a ${round(Math.abs(val))}% ${dir} from ${from} to ${to}`;
    }
  }

  return (
    <div>
      <div className="tab-row" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`tab-btn ${tab === t.id ? 'active' : ''}`}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'of' && (
        <div className="field-row">
          <div>
            <label className="field-label" htmlFor="pc-pct">Percentage</label>
            <input id="pc-pct" type="number" className="field-input" value={pct} onChange={(e) => { setPct(e.target.value); handleFirstInput(); }} />
          </div>
          <div>
            <label className="field-label" htmlFor="pc-of">Of number</label>
            <input id="pc-of" type="number" className="field-input" value={ofNum} onChange={(e) => { setOfNum(e.target.value); handleFirstInput(); }} />
          </div>
        </div>
      )}

      {tab === 'isWhatPercent' && (
        <div className="field-row">
          <div>
            <label className="field-label" htmlFor="pc-x">X</label>
            <input id="pc-x" type="number" className="field-input" value={x} onChange={(e) => { setX(e.target.value); handleFirstInput(); }} />
          </div>
          <div>
            <label className="field-label" htmlFor="pc-y">Y</label>
            <input id="pc-y" type="number" className="field-input" value={y} onChange={(e) => { setY(e.target.value); handleFirstInput(); }} />
          </div>
        </div>
      )}

      {tab === 'change' && (
        <div className="field-row">
          <div>
            <label className="field-label" htmlFor="pc-from">From</label>
            <input id="pc-from" type="number" className="field-input" value={from} onChange={(e) => { setFrom(e.target.value); handleFirstInput(); }} />
          </div>
          <div>
            <label className="field-label" htmlFor="pc-to">To</label>
            <input id="pc-to" type="number" className="field-input" value={to} onChange={(e) => { setTo(e.target.value); handleFirstInput(); }} />
          </div>
        </div>
      )}

      {result && <div className="result-box">{result}</div>}
    </div>
  );
}

function round(n) {
  return Math.round(n * 100) / 100;
}
