import { useState, useMemo } from 'react';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const NODES = {
  10: { x: 220, y: 30 }, 5: { x: 120, y: 100 }, 15: { x: 320, y: 100 },
  2: { x: 70, y: 170 }, 7: { x: 170, y: 170 }, 12: { x: 270, y: 170 }, 20: { x: 370, y: 170 },
};
const EDGES = [[10, 5], [10, 15], [5, 2], [5, 7], [15, 12], [15, 20]];

const ORDERS = {
  Preorder: [10, 5, 2, 7, 15, 12, 20],
  Inorder: [2, 5, 7, 10, 12, 15, 20],
  Postorder: [2, 7, 5, 12, 20, 15, 10],
  'Level order': [10, 5, 15, 2, 7, 12, 20],
};

export default function Tree() {
  const [mode, setMode] = useState('Preorder');
  const order = ORDERS[mode];
  const steps = useMemo(() => order.map((v, i) => ({ visited: order.slice(0, i + 1), note: `Visit ${v} — order so far: ${order.slice(0, i + 1).join(' → ')}` })), [mode]);
  const ctrl = useSteps(steps, { speed: 750 });
  const { visited, note } = ctrl.frame;
  const active = visited[visited.length - 1];

  return (
    <div className="viz-shell">
      <div className="viz-stage" style={{ gap: 10 }}>
        <div className="legend" style={{ marginBottom: 4 }}>
          {Object.keys(ORDERS).map((m) => (
            <button key={m} className="pill" onClick={() => setMode(m)}
              style={{ cursor: 'pointer', color: mode === m ? 'var(--amber)' : 'var(--text-faint)', borderColor: mode === m ? 'var(--amber-dim)' : 'var(--line)' }}>
              {m}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 440 200" width="100%" style={{ maxWidth: 440 }}>
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="var(--line)" strokeWidth="1.5" />
          ))}
          {Object.entries(NODES).map(([v, pos]) => {
            const isActive = Number(v) === active;
            const isVisited = visited.includes(Number(v));
            return (
              <g key={v}>
                <circle cx={pos.x} cy={pos.y} r="19"
                  fill={isActive ? 'rgba(245,166,35,0.18)' : isVisited ? 'rgba(94,234,212,0.12)' : 'var(--bg-raised)'}
                  stroke={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--line)'} strokeWidth="1.6" />
                <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700"
                  fill={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--text-dim)'}>{v}</text>
              </g>
            );
          })}
        </svg>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label={mode} />
    </div>
  );
}
