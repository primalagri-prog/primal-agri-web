// Pure SVG path-drawing animation — no client JS needed.
// Each element uses pathLength="100" so stroke-dashoffset can animate
// from 100 → 0 regardless of actual path length.

function draw(delay: string, duration = '0.6s'): React.CSSProperties {
  return {
    strokeDasharray: 100,
    strokeDashoffset: 100,
    animation: `drawPath ${duration} ease-out forwards`,
    animationDelay: delay,
  };
}

export default function HeroAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[380px]">
      {/* Sway container — rotates around the base after drawing finishes */}
      <div
        style={{
          transformOrigin: 'center bottom',
          animation: 'wheatSway 4s ease-in-out infinite',
          animationDelay: '3.5s',
        }}
      >
        <svg
          viewBox="0 0 100 280"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-40 md:w-56 h-auto"
          style={{ overflow: 'visible' }}
        >
          {/* ── Main stem ─────────────────────────────── */}
          <path
            d="M 50 275 L 50 75"
            stroke="white"
            strokeWidth="2.5"
            pathLength="100"
            style={draw('0s', '0.9s')}
          />

          {/* ── Leaves (alternating left / right) ──────── */}
          <path d="M 50 235 C 38 222 18 226 10 240"
            stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" pathLength="100" style={draw('0.9s', '0.45s')} />
          <path d="M 50 200 C 62 187 82 191 90 205"
            stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" pathLength="100" style={draw('1.1s', '0.45s')} />
          <path d="M 50 165 C 36 150 17 154 9 168"
            stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" pathLength="100" style={draw('1.3s', '0.45s')} />
          <path d="M 50 132 C 64 117 83 121 91 135"
            stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" pathLength="100" style={draw('1.5s', '0.45s')} />

          {/* ── Grain spikelets (teardrop shapes) ───────
               Drawn centre-first, then inner pair, then outer pair */}
          {/* Centre */}
          <path d="M 50 128 C 56 113 56 93 50 76 C 44 93 44 113 50 128"
            stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.15)" pathLength="100" style={draw('1.8s', '0.4s')} />
          {/* Inner left */}
          <path d="M 43 134 C 48 119 47 99 42 83 C 36 99 37 119 43 134"
            stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.12)" pathLength="100" style={draw('2.0s', '0.4s')} />
          {/* Inner right */}
          <path d="M 57 134 C 52 119 53 99 58 83 C 64 99 63 119 57 134"
            stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.12)" pathLength="100" style={draw('2.0s', '0.4s')} />
          {/* Outer left */}
          <path d="M 36 142 C 40 127 38 107 32 91 C 26 107 28 127 36 142"
            stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" pathLength="100" style={draw('2.2s', '0.4s')} />
          {/* Outer right */}
          <path d="M 64 142 C 60 127 62 107 68 91 C 74 107 72 127 64 142"
            stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" pathLength="100" style={draw('2.2s', '0.4s')} />

          {/* ── Awns (bristles extending upward from each grain) ── */}
          <path d="M 50 76  L 50 48"  stroke="rgba(255,255,255,0.55)" strokeWidth="1" pathLength="100" style={draw('2.6s',  '0.25s')} />
          <path d="M 42 83  L 37 55"  stroke="rgba(255,255,255,0.45)" strokeWidth="1" pathLength="100" style={draw('2.7s',  '0.25s')} />
          <path d="M 58 83  L 63 55"  stroke="rgba(255,255,255,0.45)" strokeWidth="1" pathLength="100" style={draw('2.7s',  '0.25s')} />
          <path d="M 32 91  L 25 63"  stroke="rgba(255,255,255,0.35)" strokeWidth="1" pathLength="100" style={draw('2.85s', '0.25s')} />
          <path d="M 68 91  L 75 63"  stroke="rgba(255,255,255,0.35)" strokeWidth="1" pathLength="100" style={draw('2.85s', '0.25s')} />
        </svg>
      </div>
    </div>
  );
}
