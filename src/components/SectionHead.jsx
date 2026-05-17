import React from 'react'

export default function SectionHead({ num, title, role, meta }) {
  return (
    <div className="section-head">
      <span className="num">{num}</span>
      <span>/</span>
      <span className="title">{title}</span>
      {role && <span className="role-note">— {role}</span>}
      <span className="rule"></span>
      {meta && <span className="meta">{meta}</span>}
    </div>
  );
}
