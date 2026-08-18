import { PATTERNS } from '../data/patterns.js';
import './Patterns.css';

export default function Patterns() {
  return (
    <div className="patterns-page">
      <span className="eyebrow">DSA Pattern Recognition</span>
      <h1>Stop guessing. Recognize the pattern.</h1>
      <p style={{ maxWidth: 600, marginTop: 10 }}>
        Most interview problems are one of a small set of recurring patterns wearing a different costume.
        Learn to recognize the signal, and the algorithm follows.
      </p>

      <div className="pattern-grid">
        {PATTERNS.map((p) => (
          <div className="pattern-card panel" key={p.id}>
            <h3>{p.title}</h3>
            <div className="pattern-field">
              <span className="pattern-field-label">Recognize it by</span>
              <p>{p.recognize}</p>
            </div>
            <div className="pattern-field">
              <span className="pattern-field-label">Common problems</span>
              <p>{p.examples}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
