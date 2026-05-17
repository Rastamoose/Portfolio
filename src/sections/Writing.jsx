import React from 'react'
import SectionHead from '../components/SectionHead'
import { WRITING } from '../data/writing'

export default function Writing() {
  return (
    <section className="section" id="writing">
      <SectionHead num="03" title="writing" meta={`${WRITING.length} entries`} />
      <div className="writing">
        {WRITING.map((w, i) => (
          <div className="write-row" key={i}>
            <span className="year">{w.year}</span>
            <span>
              <div className="title">{w.title}</div>
              <div className="desc">{w.desc}</div>
            </span>
            <span className="out"><a href="#">{w.out}</a></span>
          </div>
        ))}
      </div>
    </section>
  );
}
