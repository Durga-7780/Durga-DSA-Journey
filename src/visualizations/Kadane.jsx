import { motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';
import './sort3d.css';

const DATA = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

function buildSteps() {
    const steps = [];
    const n = DATA.length;
    let maxSum = DATA[0];
    let curSum = DATA[0];
    let bestStart = 0, bestEnd = 0;
    let curStart = 0;

    steps.push({
        arr: [...DATA], cur: -1, curSum: 0, maxSum, bestStart: -1, bestEnd: -1, curStart: -1,
        note: "Kadane's Algo: track current subarray sum and global maximum.",
    });
    steps.push({
        arr: [...DATA], cur: 0, curSum: DATA[0], maxSum, bestStart: 0, bestEnd: 0, curStart: 0,
        note: `Init: curSum = ${DATA[0]}, maxSum = ${DATA[0]}.`,
    });

    for (let i = 1; i < n; i++) {
        const prevCur = curSum;
        const extendSum = curSum + DATA[i];
        const freshSum = DATA[i];

        if (freshSum > extendSum) {
            curStart = i;
            curSum = freshSum;
            steps.push({
                arr: [...DATA], cur: i, curSum, maxSum, bestStart, bestEnd, curStart,
                dropOld: true,
                note: `At [${i}]=${DATA[i]}: starting fresh (${freshSum} > extend ${extendSum}). curSum = ${curSum}`,
            });
        } else {
            curSum = extendSum;
            steps.push({
                arr: [...DATA], cur: i, curSum, maxSum, bestStart, bestEnd, curStart,
                note: `At [${i}]=${DATA[i]}: extend subarray. curSum = ${prevCur} + ${DATA[i]} = ${curSum}`,
            });
        }

        if (curSum > maxSum) {
            maxSum = curSum;
            bestStart = curStart;
            bestEnd = i;
            steps.push({
                arr: [...DATA], cur: i, curSum, maxSum, bestStart, bestEnd, curStart,
                newMax: true,
                note: `🔥 New max! maxSum = ${maxSum}, window [${bestStart}..${bestEnd}] = [${DATA.slice(bestStart, bestEnd + 1).join(',')}]`,
            });
        }
    }

    steps.push({
        arr: [...DATA], cur: -1, curSum, maxSum, bestStart, bestEnd, curStart, done: true,
        note: `✓ Done! Maximum subarray = [${DATA.slice(bestStart, bestEnd + 1).join(',')}], sum = ${maxSum}`,
    });
    return steps;
}

export default function Kadane() {
    const steps = buildSteps();
    const ctrl = useSteps(steps, { speed: 950 });
    const { arr, cur, curSum = 0, maxSum = 0, bestStart = -1, bestEnd = -1, curStart = -1, done, newMax, dropOld, note } = ctrl.frame;

    return (
        <div className="viz-shell">
            <div className="viz-stage" style={{ minHeight: 320 }}>
                {/* Score board */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 4 }}>
                    <motion.div
                        animate={{ scale: newMax ? [1, 1.15, 1] : 1 }}
                        transition={{ duration: 0.4 }}
                        className="kadane-score"
                        style={{ borderColor: 'var(--cyan-dim)', color: 'var(--cyan)' }}
                    >
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', opacity: 0.7 }}>curSum</span>
                        <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{curSum}</span>
                    </motion.div>
                    <motion.div
                        animate={{ scale: newMax ? [1, 1.2, 1] : 1, boxShadow: newMax ? ['0 0 0px rgba(245,166,35,0)', '0 0 24px rgba(245,166,35,0.5)', '0 0 0px rgba(245,166,35,0)'] : '0 0 0px rgba(245,166,35,0)' }}
                        transition={{ duration: 0.5 }}
                        className="kadane-score"
                        style={{ borderColor: 'var(--amber-dim)', color: 'var(--amber)' }}
                    >
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', opacity: 0.7 }}>maxSum</span>
                        <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{maxSum}</span>
                    </motion.div>
                </div>

                {/* Array bars */}
                <div className="sort3d-bars-wrap" style={{ height: 160 }}>
                    {arr && arr.map((v, idx) => {
                        const isCur = idx === cur;
                        const isInWindow = idx >= curStart && idx <= cur && cur >= 0;
                        const isBest = done && idx >= bestStart && idx <= bestEnd;
                        const isNeg = v < 0;
                        const baseH = Math.abs(v) * 10 + 20;
                        const h = Math.min(baseH, 145);
                        return (
                            <motion.div
                                key={idx}
                                layout
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                style={{
                                    position: 'relative',
                                    width: 36, minWidth: 36,
                                    height: h,
                                    borderRadius: '6px 6px 3px 3px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                                    paddingTop: 5,
                                    background: isBest ? 'linear-gradient(160deg,rgba(124,92,209,0.25),rgba(124,92,209,0.08))' :
                                        isCur ? 'linear-gradient(160deg,rgba(245,166,35,0.22),rgba(245,166,35,0.08))' :
                                            isInWindow ? 'linear-gradient(160deg,rgba(94,234,212,0.18),rgba(94,234,212,0.05))' :
                                                'linear-gradient(160deg,rgba(255,255,255,0.14),rgba(20,30,50,0.06))',
                                    border: `1.5px solid ${isBest ? 'var(--violet)' : isCur ? 'var(--amber)' : isInWindow ? 'var(--cyan)' : isNeg ? '#d64545' : 'var(--line)'}`,
                                    transform: isCur ? 'translateY(-6px) scale(1.08)' : isBest ? 'scale(1.04)' : 'none',
                                    boxShadow: isCur ? '0 0 18px rgba(245,166,35,0.35)' : isBest ? '0 0 14px rgba(124,92,209,0.3)' : '0 3px 8px rgba(20,30,50,0.08)',
                                    transition: 'all 0.3s',
                                    zIndex: isCur ? 5 : 1,
                                }}
                            >
                                <span style={{
                                    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11,
                                    color: isBest ? 'var(--violet)' : isCur ? 'var(--amber)' : isInWindow ? 'var(--cyan)' : isNeg ? 'var(--danger)' : 'var(--text-dim)',
                                }}>{v}</span>
                                {isCur && <span className="sort3d-badge key-badge" style={{ top: -20 }}>CUR</span>}
                                {isBest && !isCur && <span className="sort3d-badge sorted-badge" style={{ top: -20 }}>BEST</span>}
                                <span style={{ position: 'absolute', bottom: -18, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>{idx}</span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Best subarray display */}
                {bestStart >= 0 && (
                    <div style={{ marginTop: 14, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)' }}>Best window:</span>
                        {arr && arr.slice(bestStart, bestEnd + 1).map((v, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    width: 30, height: 30, borderRadius: 6,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1.5px solid var(--violet)',
                                    background: 'rgba(124,92,209,0.1)',
                                    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13,
                                    color: 'var(--violet)',
                                }}
                            >{v}</motion.span>
                        ))}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#7c5cd1', fontWeight: 700 }}>= {maxSum}</span>
                    </div>
                )}

                <div className="viz-note" style={{ marginTop: 10 }}>{note}</div>
            </div>
            <VizControls ctrl={ctrl} label="Kadane's maximum subarray" />
        </div>
    );
}
