import React from 'react'
import SectionHead from '../components/SectionHead'
import { ABOUT_PROSE } from '../data/about'

export default function About() {
  return (
    <section className="section" id="about">
      <SectionHead num="00" title="about" />
      {ABOUT_PROSE.map((para, i) => (
        <p key={i} className="about-prose">{para}</p>
      ))}
    </section>
  );
}
