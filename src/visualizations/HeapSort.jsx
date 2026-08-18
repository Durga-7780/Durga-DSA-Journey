import { motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';
import './sort3d.css';

const DATA = [4, 10, 3, 5, 1, 8, 7, 2];

function buildSteps() {
    const arr = [...DATA];
    const steps = [];
    const n = arr.length;

    function heapify(arr, n, i) {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        steps.push({ arr: [...arr], compare: [i, l < n ? l : -1, r < n ? r : -1].filter(x => x >= 0 && x < n), root: i, heap: n, note: `Heapify at index ${i} (val=${arr[i]}): check children ${l < n ? arr[l] : 'n/a'}, ${r < n ? arr[r] : 'n/a'}` });

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            steps.push({ arr: [...arr], compare: [i, largest], swap: true, root: largest, heap: n, note: `Swap ${arr[largest]} ↔ ${arr[i]}: parent was smaller than child.` });
            heapify(arr, n, largest);
        }
    }

    steps.push({ arr: [...arr], compare: [], heap: n, note: 'Heap Sort: Step 1 — build a Max-Heap from the array.' });

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    steps.push({ arr: [...arr], compare: [], heap: n, heapBuilt: true, note: `Max-Heap built! Root ${arr[0]} is the largest. Now extract max one by one.` });

    // Extract elements from heap
    const sortedIdxs = [];
    for (let i = n - 1; i > 0; i--) {
        steps.push({ arr: [...arr], compare: [0, i], heap: i, sortedIdxs: [...sortedIdxs], note: `Extract root ${arr[0]} (max), swap with last heap element ${arr[i]}.` });
        [arr[0], arr[i]] = [arr[i], arr[0]];
        sortedIdxs.unshift(i);
        steps.push({ arr: [...arr], compare: [], heap: i, sortedIdxs: [...sortedIdxs], note: `Placed ${arr[i]} at position ${i}. Restore heap property.` });
        heapify(arr, i, 0);
    }
    sortedIdxs.unshift(0);
    steps.push({ arr: [...arr], compare: [], heap: 0, sortedIdxs: [...sortedIdxs], allSorted: true, note: '✓ Heap sort complete! O(n log n) time, O(1) space — in-place.' });
    return steps;
}

export default function HeapSort() {
    const steps = buildSteps();
    const ctrl = useSteps(steps, { speed: 600 });
    const { arr, compare = [], heap, sortedIdxs = [], allSorted, heapBuilt, note } = ctrl.frame;
    const max = Math.max(...DATA);

    return (
        <div className="viz-shell">
            <div className="viz-stage" style={{ minHeight: 300 }}>
                {/* Tree view of heap */}
                <div className="heap-info-row">
                    <span className="pill" style={{ borderColor: heapBuilt ? 'var(--cyan-dim)' : 'var(--line)', color: heapBuilt ? 'var(--cyan)' : 'var(--text-faint)' }}>
                        {heapBuilt ? '✓ Max-Heap built' : '🔧 Building Heap…'}
                    </span>
                    <span className="pill" style={{ borderColor: 'var(--amber-dim)', color: 'var(--amber)' }}>
                        heap size: {heap ?? DATA.length}
                    </span>
                </div>

                <div className="sort3d-bars-wrap">
                    {arr && arr.map((v, idx) => {
                        const isCompare = compare.includes(idx);
                        const isSorted = sortedIdxs.includes(idx) || allSorted;
                        const isInHeap = idx < (heap ?? DATA.length);
                        const isRoot = idx === 0 && isInHeap;
                        const h = Math.round((v / max) * 140) + 20;
                        return (
                            <motion.div
                                key={idx}
                                layout
                                transition={{ type: 'spring', stiffness: 270, damping: 22 }}
                                className={`sort3d-bar ${isSorted ? 'sorted' : isCompare ? 'key' : isRoot ? 'compare' : !isInHeap ? 'out-heap' : ''}`}
                                style={{ height: h }}
                            >
                                <span className="sort3d-val">{v}</span>
                                {isRoot && isInHeap && <span className="sort3d-badge key-badge">MAX</span>}
                                {isCompare && !isRoot && <span className="sort3d-badge cmp-badge">CMP</span>}
                                {isSorted && <span className="sort3d-badge sorted-badge">✓</span>}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="legend">
                    <span><i className="sort3d-legend-key" />Root (max)</span>
                    <span><i className="sort3d-legend-cmp" />Comparing</span>
                    <span><i className="sort3d-legend-sorted" />Sorted (extracted)</span>
                </div>

                <div className="viz-note">{note}</div>
            </div>
            <VizControls ctrl={ctrl} label="Heap sort" />
        </div>
    );
}
