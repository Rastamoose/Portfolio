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
        visual={<img src="/renderer.png" alt="3D wireframe renderer" 
          style={{ 
            maxWidth: "100%", 
            maxHeight: "100%", 
            objectFit: "scale-down", 
            objectPosition: "center center", 
            display: "block", 
            borderRadius: "8px" 
          }} />}
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
