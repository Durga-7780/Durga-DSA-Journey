import './VizControls.css';

export default function VizControls({ ctrl, label }) {
  const { playing, play, pause, stepForward, stepBack, reset, index, total, isEnd } = ctrl;
  return (
    <div className="viz-controls">
      <div className="viz-controls-buttons">
        <button className="vc-btn" onClick={reset} aria-label="Reset" title="Reset">⟲</button>
        <button className="vc-btn" onClick={stepBack} disabled={index === 0} aria-label="Step back" title="Step back">⏮</button>
        {playing ? (
          <button className="vc-btn vc-btn-primary" onClick={pause} aria-label="Pause" title="Pause">⏸</button>
        ) : (
          <button className="vc-btn vc-btn-primary" onClick={play} disabled={isEnd} aria-label="Play" title="Play">▶</button>
        )}
        <button className="vc-btn" onClick={stepForward} disabled={isEnd} aria-label="Step forward" title="Step forward">⏭</button>
      </div>
      <div className="viz-controls-meta">
        <span className="mono">{index + 1} / {total}</span>
        {label ? <span className="viz-controls-label">{label}</span> : null}
      </div>
    </div>
  );
}
