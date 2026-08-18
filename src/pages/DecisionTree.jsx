import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DECISION_TREE, PATTERNS } from '../data/patterns.js';
import './DecisionTree.css';

export default function DecisionTree() {
  const [path, setPath] = useState([]); // array of { label, node }

  const current = path.reduce((node, step) => step.node, DECISION_TREE);
  const isLeaf = !!current.leaf;
  const pattern = isLeaf ? PATTERNS.find((p) => p.id === current.leaf) : null;

  return (
    <div className="dtree-page">
      <span className="eyebrow">Recognize the algorithm</span>
      <h1>What does the problem give you?</h1>
      <p style={{ maxWidth: 560, marginTop: 10 }}>
        Answer a few questions about the problem in front of you and land on the pattern that fits.
      </p>

      <div className="dtree-breadcrumb">
        <button className="pill" onClick={() => setPath([])}>Start over</button>
        {path.map((step, i) => (
          <span key={i} className="pill">{step.label}</span>
        ))}
      </div>

      <div className="dtree-panel panel">
        {!isLeaf ? (
          <>
            <h3 className="dtree-question">{current.q}</h3>
            <div className="dtree-options">
              {current.branches.map((b) => (
                <button key={b.label} className="dtree-option" onClick={() => setPath([...path, { label: b.label, node: b.node }])}>
                  {b.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="dtree-result">
            <span className="eyebrow">Suggested pattern</span>
            <h2>{current.note}</h2>
            {pattern && (
              <>
                <p style={{ marginTop: 12 }}>{pattern.recognize}</p>
                <p style={{ marginTop: 6, color: 'var(--text-faint)' }}>e.g. {pattern.examples}</p>
              </>
            )}
            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setPath([])}>Try another problem</button>
              <Link to="/patterns" className="btn btn-primary">See all patterns</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
