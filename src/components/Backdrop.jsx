import React, { useEffect, useRef } from 'react'

export default function Backdrop() {
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
