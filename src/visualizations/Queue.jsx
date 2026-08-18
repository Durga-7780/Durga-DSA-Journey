import { AnimatePresence, motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const OPS = [
  { type: 'enqueue', v: 10 }, { type: 'enqueue', v: 20 }, { type: 'enqueue', v: 30 },
  { type: 'dequeue' }, { type: 'enqueue', v: 40 }, { type: 'dequeue' },
];

function buildSteps() {
  let q = [];
  const steps = [{ q: [], note: 'Empty queue.' }];
  for (const op of OPS) {
    if (op.type === 'enqueue') {
      q = [...q, op.v];
      steps.push({ q, note: `enqueue(${op.v})` });
    } else {
      const front = q[0];
      q = q.slice(1);
      steps.push({ q, note: `dequeue() → ${front}` });
    }
  }
  return steps;
}

export default function QueueViz() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 800 });
  const { q, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="pill">IN →</span>
          <div className="queue-row">
            <AnimatePresence initial={false}>
              {q.map((v, i) => (
                <motion.div
                  key={i + '-' + v}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`block ${i === 0 ? 'top' : ''}`}
                >
                  {v}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <span className="pill">→ OUT</span>
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="FIFO" />
    </div>
  );
}
