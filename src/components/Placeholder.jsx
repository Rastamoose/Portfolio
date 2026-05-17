import React from 'react'

export default function Placeholder({ label, ratio }) {
  return (
    <div className="placeholder" style={ratio ? { aspectRatio: ratio } : undefined} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
