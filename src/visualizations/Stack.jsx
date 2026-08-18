import { AnimatePresence, motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const OPS = [
  { type: 'push', v: 10 }, { type: 'push', v: 20 }, { type: 'push', v: 30 },
  { type: 'pop' }, { type: 'push', v: 40 }, { type: 'pop' },
];

function buildSteps() {
  let stack = [];
  const steps = [{ stack: [], note: 'Empty stack.' }];
  for (const op of OPS) {
    if (op.type === 'push') {
      stack = [...stack, op.v];
      steps.push({ stack, note: `push(${op.v})` });
    } else {
      const top = stack[stack.length - 1];
      stack = stack.slice(0, -1);
      steps.push({ stack, note: `pop() → ${top}` });
    }
  }
  return steps;
}

export default function StackViz() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 800 });
  const { stack, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage" style={{ minHeight: 260 }}>
        <div className="stack-col">
          <AnimatePresence>
            {stack.map((v, i) => (
              <motion.div
                key={i + '-' + v}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className={`block ${i === stack.length - 1 ? 'top' : ''}`}
              >
                {v}
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="pill" style={{ marginTop: 6 }}>base</div>
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="LIFO" />
    </div>
  );
}
