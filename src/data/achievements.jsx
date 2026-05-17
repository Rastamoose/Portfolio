import React from 'react'

export const SANOBAND = {
  role: '',
  meta: "2023 → 2025",
  eyebrow: "2025 · samsung solve for tomorrow uk · winner",
  title: "SanoBand",
  paragraphs: [
    <>
      An ML-based mobile system detecting alcohol cravings from biosignal patterns and triggering
      real-time interventions. We led <b>over 100 user studies</b>, <b>collaborated with leading
      researchers internationally</b> and pitched our prototype to judges from Samsung Electronics UK.
    </>,
    <>
      Awarded <b>£10,000</b> by Samsung as the UK winner of Solve for Tomorrow — chosen from a
      national field of teams in the 16-18 year old category.
    </>,
  ],
  visual: {
    label: "fig.01 · pitching sanoband — wearable + companion app",
    placeholder: "sanoband · device + app",
    cornerText: "biosignal · ml inference · real-time intervention",
    cornerAccent: "samsung 2025",
  },
  metrics: [
    { num: "£10K",  label: "samsung funding" },
    { num: "100+",  label: "user studies" },
    { num: "UK",    label: "national winner" },
    { num: "16–18", label: "age category" },
  ],
  ctas: [
    {label: "project",      href: "https://www.samsung.com/uk/solvefortomorrow/highlights/articles/sft-2025-winners-team-sanoband-16-18/", primary: true },
    { label: "article", href: "https://www.manchestereveningnews.co.uk/news/greater-manchester-news/three-teens-set-out-tackle-32082508", primary: false},
  ],
};

export const ACHIEVEMENTS_TIMELINE = [
  {
    year: "2024",
    label: "Caius Explore Competition",
    desc: "Cambridge — winning paper on Shor's algorithm vs ECC and QKD.",
    thumb: "PAPER",
    out: "-",
    detail: {
      tag: "what · ",
      body: "Authored a winning paper analysing the impact of Shor's Algorithm on elliptic-curve cryptography and quantum key distribution methods",
      pills: ["cryptography", "writing", "winner"],
    },
  },
  {
    year: "2024",
    label: "IRIS — Best Research Project",
    desc: "RNN classifier on LHC collision data (CERN ATLAS). 97% test accuracy.",
    thumb: "PLOT · CM",
    out: "award ↗",
    href: "https://researchinschools.org/iris-award-winners-2024/",
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
      body: "Selected as one of the UK's top engineering students through a competitive national process recognising exceptional technical aptitude and innovation. Gained access to funding, mentoring and private scholar workshops",
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
