"use client"

import { useEffect, useRef, useState } from "react"

// ── Billie Jean piezo chiptune — 15 seconds ─────────────────────────────────
// BPM 117 · 16th = 0.128s · 8th = 0.256s · quarter = 0.513s
// Frequencies: F#2=92.5 A2=110 B2=123.5 C#3=138.6 D3=146.8 F#3=185
interface Note { f: number; d: number }

const BAR1: Note[] = [
  { f: 92.5,  d: 0.26 }, { f: 0,     d: 0.13 }, { f: 92.5,  d: 0.13 },
  { f: 110,   d: 0.13 }, { f: 123.5, d: 0.26 }, { f: 0,     d: 0.13 },
  { f: 138.6, d: 0.13 }, { f: 146.8, d: 0.26 }, { f: 138.6, d: 0.13 },
  { f: 123.5, d: 0.13 }, { f: 110,   d: 0.26 }, { f: 92.5,  d: 0.39 },
]
const BAR2: Note[] = [
  { f: 92.5,  d: 0.13 }, { f: 0,     d: 0.13 }, { f: 92.5,  d: 0.13 },
  { f: 110,   d: 0.13 }, { f: 123.5, d: 0.26 }, { f: 138.6, d: 0.13 },
  { f: 146.8, d: 0.13 }, { f: 185,   d: 0.26 }, { f: 146.8, d: 0.13 },
  { f: 138.6, d: 0.13 }, { f: 123.5, d: 0.13 }, { f: 110,   d: 0.13 },
  { f: 92.5,  d: 0.52 },
]
// 7 bars ≈ 15.01 seconds
const BILLIE_15S: Note[] = [
  ...BAR1, ...BAR2, ...BAR1, ...BAR2, ...BAR1, ...BAR2, ...BAR1,
]

function playBillieJean(onDone: () => void): () => void {
  let stopped = false
  try {
    const AC = window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()

    // ── piezo bassline ──
    let t = ctx.currentTime + 0.05
    BILLIE_15S.forEach(({ f, d }) => {
      if (f > 0 && !stopped) {
        const osc  = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.type = "square"
        osc.frequency.value = f
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(0.11, t + 0.008)
        gain.gain.setValueAtTime(0.11, t + d - 0.03)
        gain.gain.linearRampToValueAtTime(0, t + d)
        osc.start(t); osc.stop(t + d + 0.01)
      }
      t += d
    })

    // ── kick drum (sine drop, beats 1 & 3) ──
    const quarterNote = 0.513
    const totalBeats  = Math.floor(15 / quarterNote)
    for (let b = 0; b < totalBeats; b += 2) {
      const bt = ctx.currentTime + 0.05 + b * quarterNote
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = "sine"
      osc.frequency.setValueAtTime(110, bt)
      osc.frequency.exponentialRampToValueAtTime(40, bt + 0.12)
      gain.gain.setValueAtTime(0.18, bt)
      gain.gain.exponentialRampToValueAtTime(0.001, bt + 0.15)
      osc.start(bt); osc.stop(bt + 0.16)
    }

    // ── hi-hat (filtered noise, every 16th) ──
    const sixteenth = 0.128
    const hatCount  = Math.floor(15 / sixteenth)
    for (let h = 0; h < hatCount; h++) {
      const ht = ctx.currentTime + 0.05 + h * sixteenth
      const bufSize = ctx.sampleRate * 0.04
      const buffer  = ctx.createBuffer(1, bufSize, ctx.sampleRate)
      const data    = buffer.getChannelData(0)
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1
      const src    = ctx.createBufferSource()
      const filter = ctx.createBiquadFilter()
      const gain   = ctx.createGain()
      src.buffer = buffer
      filter.type = "highpass"; filter.frequency.value = 8000
      src.connect(filter); filter.connect(gain); gain.connect(ctx.destination)
      gain.gain.setValueAtTime(0.04, ht)
      gain.gain.exponentialRampToValueAtTime(0.001, ht + 0.04)
      src.start(ht); src.stop(ht + 0.04)
    }

    const id = setTimeout(() => { ctx.close(); onDone() }, 15200)
    return () => { stopped = true; clearTimeout(id); ctx.close() }
  } catch {
    const id = setTimeout(onDone, 15000)
    return () => clearTimeout(id)
  }
}

function playOhShitAlarm(): void {
  // Buzzer alarm burst first
  try {
    const AC = window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()
    ;[0, 0.18, 0.36].forEach((delay) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = "square"; osc.frequency.value = 880
      gain.gain.setValueAtTime(0, ctx.currentTime + delay)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.01)
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + 0.14)
      osc.start(ctx.currentTime + delay)
      osc.stop(ctx.currentTime + delay + 0.15)
    })
    setTimeout(() => ctx.close(), 800)
  } catch { /* skip */ }

  // Web Speech API — the pièce de résistance
  try {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance("oh shit")
      u.rate  = 0.75
      u.pitch = 0.3
      u.volume = 0.9
      window.speechSynthesis.speak(u)
    }
  } catch { /* skip */ }
}

// ── crash log lines ──────────────────────────────────────────────────────────
const CRASH_LINES = [
  { text: "[    0.000] *** KERNEL PANIC — not syncing: fatal exception ***", color: "#ef4444" },
  { text: "[    0.001] CPU: ARM Cortex-M4F  Rev: r0p1  Clock: 180MHz",       color: "#fbbf24" },
  { text: "[    0.001] HFSR: 0xC0000000  CFSR: 0x00000002 (INVSTATE)",       color: "#fbbf24" },
  { text: "[    0.002] PC : 0x08012A3C   LR : 0x08009F18",                   color: "#86efac" },
  { text: "[    0.002] SP : 0x20007F40   PSP: 0x200079C0",                   color: "#86efac" },
  { text: "[    0.003] R0 : 0xDEADBEEF  R1 : 0x00000000",                   color: "#86efac" },
  { text: "[    0.003] R2 : 0xCAFEBABE  R3 : 0x08012A3C",                   color: "#86efac" },
  { text: "[    0.004] R12: 0x00000001  xPSR: 0x61000000",                  color: "#86efac" },
  { text: "[    0.004] Fault: INVSTATE — tried to exec at 0xDEADC0DE",       color: "#fbbf24" },
  { text: "[    0.005] Last UART: 0x4B 0x4A 0x20 → \"KJ\"  115200 8N1",      color: "#86efac" },
  { text: "[    0.005] Last CAN: ID=0x7FF DLC=8 DATA=DE AD BE EF 00 01 02 03", color: "#86efac" },
  { text: "[    0.006] Stack trace:",                                         color: "#a1a1aa" },
  { text: "[    0.006]   #0  portfolio_init+0x3C  <0x08012A3C>",             color: "#a1a1aa" },
  { text: "[    0.006]   #1  vTaskStartScheduler+0x18  <0x08009F18>",        color: "#a1a1aa" },
  { text: "[    0.007]   #2  main+0x4  <0x0800BEEF>",                        color: "#a1a1aa" },
  { text: "",                                                                  color: "#a1a1aa" },
  { text: "┌─────────────────────────────────┐",                              color: "#ef4444" },
  { text: "│       *** OH  SHIT ***          │",                              color: "#ef4444" },
  { text: "└─────────────────────────────────┘",                              color: "#ef4444" },
  { text: "",                                                                  color: "#a1a1aa" },
]

interface FirmwareCrashProps { onComplete: () => void }

export function BootSequence({ onComplete }: FirmwareCrashProps): React.ReactElement {
  const [lines, setLines]         = useState<typeof CRASH_LINES>([])
  const [reboot, setReboot]       = useState<number | null>(null)
  const [flashRed, setFlashRed]   = useState(false)
  const [opacity, setOpacity]     = useState(0)
  const [ohShitFlash, setOhShitFlash] = useState(false)
  const stopMusic = useRef<(() => void) | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Fade in + red flash
  useEffect(() => {
    setFlashRed(true)
    setTimeout(() => setFlashRed(false), 400)
    setTimeout(() => setOpacity(1), 40)
  }, [])

  // "Oh shit" alarm fires immediately
  useEffect(() => { playOhShitAlarm() }, [])

  // Start music after 0.6s, schedule reboot countdown at 12s
  useEffect(() => {
    const t1 = setTimeout(() => {
      stopMusic.current = playBillieJean(() => {
        setReboot(3)
      })
    }, 600)

    // Reboot countdown at 12s
    const t2 = setTimeout(() => setReboot(3), 12000)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reboot countdown ticks
  useEffect(() => {
    if (reboot === null) return
    if (reboot === 0) {
      setOpacity(0)
      stopMusic.current?.()
      setTimeout(onComplete, 500)
      return
    }
    const id = setTimeout(() => setReboot(r => (r ?? 1) - 1), 1000)
    return () => clearTimeout(id)
  }, [reboot, onComplete])

  // Typewriter crash lines
  useEffect(() => {
    let idx = 0
    const tick = (): void => {
      if (idx >= CRASH_LINES.length) {
        // Flash the OH SHIT box
        setOhShitFlash(true)
        setTimeout(() => setOhShitFlash(false), 200)
        setTimeout(() => { setOhShitFlash(true); setTimeout(() => setOhShitFlash(false), 200) }, 500)
        return
      }
      setLines(prev => [...prev, CRASH_LINES[idx]])
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      idx++
      setTimeout(tick, idx < 10 ? 90 : 120)
    }
    setTimeout(tick, 200)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: flashRed ? "rgba(80,0,0,0.97)" : "rgba(0,0,0,0.96)",
        opacity,
        transition: flashRed ? "background 0.05s" : "opacity 0.45s ease, background 0.4s ease",
      }}
      onClick={() => { stopMusic.current?.(); setOpacity(0); setTimeout(onComplete, 500) }}
    >
      <div
        className="w-full max-w-2xl rounded border overflow-hidden"
        style={{ borderColor: ohShitFlash ? "#ef4444" : "#3f3f46" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Chrome bar */}
        <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-2 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"/>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"/>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"/>
          </div>
          <span className="font-mono text-xs text-red-400">⚠ HARD FAULT EXCEPTION — ARM Cortex-M4F</span>
          <span className="ml-auto font-mono text-[10px] text-zinc-600">HFSR 0xC0000000</span>
        </div>

        {/* Crash log */}
        <div
          ref={scrollRef}
          className="bg-black p-4 h-72 overflow-y-auto"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-xs leading-5 whitespace-pre"
              style={{ color: line.color }}
            >
              {line.text}
            </div>
          ))}

          {/* Reboot countdown */}
          {reboot !== null && reboot > 0 && (
            <div className="font-mono text-xs text-yellow-400 mt-2 animate-pulse">
              Rebooting in {reboot}...
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="bg-zinc-900 border-t border-zinc-700 px-4 py-1.5 flex items-center justify-between font-mono text-[9px]">
          <span className="text-red-500">● FAULT ACTIVE</span>
          <span className="text-zinc-600">♩ Billie Jean — MJ — piezo buzzer</span>
          <span className="text-zinc-700">click to dismiss</span>
        </div>
      </div>
    </div>
  )
}
