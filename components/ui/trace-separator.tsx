"use client"

import { useEffect, useRef, useState } from "react"

export function TraceSeparator(): React.ReactElement {
  const ref  = useRef<SVGSVGElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setDrawn(true) },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // total path length ≈ 1200
  const len = 1200

  return (
    <div className="w-full overflow-hidden" style={{ height: 48 }}>
      <svg
        ref={ref}
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Ghost trace */}
        <path
          d="M 0 24 L 480 24 L 520 8 L 680 8 L 720 24 L 1200 24"
          fill="none"
          stroke="rgba(184,115,51,0.10)"
          strokeWidth="2"
        />
        {/* Animated cyan trace */}
        <path
          d="M 0 24 L 480 24 L 520 8 L 680 8 L 720 24 L 1200 24"
          fill="none"
          stroke="rgba(6,182,212,0.55)"
          strokeWidth="2"
          strokeDasharray={len}
          strokeDashoffset={drawn ? 0 : len}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
        />
        {/* Via dots where trace bends */}
        {[[520,8],[680,8]].map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5"
              fill="rgba(184,115,51,0.35)"
              stroke="rgba(200,140,60,0.5)"
              strokeWidth="1.2"/>
            <circle cx={cx} cy={cy} r="2"
              fill="#020804"/>
          </g>
        ))}
        {/* Section label on the trace */}
        <rect x="560" y="0" width="80" height="16" rx="2"
          fill="rgba(6,182,212,0.08)"
          stroke="rgba(6,182,212,0.2)"
          strokeWidth="0.8"/>
        <text x="600" y="11.5"
          fill="rgba(6,182,212,0.55)"
          fontSize="7"
          fontFamily="monospace"
          textAnchor="middle"
          letterSpacing="0.15em">
          PROJECTS
        </text>
      </svg>
    </div>
  )
}
