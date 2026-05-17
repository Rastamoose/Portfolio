import React from 'react'
import SectionHead from '../components/SectionHead'
import HighlightCard from '../components/HighlightCard'
import Timeline from '../components/Timeline'
import { RENDERER, RENDERER_SNIPPET, BUILD_TIMELINE } from '../data/build'
import { highlightCpp } from '../utils/syntax'

export default function Build() {
  return (
    <section className="section" id="build">
      <SectionHead num="02" title="build" role={RENDERER.role} meta={RENDERER.meta} />
      <HighlightCard
        data={RENDERER}
        visual={<pre className="code-block">{highlightCpp(RENDERER_SNIPPET)}</pre>}
      />
      <div className="timeline-head">
        <span>also shipped</span>
        <span className="rule"></span>
        <span>{BUILD_TIMELINE.length} entries</span>
      </div>
      <Timeline rows={BUILD_TIMELINE} />
    </section>
  );
}
