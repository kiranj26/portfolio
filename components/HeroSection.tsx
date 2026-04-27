"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { MorphingText }   from "@/components/ui/morphing-text"
import { BlurFade }       from "@/components/ui/blur-fade"
import { Particles }      from "@/components/ui/particles"
import { PcbBackground }  from "@/components/ui/pcb-background"
import { BootSequence }   from "@/components/BootSequence"

const DOMAIN_WORDS = ["automotive", "ev charging", "industrial", "rtos", "bare metal"]

// Konami: ↑↑↓↓←→←→BA
const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a",
]

function GithubIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

export function HeroSection(): React.ReactElement {
  const [crashing, setCrashing] = useState(false)
  const [crashed,  setCrashed]  = useState(false)
  const konamiRef = useRef<string[]>([])
  // Long-press IC state
  const holdTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [holdPct, setHoldPct] = useState(0)
  const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const triggerCrash = useCallback((): void => {
    if (crashing || crashed) return
    setCrashing(true)
  }, [crashing, crashed])

  // ── Trigger 2: Konami code ─────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length)
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        konamiRef.current = []
        triggerCrash()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [triggerCrash])

  // ── Trigger 3: Long-press STM32 IC ────────────────────────────────────────
  const startHold = (): void => {
    if (crashing || crashed) return
    let pct = 0
    holdInterval.current = setInterval(() => {
      pct += 100 / 15   // 1.5s = 15 × 100ms
      setHoldPct(Math.min(pct, 100))
      if (pct >= 100) {
        clearInterval(holdInterval.current!)
        holdInterval.current = null
        setHoldPct(0)
        triggerCrash()
      }
    }, 100)
  }
  const cancelHold = (): void => {
    if (holdInterval.current) { clearInterval(holdInterval.current); holdInterval.current = null }
    setHoldPct(0)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">

      {/* PCB substrate */}
      <PcbBackground />

      {/* Noise */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" aria-hidden="true">
        <filter id="pcb-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#pcb-noise)"/>
      </svg>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 38% at 50% 42%, rgba(6,182,212,0.07) 0%, rgba(6,182,212,0.02) 45%, transparent 70%)",
      }}/>

      {/* Particles */}
      <Particles className="absolute inset-0" quantity={60} color="#06b6d4" size={0.45} staticity={65} ease={65} vx={0.04}/>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(3,13,7,0.75) 100%)",
      }}/>

      {/* ── TRIGGER 1: LED hotspot (click the blinking LED D1) ─────────── */}
      <div
        className="absolute"
        style={{ left: "48.5%", top: "19.5%", width: "3%", height: "5%", transform: "translate(-50%,-50%)" }}
        title="Click to probe D1"
      >
        <div
          className="w-full h-full rounded-full cursor-crosshair"
          onClick={triggerCrash}
          style={{ background: "transparent" }}
        />
      </div>

      {/* ── TRIGGER 3: STM32 IC long-press hotspot ──────────────────────── */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: "29.5%", top: "46%", width: "10.5%", height: "19%", transform: "translate(-50%,-50%)" }}
      >
        <div
          className="w-full h-full cursor-cell relative"
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
          title="Hold to trigger HardFault"
        >
          {/* Hold progress ring */}
          {holdPct > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(239,68,68,0.25)" strokeWidth="4"/>
              <circle cx="50" cy="50" r="46" fill="none"
                stroke="rgba(239,68,68,0.8)" strokeWidth="4"
                strokeDasharray={`${holdPct * 2.89} 999`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="55" textAnchor="middle" fill="rgba(239,68,68,0.9)"
                fontSize="18" fontFamily="monospace" fontWeight="bold">
                {Math.floor(holdPct)}%
              </text>
            </svg>
          )}
        </div>
      </div>

      {/* ── HERO CONTENT ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

        <BlurFade delay={0} inView>
          <p className="font-mono text-cyan-500 text-xs tracking-widest uppercase mb-4">
            firmware engineer · eaton · peachtree city, ga
          </p>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4">
            Kiran Jojare
          </h1>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <p className="font-sans text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto mb-2 leading-relaxed">
            Production firmware on{" "}
            <span className="text-cyan-400 font-semibold">10+ silicon families</span>{" "}
            across automotive (ISO&nbsp;26262&nbsp;ASIL-D), EV charging (OCPP&nbsp;1.6),
            industrial DSP, and space —<br className="hidden sm:block"/>
            from bare metal bring-up to shipped product.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="mb-8 mt-6">
            <MorphingText
              texts={DOMAIN_WORDS}
              className="text-cyan-400 font-mono text-3xl sm:text-4xl md:text-5xl h-14 md:h-16"
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.42} inView>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-semibold text-sm transition-colors"
            >
              <ArrowDown className="w-4 h-4"/>
              View Projects
            </Link>
            <a
              href="https://github.com/kiranj26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-zinc-700 hover:border-cyan-500 text-zinc-300 hover:text-cyan-400 font-mono font-semibold text-sm transition-colors"
            >
              <GithubIcon className="w-4 h-4"/>
              GitHub
            </a>
          </div>
        </BlurFade>

        {/* Hint strip */}
        <BlurFade delay={0.55} inView>
          <div className="flex items-center justify-center gap-6 font-mono text-[10px] text-zinc-700">
            <span title="Click the blinking LED on the PCB">⊕ probe D1 LED</span>
            <span className="text-zinc-800">·</span>
            <span title="Hold the STM32 IC">⏳ hold U1 (STM32)</span>
            <span className="text-zinc-800">·</span>
            <span title="Konami code">↑↑↓↓←→←→BA</span>
          </div>
          {crashed && (
            <p className="font-mono text-xs text-green-500 mt-3 animate-pulse">
              ✓ portfolio rebooted successfully
            </p>
          )}
        </BlurFade>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-zinc-700"/>
      </div>

      {crashing && (
        <BootSequence onComplete={() => { setCrashing(false); setCrashed(true) }}/>
      )}
    </section>
  )
}
