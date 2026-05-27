import { useState } from 'react';
import AgeCalculator from './components/AgeCalculator';
import EmiCalculator from './components/EmiCalculator';
import WordCounter from './components/WordCounter';
import TextTools from './components/TextTools';
import DateDiff from './components/DateDiff';

const tools = [
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Find the exact age in years, months, and days from a date of birth.',
  },
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate monthly EMI, total payment, and total interest for a loan.',
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words and characters instantly while typing.',
  },
  {
    id: 'text-tools',
    title: 'Text Case Converter',
    description: 'Convert text to uppercase, lowercase, or capitalized format.',
  },
  {
    id: 'date-diff',
    title: 'Days Between Dates',
    description: 'Check the total number of days between any two dates.',
  },
];

function App() {
  const [activeTool, setActiveTool] = useState('');

  const renderTool = () => {
    switch (activeTool) {
      case 'age-calculator':
        return <AgeCalculator onBack={() => setActiveTool('')} />;
      case 'emi-calculator':
        return <EmiCalculator onBack={() => setActiveTool('')} />;
      case 'word-counter':
        return <WordCounter onBack={() => setActiveTool('')} />;
      case 'text-tools':
        return <TextTools onBack={() => setActiveTool('')} />;
      case 'date-diff':
        return <DateDiff onBack={() => setActiveTool('')} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <nav className="top-nav">
          <button type="button" className="brand-button" onClick={() => setActiveTool('')}>
            Problem Solving Tools
          </button>
          <div className="nav-actions">
            {tools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                className={`nav-chip ${activeTool === tool.id ? 'active' : ''}`}
                onClick={() => setActiveTool(tool.id)}
              >
                {tool.title}
              </button>
            ))}
          </div>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">Daily Utility Website</p>
          <h1>Solve small everyday problems quickly.</h1>
          <p className="hero-text">
            Use practical tools for age calculation, loan planning, text editing, and date
            differences in one lightweight static React app.
          </p>
        </div>
      </header>

      <main className="main-content">
        {activeTool ? (
          renderTool()
        ) : (
          <section className="tool-grid-section">
            <div className="section-heading">
              <h2>Available Tools</h2>
              <p>Choose a tool below. Everything runs instantly in your browser.</p>
            </div>

            <div className="tool-grid">
              {tools.map((tool) => (
                <article key={tool.id} className="tool-card">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <button type="button" className="primary-button" onClick={() => setActiveTool(tool.id)}>
                    Open Tool
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
