import React, { useEffect } from 'react'
import { useTweaks, TweaksPanel, TweakSection, TweakColor } from './tweaks-panel'
import Backdrop from './components/Backdrop'
import Sidebar from './components/Sidebar'
import About from './sections/About'
import Achievements from './sections/Achievements'
import Build from './sections/Build'
import Writing from './sections/Writing'
import { hexToRgba } from './utils/color'

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#4ADE80",
  "background": "#08080B"
}/*EDITMODE-END*/;

export default function App() {
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
        <Achievements />
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
