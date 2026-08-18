import { Link } from 'react-router-dom';
import { byId } from '../data/roadmap.js';
import './TopicPage.css';

export default function ComingSoon({ meta }) {
  return (
    <article className="topic-page">
      <div className="topic-head">
        <span className="eyebrow">Coming soon</span>
        <h1>{meta.title}</h1>
        <p className="topic-tagline">
          This lesson isn't written yet — it already has a place in the roadmap and navigation,
          and will follow the same What / Why / Visualization / Python / Complexity / Interview
          template as the other lessons once it's added to <code className="mono">data/topics.js</code>.
        </p>
        {meta.deps.length > 0 && (
          <div className="topic-prereqs">
            <span className="topic-prereqs-label">Prerequisites:</span>
            {meta.deps.map((d) => {
              const dm = byId(d);
              return <Link key={d} to={`/topic/${d}`} className="pill">{dm?.title}</Link>;
            })}
          </div>
        )}
      </div>
      <div style={{ marginTop: 40 }}>
        <Link to="/roadmap" className="btn btn-ghost">← Back to roadmap</Link>
      </div>
    </article>
  );
}
