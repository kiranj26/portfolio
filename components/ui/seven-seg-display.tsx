"use client"

import { useEffect, useState } from "react"

// ── Segment map: [a=top, b=top-right, c=bot-right, d=bot, e=bot-left, f=top-left, g=mid] ──
type Seg7 = [0|1, 0|1, 0|1, 0|1, 0|1, 0|1, 0|1]

const CHARS: Record<string, Seg7> = {
  " ": [0,0,0,0,0,0,0],
  "-": [0,0,0,0,0,0,1],
  ".": [0,0,0,0,0,0,0], // handled as dot flag
  "0": [1,1,1,1,1,1,0],
  "1": [0,1,1,0,0,0,0],
  "2": [1,1,0,1,1,0,1],
  "3": [1,1,1,1,0,0,1],
  "4": [0,1,1,0,0,1,1],
  "5": [1,0,1,1,0,1,1],
  "6": [1,0,1,1,1,1,1],
  "7": [1,1,1,0,0,0,0],
  "8": [1,1,1,1,1,1,1],
  "9": [1,1,1,1,0,1,1],
  "A": [1,1,1,0,1,1,1],
  "b": [0,0,1,1,1,1,1],
  "C": [1,0,0,1,1,1,0],
  "c": [0,0,0,1,1,0,1],
  "d": [0,1,1,1,1,0,1],
  "E": [1,0,0,1,1,1,1],
  "F": [1,0,0,0,1,1,1],
  "G": [1,0,1,1,1,1,0],
  "H": [0,1,1,0,1,1,1],
  "h": [0,0,1,0,1,1,1],
  "I": [0,0,0,0,0,1,0],
  "J": [0,1,1,1,0,0,0],
  "L": [0,0,0,1,1,1,0],
  "n": [0,0,1,0,1,0,1],
  "o": [0,0,1,1,1,0,1],
  "O": [1,1,1,1,1,1,0],
  "P": [1,1,0,0,1,1,1],
  "Q": [1,1,1,1,0,1,1],
  "r": [0,0,0,0,1,0,1],
  "S": [1,0,1,1,0,1,1],
  "t": [0,0,0,1,1,1,1],
  "U": [0,1,1,1,1,1,0],
  "u": [0,0,1,1,1,0,0],
  "y": [0,1,1,1,0,1,1],
  "z": [1,1,0,1,1,0,1],
}

const ALL_ON: Seg7 = [1,1,1,1,1,1,1]
const BLANK:  Seg7 = [0,0,0,0,0,0,0]

// Words chosen so every character renders cleanly on 7-seg
const WORDS = [
  "ASIL-d",    // Safety integrity — ASIL-D
  "FrEErtOS",  // Real-time OS
  "CAn-500",   // CAN bus 500kbps
  "bArE-C",    // Bare metal C
  "IrQ-1uS",   // IRQ latency < 1μs
  "180-C4F",   // 180MHz Cortex-M4F
]

// ── Geometry (px) ────────────────────────────────────────────────────────────
const W  = 24   // digit body width
const H  = 40   // digit body height
const S  = 3    // segment thickness
const CW = 32   // total char slot width (body + gap for dot/spacing)

// ── Deterministic stagger delays (no Math.random in render) ─────────────────
// Different delay per (digitIdx, segIdx) — creates cascade without randomness
function segDelay(digitIdx: number, segIdx: number): number {
  return ((digitIdx * 7 + segIdx) * 23) % 160
}

// ── Parse word string into [{char, dot}] ────────────────────────────────────
function parseWord(word: string): Array<{ char: string; dot: boolean }> {
  const out: Array<{ char: string; dot: boolean }> = []
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ".") continue
    const dot = word[i + 1] === "."
    out.push({ char: word[i], dot })
    if (dot) i++
  }
  return out
}

// ── Single digit SVG ─────────────────────────────────────────────────────────
interface DigitProps {
  seg:      Seg7
  dot:      boolean
  digitIdx: number
}

function Digit({ seg, dot, digitIdx }: DigitProps): React.ReactElement {
  const ON_COLOR  = "rgba(6,182,212,0.92)"
  const OFF_COLOR = "rgba(6,182,212,0.07)"   // ghost segments
  const ON_GLOW   = "drop-shadow(0 0 3px rgba(6,182,212,0.85)) drop-shadow(0 0 7px rgba(6,182,212,0.40))"

  const rect = (
    key: string, segIdx: number,
    x: number, y: number, w: number, h: number
  ) => {
    const on   = !!seg[segIdx as 0|1|2|3|4|5|6]
    const d    = segDelay(digitIdx, segIdx)
    return (
      <rect key={key} x={x} y={y} width={w} height={h} rx={1.5}
        fill={on ? ON_COLOR : OFF_COLOR}
        style={{
          filter:     on ? ON_GLOW : "none",
          transition: `fill 80ms ease ${d}ms, filter 80ms ease ${d}ms`,
        }}
      />
    )
  }

  const dotColor = dot ? ON_COLOR : OFF_COLOR
  const dotGlow  = dot ? ON_GLOW  : "none"
  const dotDelay = segDelay(digitIdx, 3)

  return (
    <g>
      {/* a — top horizontal    */ rect("a", 0,  4,       0,      16, S)}
      {/* b — top-right vert    */ rect("b", 1,  W - S,   4,      S,  13)}
      {/* c — bot-right vert    */ rect("c", 2,  W - S,   22,     S,  14)}
      {/* d — bot horizontal    */ rect("d", 3,  4,       H - S,  16, S)}
      {/* e — bot-left vert     */ rect("e", 4,  0,       22,     S,  14)}
      {/* f — top-left vert     */ rect("f", 5,  0,       4,      S,  13)}
      {/* g — middle horizontal */ rect("g", 6,  4,       18,     16, S)}

      {/* decimal point */}
      <circle cx={W + 5} cy={H - 2} r={2}
        fill={dotColor}
        style={{
          filter:     dotGlow,
          transition: `fill 80ms ease ${dotDelay}ms, filter 80ms ease ${dotDelay}ms`,
        }}
      />
    </g>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface SevenSegDisplayProps { className?: string }

export function SevenSegDisplay({ className }: SevenSegDisplayProps): React.ReactElement {
  const [wordIdx,     setWordIdx]     = useState(0)
  const [flash,       setFlash]       = useState(false)  // all-segments-on reset pulse

  useEffect(() => {
    const cycle = setInterval(() => {
      // Display-reset flash: all segments ON for 140ms, then switch word
      setFlash(true)
      setTimeout(() => {
        setFlash(false)
        setWordIdx(i => (i + 1) % WORDS.length)
      }, 140)
    }, 2600)
    return () => clearInterval(cycle)
  }, [])

  const parsed  = parseWord(WORDS[wordIdx])
  const svgW    = parsed.length * CW
  const label   = WORDS[wordIdx].toUpperCase().replace(/[^A-Z0-9\-]/g, "")

  return (
    <div className={className} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      {/* Bezel */}
      <div style={{
        background:   "rgba(2,5,2,0.92)",
        border:       "1px solid rgba(6,182,212,0.12)",
        borderRadius: 6,
        padding:      "10px 20px 12px",
        boxShadow:    [
          "0 0 40px rgba(0,0,0,0.9)",
          "inset 0 0 18px rgba(0,0,0,0.75)",
          "0 0 8px rgba(6,182,212,0.06)",
        ].join(", "),
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Scanline overlay */}
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
          pointerEvents: "none",
          borderRadius: 6,
        }}/>

        {/* Digit SVGs */}
        <svg
          width={svgW}
          height={H + 4}
          style={{ display: "block", position: "relative" }}
        >
          {parsed.map(({ char, dot }, i) => {
            const seg = flash
              ? ALL_ON
              : (CHARS[char] ?? BLANK)
            return (
              <g key={i} transform={`translate(${i * CW}, 2)`}>
                <Digit
                  seg={seg}
                  dot={!flash && dot}
                  digitIdx={i}
                />
              </g>
            )
          })}
        </svg>

        {/* Status strip below digits */}
        <div style={{
          fontFamily:    "monospace",
          fontSize:      8,
          color:         "rgba(6,182,212,0.28)",
          textAlign:     "center",
          marginTop:     5,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          position:      "relative",
        }}>
          SYS · STATUS · {label}
        </div>
      </div>
    </div>
  )
}
