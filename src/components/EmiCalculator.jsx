import { useMemo, useState } from 'react';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

function EmiCalculator({ onBack }) {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenureYears, setTenureYears] = useState('');

  const result = useMemo(() => {
    if (!loanAmount && !interestRate && !tenureYears) {
      return null;
    }

    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenureYears);

    if (!loanAmount || !interestRate || !tenureYears) {
      return { error: 'Please fill in all fields to calculate EMI.' };
    }

    if (principal <= 0 || annualRate <= 0 || years <= 0) {
      return { error: 'All values must be greater than zero.' };
    }

    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;
    const emi =
      (principal * monthlyRate * (1 + monthlyRate) ** totalMonths) /
      ((1 + monthlyRate) ** totalMonths - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    return {
      monthlyEmi: emi,
      totalPayment,
      totalInterest,
      error: '',
    };
  }, [interestRate, loanAmount, tenureYears]);

  return (
    <section className="tool-panel">
      <div className="tool-panel-header">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <div>
          <h2>EMI Calculator</h2>
          <p>Estimate monthly installment amounts for a loan.</p>
        </div>
      </div>

      <div className="form-grid form-grid-three">
        <label className="field">
          <span>Loan Amount</span>
          <input
            type="number"
            min="0"
            placeholder="Enter loan amount"
            value={loanAmount}
            onChange={(event) => setLoanAmount(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Interest Rate (% per year)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter annual interest"
            value={interestRate}
            onChange={(event) => setInterestRate(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Tenure (Years)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="Enter loan tenure"
            value={tenureYears}
            onChange={(event) => setTenureYears(event.target.value)}
          />
        </label>
      </div>

      {!result && <p className="helper-text">Enter loan details to view EMI results in real time.</p>}

      {result?.error ? <p className="error-text">{result.error}</p> : null}

      {result && !result.error ? (
        <div className="result-grid">
          <div className="result-card">
            <span className="result-label">Monthly EMI</span>
            <strong>{formatCurrency(result.monthlyEmi)}</strong>
          </div>
          <div className="result-card">
            <span className="result-label">Total Payment</span>
            <strong>{formatCurrency(result.totalPayment)}</strong>
          </div>
          <div className="result-card">
            <span className="result-label">Total Interest</span>
            <strong>{formatCurrency(result.totalInterest)}</strong>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default EmiCalculator;
