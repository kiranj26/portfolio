"use client"

import { useEffect, useState } from "react"

// 16×2 HD44780-style character LCD
// Both lines cycle together as paired "screens" — like a real embedded device

// Each entry: [line1 (16 chars), line2 (16 chars)]
const SCREENS: [string, string][] = [
  ["ISO 26262 ASIL-D", "Auto Safety Cert"],
  ["CAN / CAN-FD    ", "500k to 8 Mbps  "],
  ["FreeRTOS v10.5  ", "DMA + 16 tasks  "],
  ["OCPP 1.6 / J1772", "EV Charge Ctrl  "],
  ["UART SPI I2C USB", "Peripheral Stack"],
  ["JTAG / SWD Debug", "Cortex-M4F 180M "],
  ["IRQ Latency     ", "< 1 microsecond "],
  ["10+ Silicon Fams", "STM32 ESP C2000 "],
]

const CHAR_MS  = 42   // typing speed per character
const HOLD_MS  = 2000 // hold after both lines fully typed
const CLEAR_MS = 18   // clear speed before next screen

export function LcdDisplay({ className }: { className?: string }): React.ReactElement {
  const [screenIdx, setScreenIdx] = useState(0)
  const [typedL1,   setTypedL1]   = useState("")
  const [typedL2,   setTypedL2]   = useState("")
  const [cursor,    setCursor]     = useState(true)
  const [clearing,  setClearing]   = useState(false)

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 520)
    return () => clearInterval(id)
  }, [])

  // Two-line typing / clearing cycle
  useEffect(() => {
    let stopped = false

    async function run() {
      const [t1, t2] = SCREENS[screenIdx]

      // Type line 1
      for (let i = 0; i <= t1.length; i++) {
        if (stopped) return
        setTypedL1(t1.slice(0, i))
        await delay(CHAR_MS)
      }

      // Type line 2
      for (let i = 0; i <= t2.length; i++) {
        if (stopped) return
        setTypedL2(t2.slice(0, i))
        await delay(CHAR_MS)
      }

      // Hold
      await delay(HOLD_MS)
      if (stopped) return

      // Clear line 2 then line 1
      setClearing(true)
      for (let i = t2.length; i >= 0; i--) {
        if (stopped) return
        setTypedL2(t2.slice(0, i))
        await delay(CLEAR_MS)
      }
      for (let i = t1.length; i >= 0; i--) {
        if (stopped) return
        setTypedL1(t1.slice(0, i))
        await delay(CLEAR_MS)
      }
      setClearing(false)

      if (!stopped) setScreenIdx(idx => (idx + 1) % SCREENS.length)
    }

    run()
    return () => { stopped = true }
  }, [screenIdx])

  const line1 = typedL1.padEnd(16, " ")
  const line2 = typedL2.padEnd(16, " ")

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

          {/* ── Line 1 ── */}
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
            {line1.slice(0, 15)}
            <span style={{
              display:       "inline-block",
              width:         "0.55em",
              height:        "1em",
              background:    cursor && typedL2 === "" && !clearing ? "rgba(10,25,0,0.80)" : "transparent",
              verticalAlign: "text-bottom",
              marginLeft:    "0.02em",
              transition:    "background 0.05s",
            }}/>
          </div>

          {/* ── Line 2 ── */}
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
            <span style={{
              display:       "inline-block",
              width:         "0.55em",
              height:        "1em",
              background:    cursor && typedL2.length > 0 && !clearing ? "rgba(10,25,0,0.80)" : "transparent",
              verticalAlign: "text-bottom",
              marginLeft:    "0.02em",
              transition:    "background 0.05s",
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
