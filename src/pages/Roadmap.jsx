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

// Stage → which rows it spans (min row, max row across all topics in that stage)
function stageRowBands() {
  const bands = {};
  ROADMAP.forEach((t) => {
    if (!bands[t.stage]) bands[t.stage] = { min: t.row, max: t.row };
    else {
      bands[t.stage].min = Math.min(bands[t.stage].min, t.row);
      bands[t.stage].max = Math.max(bands[t.stage].max, t.row);
    }
  });
  return bands;
}

const STAGE_COLORS = {
  foundations: 'rgba(15,156,134,0.055)',
  linear: 'rgba(94,234,212,0.055)',
  patterns: 'rgba(201,106,21,0.055)',
  nonlinear: 'rgba(15,156,134,0.055)',
  graph: 'rgba(124,92,209,0.07)',
  advanced: 'rgba(201,106,21,0.07)',
};
const STAGE_BORDER = {
  foundations: 'rgba(15,156,134,0.15)',
  linear: 'rgba(94,234,212,0.18)',
  patterns: 'rgba(201,106,21,0.18)',
  nonlinear: 'rgba(15,156,134,0.15)',
  graph: 'rgba(124,92,209,0.2)',
  advanced: 'rgba(201,106,21,0.2)',
};

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

  const maxRow = Math.max(...ROADMAP.map((t) => t.row));
  const height = TOP_PAD * 2 + maxRow * ROW_H;
  const width = CENTER_X * 2 + COL_W;

  const stageOf = (s) => STAGES.find((x) => x.id === s);
  const bands = useMemo(() => stageRowBands(), []);

  return (
    <div className="roadmap-page">
      <span className="eyebrow">The complete path</span>
      <h1>Beginner → Advanced Roadmap</h1>
      <p style={{ maxWidth: 580, marginTop: 10 }}>
        Every node is a topic on the path from Python fundamentals to advanced DSA.
        Click any node to open its lesson. Lines show prerequisites — follow top to bottom.
      </p>

      <div className="roadmap-legend">
        {STAGES.map((s) => (
          <span key={s.id} className="pill"><i className={`dot dot-${s.color}`} />{s.label}</span>
        ))}
      </div>

      <div className="roadmap-scroll">
        {/* Stage background bands (rendered behind SVG) */}
        <div style={{ position: 'absolute', top: 0, left: 0, width, height, pointerEvents: 'none', zIndex: 0 }}>
          {STAGES.map((s) => {
            const b = bands[s.id];
            if (!b) return null;
            const yTop = TOP_PAD + b.min * ROW_H - ROW_H * 0.45;
            const yBot = TOP_PAD + b.max * ROW_H + ROW_H * 0.48;
            return (
              <div key={s.id} style={{
                position: 'absolute',
                left: 12, right: 12,
                top: yTop,
                height: yBot - yTop,
                background: STAGE_COLORS[s.id] || 'transparent',
                borderLeft: `3px solid ${STAGE_BORDER[s.id] || 'transparent'}`,
                borderRadius: 10,
                display: 'flex', alignItems: 'flex-start',
              }}>
                <span style={{
                  fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: s.color === 'violet' ? '#7c5cd1' : s.color === 'amber' ? '#c96a15' : '#0f9c86',
                  padding: '3px 7px', opacity: 0.8,
                }}>{s.label}</span>
              </div>
            );
          })}
        </div>

        <svg width={width} height={height} className="roadmap-svg" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
          {ROADMAP.map((t) =>
            t.deps.map((depId) => {
              const a = pos[depId];
              const b = pos[t.id];
              if (!a || !b) return null;
              const lit = hover === t.id || hover === depId;
              const midY = (a.y + b.y) / 2;
              return (
                <path
                  key={depId + '-' + t.id}
                  d={`M${a.x},${a.y + 20} C ${a.x},${midY} ${b.x},${midY} ${b.x},${b.y - 20}`}
                  fill="none"
                  stroke={lit ? 'var(--cyan)' : 'var(--line)'}
                  strokeWidth={lit ? 2.2 : 1.4}
                  strokeDasharray={lit ? undefined : undefined}
                  opacity={lit ? 1 : 0.7}
                />
              );
            })
          )}
        </svg>

        <div className="roadmap-nodes" style={{ height, width, position: 'relative', zIndex: 2 }}>
          {ROADMAP.map((t) => {
            const p = pos[t.id];
            const stage = stageOf(t.stage);
            const done = isDone(t.id);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, delay: t.row * 0.018 }}
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
