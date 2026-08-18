import { motion, AnimatePresence } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';
import './linked3d.css';

const DATA = [10, 20, 30, 40, 50];

function buildSteps() {
    const steps = [];
    // Forward traversal
    steps.push({ at: -1, dir: 'fwd', note: 'Doubly linked list: each node has both next → and ← prev pointer.' });
    DATA.forEach((v, i) => {
        steps.push({ at: i, dir: 'fwd', note: `Forward: visiting node ${v}. next → ${i < DATA.length - 1 ? DATA[i + 1] : 'NULL'}, prev ← ${i > 0 ? DATA[i - 1] : 'NULL'}` });
    });
    // Backward traversal
    steps.push({ at: DATA.length, dir: 'bwd', note: 'Now traversing backward from the tail via prev pointers.' });
    for (let i = DATA.length - 1; i >= 0; i--) {
        steps.push({ at: i, dir: 'bwd', note: `Backward: visiting node ${DATA[i]}. prev ← ${i > 0 ? DATA[i - 1] : 'NULL'}` });
    }
    steps.push({ at: -1, dir: 'done', note: 'Full bidirectional traversal complete! O(n) time, O(1) extra space.' });
    return steps;
}

export default function DoublyLinkedList() {
    const steps = buildSteps();
    const ctrl = useSteps(steps, { speed: 900 });
    const { at, dir, note } = ctrl.frame;

    return (
        <div className="viz-shell">
            <div className="viz-stage" style={{ minHeight: 260 }}>
                {/* Direction indicator */}
                <div className="dll-direction-badge">
                    <span className={`dir-badge ${dir === 'fwd' ? 'fwd' : dir === 'bwd' ? 'bwd' : 'done'}`}>
                        {dir === 'fwd' ? '→ Forward' : dir === 'bwd' ? '← Backward' : '✓ Done'}
                    </span>
                </div>

                {/* Nodes */}
                <div className="dll-track">
                    {/* NULL left */}
                    <div className="dll-null">NULL</div>
                    <span className="dll-arrow both">⟵</span>

                    {DATA.map((v, idx) => {
                        const isActive = idx === at;
                        const isBehind = dir === 'fwd' ? idx < at : dir === 'bwd' ? idx > at : false;
                        return (
                            <div key={idx} className="dll-node-wrap">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        y: isActive ? -8 : 0,
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                                    className={`dll-node ${isActive ? 'active' : isBehind ? 'visited' : ''}`}
                                >
                                    <div className="dll-node-prev">prev</div>
                                    <div className="dll-node-val">{v}</div>
                                    <div className="dll-node-next">next</div>
                                </motion.div>
                                {idx < DATA.length - 1 && (
                                    <div className="dll-arrows-between">
                                        <span className={`dll-fwd-arr ${dir === 'fwd' && idx < at ? 'lit' : ''}`}>→</span>
                                        <span className={`dll-bwd-arr ${dir === 'bwd' && idx >= at ? 'lit' : ''}`}>←</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <span className="dll-arrow both">⟶</span>
                    {/* NULL right */}
                    <div className="dll-null">NULL</div>
                </div>

                {/* Pointer labels */}
                <div className="dll-ptr-row">
                    {DATA.map((_, idx) => (
                        <div key={idx} className="dll-ptr-label">
                            {idx === 0 && <span className="dll-head-label">HEAD</span>}
                            {idx === DATA.length - 1 && <span className="dll-tail-label">TAIL</span>}
                        </div>
                    ))}
                </div>

                <div className="viz-note">{note}</div>
            </div>
            <VizControls ctrl={ctrl} label="Doubly linked list traversal" />
        </div>
    );
}
