import { motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const DATA = [42, 18, 63, 27, 51, 9, 36];

function buildSteps() {
  const arr = [...DATA];
  const steps = [{ arr: [...arr], compare: [], sorted: [], note: 'Bubble sort: repeatedly swap adjacent out-of-order pairs.' }];
  const n = arr.length;
  const sortedFrom = n;
  for (let pass = 0; pass < n - 1; pass++) {
    for (let j = 0; j < n - pass - 1; j++) {
      steps.push({ arr: [...arr], compare: [j, j + 1], sorted: Array.from({ length: pass }, (_, k) => n - 1 - k), note: `Compare index ${j} and ${j + 1}` });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ arr: [...arr], compare: [j, j + 1], swap: true, sorted: Array.from({ length: pass }, (_, k) => n - 1 - k), note: `Swap — ${arr[j + 1]} > ${arr[j]}` });
      }
    }
  }
  steps.push({ arr: [...arr], compare: [], sorted: Array.from({ length: n }, (_, k) => k), note: 'Sorted!' });
  return steps;
}

export default function Sorting() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 420 });
  const { arr, compare, sorted, note, swap } = ctrl.frame;
  const max = Math.max(...DATA);

  return (
    <div className="viz-shell">
      <div className="viz-stage" style={{ minHeight: 240 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 160 }}>
          {arr.map((v, idx) => {
            const isCompare = compare.includes(idx);
            const isSorted = sorted.includes(idx);
            return (
              <motion.div
                key={idx}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{
                  width: 34,
                  height: `${(v / max) * 130 + 20}px`,
                  borderRadius: '4px 4px 2px 2px',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 4,
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                  background: isSorted ? 'rgba(179,157,219,0.18)' : isCompare ? (swap ? 'rgba(245,166,35,0.25)' : 'rgba(94,234,212,0.18)') : 'var(--bg-raised)',
                  border: `1.5px solid ${isSorted ? 'var(--violet)' : isCompare ? (swap ? 'var(--amber)' : 'var(--cyan)') : 'var(--line)'}`,
                  color: isSorted ? 'var(--violet)' : isCompare ? (swap ? 'var(--amber)' : 'var(--cyan)') : 'var(--text-dim)',
                }}
              >
                {v}
              </motion.div>
            );
          })}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Bubble sort" />
    </div>
  );
}
