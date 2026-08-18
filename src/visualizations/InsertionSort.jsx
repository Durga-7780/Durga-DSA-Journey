import { motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';
import './sort3d.css';

const DATA = [38, 27, 43, 3, 9, 82, 10];

function buildSteps() {
    const arr = [...DATA];
    const steps = [{ arr: [...arr], compare: [], sorted: [], insert: -1, note: 'Insertion Sort: build sorted section one element at a time.' }];
    const n = arr.length;
    const sorted = [0]; // index 0 is trivially sorted

    steps.push({ arr: [...arr], compare: [], sorted: [...sorted], insert: -1, note: 'First element is trivially sorted.' });

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        steps.push({ arr: [...arr], compare: [i], sorted: [...sorted], insert: i, note: `Pick key = ${key} (index ${i}). Compare with sorted portion.` });
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            steps.push({ arr: [...arr], compare: [j, j + 1], sorted: [...sorted], insert: j + 1, note: `${arr[j]} > ${key} — shift ${arr[j]} right.` });
            arr[j + 1] = arr[j];
            j--;
            steps.push({ arr: [...arr], compare: [j + 1, j + 2], sorted: [...sorted], insert: j + 1, note: `Shifted. Checking position ${j}...` });
        }
        arr[j + 1] = key;
        sorted.push(i);
        steps.push({ arr: [...arr], compare: [], sorted: sorted.map((_, k) => k <= i ? k : -1).filter(x => x >= 0), insert: j + 1, note: `Inserted ${key} at index ${j + 1}. Sorted portion grows to ${i + 1} elements.` });
    }
    steps.push({ arr: [...arr], compare: [], sorted: Array.from({ length: n }, (_, k) => k), insert: -1, note: '✓ Array fully sorted! O(n²) worst, O(n) best (already sorted).' });
    return steps;
}

export default function InsertionSort() {
    const steps = buildSteps();
    const ctrl = useSteps(steps, { speed: 500 });
    const { arr, compare, sorted, insert, note } = ctrl.frame;
    const max = Math.max(...DATA);

    return (
        <div className="viz-shell">
            <div className="viz-stage" style={{ minHeight: 280 }}>
                <div className="sort3d-bars-wrap">
                    {arr && arr.map((v, idx) => {
                        const isCompare = compare?.includes(idx);
                        const isSorted = sorted?.includes(idx);
                        const isInsert = idx === insert;
                        const h = Math.round((v / max) * 140) + 20;
                        return (
                            <motion.div
                                key={idx}
                                layout
                                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                                className={`sort3d-bar ${isInsert ? 'key' : isCompare ? 'compare' : isSorted ? 'sorted' : ''}`}
                                style={{ height: h }}
                            >
                                <span className="sort3d-val">{v}</span>
                                {isInsert && <span className="sort3d-badge key-badge">KEY</span>}
                                {isCompare && !isInsert && <span className="sort3d-badge cmp-badge">CMP</span>}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="legend">
                    <span><i className="sort3d-legend-key" />KEY (to insert)</span>
                    <span><i className="sort3d-legend-cmp" />Comparing</span>
                    <span><i className="sort3d-legend-sorted" />Sorted</span>
                </div>

                <div className="viz-note">{note}</div>
            </div>
            <VizControls ctrl={ctrl} label="Insertion sort" />
        </div>
    );
}
