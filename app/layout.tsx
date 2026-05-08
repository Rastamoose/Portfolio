import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { AsciiBackground } from './components/AsciiBackground'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Harris Asif',
  description: 'CS student. Samsung Solve for Tomorrow winner. ML systems, low-level graphics, occasional crypto.',
}

const navItems = [
  { label: 'ABOUT',      href: '#about',      active: false },
  { label: 'HIGHLIGHTS', href: '#highlights',  active: true  },
  { label: 'BUILD',      href: '#build',       active: false },
  { label: 'WRITING',    href: '#writing',     active: false },
]

const socials = [
  { label: 'github',   href: 'https://github.com/' },
  { label: 'linkedin', href: 'https://linkedin.com/in/' },
  { label: 'email',    href: 'mailto:harrisasif1212@gmail.com' },
  { label: 'cv.pdf',   href: '#' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-background text-secondary antialiased">
        <AsciiBackground />

        {/* Centered max-width shell */}
        <div className="relative z-10 min-h-screen flex flex-col items-center">
          <div className="flex flex-col md:flex-row w-full max-w-[1160px] min-h-screen">

            {/* ── Sidebar ── */}
            <aside className="
              flex flex-col flex-shrink-0
              w-full md:w-72
              md:sticky md:top-0 md:h-screen
              p-6 md:p-8
            ">
              <header>
                <p className="font-mono text-xs text-muted">/* portfolio */</p>

                <h1 className="mt-4 font-mono text-4xl font-semibold tracking-tight text-primary">
                  Harris
                </h1>

                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-accent">
                  BUILDER. STUDENT.
                </p>

                <p className="mt-6 text-sm text-secondary leading-relaxed max-w-[28ch]">
                  Computer science student.{' '}
                  <strong className="text-primary font-medium">Samsung Solve for Tomorrow</strong>
                  {' '}winner. ML systems, low-level graphics, occasional cryptography.
                </p>
              </header>

              {/* Nav — desktop only */}
              <nav className="mt-16 hidden md:flex flex-col gap-3" aria-label="Sections">
                {navItems.map(({ label, href, active }) => (
                  <a key={label} href={href} className="flex items-center gap-3 group">
                    <span className={[
                      'h-px transition-all duration-200 ease-in-out',
                      active ? 'w-10 bg-accent' : 'w-6 bg-muted group-hover:w-10',
                    ].join(' ')} />
                    <span className={[
                      'font-mono text-xs uppercase tracking-wider transition-colors duration-200',
                      active ? 'text-accent' : 'text-muted group-hover:text-primary',
                    ].join(' ')}>
                      {label}
                    </span>
                  </a>
                ))}
              </nav>

              {/* Socials */}
              <div className="mt-8 md:mt-auto flex gap-5 flex-wrap">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="font-mono text-xs text-muted hover:text-primary transition-colors duration-200 no-underline"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </aside>

            {/* ── Main content ── */}
            <main className="flex-1 px-6 md:pl-10 md:pr-10 py-8 md:py-20">
              <div className="max-w-[720px]">
                {children}
              </div>
            </main>

          </div>
        </div>
      </body>
    </html>
  )
}
