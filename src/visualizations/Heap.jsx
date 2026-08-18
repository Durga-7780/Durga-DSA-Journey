import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

// Insert 15 into min-heap [5, 8, 6, 20, 10, 7], then heapify-up
function buildSteps() {
  let arr = [5, 8, 6, 20, 10, 7, 3];
  const steps = [{ arr: [...arr], swap: [], note: 'Insert 2 at the end of the array.' }];
  arr = [...arr, 2];
  steps.push({ arr: [...arr], swap: [], note: 'Array: [' + arr.join(', ') + ']. Now bubble it up while smaller than its parent.' });
  let i = arr.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (arr[parent] > arr[i]) {
      steps.push({ arr: [...arr], swap: [i, parent], note: `${arr[i]} < parent ${arr[parent]} — swap.` });
      [arr[i], arr[parent]] = [arr[parent], arr[i]];
      steps.push({ arr: [...arr], swap: [i, parent], note: `Swapped. Array: [${arr.join(', ')}]` });
      i = parent;
    } else break;
  }
  steps.push({ arr: [...arr], swap: [], note: 'Min-heap property restored — smallest is always at index 0.' });
  return steps;
}

export default function Heap() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 950 });
  const { arr, swap, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="arr-row">
          {arr.map((v, i) => (
            <div className="arr-col" key={i}>
              <div className={`arr-cell ${swap.includes(i) ? 'active' : ''}`}>{v}</div>
              <div className="arr-idx">{i}</div>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Min-heap insert + heapify-up" />
    </div>
  );
}
