import { useMemo, useState } from 'react';

function toCapitalizedText(value) {
  return value.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function TextTools({ onBack }) {
  const [text, setText] = useState('');

  const transformed = useMemo(
    () => ({
      uppercase: text.toUpperCase(),
      lowercase: text.toLowerCase(),
      capitalized: toCapitalizedText(text),
    }),
    [text],
  );

  return (
    <section className="tool-panel">
      <div className="tool-panel-header">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <div>
          <h2>Text Case Converter</h2>
          <p>Change text case instantly using built-in browser logic.</p>
        </div>
      </div>

      <label className="field">
        <span>Input Text</span>
        <textarea
          rows="8"
          placeholder="Enter text to convert..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>

      <div className="case-grid">
        <div className="case-card">
          <h3>Uppercase</h3>
          <p>{transformed.uppercase || 'Your converted text will appear here.'}</p>
        </div>
        <div className="case-card">
          <h3>Lowercase</h3>
          <p>{transformed.lowercase || 'Your converted text will appear here.'}</p>
        </div>
        <div className="case-card">
          <h3>Capitalized</h3>
          <p>{transformed.capitalized || 'Your converted text will appear here.'}</p>
        </div>
      </div>
    </section>
  );
}

export default TextTools;
