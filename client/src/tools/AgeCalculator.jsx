import React, { useState } from 'react';

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export default function AgeCalculator({ onUse }) {
  const today = new Date();
  const [birth, setBirth] = useState('');
  const [asOf, setAsOf] = useState(toISODate(today));

  let result = null;
  if (birth) {
    const birthDate = new Date(birth + 'T00:00:00');
    const asOfDate = new Date(asOf + 'T00:00:00');

    if (!Number.isNaN(birthDate.getTime()) && !Number.isNaN(asOfDate.getTime()) && asOfDate >= birthDate) {
      let years = asOfDate.getFullYear() - birthDate.getFullYear();
      let months = asOfDate.getMonth() - birthDate.getMonth();
      let days = asOfDate.getDate() - birthDate.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const totalDays = Math.round((asOfDate - birthDate) / 86400000);

      let nextBirthday = new Date(asOfDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (nextBirthday < asOfDate) nextBirthday = new Date(asOfDate.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
      const daysToNext = Math.round((nextBirthday - asOfDate) / 86400000);

      result = { years, months, days, totalDays, daysToNext };
    }
  }

  return (
    <div>
      <div className="field-row">
        <div>
          <label className="field-label" htmlFor="age-birth">Birth date</label>
          <input
            id="age-birth"
            type="date"
            className="field-input"
            value={birth}
            max={toISODate(today)}
            onChange={(e) => { setBirth(e.target.value); onUse?.(); }}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="age-asof">As of date</label>
          <input id="age-asof" type="date" className="field-input" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
        </div>
      </div>

      {result && (
        <>
          <div className="stat-row">
            <div className="stat"><div className="stat-num">{result.years}</div><div className="stat-label">Years</div></div>
            <div className="stat"><div className="stat-num">{result.months}</div><div className="stat-label">Months</div></div>
            <div className="stat"><div className="stat-num">{result.days}</div><div className="stat-label">Days</div></div>
            <div className="stat"><div className="stat-num">{result.totalDays}</div><div className="stat-label">Total days</div></div>
          </div>
          <div className="result-box">
            {result.daysToNext === 0 ? "It's their birthday today!" : `${result.daysToNext} day${result.daysToNext === 1 ? '' : 's'} until the next birthday.`}
          </div>
        </>
      )}
      {!birth && <p style={{ color: 'var(--text-faint)', fontSize: '0.9rem' }}>Pick a birth date to see the exact age breakdown.</p>}
    </div>
  );
}
