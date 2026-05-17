import React from 'react'
import SectionHead from '../components/SectionHead'
import HighlightCard from '../components/HighlightCard'
import Placeholder from '../components/Placeholder'
import Timeline from '../components/Timeline'
import { SANOBAND, ACHIEVEMENTS_TIMELINE } from '../data/achievements'

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <SectionHead num="01" title="achievements" role={SANOBAND.role} meta={SANOBAND.meta} />
      <HighlightCard
        data={SANOBAND}
        visual={<Placeholder label={SANOBAND.visual.placeholder} />}
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
