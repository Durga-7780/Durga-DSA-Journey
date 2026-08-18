import { useParams, Link, Navigate } from 'react-router-dom';
import { byId, NAV_ORDER } from '../data/roadmap.js';
import topics from '../data/topics.js';
import registry from '../visualizations/index.jsx';
import useProgress from '../hooks/useProgress.js';
import ComingSoon from './ComingSoon.jsx';
import './TopicPage.css';

export default function TopicPage() {
  const { id } = useParams();
  const meta = byId(id);
  const { isDone, toggle } = useProgress();

  if (!meta) return <Navigate to="/roadmap" replace />;
  if (!meta.ready) return <ComingSoon meta={meta} />;

  const t = topics[id];
  const Viz = registry[t.viz];
  const numEntry = NAV_ORDER.find((n) => n.id === id);
  const done = isDone(id);

  return (
    <article className="topic-page">
      <div className="topic-head">
        <span className="eyebrow">Lesson {numEntry?.num} · {t.difficulty}</span>
        <h1>{meta.title}</h1>
        <p className="topic-tagline">{t.tagline}</p>

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

      <TopicSection label="What is it?">
        <p>{t.whatIsIt}</p>
      </TopicSection>

      <TopicSection label="Why do we need it?">
        <p>{t.whyNeeded}</p>
      </TopicSection>

      {Viz && (
        <TopicSection label="Interactive visualization">
          <Viz />
        </TopicSection>
      )}

      <TopicSection label="How does it work?">
        <ol className="flow-list">
          {t.howItWorks.map((step, i) => (
            <li key={i}><span className="flow-num mono">{i + 1}</span><span>{step}</span></li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection label="Python syntax">
        <pre className="code-block">{t.pythonCode}</pre>
      </TopicSection>

      <TopicSection label="Complexity">
        <div className="complexity-row">
          <div><span className="complexity-tag mid">TIME</span> {t.complexity.time}</div>
          <div><span className="complexity-tag good">SPACE</span> {t.complexity.space}</div>
        </div>
        {t.complexity.notes && <p style={{ marginTop: 10 }}>{t.complexity.notes}</p>}
      </TopicSection>

      <TopicSection label="When should I use it?">
        <ul className="bullet-list">{t.whenToUse.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </TopicSection>

      <TopicSection label="How to recognize it in interviews?">
        <ul className="bullet-list">{t.interviewTips.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </TopicSection>

      <TopicSection label="Common mistakes">
        <ul className="bullet-list mistakes">{t.commonMistakes.map((x, i) => <li key={i}>{x}</li>)}</ul>
      </TopicSection>

      {t.related?.length > 0 && (
        <TopicSection label="Related topics">
          <div className="related-row">
            {t.related.map((r) => {
              const rm = byId(r);
              if (!rm) return null;
              return <Link key={r} to={`/topic/${r}`} className="btn btn-ghost">{rm.title} →</Link>;
            })}
          </div>
        </TopicSection>
      )}

      <button className={`mark-done ${done ? 'is-done' : ''}`} onClick={() => toggle(id)}>
        {done ? '✓ Marked as complete' : 'Mark as complete'}
      </button>
    </article>
  );
}

function TopicSection({ label, children }) {
  return (
    <section className="topic-section">
      <h3 className="topic-section-label">{label}</h3>
      <div className="topic-section-body">{children}</div>
    </section>
  );
}
