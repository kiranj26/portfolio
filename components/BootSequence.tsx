"use client"

import { useEffect, useRef, useState } from "react"

// ── Types ────────────────────────────────────────────────────────────────────
type Phase = "loading" | "crashing" | "dumping" | "rebooting"

interface LoadStep {
  msg: string
  pct: number
  speech: string
  status: "OK" | "WARN" | ""
  color: string
}

// ── Loading steps (firmware flash simulation) ────────────────────────────────
const LOAD_STEPS: LoadStep[] = [
  { msg: "Initializing ARM Cortex-M4F @ 180MHz",   pct: 8,  speech: "Initializing ARM Cortex M4 processor",  status: "OK",   color: "#86efac" },
  { msg: "ROM bootloader verified  [0x08000000]",   pct: 18, speech: "Bootloader verified",                   status: "OK",   color: "#86efac" },
  { msg: "Flash CRC check          [PASS]",         pct: 27, speech: "Flash integrity check passed",          status: "OK",   color: "#86efac" },
  { msg: "Mounting NVS storage     [OK]",           pct: 36, speech: "Storage mounted",                      status: "OK",   color: "#86efac" },
  { msg: "Init UART  115200 8N1    [OK]",           pct: 45, speech: "UART initialized",                     status: "OK",   color: "#86efac" },
  { msg: "Init CAN   500kbps       [OK]",           pct: 54, speech: "CAN bus online",                       status: "OK",   color: "#86efac" },
  { msg: "Init SPI   10MHz CPOL=0  [OK]",           pct: 62, speech: "SPI ready",                            status: "OK",   color: "#86efac" },
  { msg: "FreeRTOS scheduler start [OK]",           pct: 72, speech: "FreeRTOS scheduler started",           status: "OK",   color: "#86efac" },
  { msg: "Spawning portfolio_task  [OK]",           pct: 82, speech: "Portfolio task spawned",               status: "OK",   color: "#86efac" },
  { msg: "Loading firmware v2.1   ...",             pct: 91, speech: "Loading Kiran Jojare firmware",        status: "",     color: "#fbbf24" },
  { msg: "Finalizing heap layout  ...",             pct: 97, speech: "Almost there",                        status: "WARN", color: "#fbbf24" },
]

// ── ARM HardFault dump lines ─────────────────────────────────────────────────
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
  { text: "│     *** SYSTEM HALTED ***       │",                              color: "#ef4444" },
  { text: "└─────────────────────────────────┘",                              color: "#ef4444" },
  { text: "",                                                                  color: "#a1a1aa" },
]

// ── TTS helpers ──────────────────────────────────────────────────────────────
function speak(text: string, opts?: { rate?: number; pitch?: number; volume?: number }): void {
  try {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate   = opts?.rate   ?? 0.85
    u.pitch  = opts?.pitch  ?? 0.4
    u.volume = opts?.volume ?? 0.9
    window.speechSynthesis.speak(u)
  } catch { /* skip */ }
}

// ── Alarm buzzer ─────────────────────────────────────────────────────────────
function playAlarm(): void {
  try {
    const AC = window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()
    ;[0, 0.22, 0.44, 0.66].forEach((delay) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = "square"
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0, ctx.currentTime + delay)
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + delay + 0.01)
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + delay + 0.18)
      osc.start(ctx.currentTime + delay)
      osc.stop(ctx.currentTime + delay + 0.2)
    })
    setTimeout(() => ctx.close(), 1200)
  } catch { /* skip */ }
}

// ── Boot beep (startup) ──────────────────────────────────────────────────────
function playBootBeep(): void {
  try {
    const AC = window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AC()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = "square"; osc.frequency.value = 440
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.12)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.13)
    setTimeout(() => ctx.close(), 300)
  } catch { /* skip */ }
}

// ── Component ────────────────────────────────────────────────────────────────
interface BootSequenceProps { onComplete: () => void }

export function BootSequence({ onComplete }: BootSequenceProps): React.ReactElement {
  const [phase,       setPhase]       = useState<Phase>("loading")
  const [stepIdx,     setStepIdx]     = useState(0)
  const [progress,    setProgress]    = useState(0)
  const [glitch,      setGlitch]      = useState(false)
  const [dumpLines,   setDumpLines]   = useState<typeof CRASH_LINES>([])
  const [reboot,      setReboot]      = useState<number | null>(null)
  const [opacity,     setOpacity]     = useState(0)
  const [flashRed,    setFlashRed]    = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Fade in
  useEffect(() => {
    setTimeout(() => setOpacity(1), 40)
    speak("Firmware flash initiated. Stand by.", { rate: 0.8, pitch: 0.35 })
    playBootBeep()
  }, [])

  // ── Phase 1: loading steps ────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "loading") return
    if (stepIdx >= LOAD_STEPS.length) {
      // All steps done → crash
      setTimeout(() => setPhase("crashing"), 400)
      return
    }
    const step = LOAD_STEPS[stepIdx]
    const delay = stepIdx === 0 ? 800 : 650
    const id = setTimeout(() => {
      setProgress(step.pct)
      speak(step.speech, { rate: 0.9, pitch: 0.35 })
      playBootBeep()
      setStepIdx(i => i + 1)
    }, delay)
    return () => clearTimeout(id)
  }, [phase, stepIdx])

  // ── Phase 2: crash transition ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "crashing") return
    // Glitch flashes
    setGlitch(true)
    setTimeout(() => setGlitch(false), 120)
    setTimeout(() => setGlitch(true), 280)
    setTimeout(() => setGlitch(false), 420)

    // Alarm + "oh noooo" TTS
    setTimeout(() => {
      playAlarm()
      speak("Oh no. Oh no no no no no. OHHHHHH NOOOOOO. Hard fault exception. System... halted.", {
        rate: 0.7, pitch: 0.25, volume: 1,
      })
    }, 300)

    // Flash red
    setTimeout(() => {
      setFlashRed(true)
      setTimeout(() => setFlashRed(false), 500)
    }, 500)

    // Move to dump phase
    setTimeout(() => setPhase("dumping"), 2200)
  }, [phase])

  // ── Phase 3: typewriter dump ──────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "dumping") return
    let idx = 0
    let stopped = false
    const tick = (): void => {
      if (stopped) return
      if (idx >= CRASH_LINES.length) {
        setTimeout(() => { if (!stopped) setReboot(3) }, 1500)
        return
      }
      const line = CRASH_LINES[idx]
      if (line) setDumpLines(prev => [...prev, line])
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      idx++
      setTimeout(tick, idx < 10 ? 80 : 110)
    }
    const id = setTimeout(tick, 300)
    return () => { stopped = true; clearTimeout(id) }
  }, [phase])

  // ── Phase 4: reboot countdown ─────────────────────────────────────────────
  useEffect(() => {
    if (reboot === null) return
    if (reboot === 0) {
      speak("Rebooting. Welcome back.", { rate: 0.85, pitch: 0.4 })
      setOpacity(0)
      const id = setTimeout(() => { onComplete() }, 700)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setReboot(r => (r ?? 1) - 1), 1000)
    return () => clearTimeout(id)
  }, [reboot, onComplete])

  const dismiss = (): void => {
    window.speechSynthesis?.cancel()
    setOpacity(0)
    setTimeout(onComplete, 500)
  }

  const isLoading  = phase === "loading"
  const isCrashing = phase === "crashing"
  const isDumping  = phase === "dumping" || reboot !== null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        background: flashRed ? "rgba(90,0,0,0.98)" : "rgba(0,0,0,0.96)",
        opacity,
        transition: flashRed ? "background 0.06s" : "opacity 0.45s ease, background 0.4s ease",
      }}
      onClick={dismiss}
    >
      <div
        className="w-full max-w-2xl rounded border overflow-hidden"
        style={{ borderColor: isCrashing || flashRed ? "#ef4444" : "#3f3f46" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Chrome bar */}
        <div className="bg-zinc-900 border-b border-zinc-700 px-4 py-2 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"/>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"/>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"/>
          </div>
          <span className="font-mono text-xs text-cyan-400">
            {isLoading ? "⚡ KJ-DEV-BOARD v2.1 — Firmware Loader" : "⚠ HARD FAULT EXCEPTION — ARM Cortex-M4F"}
          </span>
          <span className="ml-auto font-mono text-[10px] text-zinc-600">
            {isLoading ? `${progress}%` : "HFSR 0xC0000000"}
          </span>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="bg-black p-4 h-80 overflow-y-auto font-mono text-xs leading-5"
          style={{ filter: glitch ? "hue-rotate(180deg) invert(0.1)" : "none", transition: "filter 0.05s" }}
        >
          {/* ── Loading phase ── */}
          {(isLoading || isCrashing) && (
            <div className="space-y-1">
              <div className="text-cyan-500 mb-3 text-[11px] tracking-widest">
                KJ-DEV-BOARD FIRMWARE FLASH UTILITY v1.0
              </div>

              {LOAD_STEPS.slice(0, stepIdx).map((step, i) => (
                <div key={i} className="flex items-center gap-2 whitespace-pre" style={{ color: step.color }}>
                  <span className="text-zinc-600 shrink-0">[{String(i).padStart(2, "0")}]</span>
                  <span className="flex-1">{step.msg}</span>
                  {step.status && (
                    <span style={{ color: step.status === "OK" ? "#86efac" : "#fbbf24" }}>
                      [{step.status}]
                    </span>
                  )}
                </div>
              ))}

              {/* Progress bar */}
              {stepIdx > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-zinc-500 text-[10px] mb-1">
                    <span>FLASH PROGRESS</span>
                    <span>{isCrashing ? "97" : progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-zinc-900 rounded-sm border border-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-sm transition-all duration-500"
                      style={{
                        width: `${isCrashing ? 97 : progress}%`,
                        background: isCrashing
                          ? "linear-gradient(90deg, #ef4444, #dc2626)"
                          : "linear-gradient(90deg, #06b6d4, #22d3ee)",
                        boxShadow: isCrashing
                          ? "0 0 8px rgba(239,68,68,0.6)"
                          : "0 0 8px rgba(6,182,212,0.5)",
                      }}
                    />
                  </div>

                  {isCrashing && (
                    <div className="mt-2 text-red-500 animate-pulse text-center tracking-widest text-[11px]">
                      ⚠ WRITE ERROR — UNEXPECTED EXCEPTION ⚠
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Dump phase ── */}
          {isDumping && (
            <div>
              {dumpLines.filter(Boolean).map((line, i) => (
                <div key={i} className="whitespace-pre" style={{ color: line.color }}>
                  {line.text}
                </div>
              ))}

              {reboot !== null && reboot > 0 && (
                <div className="text-yellow-400 mt-2 animate-pulse">
                  Rebooting in {reboot}...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="bg-zinc-900 border-t border-zinc-700 px-4 py-1.5 flex items-center justify-between font-mono text-[9px]">
          <span style={{ color: isCrashing || isDumping ? "#ef4444" : "#22d3ee" }}>
            {isCrashing || isDumping ? "● FAULT ACTIVE" : "● FLASHING"}
          </span>
          <span className="text-zinc-600">KJ-DEV-BOARD · ARM Cortex-M4F · 180MHz</span>
          <span className="text-zinc-700">click to dismiss</span>
        </div>
      </div>
    </div>
  )
}
