"use client"

import { useEffect, useRef, useState } from "react"

// ── Billie Jean bassline (square-wave chiptune) ─────────────────────────────
// BPM ≈ 117  →  16th = 128ms, 8th = 256ms, quarter = 512ms
// Frequencies: F#2=92.5  A2=110  B2=123.5  C#3=138.6  D3=146.8  F#3=185
interface Note { f: number; d: number }
const BILLIE_JEAN: Note[] = [
  // ── bar 1 ──
  { f: 92.5,  d: 0.26 }, // F#2  ♩.
  { f: 0,     d: 0.13 }, // rest
  { f: 92.5,  d: 0.13 }, // F#2  ♬
  { f: 110,   d: 0.13 }, // A2
  { f: 123.5, d: 0.26 }, // B2   ♩
  { f: 0,     d: 0.13 }, // rest
  { f: 138.6, d: 0.13 }, // C#3
  { f: 146.8, d: 0.26 }, // D3   ♩
  { f: 138.6, d: 0.13 }, // C#3
  { f: 123.5, d: 0.13 }, // B2
  { f: 110,   d: 0.26 }, // A2   ♩
  { f: 92.5,  d: 0.39 }, // F#2  ♩.
  // ── bar 2 ──
  { f: 92.5,  d: 0.13 }, // F#2
  { f: 0,     d: 0.13 }, // rest
  { f: 92.5,  d: 0.13 }, // F#2
  { f: 110,   d: 0.13 }, // A2
  { f: 123.5, d: 0.26 }, // B2
  { f: 138.6, d: 0.13 }, // C#3
  { f: 146.8, d: 0.13 }, // D3
  { f: 185,   d: 0.26 }, // F#3  (octave jump — the hook)
  { f: 146.8, d: 0.13 }, // D3
  { f: 138.6, d: 0.13 }, // C#3
  { f: 123.5, d: 0.13 }, // B2
  { f: 110,   d: 0.13 }, // A2
  { f: 92.5,  d: 0.52 }, // F#2  long resolve
]

function playBillieJean(onDone: () => void): void {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()
    let t = ctx.currentTime + 0.08

    BILLIE_JEAN.forEach(({ f, d }) => {
      if (f > 0) {
        const osc  = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = "square"
        osc.frequency.value = f
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.13, t + 0.01)
        gain.gain.setValueAtTime(0.13, t + d - 0.04)
        gain.gain.linearRampToValueAtTime(0, t + d)
        osc.start(t)
        osc.stop(t + d + 0.01)
      }
      t += d
    })

    const totalMs = BILLIE_JEAN.reduce((s, n) => s + n.d, 0) * 1000
    setTimeout(() => {
      ctx.close()
      onDone()
    }, totalMs + 500)
  } catch {
    setTimeout(onDone, 6000)
  }
}

// ── channel waveform data ────────────────────────────────────────────────────
const CHANNELS = [
  { id: "D0", label: "GPIO_BOOT",  color: "#06b6d4", pattern: "trigger" },
  { id: "D1", label: "SPI_CLK",   color: "#a78bfa", pattern: "clock"   },
  { id: "D2", label: "SPI_MOSI",  color: "#fb923c", pattern: "data"    },
  { id: "D3", label: "UART_TX",   color: "#4ade80", pattern: "uart"    },
  { id: "A0", label: "PWM_OUT",   color: "#f472b6", pattern: "analog"  },
]

function DigitalWave({
  pattern, color, active, width,
}: {
  pattern: string; color: string; active: boolean; width: number
}): React.ReactElement {
  const H = 28
  const segments = Math.floor(width / 10)

  const getPath = (): string => {
    if (!active) return `M 0 ${H / 2} L ${width} ${H / 2}`
    if (pattern === "trigger") {
      return `M 0 ${H} L 30 ${H} L 30 2 L 60 2 L 60 ${H} L ${width} ${H}`
    }
    if (pattern === "clock") {
      let d = `M 0 ${H}`
      for (let i = 0; i < segments; i++) {
        const x = i * 10
        d += ` L ${x} ${i % 2 === 0 ? H : 2} L ${x + 5} ${i % 2 === 0 ? H : 2} L ${x + 5} ${i % 2 === 0 ? 2 : H}`
      }
      return d
    }
    if (pattern === "data") {
      const bits = [1,0,1,1,0,1,0,0,1,1,0,1,0,1,1,0,0,1,0,1]
      let d = `M 0 ${H}`
      bits.forEach((b, i) => {
        const x = i * (width / bits.length)
        const nx = (i + 1) * (width / bits.length)
        const y = b ? 2 : H
        d += ` L ${x} ${y} L ${nx} ${y}`
      })
      return d
    }
    if (pattern === "uart") {
      // start bit + 8 data bits (0x4B = "K") + stop
      const bits = [0,1,1,0,1,0,0,1,0,1]
      let d = `M 0 ${H}`
      const bw = width / (bits.length + 2)
      d += ` L ${bw} ${H}`
      bits.forEach((b, i) => {
        d += ` L ${(i + 1) * bw} ${b ? 2 : H} L ${(i + 2) * bw} ${b ? 2 : H}`
      })
      d += ` L ${width} ${H}`
      return d
    }
    return `M 0 ${H / 2} L ${width} ${H / 2}`
  }

  return (
    <svg width={width} height={H} className="overflow-visible">
      {pattern === "analog" && active ? (
        <path
          d={`M 0 ${H / 2} ${Array.from({ length: Math.floor(width / 6) }, (_, i) => {
            const x = i * 6
            const amp = 10
            return `L ${x} ${H / 2 + (i % 4 < 2 ? -amp : amp)}`
          }).join(" ")}`}
          stroke={color} strokeWidth="1.5" fill="none" opacity={0.85}
          style={{ animation: active ? "pwm-scroll 0.4s linear infinite" : "none" }}
        />
      ) : (
        <path
          d={getPath()}
          stroke={color} strokeWidth="1.5" fill="none" opacity={active ? 0.85 : 0.18}
        />
      )}
    </svg>
  )
}

interface SignalAnalyzerProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: SignalAnalyzerProps): React.ReactElement {
  const [activeCount, setActiveCount] = useState(0)
  const [showDecode, setShowDecode] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [triggerMs, setTriggerMs] = useState<string>("0.000")
  const wrapRef = useRef<HTMLDivElement>(null)
  const [wrapW, setWrapW] = useState(520)

  // Fade in
  useEffect(() => {
    setTimeout(() => setOpacity(1), 30)
  }, [])

  // Measure available width
  useEffect(() => {
    if (wrapRef.current) setWrapW(wrapRef.current.clientWidth - 120)
  }, [])

  // Cascade channels active, then play music
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    CHANNELS.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveCount(i + 1), 200 + i * 280))
    })
    timers.push(setTimeout(() => setShowDecode(true), 200 + CHANNELS.length * 280 + 200))

    // Start music after all channels lit
    const musicDelay = 200 + CHANNELS.length * 280 + 600
    timers.push(setTimeout(() => {
      playBillieJean(() => {
        setOpacity(0)
        setTimeout(onComplete, 500)
      })
      // Live timer
      const start = Date.now()
      const ticker = setInterval(() => {
        setTriggerMs(((Date.now() - start) / 1000).toFixed(3))
      }, 16)
      timers.push(ticker as unknown as ReturnType<typeof setTimeout>)
    }, musicDelay))

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.94)",
        opacity,
        transition: "opacity 0.45s ease",
      }}
      onClick={() => { setOpacity(0); setTimeout(onComplete, 500) }}
    >
      <style>{`
        @keyframes pwm-scroll { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -24; } }
      `}</style>

      <div
        className="w-full max-w-2xl rounded-lg border border-zinc-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Toolbar ── */}
        <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
            </div>
            <span className="font-mono text-xs text-zinc-400">Logic Analyzer — KJ-Probe v2.1</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-500">
            <span>5 CH · 24MHz · 8-bit</span>
            <span className="text-cyan-500">▶ TRIGGERED</span>
            <span>{triggerMs}s</span>
          </div>
        </div>

        {/* ── Channels ── */}
        <div ref={wrapRef} className="bg-zinc-950 divide-y divide-zinc-800/60">
          {CHANNELS.map((ch, i) => (
            <div key={ch.id} className="flex items-center h-12">
              {/* Label col */}
              <div className="w-28 shrink-0 px-3 border-r border-zinc-800">
                <p className="font-mono text-[10px]" style={{ color: ch.color }}>{ch.id}</p>
                <p className="font-mono text-[9px] text-zinc-600">{ch.label}</p>
              </div>
              {/* Waveform col */}
              <div className="flex-1 px-2 flex items-center overflow-hidden">
                <DigitalWave
                  pattern={ch.pattern}
                  color={ch.color}
                  active={i < activeCount}
                  width={Math.max(wrapW, 300)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── UART decode annotation ── */}
        <div
          className="bg-zinc-900/80 border-t border-zinc-800 px-4 py-2.5 flex items-center gap-4 font-mono text-[10px]"
          style={{ opacity: showDecode ? 1 : 0, transition: "opacity 0.4s ease" }}
        >
          <span className="text-zinc-500">UART decode  115200 8N1</span>
          <span className="text-green-400">0x4B  0x4A  0x20  →</span>
          <span className="text-cyan-400 font-bold tracking-widest">"KJ"</span>
          <span className="ml-auto text-zinc-600">♩ Billie Jean · MJ · 117 BPM</span>
        </div>

        {/* ── Status bar ── */}
        <div className="bg-zinc-900 border-t border-zinc-700 px-4 py-1.5 flex items-center justify-between font-mono text-[9px] text-zinc-600">
          <span>Sample rate: 24 MSPS · Buffer: 512K · Trigger: rising edge D0</span>
          <span className="text-zinc-700">click anywhere to dismiss</span>
        </div>
      </div>
    </div>
  )
}
