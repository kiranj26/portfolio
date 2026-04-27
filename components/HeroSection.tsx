"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { MorphingText } from "@/components/ui/morphing-text"
import { BlurFade } from "@/components/ui/blur-fade"
import { Particles } from "@/components/ui/particles"
import { PcbBackground } from "@/components/ui/pcb-background"
import { TactileButton } from "@/components/TactileButton"
import { BootSequence } from "@/components/BootSequence"

const DOMAIN_WORDS = ["automotive", "ev charging", "industrial", "rtos", "bare metal"]

function GithubIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function HeroSection(): React.ReactElement {
  const [booting, setBooting] = useState(false)
  const [booted, setBooted] = useState(false)

  const handleBoot = (): void => {
    if (booting || booted) return
    setBooting(true)
  }

  const handleBootComplete = (): void => {
    setBooting(false)
    setBooted(true)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">

      {/* Layer 1 — PCB FR4 substrate + routed traces */}
      <PcbBackground />

      {/* Layer 2 — Noise texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]" aria-hidden="true">
        <filter id="pcb-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#pcb-noise)"/>
      </svg>

      {/* Layer 3 — Radial glow centering on headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 50% 42%, rgba(6,182,212,0.07) 0%, rgba(6,182,212,0.02) 45%, transparent 70%)",
        }}
      />

      {/* Layer 4 — Particles (solder flux / signal traces floating) */}
      <Particles
        className="absolute inset-0"
        quantity={60}
        color="#06b6d4"
        size={0.45}
        staticity={65}
        ease={65}
        vx={0.04}
        vy={0}
      />

      {/* Layer 5 — Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(3,13,7,0.75) 100%)",
        }}
      />

      {/* ── HERO CONTENT ─────────────────────────────────── */}
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
            industrial DSP, and space —<br className="hidden sm:block" />
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

        {/* CTA buttons */}
        <BlurFade delay={0.42} inView>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-semibold text-sm transition-colors"
            >
              <ArrowDown className="w-4 h-4" />
              View Projects
            </Link>
            <a
              href="https://github.com/kiranj26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-zinc-700 hover:border-cyan-500 text-zinc-300 hover:text-cyan-400 font-mono font-semibold text-sm transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </BlurFade>

        {/* ── TACTILE BUTTON — centrepiece ─────────── */}
        <BlurFade delay={0.55} inView>
          <div className="flex flex-col items-center gap-2">
            {/* PCB-style trace decoration around the button */}
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-800/50"/>
              <TactileButton onPress={handleBoot} disabled={booting || booted} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-800/50"/>
            </div>
            {booted && (
              <p className="font-mono text-xs text-green-500 mt-1 animate-pulse">
                ✓ system initialized
              </p>
            )}
          </div>
        </BlurFade>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-zinc-700" />
      </div>

      {/* Boot sequence overlay */}
      {booting && <BootSequence onComplete={handleBootComplete} />}
    </section>
  )
}
