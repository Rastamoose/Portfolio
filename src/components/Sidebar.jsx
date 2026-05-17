import React, { useEffect, useState } from 'react'

const NAV_ITEMS = [
  ["about",        "ABOUT"],
  ["achievements", "achievementS"],
  ["build",        "BUILD"],
  ["writing",      "WRITING"],
];

const SECTION_IDS = NAV_ITEMS.map(([id]) => id);

export default function Sidebar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    let sections = [];
    let rafPending = false;
    let lastActive = "about";

    const cacheSections = () => {
      sections = SECTION_IDS.map(id => {
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
        {NAV_ITEMS.map(([id, label]) => (
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
