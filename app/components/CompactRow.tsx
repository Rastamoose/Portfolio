'use client'
import { useState } from 'react'

type CompactRowProps = {
  year: string
  title: string
  shortDesc: string
  longDesc?: string
  tags?: string[]
  thumbLabel?: string
  link?: { label: string; href: string; external?: boolean }
}

export function CompactRow({ year, title, shortDesc, longDesc, tags, thumbLabel, link }: CompactRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="grid grid-cols-[44px_1fr_auto_auto] gap-x-5 py-4 border-b border-border cursor-default transition-colors duration-300"
      style={{ backgroundColor: open ? '#0C1211' : 'transparent' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Year */}
      <span className="font-mono text-xs text-accent pt-px">{year}</span>

      {/* Title + always-visible short desc + smooth-expand detail */}
      <div>
        <div className="font-mono text-sm text-primary">
          {title} <span className="text-muted">→</span>
        </div>
        <div className="font-mono text-xs text-secondary mt-1 leading-relaxed">
          {shortDesc}
        </div>

        {/* Smooth height reveal via CSS grid-template-rows */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.28s ease-in-out',
          }}
        >
          <div className="overflow-hidden">
            <div className="pt-2">
              {longDesc && (
                <div className="font-mono text-xs text-secondary leading-relaxed">
                  <span className="text-accent">what · </span>
                  {longDesc}
                </div>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="border border-border px-2 py-px font-mono text-[10px] text-muted uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Thumb pill */}
      <div className="flex items-start pt-px">
        {thumbLabel ? (
          <span className="border border-border px-2 py-px font-mono text-[10px] text-muted uppercase tracking-wider whitespace-nowrap">
            {thumbLabel}
          </span>
        ) : (
          <span className="w-16" />
        )}
      </div>

      {/* Link */}
      <div className="flex items-start pt-px">
        {link ? (
          <a
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="font-mono text-xs text-muted hover:text-primary transition-colors duration-150 whitespace-nowrap"
          >
            {link.label} {link.external ? '↗' : '→'}
          </a>
        ) : (
          <span className="font-mono text-xs text-muted">—</span>
        )}
      </div>
    </div>
  )
}
