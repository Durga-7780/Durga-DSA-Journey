import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const NODES = {
  root: { x: 220, y: 20, label: '{}' },
  A: { x: 100, y: 90, label: '{A}' },
  B: { x: 340, y: 90, label: '{B}' },
  AB: { x: 100, y: 160, label: '{A,B}' },
};
const EDGES = [['root', 'A'], ['root', 'B'], ['A', 'AB']];

function buildSteps() {
  return [
    { active: 'root', visited: [], note: 'Start with an empty subset.' },
    { active: 'A', visited: ['root'], note: 'Choose A → explore {A}.' },
    { active: 'AB', visited: ['root', 'A'], note: 'Choose B → explore {A, B}.' },
    { active: 'AB', visited: ['root', 'A', 'AB'], note: 'Record {A, B} as a valid subset.' },
    { active: 'A', visited: ['root', 'A'], note: 'No more choices from {A, B} — backtrack to {A}.', backtrack: true },
    { active: 'root', visited: ['root'], note: 'No more choices from {A} — backtrack to {}.', backtrack: true },
    { active: 'B', visited: ['root'], note: 'Try the next branch: choose B → explore {B}.' },
    { active: 'B', visited: ['root', 'B'], note: 'Record {B} as a valid subset. All branches explored.' },
  ];
}

export default function Backtracking() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 950 });
  const { active, visited, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <svg viewBox="0 0 440 190" width="100%" style={{ maxWidth: 400 }}>
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="var(--line)" strokeWidth="1.5" />
          ))}
          {Object.entries(NODES).map(([id, n]) => {
            const isActive = id === active;
            const isVisited = visited.includes(id);
            return (
              <g key={id}>
                <rect x={n.x - 28} y={n.y - 15} width="56" height="30" rx="8"
                  fill={isActive ? 'rgba(201,106,21,0.14)' : isVisited ? 'rgba(15,156,134,0.1)' : 'var(--bg-raised)'}
                  stroke={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--line)'} strokeWidth="1.6" />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700"
                  fill={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--text-dim)'}>{n.label}</text>
              </g>
            );
          })}
        </svg>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Generating subsets of {A, B}" />
    </div>
  );
}
