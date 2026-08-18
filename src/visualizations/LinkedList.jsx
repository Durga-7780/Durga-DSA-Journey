import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const DATA = [10, 20, 30, 40];

function buildSteps() {
  const steps = [{ at: -1, note: 'Traversal starts at the head.' }];
  DATA.forEach((v, i) => steps.push({ at: i, note: `Visit node with value ${v}${i === DATA.length - 1 ? ' → next is NULL' : ` → follow pointer to node ${DATA[i + 1]}`}` }));
  return steps;
}

export default function LinkedList() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 750 });
  const { at, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {DATA.map((v, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div className={`node-circle ${idx === at ? 'active' : idx < at ? 'visited' : ''}`}>{v}</div>
              <span style={{ color: idx <= at ? 'var(--cyan)' : 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>→</span>
            </div>
          ))}
          <span className="pill">NULL</span>
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Singly linked list traversal" />
    </div>
  );
}
