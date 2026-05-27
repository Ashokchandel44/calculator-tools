import { useMemo, useState } from 'react';

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

function DateDiff({ onBack }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const result = useMemo(() => {
    if (!startDate && !endDate) {
      return null;
    }

    if (!startDate || !endDate) {
      return { error: 'Please select both dates.' };
    }

    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);

    if (Number.isNaN(firstDate.getTime()) || Number.isNaN(secondDate.getTime())) {
      return { error: 'Please choose valid dates.' };
    }

    const difference = Math.abs(secondDate - firstDate);
    const days = Math.floor(difference / MILLISECONDS_IN_A_DAY);

    return { days, error: '' };
  }, [endDate, startDate]);

  return (
    <section className="tool-panel">
      <div className="tool-panel-header">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <div>
          <h2>Days Between Dates</h2>
          <p>Select any two dates to find the total number of days between them.</p>
        </div>
      </div>

      <div className="form-grid form-grid-two">
        <label className="field">
          <span>Start Date</span>
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </label>

        <label className="field">
          <span>End Date</span>
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
      </div>

      {!result && <p className="helper-text">Choose two dates to calculate the difference.</p>}

      {result?.error ? <p className="error-text">{result.error}</p> : null}

      {result && !result.error ? (
        <div className="result-grid">
          <div className="result-card single-result">
            <span className="result-label">Total Days</span>
            <strong>{result.days}</strong>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default DateDiff;
