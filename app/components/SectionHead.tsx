type Props = {
  num: string
  title: string
  quote?: string
  meta?: string
}

export function SectionHead({ num, title, quote, meta }: Props) {
  return (
    <div className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-wider mb-7">
      <span className="text-accent font-medium">{num}</span>
      <span className="text-muted">/</span>
      <span className="text-primary font-medium">{title}</span>
      {quote && (
        <>
          <span className="text-muted">—</span>
          <span className="text-secondary normal-case tracking-normal">{quote}</span>
        </>
      )}
      <span className="flex-1 h-px bg-border self-center" />
      {meta && <span className="text-muted text-[10.5px] normal-case tracking-normal">{meta}</span>}
    </div>
  )
}
