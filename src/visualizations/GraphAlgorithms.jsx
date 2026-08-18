import VizControls from '../components/VizControls.jsx';
import useSteps from '../hooks/useSteps.js';
import './viz.css';

const NODES = { A: { x: 40, y: 100 }, B: { x: 160, y: 40 }, C: { x: 160, y: 160 }, D: { x: 300, y: 40 }, E: { x: 300, y: 160 }, F: { x: 400, y: 100 } };
const EDGES = [['A', 'B', 4], ['A', 'C', 2], ['B', 'D', 5], ['C', 'B', 1], ['C', 'E', 8], ['D', 'F', 3], ['E', 'F', 2], ['D', 'E', 2]];

function buildSteps() {
  const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity };
  const visited = new Set();
  const steps = [{ dist: { ...dist }, visited: [], current: null, note: 'Start: distance to A is 0, everything else unknown (∞).' }];
  const adj = {};
  Object.keys(NODES).forEach((n) => (adj[n] = []));
  EDGES.forEach(([a, b, w]) => { adj[a].push([b, w]); });

  while (visited.size < Object.keys(NODES).length) {
    let u = null, best = Infinity;
    for (const n of Object.keys(NODES)) if (!visited.has(n) && dist[n] < best) { best = dist[n]; u = n; }
    if (u === null) break;
    visited.add(u);
    steps.push({ dist: { ...dist }, visited: [...visited], current: u, note: `Visit ${u} (current shortest known distance: ${dist[u]}).` });
    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        steps.push({ dist: { ...dist }, visited: [...visited], current: u, relax: v, note: `Relax edge ${u}→${v}: ${dist[u]} + ${w} = ${dist[v]}, better than before.` });
      }
    }
  }
  steps.push({ dist: { ...dist }, visited: [...visited], current: null, note: 'Done — shortest distances from A to every node found.' });
  return steps;
}

export default function GraphAlgorithms() {
  const steps = buildSteps();
  const ctrl = useSteps(steps, { speed: 1000 });
  const { dist, visited, current, relax, note } = ctrl.frame;

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <svg viewBox="0 0 440 190" width="100%" style={{ maxWidth: 440 }}>
          {EDGES.map(([a, b, w], i) => (
            <g key={i}>
              <line x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} stroke="var(--line)" strokeWidth="1.4" />
              <text x={(NODES[a].x + NODES[b].x) / 2} y={(NODES[a].y + NODES[b].y) / 2 - 4} fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-faint)" textAnchor="middle">{w}</text>
            </g>
          ))}
          {Object.entries(NODES).map(([id, p]) => {
            const isActive = id === current || id === relax;
            const isVisited = visited.includes(id);
            return (
              <g key={id}>
                <circle cx={p.x} cy={p.y} r="20"
                  fill={isActive ? 'rgba(201,106,21,0.14)' : isVisited ? 'rgba(15,156,134,0.08)' : 'var(--bg-raised)'}
                  stroke={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--line)'} strokeWidth="1.6" />
                <text x={p.x} y={p.y - 2} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700"
                  fill={isActive ? 'var(--amber)' : isVisited ? 'var(--cyan)' : 'var(--text-dim)'}>{id}</text>
                <text x={p.x} y={p.y + 11} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-faint)">
                  {dist[id] === Infinity ? '∞' : dist[id]}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="viz-note">{note}</div>
      </div>
      <VizControls ctrl={ctrl} label="Dijkstra's shortest path from A" />
    </div>
  );
}
