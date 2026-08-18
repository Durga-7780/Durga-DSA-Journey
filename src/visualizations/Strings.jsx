import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const WORD = 'RACECAR';

function buildSteps() {
  const steps = [];
  let l = 0, r = WORD.length - 1;
  steps.push({ l, r, note: `Check if "${WORD}" is a palindrome.` });
  while (l < r) {
    const match = WORD[l] === WORD[r];
    steps.push({ l, r, match, note: `'${WORD[l]}' vs '${WORD[r]}' — ${match ? 'match' : 'mismatch!'}` });
    if (!match) { steps.push({ l, r, note: 'Not a palindrome.', fail: true }); return steps; }
    l++; r--;
  }
  steps.push({ l, r, note: `Pointers met or crossed — "${WORD}" is a palindrome!`, done: true });
  return steps;
}

export default function Strings() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 800 });
  const { l, r, match, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="arr-row">
          {WORD.split('').map((ch, idx) => (
            <div className="arr-col" key={idx}>
              {idx === l && <div className="arr-ptr">L</div>}
              {idx === r && <div className="arr-ptr" style={{ color: 'var(--cyan)', left: idx === l ? 18 : 0 }}>R</div>}
              <div className={`arr-cell ${idx === l || idx === r ? (match === false ? '' : 'match') : (l !== undefined && (idx < l || idx > r)) ? 'dim' : ''}`}
                style={match === false && (idx === l || idx === r) ? { borderColor: 'var(--danger)', color: 'var(--danger)' } : undefined}>
                {ch}
              </div>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Palindrome check via two pointers" />
    </div>
  );
}
