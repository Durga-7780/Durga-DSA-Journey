import { motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';
import './linked3d.css';

const DATA = [10, 20, 30, 40, 50, 60];
const R = 100; // radius for circle layout

function buildSteps() {
    const steps = [{ at: -1, note: 'Circular linked list: tail.next points back to the head — no NULL!' }];
    for (let i = 0; i < DATA.length; i++) {
        steps.push({ at: i, note: `Visiting node ${DATA[i]}. next → ${DATA[(i + 1) % DATA.length]}${i === DATA.length - 1 ? ' (wraps to head!)' : ''}` });
    }
    steps.push({ at: 0, note: 'Back at head — cycle detected! Circular traversal complete.' });
    return steps;
}

function getPos(i, total, radius) {
    const angle = (2 * Math.PI * i) / total - Math.PI / 2;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

export default function CircularLinkedList() {
    const steps = buildSteps();
    const ctrl = useSteps(steps, { speed: 900 });
    const { at, note } = ctrl.frame;
    const n = DATA.length;
    const cx = 130, cy = 130;

    return (
        <div className="viz-shell">
            <div className="viz-stage" style={{ minHeight: 320 }}>
                <div style={{ position: 'relative', width: 260, height: 260 }}>
                    {/* SVG for circular arrows */}
                    <svg width="260" height="260" style={{ position: 'absolute', top: 0, left: 0 }}>
                        {DATA.map((_, i) => {
                            const from = getPos(i, n, R);
                            const to = getPos((i + 1) % n, n, R);
                            const isLit = at >= 0 && (i === at || (i === n - 1 && at === 0 && ctrl.frame.note?.includes('wraps')));
                            const isTail = i === n - 1;
                            const mx = (from.x + to.x) / 2 * 0.7;
                            const my = (from.y + to.y) / 2 * 0.7;
                            return (
                                <g key={i}>
                                    <path
                                        d={`M ${cx + from.x} ${cy + from.y} Q ${cx + mx} ${cy + my} ${cx + to.x} ${cy + to.y}`}
                                        fill="none"
                                        stroke={isTail ? (isLit ? '#c96a15' : '#f3dcb8') : (isLit ? '#0f9c86' : '#dde2ea')}
                                        strokeWidth={isTail ? 2.5 : 1.8}
                                        strokeDasharray={isTail ? '6 3' : undefined}
                                        markerEnd={`url(#arrow-${isTail ? 'amber' : 'cyan'})`}
                                        style={{ transition: 'stroke 0.3s' }}
                                    />
                                </g>
                            );
                        })}
                        <defs>
                            <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
                                <path d="M0,0 L8,3 L0,6 Z" fill="#0f9c86" />
                            </marker>
                            <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
                                <path d="M0,0 L8,3 L0,6 Z" fill="#c96a15" />
                            </marker>
                        </defs>
                    </svg>

                    {/* Node circles */}
                    {DATA.map((v, i) => {
                        const { x, y } = getPos(i, n, R);
                        const isActive = i === at;
                        const isVisited = at > i || (at === 0 && ctrl.frame.note?.includes('Back'));
                        const isTail = i === n - 1;
                        return (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{ scale: isActive ? 1.25 : 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                style={{
                                    position: 'absolute',
                                    left: cx + x - 22,
                                    top: cy + y - 22,
                                    width: 44, height: 44,
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'column',
                                    background: isActive ? 'rgba(245,166,35,0.18)' : isVisited ? 'rgba(94,234,212,0.1)' : 'var(--bg-raised)',
                                    border: `2px solid ${isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : isTail ? '#c96a15' : 'var(--line)'}`,
                                    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13,
                                    color: isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--text)',
                                    boxShadow: isActive ? '0 0 18px rgba(245,166,35,0.4)' : 'none',
                                    zIndex: isActive ? 10 : 1,
                                    transition: 'background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s',
                                    cursor: 'default',
                                }}
                            >
                                {v}
                                {isTail && <span style={{ fontSize: 8, color: '#c96a15', lineHeight: 1 }}>TAIL</span>}
                                {i === 0 && <span style={{ fontSize: 8, color: 'var(--cyan)', lineHeight: 1, position: 'absolute', top: -16 }}>HEAD</span>}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="vis-badge-row" style={{ marginTop: 8 }}>
                    <span className="pill" style={{ borderColor: 'var(--cyan-dim)', color: 'var(--cyan)' }}>∞ No NULL terminator</span>
                    <span className="pill" style={{ borderColor: '#f3dcb8', color: '#c96a15' }}>- - - tail→head wrap</span>
                </div>

                <div className="viz-note">{note}</div>
            </div>
            <VizControls ctrl={ctrl} label="Circular linked list" />
        </div>
    );
}
