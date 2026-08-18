import { useState } from 'react';
import './viz.css';

const A = 0b1010; // 10
const B = 0b0110; // 6

const OPS = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
};

function bits(n) {
  return n.toString(2).padStart(4, '0').split('').map(Number);
}

export default function BitManipulation() {
  const [op, setOp] = useState('AND');
  const result = OPS[op](A, B);
  const bitsA = bits(A), bitsB = bits(B), bitsR = bits(result);

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <div className="legend" style={{ marginBottom: 4 }}>
          {Object.keys(OPS).map((o) => (
            <button key={o} className="pill" onClick={() => setOp(o)}
              style={{ cursor: 'pointer', color: op === o ? 'var(--amber)' : 'var(--text-faint)', borderColor: op === o ? 'var(--amber-dim)' : 'var(--line)' }}>
              {o}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <BitRow label={`${A} =`} bits={bitsA} />
          <BitRow label={`${B} ${op === 'AND' ? '&' : op === 'OR' ? '|' : '^'}`} bits={bitsB} />
          <div style={{ width: 180, height: 1, background: 'var(--line)' }} />
          <BitRow label={`${result} =`} bits={bitsR} highlight />
        </div>

        <div className="viz-note">{A} {op === 'AND' ? '&' : op === 'OR' ? '|' : '^'} {B} = {result}</div>
      </div>
    </div>
  );
}

function BitRow({ label, bits, highlight }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span className="mono" style={{ width: 44, fontSize: 12, color: 'var(--text-dim)', textAlign: 'right' }}>{label}</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {bits.map((b, i) => (
          <div key={i} style={{
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, borderRadius: 5,
            background: highlight ? (b ? 'rgba(15,156,134,0.16)' : 'var(--line-soft)') : 'var(--bg-raised)',
            border: `1.5px solid ${highlight ? (b ? 'var(--cyan)' : 'var(--line)') : 'var(--line)'}`,
            color: highlight ? (b ? 'var(--cyan)' : 'var(--text-faint)') : 'var(--text)',
          }}>{b}</div>
        ))}
      </div>
    </div>
  );
}
