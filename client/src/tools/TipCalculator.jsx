import React, { useState } from 'react';

const PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator({ onUse }) {
  const [bill, setBill] = useState('64.00');
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(2);

  const billNum = parseFloat(bill) || 0;
  const tip = billNum * (tipPct / 100);
  const total = billNum + tip;
  const perPerson = total / Math.max(parseInt(people, 10) || 1, 1);
  const tipPerPerson = tip / Math.max(parseInt(people, 10) || 1, 1);

  return (
    <div>
      <div className="field-row">
        <div>
          <label className="field-label" htmlFor="tip-bill">Bill total</label>
          <input
            id="tip-bill"
            type="number"
            min="0"
            step="0.01"
            className="field-input"
            value={bill}
            onChange={(e) => { setBill(e.target.value); onUse?.(); }}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="tip-people">Split between</label>
          <input
            id="tip-people"
            type="number"
            min="1"
            className="field-input"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
      </div>

      <label className="field-label">Tip percentage — {tipPct}%</label>
      <div className="chip-row" style={{ marginBottom: '0.6rem' }}>
        {PRESETS.map((p) => (
          <button key={p} type="button" className={`chip ${tipPct === p ? 'active' : ''}`} onClick={() => setTipPct(p)} style={{ cursor: 'pointer', background: 'none' }}>
            {p}%
          </button>
        ))}
      </div>
      <input
        type="range"
        min="0"
        max="40"
        value={tipPct}
        onChange={(e) => setTipPct(parseInt(e.target.value, 10))}
        style={{ width: '100%', accentColor: 'var(--honey)' }}
      />

      <div className="stat-row">
        <div className="stat"><div className="stat-num">${tip.toFixed(2)}</div><div className="stat-label">Total tip</div></div>
        <div className="stat"><div className="stat-num">${total.toFixed(2)}</div><div className="stat-label">Total bill</div></div>
        <div className="stat"><div className="stat-num">${perPerson.toFixed(2)}</div><div className="stat-label">Per person</div></div>
        <div className="stat"><div className="stat-num">${tipPerPerson.toFixed(2)}</div><div className="stat-label">Tip / person</div></div>
      </div>
    </div>
  );
}
