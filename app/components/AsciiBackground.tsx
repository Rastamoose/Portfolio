'use client'
import { useEffect, useRef } from 'react'

export function AsciiBackground() {
  const baseRef = useRef<HTMLPreElement>(null)
  const plusRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    function build() {
      const base = baseRef.current
      const plus = plusRef.current
      if (!base || !plus) return

      const CW = 9.6
      const CH = 16
      const cols = Math.ceil(window.innerWidth / CW) + 2
      const rows = Math.ceil(window.innerHeight / CH) + 2

      let baseStr = ''
      let plusStr = ''

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // deterministic per-cell hash
          const h = ((r * 7919 + c * 6271) ^ (r * 1009 + c)) % 1000

          if (h < 25) {          // 2.5% — plus signs (green layer)
            baseStr += ' '
            plusStr += '+'
          } else if (h < 85) {   // 6%  — slashes
            baseStr += '/'
            plusStr += ' '
          } else if (h < 125) {  // 4%  — dashes
            baseStr += '—'
            plusStr += ' '
          } else if (h < 600) {  // 47.5% — dots (matrix fill)
            baseStr += '·'
            plusStr += ' '
          } else {               // 40% — empty
            baseStr += ' '
            plusStr += ' '
          }
        }
        baseStr += '\n'
        plusStr += '\n'
      }

      base.textContent = baseStr
      plus.textContent = plusStr
    }

    build()
    window.addEventListener('resize', build)
    return () => window.removeEventListener('resize', build)
  }, [])

  const shared = 'fixed inset-0 overflow-hidden font-mono text-[10px] leading-4 pointer-events-none select-none whitespace-pre z-0'

  return (
    <>
      {/* dot matrix + slashes/dashes — more visible */}
      <pre ref={baseRef} aria-hidden="true" className={`${shared} text-primary/[0.06]`} />
      {/* + marks in accent green — slightly lower weight */}
      <pre ref={plusRef} aria-hidden="true" className={`${shared} text-accent/[0.20]`} />
    </>
  )
}
