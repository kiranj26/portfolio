"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { LcdDisplay }      from "@/components/ui/lcd-display"
import { BlurFade }        from "@/components/ui/blur-fade"
import { Particles }      from "@/components/ui/particles"
import { PcbBackground }  from "@/components/ui/pcb-background"
import { BootSequence }   from "@/components/BootSequence"


function GithubIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function EStopButton({ onPress, disabled }: { onPress: () => void; disabled: boolean }): React.ReactElement {
  const [pressed, setPressed] = useState(false)

  const handlePress = (): void => {
    if (disabled) return
    setPressed(true)
    setTimeout(() => setPressed(false), 200)
    onPress()
  }

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Warning label */}
      <div className="flex items-center gap-1.5 font-mono text-xs text-red-500 tracking-widest uppercase animate-pulse">
        <span>⚠</span>
        <span>do not press</span>
        <span>⚠</span>
      </div>

      {/* E-STOP outer housing */}
      <div
        className="relative cursor-pointer"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)",
          border: "3px solid #3a3a3a",
          boxShadow: pressed
            ? "0 2px 4px rgba(0,0,0,0.9), inset 0 2px 6px rgba(0,0,0,0.7)"
            : `0 8px 0 #0a0a0a, 0 12px 20px rgba(0,0,0,0.8),
               0 0 30px rgba(239,68,68,0.35), 0 0 60px rgba(239,68,68,0.15),
               inset 0 2px 0 rgba(255,255,255,0.06)`,
          transform: pressed ? "translateY(7px)" : "translateY(0px)",
          transition: "transform 80ms ease, box-shadow 80ms ease",
        }}
        onMouseDown={handlePress}
        onTouchStart={handlePress}
        role="button"
        tabIndex={0}
        aria-label="Flash firmware button"
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePress() }}
      >
        {/* Pulsing glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            animation: "estop-pulse 2s ease-in-out infinite",
            borderRadius: "50%",
          }}
        />

        {/* Red cap */}
        <div
          className="absolute inset-0 m-1 rounded-full flex flex-col items-center justify-center"
          style={{
            background: pressed
              ? "radial-gradient(circle at 40% 35%, #b91c1c 0%, #7f1d1d 100%)"
              : "radial-gradient(circle at 40% 35%, #ef4444 0%, #b91c1c 60%, #991b1b 100%)",
            boxShadow: pressed
              ? "inset 0 4px 8px rgba(0,0,0,0.6)"
              : "0 3px 0 rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,120,120,0.4)",
            transition: "background 80ms ease, box-shadow 80ms ease",
          }}
        >
          <span className="font-mono text-white font-bold text-[7px] tracking-widest leading-tight text-center">
            FLASH<br/>FW
          </span>
        </div>
      </div>

      {/* CTA below */}
      <p className="font-mono text-[11px] text-zinc-500 tracking-wide">
        → press to load firmware
      </p>

      <style>{`
        @keyframes estop-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.0); }
          50%       { box-shadow: 0 0 0 12px rgba(239,68,68,0.0); }
        }
        @keyframes estop-ring {
          0%   { box-shadow: 0 0 20px 4px rgba(239,68,68,0.5); }
          50%  { box-shadow: 0 0 36px 8px rgba(239,68,68,0.2); }
          100% { box-shadow: 0 0 20px 4px rgba(239,68,68,0.5); }
        }
      `}</style>
    </div>
  )
}

export function HeroSection(): React.ReactElement {
  const [crashing, setCrashing] = useState(false)
  const [crashed,  setCrashed]  = useState(false)

  const triggerCrash = useCallback((): void => {
    if (crashing || crashed) return
    setCrashing(true)
  }, [crashing, crashed])

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
          <div className="mb-6 mt-6 flex justify-center">
            <LcdDisplay />
          </div>
        </BlurFade>

        <BlurFade delay={0.42} inView>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
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

        {/* E-STOP firmware button */}
        <BlurFade delay={0.55} inView>
          <div className="flex flex-col items-center gap-2">
            <EStopButton onPress={triggerCrash} disabled={crashing || crashed} />
            {crashed && (
              <p className="font-mono text-xs text-green-500 mt-2 animate-pulse">
                ✓ firmware v2.1 rebooted successfully
              </p>
            )}
          </div>
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
