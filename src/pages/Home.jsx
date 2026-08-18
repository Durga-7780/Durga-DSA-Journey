import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const HERO_NODES = [
  { id: 'array', label: 'Array', desc: 'Contiguous, indexed memory.', x: 14, y: 68, delay: 0 },
  { id: 'tree', label: 'Tree', desc: 'Hierarchical branching structure.', x: 40, y: 22, delay: 0.6 },
  { id: 'graph', label: 'Graph', desc: 'Nodes and relationships.', x: 68, y: 60, delay: 1.2 },
  { id: 'algo', label: 'Algorithms', desc: 'The logic that moves through it all.', x: 88, y: 20, delay: 1.8 },
];
const HERO_EDGES = [['array', 'tree'], ['tree', 'graph'], ['graph', 'algo']];
const byId = (id) => HERO_NODES.find((n) => n.id === id);

export default function Home() {
  const [hover, setHover] = useState(null);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Beginner → Advanced · 26-stage roadmap</span>
          <h1 className="hero-title">Master DSA<br />Visually</h1>
          <p className="hero-sub">
            Learn Data Structures and Algorithms from basics to advanced through interactive
            visualizations, step-by-step animations, Python examples, and problem-solving patterns.
          </p>
          <div className="hero-actions">
            <Link to="/topic/complexity" className="btn btn-primary">Start Learning</Link>
            <Link to="/roadmap" className="btn btn-ghost">Explore Roadmap</Link>
          </div>
        </div>

        <div className="hero-graph" aria-hidden={false}>
          <svg className="hero-graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {HERO_EDGES.map(([a, b], i) => {
              const na = byId(a), nb = byId(b);
              const lit = hover === a || hover === b;
              return (
                <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={lit ? 'var(--cyan)' : 'var(--line)'} strokeWidth={lit ? 0.5 : 0.3} vectorEffect="non-scaling-stroke" />
              );
            })}
          </svg>
          {HERO_NODES.map((n) => (
            <motion.div
              key={n.id}
              className={`hero-node ${hover === n.id ? 'active' : ''}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              tabIndex={0}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
            >
              <span className="hero-node-dot" />
              <span className="hero-node-label">{n.label}</span>
              {hover === n.id && <span className="hero-node-tip">{n.desc}</span>}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="home-strip">
        <div className="home-strip-item">
          <span className="home-strip-num">26</span>
          <span className="home-strip-label">roadmap stages</span>
        </div>
        <div className="home-strip-item">
          <span className="home-strip-num">14+</span>
          <span className="home-strip-label">interactive visualizations</span>
        </div>
        <div className="home-strip-item">
          <span className="home-strip-num">0</span>
          <span className="home-strip-label">code execution — pure visual learning</span>
        </div>
      </section>

      <section className="home-sequence">
        <span className="eyebrow">The learning sequence</span>
        <div className="sequence-row">
          {['Visual', 'Explanation', 'Animation', 'Code', 'Complexity', 'Practice'].map((s, i, arr) => (
            <div className="sequence-step" key={s}>
              <span>{s}</span>
              {i < arr.length - 1 && <span className="sequence-arrow">→</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
