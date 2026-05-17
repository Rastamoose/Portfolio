import React from 'react'
import SectionHead from '../components/SectionHead'
import HighlightCard from '../components/HighlightCard'
import Timeline from '../components/Timeline'
import { SANOBAND, ACHIEVEMENTS_TIMELINE } from '../data/achievements'

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <SectionHead num="01" title="achievements" role={SANOBAND.role} meta={SANOBAND.meta} />
      <HighlightCard
        data={SANOBAND}
        visual={<img src="/sft_presenting.png" alt={SANOBAND.visual.placeholder} 
        style={{ 
          maxWidth: "100%", 
          maxHeight: "330px", 
          objectFit: "contain", 
          objectPosition: "center center", 
          display: "block", 
          borderRadius: "3px"
         }} />}
      />
      <div className="timeline-head">
        <span>also recognised</span>
        <span className="rule"></span>
        <span>{ACHIEVEMENTS_TIMELINE.length} entries</span>
      </div>
      <Timeline rows={ACHIEVEMENTS_TIMELINE} />
    </section>
  );
}
