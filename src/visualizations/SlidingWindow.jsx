import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const DATA = [2, 1, 5, 1, 3, 2];
const K = 3;

function buildSteps() {
  const steps = [];
  let sum = 0;
  for (let i = 0; i < K; i++) sum += DATA[i];
  let best = sum;
  steps.push({ l: 0, r: K - 1, sum, best, note: `Initial window [0..${K - 1}], sum = ${sum}` });
  for (let r = K; r < DATA.length; r++) {
    const l = r - K + 1;
    sum += DATA[r] - DATA[r - K];
    best = Math.max(best, sum);
    steps.push({ l, r, sum, best, note: `Slide: +${DATA[r]}  −${DATA[r - K]}  → sum = ${sum}` });
  }
  steps.push({ l: DATA.length - K, r: DATA.length - 1, sum, best, note: `Done. Max window sum = ${best}`, done: true });
  return steps;
}

export default function SlidingWindow() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 900 });
  const { l, r, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="arr-row">
          {DATA.map((v, idx) => (
            <div className="arr-col" key={idx}>
              <div className={`arr-cell ${idx >= l && idx <= r ? 'active' : 'dim'}`}>{v}</div>
              <div className="arr-idx">{idx}</div>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label={`Fixed window size k = ${K}`} />
    </div>
  );
}
