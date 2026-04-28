"use client"

import { useEffect, useState } from "react"

// 16×2 HD44780-style character LCD
// Line 1: static board label
// Line 2: cycles through firmware terms with typing effect

const LINE1 = "KJ-DEV-BOARD v2 "   // exactly 16 chars

const LINES2 = [
  "ASIL-D ISO 26262",   // automotive safety
  "CAN / CAN-FD 8MB",   // protocol with CAN FD upgrade
  "FreeRTOS v10 DMA",   // RTOS + DMA
  "OCPP 1.6 EV chrg",   // EV charging protocol
  "UART/SPI/I2C/USB",   // peripheral bus stack
  "IRQ < 1us CM4F  ",   // latency + core
  "JTAG/SWD bare-C ",   // debug + language
  "LQFP64 SMD 0402 ",   // package knowledge
]

const CHAR_MS  = 55   // typing speed per character
const HOLD_MS  = 2200 // how long to hold before next word
const CLEAR_MS = 20   // speed to clear line before re-typing

export function LcdDisplay({ className }: { className?: string }): React.ReactElement {
  const [lineIdx,  setLineIdx]  = useState(0)
  const [typed,    setTyped]    = useState("")
  const [cursor,   setCursor]   = useState(true)
  const [clearing, setClearing] = useState(false)

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 520)
    return () => clearInterval(id)
  }, [])

  // Typing / clearing cycle
  useEffect(() => {
    let stopped = false

    async function run() {
      const target = LINES2[lineIdx]

      // Type characters one by one
      for (let i = 0; i <= target.length; i++) {
        if (stopped) return
        setTyped(target.slice(0, i))
        await delay(CHAR_MS)
      }

      // Hold
      await delay(HOLD_MS)
      if (stopped) return

      // Clear characters one by one
      setClearing(true)
      for (let i = target.length; i >= 0; i--) {
        if (stopped) return
        setTyped(target.slice(0, i))
        await delay(CLEAR_MS)
      }
      setClearing(false)

      if (!stopped) setLineIdx(idx => (idx + 1) % LINES2.length)
    }

    run()
    return () => { stopped = true }
  }, [lineIdx])

  // Pad typed text to 16 chars for stable layout
  const line2 = typed.padEnd(16, " ")

  return (
    <div className={className} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>

      {/* ── Outer plastic bezel ── */}
      <div style={{
        background:   "linear-gradient(160deg, #2e2e2e 0%, #1c1c1c 100%)",
        border:       "2px solid #3d3d3d",
        borderRadius: 10,
        padding:      "14px 18px 10px",
        boxShadow:    "0 6px 20px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
        position:     "relative",
      }}>

        {/* Corner screw holes */}
        {[
          { top:  6, left:  6 },
          { top:  6, right: 6 },
          { bottom: 6, left:  6 },
          { bottom: 6, right: 6 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 7, height: 7,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #555, #222)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
            ...pos,
          }}/>
        ))}

        {/* ── LCD screen area ── */}
        <div style={{
          background: "radial-gradient(ellipse at 35% 30%, #9ab800 0%, #6e8800 55%, #5a7000 100%)",
          borderRadius: 4,
          padding:      "8px 12px 10px",
          boxShadow:    [
            "inset 0 2px 8px rgba(0,0,0,0.45)",
            "inset 0 -1px 4px rgba(180,220,0,0.2)",
            "0 0 10px rgba(110,140,0,0.25)",
          ].join(", "),
          position: "relative",
          overflow: "hidden",
          minWidth: 224,
        }}>

          {/* Pixel-grid overlay — suggests individual LCD dots */}
          <div style={{
            position:        "absolute",
            inset:           0,
            backgroundImage: [
              "repeating-linear-gradient(0deg,  rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 9px)",
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 7px)",
            ].join(", "),
            pointerEvents: "none",
            borderRadius:  4,
          }}/>

          {/* Glare sheen */}
          <div style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
            pointerEvents: "none",
            borderRadius: 4,
          }}/>

          {/* ── Line 1 — static label ── */}
          <div style={{
            fontFamily:    "'Courier New', Courier, monospace",
            fontSize:      15,
            fontWeight:    700,
            color:         "rgba(10,25,0,0.80)",
            letterSpacing: "0.10em",
            lineHeight:    "22px",
            whiteSpace:    "pre",
            position:      "relative",
            textShadow:    "0 1px 0 rgba(180,220,0,0.25)",
          }}>
            {LINE1}
          </div>

          {/* ── Line 2 — typing ── */}
          <div style={{
            fontFamily:    "'Courier New', Courier, monospace",
            fontSize:      15,
            fontWeight:    700,
            color:         "rgba(10,25,0,0.80)",
            letterSpacing: "0.10em",
            lineHeight:    "22px",
            whiteSpace:    "pre",
            position:      "relative",
          }}>
            {line2.slice(0, 15)}
            {/* blinking block cursor */}
            <span style={{
              display:         "inline-block",
              width:           "0.55em",
              height:          "1em",
              background:      cursor && !clearing ? "rgba(10,25,0,0.80)" : "transparent",
              verticalAlign:   "text-bottom",
              marginLeft:      "0.02em",
              transition:      "background 0.05s",
            }}/>
          </div>
        </div>

        {/* ── Part number strip ── */}
        <div style={{
          fontFamily:    "monospace",
          fontSize:      8,
          color:         "rgba(255,255,255,0.18)",
          textAlign:     "center",
          marginTop:     7,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          HD44780 · 16×2 · 5V · KJ-BOARD
        </div>
      </div>
    </div>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms))
}
