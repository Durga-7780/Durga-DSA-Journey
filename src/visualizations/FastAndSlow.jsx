import { motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';
import './linked3d.css';

// List with cycle at index 3: 1→2→3→4→5→6→3 (cycle)
const NODES = [
    { val: 1 }, { val: 2 }, { val: 3 }, { val: 4 }, { val: 5 }, { val: 6 },
];
const CYCLE_ENTRY = 2; // index 2 = node with val 3

function buildSteps() {
    const steps = [];
    steps.push({ slow: 0, fast: 0, phase: 'start', note: "Floyd's cycle detection. slow moves 1 step, fast moves 2 steps." });

    let slow = 0, fast = 0;
    const n = NODES.length;

    function nextIdx(i) {
        if (i === n - 1) return CYCLE_ENTRY; // tail wraps to cycle entry
        return i + 1;
    }

    steps.push({ slow: 1, fast: 2, phase: 'move', note: `slow→${NODES[1].val}, fast→${NODES[2].val}. No collision yet.` });
    steps.push({ slow: 2, fast: 4, phase: 'move', note: `slow→${NODES[2].val}, fast→${NODES[4].val}. No collision yet.` });
    steps.push({ slow: 3, fast: 2, phase: 'move', note: `slow→${NODES[3].val}, fast→${NODES[2].val} (fast wrapped via cycle!).` });
    steps.push({ slow: 4, fast: 4, phase: 'meet', note: `💥 slow and fast meet at node ${NODES[4].val}! Cycle detected by Floyd's algorithm.` });
    steps.push({ slow: 4, fast: 4, phase: 'found', note: `✓ Cycle exists! Entry point is node ${NODES[CYCLE_ENTRY].val} (index ${CYCLE_ENTRY}).` });
    return steps;
}

export default function FastAndSlow() {
    const steps = buildSteps();
    const ctrl = useSteps(steps, { speed: 1100 });
    const { slow, fast, phase, note } = ctrl.frame;
    const n = NODES.length;

    return (
        <div className="viz-shell">
            <div className="viz-stage" style={{ minHeight: 300 }}>
                {/* Pointer legend */}
                <div className="legend" style={{ marginBottom: 4 }}>
                    <span><i style={{ background: 'var(--cyan)', border: '2px solid var(--cyan)' }} />🐢 slow (×1)</span>
                    <span><i style={{ background: 'var(--amber)', border: '2px solid var(--amber)' }} />🐇 fast (×2)</span>
                    <span><i style={{ background: '#7c5cd1', border: '2px solid #7c5cd1' }} />🔁 cycle entry</span>
                </div>

                {/* Node chain */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap', overflowX: 'auto' }}>
                    {NODES.map((node, idx) => {
                        const isSlow = idx === slow;
                        const isFast = idx === fast;
                        const isBoth = isSlow && isFast;
                        const isCycleEntry = idx === CYCLE_ENTRY;
                        const isMeet = phase === 'meet' || phase === 'found';
                        return (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                    {/* pointer badges */}
                                    <div style={{ height: 20, display: 'flex', gap: 3 }}>
                                        {isSlow && (
                                            <motion.span
                                                layoutId="slow-ptr"
                                                style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--cyan)', border: '1px solid var(--cyan)', borderRadius: 4, padding: '1px 4px' }}
                                            >S</motion.span>
                                        )}
                                        {isFast && (
                                            <motion.span
                                                layoutId="fast-ptr"
                                                style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--amber)', border: '1px solid var(--amber)', borderRadius: 4, padding: '1px 4px' }}
                                            >F</motion.span>
                                        )}
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            scale: isBoth ? 1.25 : (isSlow || isFast) ? 1.12 : 1,
                                            y: isBoth ? -6 : 0,
                                        }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                                        style={{
                                            width: 44, height: 44, borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15,
                                            background: isBoth && isMeet ? 'rgba(124,92,209,0.2)' : isBoth ? 'rgba(201,106,21,0.15)' :
                                                isSlow ? 'rgba(94,234,212,0.14)' : isFast ? 'rgba(245,166,35,0.14)' : 'var(--bg-raised)',
                                            border: `2.5px solid ${isBoth && isMeet ? '#7c5cd1' : isBoth ? 'var(--amber)' :
                                                isSlow ? 'var(--cyan)' : isFast ? 'var(--amber)' : isCycleEntry ? '#bfe9e1' : 'var(--line)'}`,
                                            color: isBoth && isMeet ? '#7c5cd1' : isSlow ? 'var(--cyan)' : isFast ? 'var(--amber)' : 'var(--text)',
                                            boxShadow: isBoth && isMeet ? '0 0 20px rgba(124,92,209,0.5)' :
                                                isBoth ? '0 0 14px rgba(201,106,21,0.4)' : 'none',
                                            transition: 'all 0.3s',
                                        }}
                                    >
                                        {node.val}
                                    </motion.div>
                                    {isCycleEntry && (
                                        <span style={{ fontSize: 9, color: '#7c5cd1', fontFamily: 'var(--font-mono)' }}>↩ cycle</span>
                                    )}
                                </div>

                                {/* Arrow or cycle-back arrow */}
                                {idx < n - 1 ? (
                                    <span style={{ color: 'var(--line)', fontSize: 20, opacity: 0.7 }}>→</span>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                        <span style={{ color: '#c96a15', fontSize: 11, fontFamily: 'var(--font-mono)' }}>↩ to {NODES[CYCLE_ENTRY].val}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Step counter */}
                <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
                    <span className="pill" style={{ borderColor: 'var(--cyan-dim)', color: 'var(--cyan)' }}>
                        🐢 slow @ {NODES[Math.max(0, slow)]?.val ?? '-'}
                    </span>
                    <span className="pill" style={{ borderColor: 'var(--amber-dim)', color: 'var(--amber)' }}>
                        🐇 fast @ {NODES[Math.max(0, fast)]?.val ?? '-'}
                    </span>
                    {(phase === 'meet' || phase === 'found') && (
                        <span className="pill" style={{ borderColor: 'rgba(124,92,209,0.4)', color: '#7c5cd1' }}>
                            💥 Cycle!
                        </span>
                    )}
                </div>

                <div className="viz-note">{note}</div>
            </div>
            <VizControls ctrl={ctrl} label="Floyd's fast & slow pointer (cycle detection)" />
        </div>
    );
}
