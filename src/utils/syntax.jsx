import React from 'react'

export function highlightCpp(src) {
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
