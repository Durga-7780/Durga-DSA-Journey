import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

// Insert sequence 8,3,10,1,6 into a BST, one node at a time
const SEQUENCE = [8, 3, 10, 1, 6];
const POS = { 8: { x: 220, y: 24 }, 3: { x: 130, y: 90 }, 10: { x: 320, y: 90 }, 1: { x: 80, y: 156 }, 6: { x: 180, y: 156 } };
const EDGES = [[8, 3], [8, 10], [3, 1], [3, 6]];

function buildSteps() {
  const steps = [];
  for (let i = 0; i < SEQUENCE.length; i++) {
    const inserted = SEQUENCE.slice(0, i + 1);
    steps.push({ inserted, active: SEQUENCE[i], note: `Insert ${SEQUENCE[i]} — go left if smaller, right if larger than each node.` });
  }
  steps.push({ inserted: SEQUENCE, active: -1, note: 'BST complete — inorder traversal now yields sorted order: 1, 3, 6, 8, 10.' });
  return steps;
}

export default function BST() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 900 });
  const { inserted, active, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <svg viewBox="0 0 400 190" width="100%" style={{ maxWidth: 400 }}>
          {EDGES.map(([a, b], i) => (inserted.includes(a) && inserted.includes(b)) && (
            <line key={i} x1={POS[a].x} y1={POS[a].y} x2={POS[b].x} y2={POS[b].y} stroke="var(--line)" strokeWidth="1.5" />
          ))}
          {inserted.map((v) => {
            const isActive = v === active;
            const p = POS[v];
            return (
              <g key={v}>
                <circle cx={p.x} cy={p.y} r="19"
                  fill={isActive ? 'rgba(201,106,21,0.14)' : 'rgba(15,156,134,0.08)'}
                  stroke={isActive ? 'var(--amber)' : 'var(--cyan)'} strokeWidth="1.6" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700"
                  fill={isActive ? 'var(--amber)' : 'var(--cyan)'}>{v}</text>
              </g>
            );
          })}
        </svg>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Inserting 8, 3, 10, 1, 6" />
    </div>
  );
}
