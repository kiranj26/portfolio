"use client"

import { useEffect, useState, useRef } from "react"

const BOOT_LOG: string[] = [
  "> Boot ROM v2.1 — Kiran Jojare Hardware Platform",
  "[    0.000] Initializing power rails...",
  "[    0.012] VCC 3.3V ✓   VCC 5V ✓   VBAT 3.1V ✓",
  "[    0.024] Crystal oscillator 8MHz: LOCKED",
  "[    0.038] PLL configured: 180MHz system clock",
  "[    0.052] JTAG/SWD interface: ST-Link V3 DETECTED",
  "[    0.089] FreeRTOS v10.4.6: scheduler starting",
  "[    0.091] Heap: 48432 bytes free / 65536 total",
  "[    0.110] UART2: 115200 8N1 OK",
  "[    0.124] CAN1: 500kbps — BUS OK",
  "[    0.201] BLE stack: advertising as 'KJ-Portfolio'",
  "[    0.350] OCPP client: connecting...",
  "[    0.612] OCPP: CONNECTED ✓",
  "[    0.613] ",
  "> All systems nominal. Welcome.",
]

function playPostBeeps(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const beeps = [
      { freq: 523, start: 0,    duration: 0.15 },
      { freq: 659, start: 0.28, duration: 0.15 },
      { freq: 784, start: 0.56, duration: 0.28 },
    ]
    beeps.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = "square"
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, ctx.currentTime + start)
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + start + 0.01)
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + duration)
      osc.start(ctx.currentTime + start)
      osc.stop(ctx.currentTime + start + duration + 0.05)
    })
    setTimeout(() => ctx.close(), 2000)
  } catch {
    // AudioContext unavailable — skip silently
  }
}

function playClickTick(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "square"
    osc.frequency.value = 1800
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.008)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.01)
    setTimeout(() => ctx.close(), 200)
  } catch {
    // skip
  }
}

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps): React.ReactElement {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const lineIndex = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // POST beeps on mount
  useEffect(() => {
    playPostBeeps()
  }, [])

  // Typewriter line-by-line
  useEffect(() => {
    const baseDelay = 280

    const scheduleNext = (idx: number): void => {
      if (idx >= BOOT_LOG.length) {
        setDone(true)
        setTimeout(() => {
          setOpacity(0)
          setTimeout(onComplete, 600)
        }, 1200)
        return
      }
      const line = BOOT_LOG[idx]
      const delay = line.startsWith(">") ? baseDelay * 1.6 : baseDelay
      setTimeout(() => {
        playClickTick()
        setVisibleLines(prev => [...prev, line])
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
        scheduleNext(idx + 1)
      }, delay)
    }

    scheduleNext(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(p => !p), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.96)",
        opacity,
        transition: "opacity 0.6s ease",
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Terminal chrome */}
        <div className="rounded-t-lg border border-zinc-700 bg-zinc-900 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70"/>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"/>
          <div className="w-3 h-3 rounded-full bg-green-500/70"/>
          <span className="ml-3 font-mono text-xs text-zinc-500">minicom — /dev/ttyACM0 — 115200 8N1</span>
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          className="rounded-b-lg border-x border-b border-zinc-700 bg-black p-4 h-80 overflow-y-auto"
          style={{ fontFamily: "monospace" }}
        >
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className="text-sm leading-5 whitespace-pre"
              style={{
                color: line.startsWith(">")
                  ? "#06b6d4"
                  : line.includes("✓") || line.includes("OK")
                  ? "#22c55e"
                  : line.includes("DETECTED") || line.includes("LOCKED") || line.includes("CONNECTED")
                  ? "#86efac"
                  : "#00e040",
              }}
            >
              {line}
            </div>
          ))}
          {!done && (
            <span className="text-sm" style={{ color: "#00e040" }}>
              {showCursor ? "█" : " "}
            </span>
          )}
          {done && (
            <div className="mt-3 text-xs font-mono text-zinc-600">
              — press any key or wait —
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
