import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const WORDS = ['CAT', 'CAR'];

function buildSteps() {
  const steps = [{ nodes: ['root'], edges: [], note: 'Empty trie — just a root node.' }];
  const nodes = ['root'];
  const edges = [];
  let path = 'root';
  for (const word of WORDS) {
    let prefix = '';
    for (const ch of word) {
      prefix += ch;
      const id = 'root-' + prefix;
      const parentId = prefix.length === 1 ? 'root' : 'root-' + prefix.slice(0, -1);
      if (!nodes.includes(id)) {
        nodes.push(id);
        edges.push([parentId, id, ch]);
      }
      steps.push({ nodes: [...nodes], edges: [...edges], active: id, note: `Insert "${word}" — ${nodes.includes(id) ? 'reuse' : 'create'} node for '${ch}'.` });
    }
    steps.push({ nodes: [...nodes], edges: [...edges], active: 'root-' + word, end: true, note: `Mark end of word after "${word}".` });
  }
  return steps;
}

const LAYOUT = {
  root: { x: 200, y: 20 },
  'root-C': { x: 200, y: 70 },
  'root-CA': { x: 200, y: 120 },
  'root-CAT': { x: 130, y: 170 },
  'root-CAR': { x: 270, y: 170 },
};

export default function Trie() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 850 });
  const { nodes, edges, active, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <svg viewBox="0 0 400 190" width="100%" style={{ maxWidth: 380 }}>
          {edges.map(([a, b, ch], i) => (
            <g key={i}>
              <line x1={LAYOUT[a].x} y1={LAYOUT[a].y} x2={LAYOUT[b].x} y2={LAYOUT[b].y} stroke="var(--line)" strokeWidth="1.5" />
              <text x={(LAYOUT[a].x + LAYOUT[b].x) / 2 + 10} y={(LAYOUT[a].y + LAYOUT[b].y) / 2} fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-faint)">{ch}</text>
            </g>
          ))}
          {nodes.map((id) => {
            const p = LAYOUT[id];
            const isActive = id === active;
            return (
              <g key={id}>
                <circle cx={p.x} cy={p.y} r={id === 'root' ? 14 : 17}
                  fill={isActive ? 'rgba(201,106,21,0.14)' : 'rgba(15,156,134,0.08)'}
                  stroke={isActive ? 'var(--amber)' : 'var(--cyan)'} strokeWidth="1.6" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700"
                  fill={isActive ? 'var(--amber)' : 'var(--cyan)'}>{id === 'root' ? '•' : id.split('-').pop().slice(-1)}</text>
              </g>
            );
          })}
        </svg>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label={`Inserting: ${WORDS.join(', ')}`} />
    </div>
  );
}
