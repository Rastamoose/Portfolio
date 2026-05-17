import React from 'react'

export default function Timeline({ rows }) {
  return (
    <div className="timeline">
      {rows.map((e, i) => (
        <div className="tl-row" key={i}>
          <span className="year">{e.year}</span>
          <span className="body">
            <span className="label">
              {e.label}
              <span className="arrow">→</span>
            </span>
            <span className="desc">{e.desc}</span>
          </span>
          <span className="thumb">{e.thumb}</span>
          <span className="out">{e.out !== "—" ? <a href="#">{e.out}</a> : e.out}</span>
          {e.detail && (
            <div className="tl-detail">
              <div>
                <span className="tag">{e.detail.tag}</span>
                {e.detail.body}
                {e.detail.pills && (
                  <div className="pills">
                    {e.detail.pills.map((p, j) => <span key={j}>{p}</span>)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
