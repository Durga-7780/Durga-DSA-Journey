import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import { GRAPH_NODES, GRAPH_EDGES, ADJ } from './graphData.js';
import './viz.css';

function buildSteps(start = 'A') {
  const visited = new Set();
  const order = [];
  const steps = [];
  function dfs(node) {
    visited.add(node);
    order.push(node);
    steps.push({ visited: [...visited], current: node, order: [...order], note: `Visit ${node}, mark visited.` });
    for (const nb of ADJ[node]) {
      if (!visited.has(nb)) {
        steps.push({ visited: [...visited], current: node, order: [...order], note: `${node} → ${nb} unvisited: go deeper.` });
        dfs(nb);
      }
    }
    steps.push({ visited: [...visited], current: node, order: [...order], note: `No more unvisited neighbors from ${node} — backtrack.` });
  }
  dfs(start);
  steps.push({ visited: [...visited], current: null, order: [...order], note: `Done. Visit order: ${order.join(' → ')}` });
  return steps;
}

export default function DFS() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 700 });
  const { visited, current, order, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <svg viewBox="0 0 430 200" width="100%" style={{ maxWidth: 430 }}>
          {GRAPH_EDGES.map(([a, b], i) => (
            <line key={i} x1={GRAPH_NODES[a].x} y1={GRAPH_NODES[a].y} x2={GRAPH_NODES[b].x} y2={GRAPH_NODES[b].y} stroke="var(--line)" strokeWidth="1.5" />
          ))}
          {Object.entries(GRAPH_NODES).map(([id, pos]) => {
            const isActive = id === current;
            const isVisited = visited.includes(id);
            return (
              <g key={id}>
                <circle cx={pos.x} cy={pos.y} r="20"
                  fill={isActive ? 'rgba(245,166,35,0.18)' : isVisited ? 'rgba(94,234,212,0.12)' : 'var(--bg-raised)'}
                  stroke={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--line)'} strokeWidth="1.6" />
                <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700"
                  fill={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--text-dim)'}>{id}</text>
              </g>
            );
          })}
        </svg>
        <div className="queue-row">
          <span className="pill">Call stack</span>
          {order.length === 0 && <span style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>empty</span>}
          {order.map((n, i) => <div key={i} className="block" style={{ width: 40, height: 32 }}>{n}</div>)}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="DFS from A" />
    </div>
  );
}
