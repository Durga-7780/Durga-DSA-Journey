import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

// activities as [start, end]
const ACTS = [[1, 3], [2, 5], [4, 6], [6, 8], [5, 9], [8, 10]];

function buildSteps() {
  const sorted = [...ACTS].sort((a, b) => a[1] - b[1]);
  const steps = [{ selected: [], considering: -1, lastEnd: 0, note: 'Sort activities by end time — always consider the one that finishes soonest.' }];
  const selected = [];
  let lastEnd = 0;
  sorted.forEach((act, i) => {
    if (act[0] >= lastEnd) {
      steps.push({ selected: [...selected], considering: i, sorted, lastEnd, note: `[${act[0]},${act[1]}] starts after last selected ends (${lastEnd}) — pick it.` });
      selected.push(i);
      lastEnd = act[1];
    } else {
      steps.push({ selected: [...selected], considering: i, sorted, lastEnd, note: `[${act[0]},${act[1]}] overlaps — skip it, no backtracking needed.` });
    }
  });
  steps.push({ selected: [...selected], considering: -1, sorted, lastEnd, note: `Done — ${selected.length} non-overlapping activities selected greedily.` });
  return steps.map((s) => ({ ...s, sorted }));
}

export default function Greedy() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 950 });
  const { selected, considering, sorted, note } = ctrl.frame;
  const maxEnd = Math.max(...ACTS.map((a) => a[1]));

  return (
    <div className="viz-shell">
      <div className="viz-stage" style={{ alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 420 }}>
          {sorted.map((act, i) => {
            const isSel = selected.includes(i);
            const isCur = i === considering;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="mono" style={{ width: 46, fontSize: 11, color: 'var(--text-faint)' }}>[{act[0]},{act[1]}]</span>
                <div style={{ flex: 1, height: 14, position: 'relative', background: 'var(--line-soft)', borderRadius: 4 }}>
                  <div style={{
                    position: 'absolute', left: `${(act[0] / maxEnd) * 100}%`, width: `${((act[1] - act[0]) / maxEnd) * 100}%`,
                    top: 0, bottom: 0, borderRadius: 4,
                    background: isSel ? 'rgba(15,156,134,0.45)' : isCur ? 'rgba(201,106,21,0.45)' : 'var(--line)',
                    border: `1.5px solid ${isSel ? 'var(--cyan)' : isCur ? 'var(--amber)' : 'transparent'}`,
                  }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Activity selection (sorted by end time)" />
    </div>
  );
}
