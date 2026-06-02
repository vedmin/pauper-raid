// pauper-ornaments.jsx
// SVG components for the Pauper Raid landing page.

// ============================================================
// Mana-pip watermark — generated as inline data URI for the
// background-image of the page. Subtle scattered MTG mana
// symbols (W sun, U droplet, B skull, R fireball, G tree) +
// crossed swords and 4-pointed stars.
// ============================================================

function makePipWatermark(ink = "rgba(42,32,20,0.55)") {
  // MTG mana pip style — solid circle (the "coin") with the colour's
  // glyph carved out as negative space. The whole pip is rendered in a
  // single tone so it reads as a watermark, not a colored UI element.
  const w = 200, h = 200;

  // The five canonical colours, plus a couple of repeats for density.
  // Each pip is a circle r=14 with a punched-out glyph at the center.
  const pips = [
    { x:  26, y:  32, kind: "W", s: 1.0,  r:  -6 },
    { x:  86, y:  18, kind: "U", s: 0.85, r:  10 },
    { x: 150, y:  44, kind: "B", s: 1.0,  r:  -4 },
    { x:  56, y:  78, kind: "R", s: 0.9,  r:   8 },
    { x: 118, y:  96, kind: "G", s: 1.0,  r: -10 },
    { x:  20, y: 122, kind: "B", s: 0.8,  r:   4 },
    { x:  82, y: 138, kind: "W", s: 0.9,  r:  14 },
    { x: 148, y: 138, kind: "U", s: 1.0,  r:  -8 },
    { x:  46, y: 176, kind: "G", s: 0.85, r:   6 },
    { x: 112, y: 184, kind: "R", s: 0.9,  r: -12 },
    { x: 180, y: 188, kind: "W", s: 0.7,  r:   0 },
    { x: 184, y:  96, kind: "R", s: 0.7,  r:  18 },
  ];

  // Each glyph is a path drawn inside a 28×28 box centered on (0,0).
  // We use `evenodd` fill so the circle + glyph combine into a ring-with-
  // cutout in a single fill operation — that keeps the watermark crisp at
  // any opacity.
  const glyph = (kind) => {
    switch (kind) {
      case "W": // radiant sun: outer 8-point star + inner circle hole
        return `M 0 -8.5
                L 1.6 -3.3 L 6 -6 L 3.3 -1.6 L 8.5 0 L 3.3 1.6 L 6 6 L 1.6 3.3
                L 0 8.5 L -1.6 3.3 L -6 6 L -3.3 1.6 L -8.5 0 L -3.3 -1.6 L -6 -6 L -1.6 -3.3 Z
                M 0 -3.2 A 3.2 3.2 0 1 1 0 3.2 A 3.2 3.2 0 1 1 0 -3.2 Z`;
      case "U": // water droplet
        return `M 0 -9 C 5.5 -2, 7 3.5, 0 9 C -7 3.5, -5.5 -2, 0 -9 Z
                 M 1.5 -3 C 4 0.5, 4 3, 2 5.5 L 1 4.5 C 2.5 2.5, 2.5 0.5, 0.5 -2 Z`;
      case "B": // skull — rounded dome + eye sockets + jaw notches
        return `M 0 -9 C 6 -9, 9 -5, 9 -1
                 C 9 2, 7 4, 5.5 4.5
                 L 5.5 7.5 L 3.5 7.5 L 3.5 5.8 L 2 5.8 L 2 7.5 L 0 7.5
                 L 0 5.8 L -2 5.8 L -2 7.5 L -3.5 7.5 L -3.5 5.8 L -5.5 5.8 L -5.5 4.5
                 C -7 4, -9 2, -9 -1 C -9 -5, -6 -9, 0 -9 Z
                 M -4 -3 A 2.4 2.4 0 1 1 -4 1.8 A 2.4 2.4 0 1 1 -4 -3 Z
                 M  4 -3 A 2.4 2.4 0 1 1  4 1.8 A 2.4 2.4 0 1 1  4 -3 Z`;
      case "R": // fireball — teardrop-with-tongues flame
        return `M 0 -9
                 C 4 -4, 5.5 -1, 4 3
                 C 5.5 1.5, 6.5 0, 7 -1
                 C 8 4, 5 9, 0 9
                 C -5 9, -8 5, -7 0
                 C -6 2, -4 3, -2.5 3
                 C -4.5 0, -3 -4, 0 -9 Z`;
      case "G": // tree / oak — trunk with rounded crown
        return `M 0 -9
                 C 5 -9, 8 -6, 8 -2
                 C 8 1.5, 5.5 4, 2.5 4.5
                 L 2.5 9 L -2.5 9 L -2.5 4.5
                 C -5.5 4, -8 1.5, -8 -2
                 C -8 -6, -5 -9, 0 -9 Z`;
      default: return "";
    }
  };

  const pipSvg = (p) => {
    const t = `translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`;
    return `<path transform="${t}" fill-rule="evenodd" d="M 14 0 A 14 14 0 1 1 -14 0 A 14 14 0 1 1 14 0 Z ${glyph(p.kind)}"/>`;
  };

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' fill='${ink}'>
    ${pips.map(pipSvg).join("")}
  </svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

// ============================================================
// Ornamental divider — blue gem rod
// Inspired by the European Championship reference:
//   long horizontal bar with diamond rivets and a 4-pointed
//   star burst gem at center.
// ============================================================

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <svg viewBox="0 0 980 44" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="transparent"/>
            <stop offset="6%"   stopColor="#16306e"/>
            <stop offset="50%"  stopColor="#3960c0"/>
            <stop offset="94%"  stopColor="#16306e"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
          <linearGradient id="rodHilite" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="transparent"/>
            <stop offset="10%"  stopColor="#6f8fd8" stopOpacity="0.0"/>
            <stop offset="50%"  stopColor="#b0c0e6"/>
            <stop offset="90%"  stopColor="#6f8fd8" stopOpacity="0.0"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
          <radialGradient id="gemCore" cx="40%" cy="35%" r="60%">
            <stop offset="0%"  stopColor="#ffffff"/>
            <stop offset="20%" stopColor="#c8d8f4"/>
            <stop offset="55%" stopColor="#2a4ea8"/>
            <stop offset="100%" stopColor="#0a1840"/>
          </radialGradient>
          <radialGradient id="gemHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7fa0e8" stopOpacity="0.9"/>
            <stop offset="60%"  stopColor="#2a4ea8" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#0a1840" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Main rod */}
        <rect className="div-rod-shadow" x="0" y="23" width="980" height="2" fill="#0a1840" opacity="0.6"/>
        <rect className="div-rod" x="0" y="18" width="980" height="8" fill="url(#rodGrad)"/>
        <rect x="0" y="19" width="980" height="1.5" fill="url(#rodHilite)" opacity="0.85"/>

        {/* Diamond rivets */}
        {[100, 250, 730, 880].map((cx, i) => (
          <g key={i} transform={`translate(${cx} 22)`}>
            <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)"
                  fill="#e8eaf0" stroke="#16306e" strokeWidth="1.4"/>
            <rect x="-3.5" y="-3.5" width="7" height="7" transform="rotate(45)"
                  fill="#16306e" opacity="0.85"/>
          </g>
        ))}

        {/* Central star-burst rays */}
        <g transform="translate(490 22)">
          {[0, 45, 90, 135].map((a, i) => (
            <line key={i} x1="-80" y1="0" x2="80" y2="0"
                  transform={`rotate(${a})`}
                  stroke="#2a4ea8" strokeWidth={a === 0 ? 1.5 : 1} opacity={a === 0 ? 0.8 : 0.45}/>
          ))}
          {/* Halo */}
          <circle r="22" fill="url(#gemHalo)"/>
          {/* The gem itself */}
          <g transform="rotate(45)">
            <rect x="-11" y="-11" width="22" height="22" fill="url(#gemCore)"
                  stroke="#0a1840" strokeWidth="1.5"/>
            <rect x="-7" y="-7" width="14" height="14" fill="none"
                  stroke="#6f8fd8" strokeWidth="0.8" opacity="0.7"/>
          </g>
          {/* Sparkle */}
          <circle cx="-3" cy="-4" r="1.8" fill="#ffffff" opacity="0.9"/>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// Torch — animated flame (CSS-driven flicker)
// ============================================================

function Torch({ side }) {
  // Hovering gem sigil — kite-cut gem on a small pedestal of flourishes,
  // with a soft halo behind. Same blue palette as the dividers.
  return (
    <div className={`gem-sigil gem-${side}`} aria-hidden="true">
      <svg viewBox="0 0 60 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id={`sigilHalo-${side}`} cx="50%" cy="40%" r="55%">
            <stop offset="0%"   stopColor="#7fa0e8" stopOpacity="0.85"/>
            <stop offset="55%"  stopColor="#2a4ea8" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#0a1840" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id={`sigilCore-${side}`} cx="38%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#ffffff"/>
            <stop offset="22%"  stopColor="#c8d8f4"/>
            <stop offset="58%"  stopColor="#2a4ea8"/>
            <stop offset="100%" stopColor="#0a1840"/>
          </radialGradient>
          <linearGradient id={`sigilStem-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#16306e"/>
            <stop offset="50%"  stopColor="#3960c0"/>
            <stop offset="100%" stopColor="#16306e" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* ── upper flourish (above gem) ── */}
        <g transform="translate(30 18)" stroke="#16306e" strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M 0 18 C -6 10, -10 4, -10 -6 C -10 -2, -6 0, 0 0 C 6 0, 10 -2, 10 -6 C 10 4, 6 10, 0 18"/>
          <circle cx="-10" cy="-7" r="1.6" fill="#16306e"/>
          <circle cx="10"  cy="-7" r="1.6" fill="#16306e"/>
          <circle cx="0"   cy="-12" r="2"  fill="#3960c0"/>
        </g>

        {/* ── halo behind gem ── */}
        <circle cx="30" cy="64" r="34" fill={`url(#sigilHalo-${side})`}/>

        {/* ── 4-direction light rays ── */}
        <g stroke="#2a4ea8" strokeWidth="0.8" opacity="0.55" strokeLinecap="round">
          <line x1="30" y1="34" x2="30" y2="20"/>
          <line x1="30" y1="94" x2="30" y2="108"/>
          <line x1="0"  y1="64" x2="14"  y2="64"/>
          <line x1="46" y1="64" x2="60" y2="64"/>
        </g>

        {/* ── the gem (kite cut) ── */}
        <g transform="translate(30 64)">
          {/* outer setting */}
          <path d="M 0 -22 L 16 0 L 0 22 L -16 0 Z"
                fill="#0a1840" stroke="#0a1840" strokeWidth="1"/>
          {/* gem face */}
          <path d="M 0 -20 L 14 0 L 0 20 L -14 0 Z"
                fill={`url(#sigilCore-${side})`} stroke="#0a1840" strokeWidth="0.8"/>
          {/* internal facets */}
          <path d="M 0 -20 L 0 20 M -14 0 L 14 0"
                stroke="#6f8fd8" strokeWidth="0.6" opacity="0.55"/>
          <path d="M 0 -20 L -7 0 L 0 20 L 7 0 Z"
                fill="none" stroke="#6f8fd8" strokeWidth="0.5" opacity="0.5"/>
          {/* sparkle */}
          <circle cx="-4" cy="-8" r="1.8" fill="#ffffff" opacity="0.9"/>
          <circle cx="3"  cy="-12" r="0.8" fill="#ffffff" opacity="0.75"/>
        </g>

        {/* ── stem descending from gem ── */}
        <line x1="30" y1="86" x2="30" y2="170" stroke={`url(#sigilStem-${side})`} strokeWidth="1.2"/>

        {/* ── lower flourish ── */}
        <g transform="translate(30 116)" stroke="#16306e" strokeWidth="1.1" fill="none" strokeLinecap="round">
          <path d="M -10 0 C -6 4, -2 6, 0 10 C 2 6, 6 4, 10 0"/>
          <path d="M -8 -4 C -4 0, -1 2, 0 6 C 1 2, 4 0, 8 -4" opacity="0.7"/>
        </g>
        <g transform="translate(30 150)" stroke="#16306e" strokeWidth="1" fill="none" strokeLinecap="round">
          <circle cx="0" cy="0" r="3.2" fill="#3960c0"/>
          <path d="M -7 6 C -3 4, 0 4, 3 6" opacity="0.7"/>
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// Block-printed ribbon banner — for title treatment #3
// A woodcut-style ribbon/scroll with the title set on it
// ============================================================

function BlockBanner({ lines }) {
  // Two stacked banner ribbons
  const W = 720;
  return (
    <div className="title block-banner">
      <svg className="banner-svg" viewBox={`0 0 ${W} 240`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="#f4ead0"/>
            <stop offset="50%" stopColor="#e8d8a8"/>
            <stop offset="100%" stopColor="#c8a868"/>
          </linearGradient>
          <linearGradient id="ribbonTail" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="#a88a48"/>
            <stop offset="100%" stopColor="#705820"/>
          </linearGradient>
        </defs>

        {lines.map((text, idx) => {
          const y = 20 + idx * 110;
          return (
            <g key={idx} transform={`translate(0 ${y})`}>
              {/* Left tail */}
              <path d="M0 60 L 40 30 L 60 50 L 40 70 Z" fill="url(#ribbonTail)" stroke="#3a2810" strokeWidth="1.5"/>
              {/* Right tail */}
              <path d={`M${W} 60 L ${W-40} 30 L ${W-60} 50 L ${W-40} 70 Z`} fill="url(#ribbonTail)" stroke="#3a2810" strokeWidth="1.5"/>

              {/* Tail folds */}
              <path d="M40 30 L 60 50 L 70 40 Z" fill="#3a2810" opacity="0.35"/>
              <path d={`M${W-40} 30 L ${W-60} 50 L ${W-70} 40 Z`} fill="#3a2810" opacity="0.35"/>

              {/* Main ribbon */}
              <path d={`M 50 18 L ${W-50} 18 L ${W-30} 50 L ${W-50} 82 L 50 82 L 30 50 Z`}
                    fill="url(#ribbonGrad)" stroke="#3a2810" strokeWidth="2"/>

              {/* Inner border */}
              <path d={`M 60 26 L ${W-60} 26 L ${W-40} 50 L ${W-60} 74 L 60 74 L 40 50 Z`}
                    fill="none" stroke="#7a5a20" strokeWidth="0.8" opacity="0.7"/>

              {/* Text */}
              <text x={W/2} y="60" textAnchor="middle"
                    className="banner-text"
                    fontSize={text.length > 8 ? 38 : 46}>
                {text}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Expose globally
Object.assign(window, { makePipWatermark, Divider, Torch, BlockBanner });
