import { useMemo, useState } from 'react';

function calculateAgeParts(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  if (Number.isNaN(birthDate.getTime())) {
    return { error: 'Please enter a valid date of birth.' };
  }

  if (birthDate > today) {
    return { error: 'Date of birth cannot be in the future.' };
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, error: '' };
}

function AgeCalculator({ onBack }) {
  const [dateOfBirth, setDateOfBirth] = useState('');

  const result = useMemo(() => {
    if (!dateOfBirth) {
      return null;
    }

    return calculateAgeParts(dateOfBirth);
  }, [dateOfBirth]);

  return (
    <section className="tool-panel">
      <div className="tool-panel-header">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <div>
          <h2>Age Calculator</h2>
          <p>Enter a date of birth to see the exact age today.</p>
        </div>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Date of Birth</span>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
      </div>

      {!dateOfBirth && <p className="helper-text">Choose a birth date to calculate age.</p>}

      {result?.error ? <p className="error-text">{result.error}</p> : null}

      {result && !result.error ? (
        <div className="result-grid">
          <div className="result-card">
            <span className="result-label">Years</span>
            <strong>{result.years}</strong>
          </div>
          <div className="result-card">
            <span className="result-label">Months</span>
            <strong>{result.months}</strong>
          </div>
          <div className="result-card">
            <span className="result-label">Days</span>
            <strong>{result.days}</strong>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default AgeCalculator;
