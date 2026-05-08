import { SectionHead } from './components/SectionHead'
import { CompactRow } from './components/CompactRow'

/* ── Striped image placeholder ── */
function Placeholder({ label, tone = 'a', aspect }: { label: string; tone?: 'a' | 'b' | 'c'; aspect?: string }) {
  const angles = { a: 135, b: 120, c: 150 }
  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden relative"
      style={{
        aspectRatio: aspect ?? '14/9',
        background: `repeating-linear-gradient(${angles[tone]}deg,
          rgba(255,255,255,0.022) 0 8px,
          rgba(255,255,255,0.042) 8px 16px)`,
        border: '1px solid #262626',
        borderRadius: 2,
      }}
      aria-hidden="true"
    >
      <span
        className="font-mono text-[10px] uppercase tracking-wider text-muted"
        style={{ background: '#0E0E0E', padding: '3px 10px', border: '1px solid #262626' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ── Card corner accent (top-left L, bottom-right L) ── */
function CardCorner({ pos }: { pos: 'tl' | 'br' }) {
  const base = 'absolute w-3 h-3'
  const styles = {
    tl: 'top-0 left-0 border-t border-l border-accent',
    br: 'bottom-0 right-0 border-b border-r border-muted/40',
  }
  return <span className={`${base} ${styles[pos]}`} />
}

/* ── Headline pill ── */
function Headline({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border border-border px-2 py-px font-mono text-[10px] uppercase tracking-wider text-accent mr-3">
      HEADLINE
    </span>
  )
}

/* ── Stat block item ── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-xl font-semibold text-accent">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1">{label}</div>
    </div>
  )
}

/* ── CTA button ── */
function Cta({ label, href, muted }: { label: string; href: string; muted?: boolean }) {
  return (
    <a
      href={href}
      className={[
        'inline-flex items-center border px-4 py-1.5 font-mono text-xs transition-colors duration-150',
        muted
          ? 'border-border text-muted hover:text-primary hover:border-border-strong'
          : 'border-border text-primary hover:border-border-strong',
      ].join(' ')}
    >
      {label}
    </a>
  )
}

/* ── Sub-section header (ALSO RECOGNISED / ALSO SHIPPED) ── */
function AlsoHead({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider mt-10 mb-0">
      <span className="text-muted">{label}</span>
      <span className="flex-1 h-px bg-border" />
      <span className="text-muted">{count} entries</span>
    </div>
  )
}

/* ── Inline code with basic keyword highlighting ── */
const KW = new Set(['const', 'float', 'int', 'void', 'return', 'auto', 'for', 'if'])

function CodeLine({ line }: { line: string }) {
  if (line.trimStart().startsWith('/*') || line.trimStart().startsWith('//')) {
    return <div className="text-muted/60">{line}</div>
  }
  const tokens = line.split(/(\b(?:const|float|int|void|return|auto|for|if)\b)/)
  return (
    <div>
      {tokens.map((t, i) =>
        KW.has(t)
          ? <span key={i} className="text-accent">{t}</span>
          : <span key={i} className="text-secondary/80">{t}</span>
      )}
    </div>
  )
}

const CPP_SNIPPET = `\
/* perspective project a vec3 onto screen space */
Vec2 project(const Vec3& p, float persp) {
    float z = p.z + persp;
    float f = persp / z;
    return { p.x * f, p.y * f };
}

/* compose rotation, then draw cube edge by edge */
void draw_edge(Buffer& b, Vec2 a, Vec2 b_) {
    int dx = abs((int)b_.x - (int)a.x);
    int dy = -abs((int)b_.y - (int)a.y);
    int err = dx + dy, sx = a.x < b_.x ? 1 : -1;
    /* ... loop until endpoint, plot pixel each step */
}`

export default function Page() {
  return (
    <div className="flex flex-col gap-24">

      {/* ══════════════════════════════════════════
          00 · ABOUT
      ══════════════════════════════════════════ */}
      <section id="about">
        <SectionHead num="00" title="About" />

        <div className="flex flex-col gap-5 font-mono text-sm text-secondary leading-relaxed">
          <p>
            I&rsquo;m Harris &mdash; a computer science student in Manchester. My work tends to sit at the
            seams between <strong className="text-primary font-medium">machine learning</strong>,{' '}
            <strong className="text-primary font-medium">systems</strong>, and{' '}
            <strong className="text-primary font-medium">graphics</strong>. I like building from first
            principles and writing about what I learn along the way.
          </p>
          <p>
            Recently I won{' '}
            <strong className="text-primary font-medium">Samsung Solve for Tomorrow UK (£10,000)</strong>
            {' '}for SanoBand, a wearable that detects alcohol cravings from biosignal patterns. Before that
            I was a <strong className="text-primary font-medium">CERN ATLAS</strong> contributor through
            the IRIS programme, where my Higgs Boson RNN classifier hit 97% test accuracy and won Best
            Research Project.
          </p>
          <p>
            Outside of code: bouldering, longform reading, and an unreasonable amount of time spent on
            the geometry of perspective transforms.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          01 · HIGHLIGHTS
      ══════════════════════════════════════════ */}
      <section id="highlights">
        <SectionHead
          num="01"
          title="Highlights"
          quote="&ldquo;i compete, i win, i get recognised.&rdquo;"
          meta="2021 · 2025"
        />

        {/* SanoBand — featured, always open */}
        <div className="relative border border-border bg-elevated p-6 flex flex-col gap-6">
          <CardCorner pos="tl" />
          <CardCorner pos="br" />

          {/* Headline strip — #0E0E11 highlight */}
          <div
            className="flex items-center font-mono text-[10px] uppercase tracking-wider -mx-6 px-6 py-2"
            style={{ background: '#0E0E11' }}
          >
            <Headline>HEADLINE</Headline>
            <span className="text-muted">2025 · Samsung Solve for Tomorrow UK · Winner</span>
          </div>

          {/* Title */}
          <h2 className="font-mono text-2xl text-primary -mt-2">
            <span className="text-muted mr-2">→</span>SanoBand
          </h2>

          {/* Description */}
          <div className="flex flex-col gap-4 font-mono text-sm text-secondary leading-relaxed">
            <p>
              An ML-based mobile system detecting alcohol cravings from biosignal patterns and
              triggering real-time interventions. I pitched the product, led{' '}
              <strong className="text-primary font-medium">over 100 user studies</strong>, and
              shipped a working prototype end-to-end.
            </p>
            <p>
              Awarded <strong className="text-primary font-medium">£10,000</strong> by Samsung as
              the UK winner of Solve for Tomorrow &mdash; chosen from a national field of
              16&ndash;18-year-old teams.
            </p>
          </div>

          {/* Figure + tech tags — tight unit */}
          <div>
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
              <span>FIG.01 · SanoBand &mdash; Wearable + Companion App</span>
              <span>14:9</span>
            </div>
            <Placeholder label="SANOBAND · DEVICE + APP" tone="a" aspect="14/9" />
            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-wider mt-2">
              <span className="text-muted">Biosignal · ML Inference · Real-Time Intervention</span>
              <span className="text-accent">Samsung 2025</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 border-t border-border pt-5">
            <Stat value="£10K"  label="Samsung Award"   />
            <Stat value="100+"  label="User Studies"    />
            <Stat value="UK"    label="National Winner" />
            <Stat value="16–18" label="Age Category"    />
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Cta label="case study →" href="#" />
            <Cta label="press ↗"      href="#" muted />
          </div>
        </div>

        {/* Also Recognised */}
        <AlsoHead label="Also Recognised" count={4} />

        <div className="flex flex-col">
          <CompactRow
            year="2025"
            title="Caius Explore Competition"
            shortDesc="Cambridge — winning paper on Shor's algorithm vs ECC and QKD."
            longDesc="An explainer paper arguing that ECC's classical hardness collapses under Shor's algorithm at scale, and surveying QKD as the practical mitigation. Written for a non-specialist Cambridge audience."
            tags={['cryptography', 'writing', 'winner']}
            thumbLabel="PAPER"
            link={{ label: 'paper', href: '#', external: true }}
          />
          <CompactRow
            year="2024"
            title="IRIS — Best Research Project"
            shortDesc="RNN classifier on LHC collision data (CERN ATLAS). 97% test accuracy."
            longDesc="Sequence model over LHC event records from the ATLAS detector. Custom data pipeline on CERN open data, trained on collision kinematics. 97% test accuracy — awarded Best Research Project by IRIS."
            tags={['ml', 'physics', 'pytorch']}
            thumbLabel="PLOT · CM"
            link={{ label: 'publication', href: '#', external: true }}
          />
          <CompactRow
            year="2024"
            title="Arkwright Engineering Scholar"
            shortDesc="National scholarship — top engineering students by competitive process."
            longDesc="Awarded by the Arkwright Scholarships Trust to outstanding engineering students identified through a competitive national selection process."
            tags={['scholarship']}
            thumbLabel="SCHOLAR"
          />
          <CompactRow
            year="2023"
            title="AFS-BP Global STEM Academies — China Scholar"
            shortDesc="Top 3% of candidates worldwide. UPenn CSIS Global Citizenship course."
            longDesc="Selected into the top 3% of global candidates for the AFS-BP STEM Academies programme. Attended the UPenn Center for Science of Information Global Citizenship course."
            tags={['scholarship', 'stem']}
            thumbLabel="SCHOLAR"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          02 · BUILD
      ══════════════════════════════════════════ */}
      <section id="build">
        <SectionHead
          num="02"
          title="Build"
          quote="&ldquo;when i build things, i build them from first principles.&rdquo;"
          meta="SYSTEMS · GRAPHICS · ML"
        />

        {/* 3D Wireframe Renderer — featured, always open */}
        <div className="relative border border-border bg-elevated p-6 flex flex-col gap-6">
          <CardCorner pos="tl" />
          <CardCorner pos="br" />

          {/* Headline strip — #0E0E11 highlight */}
          <div
            className="flex items-center font-mono text-[10px] uppercase tracking-wider -mx-6 px-6 py-2"
            style={{ background: '#0E0E11' }}
          >
            <Headline>HEADLINE</Headline>
            <span className="text-muted">2024 · C++ · From Scratch</span>
          </div>

          <h2 className="font-mono text-2xl text-primary -mt-2">
            <span className="text-muted mr-2">→</span>3D Wireframe Renderer
          </h2>

          <div className="flex flex-col gap-4 font-mono text-sm text-secondary leading-relaxed">
            <p>
              A wireframe graphics engine built from the ground up &mdash; no graphics libraries,
              no third-party math. The point was to internalise the transform pipeline by writing
              every step myself: model-space vertices, view &amp; perspective matrices, perspective
              divide, and a hand-rolled edge rasteriser drawing into a software framebuffer.
            </p>
            <p>
              Rotation is composed from individual axis matrices; clipping is handled per-edge
              against the view frustum before projection.{' '}
              <strong className="text-primary font-medium">
                Performance was never the point &mdash; understanding the maths well enough to
                debug it without a library to blame was.
              </strong>
            </p>
          </div>

          {/* Code block */}
          <div>
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
              <span>FIG.02 · Transform → Rasterise → Framebuffer</span>
              <span>Excerpt</span>
            </div>
            <div className="bg-background border border-border p-4 overflow-x-auto">
              <pre className="font-mono text-xs leading-5">
                {CPP_SNIPPET.split('\n').map((line, i) => (
                  <CodeLine key={i} line={line} />
                ))}
              </pre>
            </div>
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted mt-2">
              <span>Handwritten Matmul · No SLM · No OpenGL</span>
              <span>2024</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 border-t border-border pt-5">
            <Stat value="C++17"  label="Language"        />
            <Stat value="~1.4k"  label="Lines"           />
            <Stat value="SDL2"   label="Framebuffer Only" />
            <Stat value="0"      label="Graphics Deps"    />
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Cta label="writeup →" href="#" />
            <Cta label="code ↗"    href="#" muted />
          </div>
        </div>

        {/* Also Shipped */}
        <AlsoHead label="Also Shipped" count={3} />

        <div className="flex flex-col">
          <CompactRow
            year="2025"
            title="Tract — Hack for Gaza"
            shortDesc="Prototype for tracking missing families in war-zones. Built mapping infra + landing in 48 hours."
            longDesc="48-hour hackathon build. Designed and shipped a mapping interface for tracking displaced families across conflict zones — Mapbox integration, live data overlay, and a public-facing landing page."
            tags={['next.js', 'mapbox', '48hr']}
            thumbLabel="LANDING"
            link={{ label: 'site', href: '#', external: true }}
          />
          <CompactRow
            year="2025"
            title="SanoBand — engineering"
            shortDesc="Mobile inference on biosignal streams over BLE. Calibration loop, on-device classifier."
            longDesc="The engineering side of SanoBand: real-time BLE data pipeline from wristband to phone, on-device ML inference for craving detection, and a calibration loop that personalises the threshold per user."
            tags={['react native', 'pytorch', 'ble']}
            thumbLabel="ML · BLE"
            link={{ label: 'writeup', href: '#' }}
          />
          <CompactRow
            year="2024"
            title="Higgs Boson RNN — implementation"
            shortDesc="Sequence model over LHC event records. Custom data pipeline, 97% test accuracy."
            longDesc="PyTorch RNN trained on CERN ATLAS open data. Custom ingestion pipeline over collision event sequences, recurrent architecture over kinematic features, 97% test accuracy. Companion to the IRIS submission."
            tags={['pytorch', 'cern', 'python']}
            thumbLabel="PLOT"
            link={{ label: 'code', href: '#', external: true }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          03 · WRITING
      ══════════════════════════════════════════ */}
      <section id="writing" className="pb-32">
        <SectionHead num="03" title="Writing" meta="2 entries" />

        <div className="flex flex-col">
          <CompactRow
            year="2025"
            title="Shor's algorithm vs elliptic-curve cryptography"
            shortDesc="Caius Explore Competition (Cambridge) winner. The classical-quantum threat boundary for ECC and where QKD methods sit on the spectrum."
            longDesc="A detailed treatment of how Shor's algorithm breaks the discrete-log hardness assumption underlying ECC, at what scale this becomes practical, and why QKD is the right mitigation — not post-quantum lattice schemes. Written for a non-specialist audience."
            tags={['cryptography', 'quantum', 'writing']}
            link={{ label: 'pdf', href: '#', external: true }}
          />
          <CompactRow
            year="2024"
            title="Why an RNN for Higgs Boson classification"
            shortDesc="Notes on architecture choice, failure modes encountered, and what I'd swap next time. Companion to the IRIS submission."
            longDesc="Honest post-mortem on the RNN architecture decision: why recurrent over transformer for this data size, what the failure modes were during training, and what I'd do differently. Written alongside the IRIS submission."
            tags={['ml', 'writing', 'physics']}
            link={{ label: 'draft', href: '#', external: true }}
          />
        </div>
      </section>

    </div>
  )
}
