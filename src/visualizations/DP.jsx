import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const N = 9;

function buildSteps() {
  const table = new Array(N + 1).fill(null);
  table[0] = 0; table[1] = 1;
  const steps = [{ table: [...table], active: 1, note: 'dp[0] = 0, dp[1] = 1 — base cases.' }];
  for (let i = 2; i <= N; i++) {
    table[i] = table[i - 1] + table[i - 2];
    steps.push({ table: [...table], active: i, from: [i - 1, i - 2], note: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${table[i - 1]} + ${table[i - 2]} = ${table[i]}` });
  }
  steps.push({ table: [...table], active: -1, note: `Table complete — Fibonacci computed in O(n) instead of O(2ⁿ).` });
  return steps;
}

export default function DP() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 750 });
  const { table, active, from = [], note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="arr-row">
          {table.map((v, idx) => (
            <div className="arr-col" key={idx}>
              <div className={`arr-cell ${idx === active ? 'active' : from.includes(idx) ? 'match' : v === null ? 'dim' : ''}`} style={{ width: 44, height: 44, fontSize: 13 }}>
                {v === null ? '·' : v}
              </div>
              <div className="arr-idx">dp[{idx}]</div>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Fibonacci via tabulation" />
    </div>
  );
}
