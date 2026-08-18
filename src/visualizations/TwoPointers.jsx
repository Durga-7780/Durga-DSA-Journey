import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const DATA = [1, 3, 4, 6, 8, 11, 15];
const TARGET = 14;

function buildSteps() {
  const steps = [];
  let l = 0, r = DATA.length - 1;
  steps.push({ l, r, note: `Looking for two numbers that sum to ${TARGET}.` });
  while (l < r) {
    const sum = DATA[l] + DATA[r];
    if (sum === TARGET) {
      steps.push({ l, r, note: `arr[${l}]+arr[${r}] = ${sum} — match!`, match: true });
      break;
    } else if (sum < TARGET) {
      steps.push({ l, r, note: `arr[${l}]+arr[${r}] = ${sum} < ${TARGET} → move L right` });
      l++;
    } else {
      steps.push({ l, r, note: `arr[${l}]+arr[${r}] = ${sum} > ${TARGET} → move R left` });
      r--;
    }
  }
  return steps;
}

export default function TwoPointers() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 900 });
  const { l, r, note, match } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="arr-row">
          {DATA.map((v, idx) => (
            <div className="arr-col" key={idx}>
              {idx === l && <div className="arr-ptr" style={{ color: 'var(--amber)' }}>L</div>}
              {idx === r && <div className="arr-ptr" style={{ color: 'var(--cyan)', left: idx === l ? 18 : 0 }}>R</div>}
              <div className={`arr-cell ${idx === l || idx === r ? (match ? 'match' : 'active') : (idx < l || idx > r) ? 'dim' : ''}`}>{v}</div>
              <div className="arr-idx">{idx}</div>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label={`Target sum: ${TARGET}`} />
    </div>
  );
}
