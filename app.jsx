import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { useTweaks, TweaksPanel, TweakSection, TweakColor } from './tweaks-panel'

/* ─────────────────────────────────────────────
   ambient ascii backdrop — canvas, fixed full-viewport, z:0
   single DOM node, GPU-composited, drawn once on mount/resize
   ───────────────────────────────────────────── */
function Backdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const FONT_SIZE = 12;
    const CHAR_W = FONT_SIZE * 1.55;
    const LINE_H = FONT_SIZE * 1.6;
    const PAD_X = 32;
    const PAD_Y = 24;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `400 ${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'top';

      const cols = Math.ceil(W / CHAR_W) + 4;
      const rows = Math.ceil(H / LINE_H) + 4;

      // batch draw calls by colour to minimise fillStyle changes
      const dots = [], plus = [], slash1 = [], slash2 = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const h = (r * 1747 + c * 433 + r * c * 17) % 100;
          const x = PAD_X + c * CHAR_W;
          const y = PAD_Y + r * LINE_H;
          if (h < 3)      plus.push(x, y);
          else if (h < 5) slash1.push(x, y);
          else if (h < 7) slash2.push(x, y);
          else            dots.push(x, y);
        }
      }

      ctx.fillStyle = 'rgba(255,255,255,0.034)';
      for (let i = 0; i < dots.length; i += 2) ctx.fillText('·', dots[i], dots[i + 1]);
      ctx.fillStyle = 'rgba(74,222,128,0.10)';
      for (let i = 0; i < plus.length; i += 2) ctx.fillText('+', plus[i], plus[i + 1]);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i < slash1.length; i += 2) ctx.fillText('/', slash1[i], slash1[i + 1]);
      for (let i = 0; i < slash2.length; i += 2) ctx.fillText('─', slash2[i], slash2[i + 1]);
    };

    let raf;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };

    draw();
    document.fonts.ready.then(draw);
    window.addEventListener('resize', schedule);
    return () => { window.removeEventListener('resize', schedule); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={canvasRef} className="backdrop" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   sidebar — sticky, with vertical nav rail
   ───────────────────────────────────────────── */
function Sidebar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = ["about", "highlights", "build", "writing"];
    let sections = [];
    let rafPending = false;
    let lastActive = "about";

    // cache offsetTop once; re-cache only on resize to avoid forced reflow on scroll
    const cacheSections = () => {
      sections = ids.map(id => {
        const el = document.getElementById(id);
        return { id, top: el ? el.offsetTop : 0 };
      });
    };

    const check = () => {
      rafPending = false;
      const mid = window.scrollY + 180;
      let cur = "about";
      for (const s of sections) {
        if (s.top <= mid) cur = s.id;
      }
      if (cur !== lastActive) { lastActive = cur; setActive(cur); }
    };

    const onScroll = () => {
      if (!rafPending) { rafPending = true; requestAnimationFrame(check); }
    };

    cacheSections();
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", cacheSections);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", cacheSections);
    };
  }, []);

  const items = [
    ["about",      "ABOUT"],
    ["highlights", "HIGHLIGHTS"],
    ["build",      "BUILD"],
    ["writing",    "WRITING"],
  ];

  return (
    <aside className="sidebar">
      <div className="side-brand">
        <span className="com">/*</span> portfolio <span className="com">*/</span>
      </div>
      <h1 className="side-name">Harris</h1>
      <div className="side-role">BUILDER · STUDENT</div>
      <p className="side-bio">
        Computer science student. <b>Samsung Solve for Tomorrow</b> winner.
        ML systems, low-level graphics, occasional cryptography.
      </p>

      <nav className="side-nav">
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
            <span className="rule"></span>
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <p className="side-ps">
        ps... check out my <a href="https://aligncreatives.co.uk/" target="_blank" rel="noreferrer">digital marketing agency</a>
      </p>

      <div className="side-social">
        <a href="https://github.com/Rastamoose" target="_blank" rel="noreferrer">github</a>
        <a href="https://www.linkedin.com/in/harrisasif/" target="_blank" rel="noreferrer">linkedin</a>
        <a href="mailto:harrisasif1212@gmail.com">email</a>
        <a href="/cv.pdf" target="_blank" rel="noreferrer">cv.pdf</a>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   shared section header
   ───────────────────────────────────────────── */
function SectionHead({ num, title, role, meta }) {
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

function Placeholder({ label, ratio }) {
  return (
    <div className="placeholder" style={ratio ? { aspectRatio: ratio } : undefined} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   00 · About — short prose intro
   ───────────────────────────────────────────── */
function About() {
  return (
    <section className="section" id="about">
      <SectionHead num="00" title="about" />
      <p className="about-prose">
        I'm Harris — a computer science student at UCL. I tend to work on
	  projects around <b> machine learning</b>, <b> graphics</b> or really just whatever catches my interest
        I like building from first principles and messing around with what goes on at the lowest level.
      </p>
      <p className="about-prose">
        Recently, I've been trying my hand at startups, hackathons and building with a marketable end product in mind. 
	  I submitted my first take to a tech for good competition and ended up winning <b> Samsung Solve for Tomorrow UK (£10,000)</b>
	   for pitching SanoBand, an ML-based mobile system that detects alcohol cravings and triggers real-time interventions. I've also 
	  gone through a few <b> research competitions</b> and <b> hackathons</b> which you can see below :).
      </p>
      <p className="about-prose">
        Outside of a computer: teaching, hiking and spending an unreasonable amount of time perfecting my banana bread.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────
   01 · Highlights — Samsung headline + timeline
   ───────────────────────────────────────────── */
const HIGHLIGHTS_TIMELINE = [
  {
    year: "2024",
    label: "Caius Explore Competition",
    desc: "Cambridge — winning paper on Shor's algorithm vs ECC and QKD.",
    thumb: "PAPER",
    out: "paper ↗",
    detail: {
      tag: "what · ",
      body: "Authored a winning paper analysing the impact of Shor’s Algorithm on elliptic-curve cryptography and quantum key distribution methods",
      pills: ["cryptography", "writing", "winner"],
    },
  },
  {
    year: "2024",
    label: "IRIS — Best Research Project",
    desc: "RNN classifier on LHC collision data (CERN ATLAS). 97% test accuracy.",
    thumb: "PLOT · CM",
    out: "publication ↗",
    detail: {
      tag: "what · ",
      body: "Applied Recurrent Neural Networks to classify Higgs Boson events using LHC collision data (97% test accuract); published as the best IRIS Research Project 2024",
      pills: ["pytorch", "cern atlas", "97% acc"],
    },
  },
  {
    year: "2023",
    label: "Arkwright Engineering Scholar",
    desc: "National scholarship — top engineering students by competitive process.",
    thumb: "SCHOLAR",
    out: "—",
    detail: {
      tag: "what · ",
      body: "Selected as one of the UK’s top engineering students through a competitive national process recognising exceptional technical aptitude and innovation. Gained access to funding, mentoring and private scholar workshops",
      pills: ["national", "scholarship"],
    },
  },
  {
    year: "2023",
    label: "AFS-BP Global STEM Academies — China Scholar",
    desc: "Top 3% of candidates worldwide. UPenn CSIS Global Citizenship course.",
    thumb: "SCHOLAR",
    out: "—",
    detail: {
      tag: "what · ",
      body: "Selected from top 3% of candidates worldwide; four-week funded STEM programme in China and twelve-week Global Citizenship course (University of Pennsylvania CSIS)",
      pills: ["top 3%", "scholarship", "upenn"],
    },
  },
];

function Highlights() {
  return (
    <section className="section" id="highlights">
      <SectionHead
        num="01"
        title="highlights"
        role={'"i compete, i win, i get recognised."'}
        meta="2023 → 2025"
      />

      <div className="head-card">
        <div className="head-eyebrow">
          <span className="pill">headline</span>
          <span>2025 · samsung solve for tomorrow uk · winner</span>
        </div>
        <h2><span className="arrow">→</span>SanoBand</h2>
        <p className="lede">
          An ML-based mobile system detecting alcohol cravings from biosignal
          patterns and triggering real-time interventions. We led <b>over 100 user studies</b>, <b>collaborated with leading researchers internationally </b> 
	   and pitched out prototype to judges from Samsung Electronics UK.
        </p>
        <p className="lede">
          Awarded <b>£10,000</b> by Samsung as the UK winner of Solve for
          Tomorrow — chosen from a national field of teams in the 16-18 year old category.
        </p>
        <div className="head-visual">
          <div className="visual-label">
            <span>fig.01 · sanoband — wearable + companion app</span>
            <span>16:9</span>
          </div>
          <Placeholder label="sanoband · device + app" />
          <div className="corner-mark">
            <span>biosignal · ml inference · real-time intervention</span>
            <span className="green">samsung 2025</span>
          </div>
        </div>
        <div className="body-meta">
          <div className="metric"><span className="num">£10K</span><span className="lbl">samsung award</span></div>
          <div className="metric"><span className="num">100+</span><span className="lbl">user studies</span></div>
          <div className="metric"><span className="num">UK</span><span className="lbl">national winner</span></div>
          <div className="metric"><span className="num">16–18</span><span className="lbl">age category</span></div>
        </div>
        <div className="ctas">
          <a href="#" className="primary">case study <span className="arr">→</span></a>
          <a href="#">press <span className="arr">↗</span></a>
        </div>
      </div>

      <div className="timeline-head">
        <span>also recognised</span>
        <span className="rule"></span>
        <span>{HIGHLIGHTS_TIMELINE.length} entries</span>
      </div>
      <Timeline rows={HIGHLIGHTS_TIMELINE} />
    </section>
  );
}

/* ─────────────────────────────────────────────
   02 · Build — C++ Renderer headline + timeline
   ───────────────────────────────────────────── */
const RENDERER_SNIPPET =
`/* perspective project a vec3 onto screen space */
Vec2 project(const Vec3& p, float persp) {
    float z = p.z + persp;
    float f = persp / z;
    return { p.x * f, p.y * f };
}

/* compose rotation, then draw cube edge by edge */
for (auto& v : verts) {
    v = rotX(rotY(rotZ(v, az), ay), ax);
}
for (auto [i, j] : edges) {
    draw_edge(buf, project(verts[i], persp),
                   project(verts[j], persp));
}`;

function highlight(src) {
  const kw = /\b(void|int|float|return|const|if|else|while|for|struct|class|auto)\b/g;
  const out = [];
  let i = 0;
  src.split(/(\/\*[\s\S]*?\*\/|\/\/.*)/g).forEach((chunk) => {
    if (!chunk) return;
    if (chunk.startsWith("/*") || chunk.startsWith("//")) {
      out.push(<span key={i++} className="c">{chunk}</span>);
    } else {
      const parts = chunk.split(kw);
      parts.forEach((p) => {
        if (kw.test(p)) {
          out.push(<span key={i++} className="k">{p}</span>);
        } else {
          out.push(<React.Fragment key={i++}>{p}</React.Fragment>);
        }
        kw.lastIndex = 0;
      });
    }
  });
  return out;
}

const BUILD_TIMELINE = [
  {
    year: "2025",
    label: "Tract — Hack for Gaza",
    desc: "Prototype for tracking missing families in war-zones. Built mapping infra + landing in 48 hours.",
    thumb: "LANDING",
    out: "site ↗",
    detail: {
      tag: "what · ",
      body: "48-hour build for the Hack for Gaza humanitarian hackathon. Mapbox layer over crowdsourced reports, paired with a public landing page.",
      pills: ["next.js", "mapbox", "48hr build"],
    },
  },
];

function Build() {
  return (
    <section className="section" id="build">
      <SectionHead
        num="02"
        title="build"
        role={'"when i build things, i build them from first principles."'}
        meta="systems · graphics · ml"
      />

      <div className="head-card">
        <div className="head-eyebrow">
          <span className="pill">headline</span>
          <span>2024 · c++ · from scratch</span>
        </div>
        <h2><span className="arrow">→</span>3D Wireframe Renderer</h2>
        <p className="lede">
          A wireframe graphics engine built from the ground up with no graphics
          libraries, no third-party math and no vibecoding. The point was to internalise the
          transform pipeline by writing every step myself: model-space
          vertices, view & perspective matrices, perspective divide, and a
          hand-rolled edge rasteriser drawing into a software framebuffer.
        </p>
        <p className="lede">
          Rotation is composed from individual axis matrices; clipping is
          handled per-edge against the view frustum before projection.
          <b> Didn't put a whole lot into performance optimisation, the goal was to understand the maths well
          enough to debug it without blaming a library.</b>
        </p>
        <div className="head-visual">
          <div className="visual-label">
            <span>fig.02 · transform → rasterise → framebuffer</span>
            <span>excerpt</span>
          </div>
          <pre className="code-block">{highlight(RENDERER_SNIPPET)}</pre>
          <div className="corner-mark">
            <span>handwritten matmul · no glm · no opengl</span>
            <span className="green">2024</span>
          </div>
        </div>
        <div className="body-meta">
          <div className="metric"><span className="num">C++17</span><span className="lbl">language</span></div>
          <div className="metric"><span className="num">~1.4k</span><span className="lbl">lines</span></div>
          <div className="metric"><span className="num">SDL2</span><span className="lbl">framebuffer only</span></div>
          <div className="metric"><span className="num">0</span><span className="lbl">graphics deps</span></div>
        </div>
        <div className="ctas">
          <a href="#" className="primary">writeup <span className="arr">→</span></a>
          <a href="#">code <span className="arr">↗</span></a>
        </div>
      </div>

      <div className="timeline-head">
        <span>also shipped</span>
        <span className="rule"></span>
        <span>{BUILD_TIMELINE.length} entries</span>
      </div>
      <Timeline rows={BUILD_TIMELINE} />
    </section>
  );
}

/* ─────────────────────────────────────────────
   timeline component (option A — end-cap thumb + hover-reveal)
   ───────────────────────────────────────────── */
function Timeline({ rows }) {
  return (
    <div className="timeline">
      {rows.map((e, i) => (
        <div className="tl-row" key={i}>
          <span className="year">{e.year}</span>
          <span className="body">
            <span className="label">
              {e.label}
              <span className="arrow">→</span>
            </span>
            <span className="desc">{e.desc}</span>
          </span>
          <span className="thumb">{e.thumb}</span>
          <span className="out">{e.out !== "—" ? <a href="#">{e.out}</a> : e.out}</span>
          {e.detail && (
            <div className="tl-detail">
              <div>
                <span className="tag">{e.detail.tag}</span>
                {e.detail.body}
                {e.detail.pills && (
                  <div className="pills">
                    {e.detail.pills.map((p, j) => <span key={j}>{p}</span>)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   03 · Writing
   ───────────────────────────────────────────── */
const WRITING = [
  {
    year: "2025",
    title: "How Quantum Computers Are Shattering Traditional Encryption Paradigms",
    desc: "Amongst winners of the Caius Explore Competition (Cambridge University). A paper looking at how Shor's algorithm can be used to break ECDH encryption, and how quantum methods of encryption - BB84 and QSDC - are invulnerable to such attacks.",
    out: "paper ↗",
  },
  {
    year: "2024",
    title: "Applicaitons of Recurrent Neural Networks in detecting the Higgs Boson and other exotic particles",
    desc: "A research poster on traditional methods of detecting the Higgs Boson from particle collision events, how an RNN (specifically an LSTM network) can be used for the same purpose, and its application in potentially detecting the theoretical magnetic monopole.",
    out: "poster ↗",
  },
];

function Writing() {
  return (
    <section className="section" id="writing">
      <SectionHead num="03" title="writing" meta={`${WRITING.length} entries`} />
      <div className="writing">
        {WRITING.map((w, i) => (
          <div className="write-row" key={i}>
            <span className="year">{w.year}</span>
            <span>
              <div className="title">{w.title}</div>
              <div className="desc">{w.desc}</div>
            </span>
            <span className="out"><a href="#">{w.out}</a></span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   App + Tweaks
   ───────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#4ADE80",
  "background": "#08080B"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--accent-dim", hexToRgba(t.accent, 0.12));
    r.style.setProperty("--accent-soft", hexToRgba(t.accent, 0.04));
    r.style.setProperty("--bg", t.background);
  }, [t.accent, t.background]);

  return (
    <div className="layout" data-screen-label="Portfolio v3">
      <Backdrop />
      <Sidebar />
      <main className="main">
        <About />
        <Highlights />
        <Build />
        <Writing />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Aesthetic" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#4ADE80", "#22C55E", "#7EE787", "#34D399", "#F97316", "#7DD3FC"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakColor
          label="Background"
          value={t.background}
          options={["#08080B", "#000000", "#0F0F13", "#15141A", "#1B1A1F"]}
          onChange={(v) => setTweak("background", v)}
        />
      </TweaksPanel>
    </div>
  );
}

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
