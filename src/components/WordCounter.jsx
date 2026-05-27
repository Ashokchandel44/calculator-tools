import { useMemo, useState } from 'react';

function WordCounter({ onBack }) {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;

    return { words, characters };
  }, [text]);

  return (
    <section className="tool-panel">
      <div className="tool-panel-header">
        <button type="button" className="back-button" onClick={onBack}>
          Back
        </button>
        <div>
          <h2>Word Counter</h2>
          <p>Type or paste text and get live word and character counts.</p>
        </div>
      </div>

      <label className="field">
        <span>Your Text</span>
        <textarea
          rows="10"
          placeholder="Start typing here..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>

      <div className="result-grid">
        <div className="result-card">
          <span className="result-label">Word Count</span>
          <strong>{stats.words}</strong>
        </div>
        <div className="result-card">
          <span className="result-label">Character Count</span>
          <strong>{stats.characters}</strong>
        </div>
      </div>
    </section>
  );
}

export default WordCounter;
