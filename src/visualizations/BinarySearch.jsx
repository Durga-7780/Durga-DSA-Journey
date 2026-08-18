import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const DATA = [10, 20, 30, 40, 50, 60, 70];
const TARGET = 60;

function buildSteps() {
  const steps = [];
  let lo = 0, hi = DATA.length - 1;
  steps.push({ lo, hi, mid: -1, note: `Searching for ${TARGET} in a sorted array.` });
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (DATA[mid] === TARGET) {
      steps.push({ lo, hi, mid, note: `arr[${mid}] = ${DATA[mid]} — found!`, found: true });
      break;
    } else if (DATA[mid] < TARGET) {
      steps.push({ lo, hi, mid, note: `arr[${mid}] = ${DATA[mid]} < ${TARGET} → search right half` });
      lo = mid + 1;
    } else {
      steps.push({ lo, hi, mid, note: `arr[${mid}] = ${DATA[mid]} > ${TARGET} → search left half` });
      hi = mid - 1;
    }
  }
  return steps;
}

export default function BinarySearch() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 950 });
  const { lo, hi, mid, note, found } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="arr-row">
          {DATA.map((v, idx) => (
            <div className="arr-col" key={idx}>
              {idx === mid && <div className="arr-ptr">M</div>}
              <div className={`arr-cell ${idx === mid ? (found ? 'match' : 'active') : (idx < lo || idx > hi) ? 'dim' : ''}`}>{v}</div>
              <div className="arr-idx">{idx}</div>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label={`Target: ${TARGET}`} />
    </div>
  );
}
