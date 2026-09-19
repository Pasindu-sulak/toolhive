import React, { useState } from 'react';

const CATEGORIES = [
  { max: 18.5, label: 'Underweight' },
  { max: 25, label: 'Normal weight' },
  { max: 30, label: 'Overweight' },
  { max: Infinity, label: 'Obese' }
];

function categoryFor(bmi) {
  return CATEGORIES.find((c) => bmi < c.max)?.label || 'Unknown';
}

export default function BmiCalculator({ onUse }) {
  const [units, setUnits] = useState('metric');
  const [cm, setCm] = useState('170');
  const [kg, setKg] = useState('68');
  const [ft, setFt] = useState('5');
  const [inch, setInch] = useState('7');
  const [lb, setLb] = useState('150');

  function handleFirstInput() {
    onUse?.();
  }

  let heightM, weightKg;
  if (units === 'metric') {
    heightM = parseFloat(cm) / 100;
    weightKg = parseFloat(kg);
  } else {
    const totalInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
    heightM = totalInches * 0.0254;
    weightKg = (parseFloat(lb) || 0) * 0.453592;
  }

  let bmi = null;
  if (heightM > 0 && weightKg > 0) {
    bmi = weightKg / (heightM * heightM);
  }

  return (
    <div>
      <div className="tab-row" role="tablist">
        <button type="button" className={`tab-btn ${units === 'metric' ? 'active' : ''}`} onClick={() => setUnits('metric')}>Metric (cm / kg)</button>
        <button type="button" className={`tab-btn ${units === 'imperial' ? 'active' : ''}`} onClick={() => setUnits('imperial')}>Imperial (ft-in / lb)</button>
      </div>

      {units === 'metric' ? (
        <div className="field-row">
          <div>
            <label className="field-label" htmlFor="bmi-cm">Height (cm)</label>
            <input id="bmi-cm" type="number" className="field-input" value={cm} onChange={(e) => { setCm(e.target.value); handleFirstInput(); }} />
          </div>
          <div>
            <label className="field-label" htmlFor="bmi-kg">Weight (kg)</label>
            <input id="bmi-kg" type="number" className="field-input" value={kg} onChange={(e) => { setKg(e.target.value); handleFirstInput(); }} />
          </div>
        </div>
      ) : (
        <div className="field-row">
          <div>
            <label className="field-label" htmlFor="bmi-ft">Height (ft)</label>
            <input id="bmi-ft" type="number" className="field-input" value={ft} onChange={(e) => { setFt(e.target.value); handleFirstInput(); }} />
          </div>
          <div>
            <label className="field-label" htmlFor="bmi-in">Height (in)</label>
            <input id="bmi-in" type="number" className="field-input" value={inch} onChange={(e) => { setInch(e.target.value); handleFirstInput(); }} />
          </div>
          <div>
            <label className="field-label" htmlFor="bmi-lb">Weight (lb)</label>
            <input id="bmi-lb" type="number" className="field-input" value={lb} onChange={(e) => { setLb(e.target.value); handleFirstInput(); }} />
          </div>
        </div>
      )}

      {bmi && Number.isFinite(bmi) && (
        <div className="stat-row">
          <div className="stat">
            <div className="stat-num">{bmi.toFixed(1)}</div>
            <div className="stat-label">BMI</div>
          </div>
          <div className="stat">
            <div className="stat-num" style={{ fontSize: '1.1rem' }}>{categoryFor(bmi)}</div>
            <div className="stat-label">Category</div>
          </div>
        </div>
      )}
      <p style={{ fontSize: '0.82rem', color: 'var(--text-faint)', marginTop: '1rem' }}>
        For general information only — not medical advice.
      </p>
    </div>
  );
}
