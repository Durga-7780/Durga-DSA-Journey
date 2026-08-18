import { useState } from 'react';
import { GRAPH_NODES, GRAPH_EDGES, ADJ } from './graphData.js';
import './viz.css';

export default function Graph() {
  const [hover, setHover] = useState(null);
  const neighbors = hover ? ADJ[hover] : [];

  return (
    <div className="viz-shell">
      <div className="viz-stage">
        <svg viewBox="0 0 430 200" width="100%" style={{ maxWidth: 430 }}>
          {GRAPH_EDGES.map(([a, b], i) => {
            const isLit = hover && (a === hover || b === hover);
            return <line key={i} x1={GRAPH_NODES[a].x} y1={GRAPH_NODES[a].y} x2={GRAPH_NODES[b].x} y2={GRAPH_NODES[b].y}
              stroke={isLit ? 'var(--cyan)' : 'var(--line)'} strokeWidth={isLit ? 2.2 : 1.5} />;
          })}
          {Object.entries(GRAPH_NODES).map(([id, pos]) => {
            const isActive = id === hover;
            const isNeighbor = neighbors.includes(id);
            return (
              <g key={id} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
                <circle cx={pos.x} cy={pos.y} r="20"
                  fill={isActive ? 'rgba(245,166,35,0.18)' : isNeighbor ? 'rgba(94,234,212,0.12)' : 'var(--bg-raised)'}
                  stroke={isActive ? 'var(--amber)' : isNeighbor ? 'var(--cyan)' : 'var(--line)'} strokeWidth="1.6" />
                <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700"
                  fill={isActive ? 'var(--amber)' : isNeighbor ? 'var(--cyan)' : 'var(--text-dim)'}>{id}</text>
              </g>
            );
          })}
        </svg>
        <div className="viz-note">{hover ? <>Node <b>{hover}</b> connects to: {neighbors.join(', ')}</> : 'Hover a node to see its neighbors.'}</div>
      </div>
    </div>
  );
}
