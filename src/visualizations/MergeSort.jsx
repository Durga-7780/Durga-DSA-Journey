import { motion } from 'framer-motion';
import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';
import './sort3d.css';

const DATA = [38, 27, 43, 3, 9, 82, 10];

function buildSteps() {
    const steps = [];

    function mergeSort(arr, indices) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const leftIdx = indices.slice(0, mid);
        const rightIdx = indices.slice(mid);

        steps.push({
            arr: rebuildGlobal(arr, indices),
            highlight: indices,
            dividing: [...leftIdx, ...rightIdx],
            note: `Divide [${arr.join(',')}] → [${arr.slice(0, mid).join(',')}] | [${arr.slice(mid).join(',')}]`,
        });

        const left = mergeSort(arr.slice(0, mid), leftIdx);
        const right = mergeSort(arr.slice(mid), rightIdx);
        return merge(left, right, leftIdx, rightIdx);
    }

    let globalArr = [...DATA];
    function rebuildGlobal(subArr, indices) {
        const result = [...globalArr];
        indices.forEach((gi, li) => { result[gi] = subArr[li]; });
        return result;
    }

    function merge(left, right, leftIdx, rightIdx) {
        const result = [];
        const resultIdx = [...leftIdx, ...rightIdx].sort((a, b) => a - b);
        let l = 0, r = 0;
        while (l < left.length && r < right.length) {
            steps.push({
                arr: rebuildGlobal([...left, ...right], [...leftIdx, ...rightIdx]),
                highlight: [leftIdx[l], rightIdx[r]],
                merging: resultIdx,
                note: `Merge: comparing ${left[l]} and ${right[r]}`,
            });
            if (left[l] <= right[r]) {
                result.push(left[l++]);
            } else {
                result.push(right[r++]);
            }
        }
        while (l < left.length) result.push(left[l++]);
        while (r < right.length) result.push(right[r++]);

        resultIdx.forEach((gi, li) => { globalArr[gi] = result[li]; });

        steps.push({
            arr: [...globalArr],
            highlight: [],
            sorted: resultIdx,
            note: `Merged → [${result.join(',')}]`,
        });
        return result;
    }

    steps.push({ arr: [...DATA], highlight: [], note: 'Merge Sort: divide into halves, sort each, merge them back.' });
    mergeSort([...DATA], DATA.map((_, i) => i));
    steps.push({ arr: [...globalArr], highlight: [], allSorted: true, note: '✓ Fully sorted! Merge sort guarantees O(n log n) — always.' });
    return steps;
}

export default function MergeSort() {
    const steps = buildSteps();
    const ctrl = useSteps(steps, { speed: 700 });
    const { arr, highlight = [], sorted = [], merging = [], allSorted, note } = ctrl.frame;
    const max = Math.max(...DATA);

    return (
        <div className="viz-shell">
            <div className="viz-stage" style={{ minHeight: 280 }}>
                <div className="sort3d-bars-wrap">
                    {arr && arr.map((v, idx) => {
                        const isHighlight = highlight.includes(idx);
                        const isMerging = merging.includes(idx);
                        const isSorted = sorted.includes(idx) || allSorted;
                        const h = Math.round((v / max) * 140) + 20;
                        return (
                            <motion.div
                                key={idx}
                                layout
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                className={`sort3d-bar ${isSorted ? 'sorted' : isHighlight ? 'key' : isMerging ? 'compare' : ''}`}
                                style={{ height: h }}
                            >
                                <span className="sort3d-val">{v}</span>
                                {isHighlight && <span className="sort3d-badge key-badge">CMP</span>}
                                {isMerging && !isHighlight && <span className="sort3d-badge cmp-badge">MERGE</span>}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="legend">
                    <span><i className="sort3d-legend-key" />Comparing</span>
                    <span><i className="sort3d-legend-cmp" />Merging partition</span>
                    <span><i className="sort3d-legend-sorted" />Merged (sorted)</span>
                </div>

                <div className="viz-note">{note}</div>
            </div>
            <VizControls ctrl={ctrl} label="Merge sort" />
        </div>
    );
}
