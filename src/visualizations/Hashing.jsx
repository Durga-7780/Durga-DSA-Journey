import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const KEYS = ['cat', 'dog', 'fox', 'owl'];
const BUCKETS = 5;
function hash(s) { let h = 0; for (const c of s) h += c.charCodeAt(0); return h % BUCKETS; }

function buildSteps() {
  const steps = [{ placed: {}, note: 'Insert keys one at a time — each is hashed to a bucket index.' }];
  const placed = {};
  KEYS.forEach((k) => {
    const idx = hash(k);
    steps.push({ placed: { ...placed }, active: k, idx, note: `hash("${k}") = ${idx} → travels to bucket ${idx}` });
    placed[idx] = [...(placed[idx] || []), k];
    steps.push({ placed: { ...placed }, active: k, idx, note: `"${k}" stored in bucket ${idx}${placed[idx].length > 1 ? ' (collision — bucket chains multiple keys)' : ''}` });
  });
  steps.push({ placed: { ...placed }, note: 'All keys placed. Average lookup is O(1).' });
  return steps;
}

export default function Hashing() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 950 });
  const { placed, active, idx, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        {active && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            <span className="pill">{active}</span>
            <span style={{ color: 'var(--text-faint)' }}>→ hash() →</span>
            <span className="pill" style={{ color: 'var(--amber)', borderColor: 'var(--amber-dim)' }}>bucket {idx}</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          {Array.from({ length: BUCKETS }).map((_, b) => (
            <div key={b} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 56, minHeight: 56, border: `1.5px solid ${b === idx ? 'var(--amber)' : 'var(--line)'}`,
                borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'flex-start',
                background: b === idx ? 'rgba(201,106,21,0.08)' : 'var(--bg-raised)',
              }}>
                {(placed[b] || []).map((k) => (
                  <span key={k} className="mono" style={{ fontSize: 11, color: 'var(--cyan)' }}>{k}</span>
                ))}
              </div>
              <span className="mono" style={{ fontSize: 10, color: 'var(--text-faint)' }}>{b}</span>
            </div>
          ))}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Keys → hash function → buckets" />
    </div>
  );
}
