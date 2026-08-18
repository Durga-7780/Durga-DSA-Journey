import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROADMAP, STAGES, byId } from '../data/roadmap.js';
import useProgress from '../hooks/useProgress.js';
import './Roadmap.css';

const COL_W = 170;
const ROW_H = 82;
const CENTER_X = 420;
const TOP_PAD = 48;

export default function RoadmapPage() {
  const { isDone } = useProgress();
  const [hover, setHover] = useState(null);

  const pos = useMemo(() => {
    const map = {};
    ROADMAP.forEach((t) => {
      map[t.id] = { x: CENTER_X + t.col * COL_W, y: TOP_PAD + t.row * ROW_H };
    });
    return map;
  }, []);

  const height = TOP_PAD * 2 + Math.max(...ROADMAP.map((t) => t.row)) * ROW_H;
  const stageOf = (s) => STAGES.find((x) => x.id === s);

  return (
    <div className="roadmap-page">
      <span className="eyebrow">The complete path</span>
      <h1>Beginner → Advanced Roadmap</h1>
      <p style={{ maxWidth: 560, marginTop: 10 }}>
        Every node is a stage on the path from Python fundamentals to advanced DSA. Click any node to open its
        lesson. Lines show prerequisites — follow them top to bottom.
      </p>

      <div className="roadmap-legend">
        {STAGES.map((s) => (
          <span key={s.id} className="pill"><i className={`dot dot-${s.color}`} />{s.label}</span>
        ))}
      </div>

      <div className="roadmap-scroll">
        <svg width={CENTER_X * 2 + COL_W} height={height} className="roadmap-svg">
          {ROADMAP.map((t) =>
            t.deps.map((depId) => {
              const a = pos[depId];
              const b = pos[t.id];
              if (!a || !b) return null;
              const lit = hover === t.id || hover === depId;
              return (
                <path
                  key={depId + '-' + t.id}
                  d={`M${a.x},${a.y + 20} C ${a.x},${(a.y + b.y) / 2} ${b.x},${(a.y + b.y) / 2} ${b.x},${b.y - 20}`}
                  fill="none"
                  stroke={lit ? 'var(--cyan)' : 'var(--line)'}
                  strokeWidth={lit ? 2 : 1.3}
                />
              );
            })
          )}
        </svg>

        <div className="roadmap-nodes" style={{ height, width: CENTER_X * 2 + COL_W }}>
          {ROADMAP.map((t) => {
            const p = pos[t.id];
            const stage = stageOf(t.stage);
            const done = isDone(t.id);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`roadmap-node dot-${stage.color} ${!t.ready ? 'soon' : ''} ${done ? 'done' : ''}`}
                style={{ left: p.x, top: p.y }}
                onMouseEnter={() => setHover(t.id)}
                onMouseLeave={() => setHover(null)}
              >
                <Link to={`/topic/${t.id}`} className="roadmap-node-inner">
                  {done && <span className="roadmap-check">✓</span>}
                  {t.title}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
