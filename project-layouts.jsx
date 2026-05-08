import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const PROJECTS = [
  {
    idx: "01",
    title: "SanoBand",
    stack: "react native · pytorch · ble",
    out: "case study →",
    blurb: "ML wearable detecting alcohol cravings from biosignals; £10k Samsung Solve for Tomorrow winner. 100+ user studies.",
    placeholder: "sanoband · device + app",
    placeholderTone: "a",
  },
  {
    idx: "02",
    title: "3D Wireframe Renderer · C++",
    stack: "c++ · sdl2 · linear algebra",
    out: "writeup →",
    blurb: "Software rasteriser with hand-rolled transform pipeline. No graphics libraries. ~1.4k LOC.",
    placeholder: "renderer · wireframe screenshot",
    placeholderTone: "b",
  },
  {
    idx: "03",
    title: "Higgs Boson RNN Classifier",
    stack: "python · pytorch · cern open data",
    out: "paper →",
    blurb: "RNN over LHC collision sequences; 97% test accuracy. IRIS Best Research Project 2024.",
    placeholder: "higgs · plot / confusion matrix",
    placeholderTone: "c",
  },
  {
    idx: "04",
    title: "Tract — Hack for Gaza",
    stack: "next · mapbox · 48hr build",
    out: "site →",
    blurb: "Prototype for tracking missing families in war-zones. Built mapping + UI in 48 hours.",
    placeholder: "tract · landing screenshot",
    placeholderTone: "a",
  },
];

/* striped placeholder — different aspect ratios per layout */
function Placeholder({ label, tone = "a", aspect = "16/10", height }) {
  // tone barely shifts the angle/contrast so adjacent cards don't read identical
  const angles = { a: 135, b: 120, c: 150 };
  const angle = angles[tone] || 135;
  const style = {
    aspectRatio: height ? undefined : aspect,
    height: height || undefined,
    width: "100%",
    background: `repeating-linear-gradient(${angle}deg,
      rgba(255,255,255,0.025) 0 8px,
      rgba(255,255,255,0.045) 8px 16px)`,
    border: "1px solid var(--hairline)",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-mono)",
    fontSize: 10.5,
    color: "var(--fg-faint)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    overflow: "hidden",
    position: "relative",
  };
  return (
    <div style={style} aria-hidden="true">
      <span style={{
        background: "var(--bg)",
        padding: "3px 8px",
        border: "1px solid var(--hairline)",
        borderRadius: 2,
      }}>{label}</span>
    </div>
  );
}

function SectionHead({ letter, title, meta }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 14,
      fontFamily: "var(--font-mono)", fontSize: 12,
      color: "var(--fg-muted)", textTransform: "uppercase",
      letterSpacing: "0.08em", marginBottom: 28,
    }}>
      <span style={{ color: "var(--accent)", fontWeight: 500 }}>option {letter}</span>
      <span>/</span>
      <span style={{ color: "var(--fg)", fontWeight: 500 }}>{title}</span>
      <span style={{ flex: 1, height: 1, background: "var(--hairline)", margin: "0 4px" }}></span>
      {meta && <span style={{ color: "var(--fg-faint)", fontSize: 10.5 }}>{meta}</span>}
    </div>
  );
}

function Frame({ children }) {
  return <div className="frame">{children}</div>;
}

/* ─────────────────────────────────────────────
   A — End-cap thumbnail
   small thumb at the right of each compact row.
   hover still reveals the detail.
   ───────────────────────────────────────────── */
function OptionA() {
  return (
    <section className="explore-sec">
      <SectionHead letter="A" title="end-cap thumbnail" meta="closest to current · least visual" />
      <Frame>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <div className="proj-row optA" key={i}>
              <span className="idx">{p.idx}</span>
              <span className="title">{p.title}<span className="arrow">→</span></span>
              <span className="stack">{p.stack}</span>
              <span className="thumb-end">
                <Placeholder label={p.placeholder} tone={p.placeholderTone} height={36} />
              </span>
              <span className="out"><a href="#">{p.out}</a></span>
              <div className="proj-detail">
                <div><span className="tag">→</span>{p.blurb}</div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
      <p className="explore-note">
        Smallest commitment. Each row stays one line on desktop; the thumb is a 36px-tall strip
        that signals "this thing has visuals." Detail still expands on hover.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────
   B — Side-by-side card
   image left, content right. always shown.
   no hover collapse — blurb always visible.
   ───────────────────────────────────────────── */
function OptionB() {
  return (
    <section className="explore-sec">
      <SectionHead letter="B" title="side-by-side card" meta="most visual · drops hover-reveal" />
      <Frame>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className="proj-card optB" key={i}>
              <div className="proj-card-img">
                <Placeholder label={p.placeholder} tone={p.placeholderTone} aspect="16/10" />
              </div>
              <div className="proj-card-body">
                <div className="row1">
                  <span className="idx">{p.idx}</span>
                  <span className="title">{p.title}</span>
                </div>
                <p className="blurb">{p.blurb}</p>
                <div className="row2">
                  <span className="stack">{p.stack}</span>
                  <a href="#" className="out">{p.out}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
      <p className="explore-note">
        2-col grid of cards. Most visual real-estate. Loses the dense ASCII rhythm
        but reads more like a portfolio. Good when screenshots are strong.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────
   C — Top banner per row
   thin always-visible image banner across top of each row,
   content below. hover still expands extra detail.
   ───────────────────────────────────────────── */
function OptionC() {
  return (
    <section className="explore-sec">
      <SectionHead letter="C" title="top banner per row" meta="visual + dense · keeps hover-reveal" />
      <Frame>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <div className="proj-row optC" key={i}>
              <div className="proj-banner">
                <Placeholder label={p.placeholder} tone={p.placeholderTone} height={88} />
              </div>
              <span className="idx">{p.idx}</span>
              <span className="title">{p.title}<span className="arrow">→</span></span>
              <span className="stack">{p.stack}</span>
              <span className="out"><a href="#">{p.out}</a></span>
              <div className="proj-detail">
                <div><span className="tag">→</span>{p.blurb}</div>
              </div>
            </div>
          ))}
        </div>
      </Frame>
      <p className="explore-note">
        Banner sits above each row. Reads almost like a film-strip — image, then meta, then
        more on hover. Punchier than A, less heavy than B.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────
   D — Inline preview right
   square preview right-aligned beside the row content.
   hover-reveal expands detail beneath.
   ───────────────────────────────────────────── */
function OptionD() {
  return (
    <section className="explore-sec">
      <SectionHead letter="D" title="inline preview · right" meta="balanced · keeps hover-reveal" />
      <Frame>
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <div className="proj-row optD" key={i}>
              <span className="idx">{p.idx}</span>
              <div className="optD-content">
                <div className="title-line">
                  <span className="title">{p.title}<span className="arrow">→</span></span>
                  <span className="stack">{p.stack}</span>
                </div>
                <div className="proj-detail">
                  <div><span className="tag">→</span>{p.blurb}</div>
                </div>
              </div>
              <span className="thumb-side">
                <Placeholder label={p.placeholder} tone={p.placeholderTone} aspect="4/3" />
              </span>
              <span className="out"><a href="#">{p.out}</a></span>
            </div>
          ))}
        </div>
      </Frame>
      <p className="explore-note">
        ~120px square preview pinned to the right of every row, always visible.
        Detail expands underneath on hover. Compromise between A's restraint and B's commitment.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────
   App
   ───────────────────────────────────────────── */
function App() {
  return (
    <div className="page" data-screen-label="Project layout exploration">
      <header className="explore-head">
        <a href="index.html" className="back-link">← back to portfolio</a>
        <div className="explore-title">
          <h1>projects · layout options</h1>
          <p>Four ways to add a permanent image to every row. Same content, same frame, different visual weight.</p>
        </div>
      </header>
      <main className="explore-main">
        <OptionA />
        <OptionB />
        <OptionC />
        <OptionD />
      </main>
      <footer className="foot">
        <span>pick the one that fits — i'll apply it to the live page</span>
        <span><a href="index.html">→ index.html</a></span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
