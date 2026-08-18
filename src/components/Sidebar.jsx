import { NavLink } from 'react-router-dom';
import { NAV_ORDER } from '../data/roadmap.js';
import useProgress from '../hooks/useProgress.js';
import './Sidebar.css';

export default function Sidebar({ open, onClose }) {
  const { isDone, count } = useProgress();
  const total = NAV_ORDER.length;

  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <NavLink to="/" className="sidebar-brand" onClick={onClose}>
          <span className="sidebar-brand-mark" />
          DSA LAB
        </NavLink>

        <div className="sidebar-progress">
          <div className="sidebar-progress-row">
            <span>Progress</span>
            <span className="mono">{count}/{total}</span>
          </div>
          <div className="sidebar-progress-bar">
            <div className="sidebar-progress-fill" style={{ width: `${(count / total) * 100}%` }} />
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/roadmap" className="sidebar-link special" onClick={onClose}>◆ Full Roadmap</NavLink>
          <NavLink to="/patterns" className="sidebar-link special" onClick={onClose}>◆ Pattern Recognition</NavLink>
          <NavLink to="/recognize" className="sidebar-link special" onClick={onClose}>◆ How Do I Recognize It?</NavLink>
          <div className="sidebar-divider" />
          {NAV_ORDER.map((t) => (
            <NavLink key={t.id} to={`/topic/${t.id}`} className="sidebar-link" onClick={onClose}>
              <span className="sidebar-num mono">{t.num}</span>
              <span className="sidebar-title">{t.title}</span>
              {isDone(t.id) ? <span className="sidebar-check">✓</span> : !t.ready ? <span className="sidebar-soon">soon</span> : null}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
