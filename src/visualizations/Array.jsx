import { useState } from 'react';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const DATA = [10, 20, 30, 40, 50, 60, 70];

function buildSteps(target) {
  const steps = [{ i: -1, note: 'Click Play to search for ' + target + ' with a linear scan.' }];
  for (let i = 0; i < DATA.length; i++) {
    const found = DATA[i] === target;
    steps.push({ i, note: found ? `arr[${i}] = ${DATA[i]} — match!` : `arr[${i}] = ${DATA[i]} ≠ ${target}, keep scanning`, found });
    if (found) break;
  }
  return steps;
}

export default function ArrayViz() {
  const [target] = useState(40);
  const steps = buildSteps(target);
  const ctrl = useSteps(steps, { speed: 550 });
  const { i, note, found } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="arr-row">
          {DATA.map((v, idx) => (
            <div className="arr-col" key={idx}>
              <div className={`arr-cell ${idx === i ? (found ? 'match' : 'active') : idx < i ? 'dim' : ''}`}>{v}</div>
              <div className="arr-idx">{idx}</div>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Linear search" />
    </div>
  );
}
