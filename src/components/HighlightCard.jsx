import React from 'react'

export default function HighlightCard({ data, visual }) {
  return (
    <div className="head-card">
      <div className="head-eyebrow">
        <span className="eyebrow-marker"></span>
        <span>{data.eyebrow}</span>
      </div>
      <h2><span className="arrow">→</span>{data.title}</h2>
      {data.paragraphs.map((p, i) => <p key={i} className="lede">{p}</p>)}
      <div className="head-visual">
        <div className="visual-label">
          <span>{data.visual.label}</span>
          <span>{data.visual.tag}</span>
        </div>
        {visual}
        <div className="corner-mark">
          <span>{data.visual.cornerText}</span>
          <span className="green">{data.visual.cornerAccent}</span>
        </div>
      </div>
      <div className="body-meta">
        {data.metrics.map((m, i) => (
          <div key={i} className="metric">
            <span className="num">{m.num}</span>
            <span className="lbl">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="ctas">
        {data.ctas.map((c, i) => (
          <a key={i} href={c.href} className={c.primary ? "primary" : ""}>
            {c.label} <span className="arr">{c.primary ? "→" : "↗"}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
