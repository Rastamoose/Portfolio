import React from 'react'

export const RENDERER = {
  role: '"when i build things, i build them from first principles."',
  meta: "graphics · ml · systems",
  eyebrow: "2024 · c++ · from scratch",
  title: "3D Wireframe Renderer",
  paragraphs: [
    <>
      A wireframe graphics engine built from the ground up with no graphics libraries, no
      third-party math and no vibecoding. The point was to internalise the transform pipeline
      by writing every step myself: model-space vertices, view & perspective matrices,
      perspective divide, and a hand-rolled edge rasteriser drawing into a software framebuffer.
    </>,
    <>
      Rotation is composed from individual axis matrices; clipping is handled per-edge against
      the view frustum before projection. <b>Didn't put a whole lot into performance optimisation,
      the goal was to understand the maths well enough to debug it without blaming a library.</b>
    </>,
  ],
  visual: {
    label: "fig.02 · transform → rasterise → framebuffer",
    tag: "excerpt",
    cornerText: "handwritten matmul · no glm · no opengl",
    cornerAccent: "2024",
  },
  metrics: [
    { num: "C++17", label: "language" },
    { num: "~1.4k", label: "lines" },
    { num: "SDL2",  label: "framebuffer only" },
    { num: "0",     label: "graphics deps" },
  ],
  ctas: [
    { label: "writeup", href: "#", primary: true },
    { label: "code",    href: "#", primary: false },
  ],
};

export const RENDERER_SNIPPET =
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

export const BUILD_TIMELINE = [
  {
    year: "2025",
    label: "Tract — Hack for Gaza",
    desc: "Prototype for tracking missing families in war-zones. Built mapping infra + landing in 48 hours.",
    thumb: "LANDING",
    out: "-",
    detail: {
      tag: "what · ",
      body: "48-hour build for the Hack for Gaza humanitarian hackathon. Mapbox layer over crowdsourced reports, paired with a public landing page.",
      pills: ["next.js", "mapbox", "48hr build"],
    },
  },
];
