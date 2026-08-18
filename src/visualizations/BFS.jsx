import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import { GRAPH_NODES, GRAPH_EDGES, ADJ } from './graphData.js';
import './viz.css';

function buildSteps(start = 'A') {
  const visited = new Set([start]);
  let queue = [start];
  const order = [];
  const steps = [{ queue: [...queue], visited: [...visited], current: null, order: [], note: `Enqueue start node ${start}.` }];
  while (queue.length) {
    const node = queue[0];
    queue = queue.slice(1);
    order.push(node);
    steps.push({ queue: [...queue], visited: [...visited], current: node, order: [...order], note: `Dequeue ${node}, process it.` });
    for (const nb of ADJ[node]) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue = [...queue, nb];
        steps.push({ queue: [...queue], visited: [...visited], current: node, order: [...order], note: `${node} → ${nb} unvisited: mark visited, enqueue.` });
      }
    }
  }
  steps.push({ queue: [], visited: [...visited], current: null, order: [...order], note: `Done. Visit order: ${order.join(' → ')}` });
  return steps;
}

export default function BFS() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 850 });
  const { queue, visited, current, note } = ctrl.frame;

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
          <span className="pill">Queue</span>
          {queue.length === 0 && <span style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>empty</span>}
          {queue.map((n, i) => <div key={i} className={`block ${i === 0 ? 'top' : ''}`} style={{ width: 40, height: 32 }}>{n}</div>)}
        </div>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="BFS from A" />
    </div>
  );
}
