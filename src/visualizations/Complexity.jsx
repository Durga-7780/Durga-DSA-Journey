import { useState } from 'react';
import { motion } from 'framer-motion';
import './viz.css';

const CURVES = [
  { id: 'o1', label: 'O(1)', color: '#5eead4', fn: () => 1, meaning: 'Constant — same cost no matter the input size.', example: 'Array index access, hash map lookup.' },
  { id: 'olog', label: 'O(log n)', color: '#8fd3c7', fn: (n) => Math.log2(n + 1), meaning: 'Shrinks the problem by a fraction each step.', example: 'Binary search, balanced BST operations.' },
  { id: 'on', label: 'O(n)', color: '#f5a623', fn: (n) => n, meaning: 'Grows in direct proportion to input size.', example: 'Single pass over an array, linear search.' },
  { id: 'onlogn', label: 'O(n log n)', color: '#e08a1e', fn: (n) => n * Math.log2(n + 1) / 6, meaning: 'A linear pass repeated log n times.', example: 'Merge sort, quick sort, heap sort.' },
  { id: 'on2', label: 'O(n²)', color: '#f2665e', fn: (n) => (n * n) / 12, meaning: 'Nested loop over the same input.', example: 'Bubble sort, naive pair-checking.' },
  { id: 'o2n', label: 'O(2ⁿ)', color: '#b34a44', fn: (n) => Math.pow(1.35, n) / 3, meaning: 'Doubles with every additional element.', example: 'Naive recursive subsets, brute-force Fibonacci.' },
];

const W = 480, H = 220, N = 60;

function pathFor(fn, maxVal) {
  let d = '';
  for (let n = 0; n <= N; n++) {
    const x = (n / N) * (W - 40) + 30;
    const raw = Math.min(fn(n), maxVal);
    const y = H - 20 - (raw / maxVal) * (H - 40);
    d += (n === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
  }
  return d;
}

export default function Complexity() {
  const [hover, setHover] = useState('on2');
  const maxVal = Math.max(...CURVES.map((c) => c.fn(N)));
  const active = CURVES.find((c) => c.id === hover);

  return (
    <div className="viz-shell">
      <div className="viz-stage" style={{ minHeight: 320 }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 520 }}>
          <line x1="30" y1={H - 20} x2={W - 10} y2={H - 20} stroke="var(--line)" strokeWidth="1" />
          <line x1="30" y1="10" x2="30" y2={H - 20} stroke="var(--line)" strokeWidth="1" />
          <text x={W - 14} y={H - 6} fontSize="10" fill="var(--text-faint)" fontFamily="var(--font-mono)" textAnchor="end">n →</text>
          {CURVES.map((c) => (
            <motion.path
              key={c.id}
              d={pathFor(c.fn, maxVal)}
              fill="none"
              stroke={c.color}
              strokeWidth={hover === c.id ? 3 : 1.5}
              opacity={hover === c.id ? 1 : 0.35}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              onMouseEnter={() => setHover(c.id)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </svg>

        <div className="legend" role="list">
          {CURVES.map((c) => (
            <span
              key={c.id}
              role="listitem"
              tabIndex={0}
              onMouseEnter={() => setHover(c.id)}
              onFocus={() => setHover(c.id)}
              style={{ cursor: 'pointer', color: hover === c.id ? c.color : 'var(--text-faint)', fontWeight: hover === c.id ? 700 : 400 }}
            >
              <i style={{ background: c.color }} />{c.label}
            </span>
          ))}
        </div>

        {active && (
          <div className="viz-note" style={{ maxWidth: 420 }}>
            <b>{active.label}</b> — {active.meaning}<br />
            <span style={{ color: 'var(--text-faint)' }}>{active.example}</span>
          </div>
        )}
      </div>
    </div>
  );
}
