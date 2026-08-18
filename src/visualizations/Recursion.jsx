import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

function buildSteps() {
  const steps = [];
  const calls = [4, 3, 2, 1];
  calls.forEach((n, i) => steps.push({ stack: calls.slice(0, i + 1), note: `Call factorial(${n}) — push onto the stack.` }));
  steps.push({ stack: calls, note: 'factorial(1) hits the base case → returns 1.', ret: 1 });
  let val = 1;
  for (let i = calls.length - 2; i >= 0; i--) {
    val *= calls[i] + 1;
    steps.push({ stack: calls.slice(0, i + 1), note: `factorial(${calls[i]}) returns ${calls[i]} × previous = ${val}`, ret: val, popping: true });
  }
  steps.push({ stack: [], note: `Done. factorial(4) = ${val}`, ret: val });
  return steps;
}

export default function Recursion() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 800 });
  const { stack, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage" style={{ minHeight: 240 }}>
        <div className="stack-col">
          {stack.map((n, i) => (
            <div key={i} className={`block ${i === stack.length - 1 ? 'top' : ''}`} style={{ width: 140 }}>
              factorial({n})
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Recursive call stack" />
    </div>
  );
}
