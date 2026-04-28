"use client"

import { useEffect, useRef, useState } from "react"
import { TraceSeparator } from "@/components/ui/trace-separator"

// ── Firmware stack definition — ordered bottom → top ─────────────────────────

const STACK = [
  {
    addr:     "0x00",
    layer:    "Silicon / MCUs",
    sublabel: "hardware abstraction layer",
    color:    { border: "border-cyan-800",   bg: "bg-cyan-950/40",    label: "text-cyan-400",   chip: "bg-cyan-950 text-cyan-300 border-cyan-800"   },
    bus:      "rgba(6,182,212,0.5)",
    skills:   ["STM32G0/F4/SPC5", "NXP S32K3", "TI C2000/F280x", "Renesas RH850", "ESP32", "RP2040", "EFR32 Blue Gecko"],
  },
  {
    addr:     "0x10",
    layer:    "Protocols / Bus",
    sublabel: "peripheral driver layer",
    color:    { border: "border-teal-800",   bg: "bg-teal-950/30",    label: "text-teal-400",   chip: "bg-teal-950 text-teal-300 border-teal-800"   },
    bus:      "rgba(20,184,166,0.5)",
    skills:   ["CAN", "CAN FD", "LIN", "UART", "SPI", "I2C", "USB", "BLE", "DoIP", "OCPP", "MQTT"],
  },
  {
    addr:     "0x20",
    layer:    "RTOS",
    sublabel: "scheduler & task layer",
    color:    { border: "border-sky-800",    bg: "bg-sky-950/30",     label: "text-sky-400",    chip: "bg-sky-950 text-sky-300 border-sky-800"      },
    bus:      "rgba(14,165,233,0.5)",
    skills:   ["FreeRTOS", "Zephyr"],
  },
  {
    addr:     "0x30",
    layer:    "Standards",
    sublabel: "compliance & safety layer",
    color:    { border: "border-amber-800",  bg: "bg-amber-950/30",   label: "text-amber-400",  chip: "bg-amber-950 text-amber-300 border-amber-800" },
    bus:      "rgba(245,158,11,0.5)",
    skills:   ["ISO 26262", "AUTOSAR", "MISRA C", "J-MAAB"],
  },
  {
    addr:     "0x40",
    layer:    "Debug & Toolchain",
    sublabel: "development tools layer",
    color:    { border: "border-zinc-700",   bg: "bg-zinc-800/30",    label: "text-zinc-300",   chip: "bg-zinc-800 text-zinc-300 border-zinc-700"   },
    bus:      "rgba(161,161,170,0.4)",
    skills:   ["JTAG", "GDB", "OpenOCD", "CANoe", "CANalyzer", "Code Composer Studio", "STMCube"],
  },
  {
    addr:     "0x50",
    layer:    "Languages",
    sublabel: "application layer",
    color:    { border: "border-violet-800", bg: "bg-violet-950/30",  label: "text-violet-400", chip: "bg-violet-950 text-violet-300 border-violet-800" },
    bus:      "rgba(139,92,246,0.5)",
    skills:   ["C", "C++", "Assembly", "Python", "MATLAB/Simulink", "Bash"],
  },
]

// ── Skill chip with probe-tip hover ──────────────────────────────────────────

function SkillChip({ label, chipClass }: { label: string; chipClass: string }): React.ReactElement {
  const [probed, setProbed] = useState(false)

  return (
    <span
      className={`relative font-mono text-[10px] px-2.5 py-1 rounded border cursor-default select-none transition-all duration-150 ${chipClass}`}
      style={{ boxShadow: probed ? "0 0 10px currentColor" : "none" }}
      onMouseEnter={() => setProbed(true)}
      onMouseLeave={() => setProbed(false)}
    >
      {probed && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[7px] text-cyan-400 whitespace-nowrap pointer-events-none"
          style={{ textShadow: "0 0 6px rgba(6,182,212,0.8)" }}>
          ▼ HIGH
        </span>
      )}
      {label}
    </span>
  )
}

// ── Stack layer band ──────────────────────────────────────────────────────────

function StackLayer({
  layer, index, visible,
}: {
  layer: typeof STACK[0]
  index: number
  visible: boolean
}): React.ReactElement {
  return (
    <div
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 500ms ease ${index * 80}ms, transform 500ms cubic-bezier(0.34,1.26,0.64,1) ${index * 80}ms`,
      }}
    >
      <div className={`relative flex gap-0 rounded-lg border ${layer.color.border} ${layer.color.bg} overflow-hidden`}>

        {/* Left bus bar */}
        <div className="w-1 shrink-0 self-stretch"
          style={{ background: layer.bus, boxShadow: `0 0 8px ${layer.bus}` }}/>

        {/* Address + label column */}
        <div className="w-36 shrink-0 px-4 py-4 border-r border-zinc-800/60 flex flex-col justify-center gap-0.5">
          <span className="font-mono text-[9px] text-zinc-600 tracking-widest">{layer.addr}</span>
          <span className={`font-mono text-xs font-semibold ${layer.color.label}`}>{layer.layer}</span>
          <span className="font-mono text-[8px] text-zinc-600 leading-tight mt-0.5">{layer.sublabel}</span>
        </div>

        {/* Skills */}
        <div className="flex-1 px-5 py-4 flex flex-wrap gap-1.5 items-center">
          {layer.skills.map(skill => (
            <SkillChip key={skill} label={skill} chipClass={layer.color.chip}/>
          ))}
        </div>

        {/* Right: chip count */}
        <div className="w-10 shrink-0 flex items-center justify-center border-l border-zinc-800/40">
          <span className="font-mono text-[8px] text-zinc-700 rotate-90 tracking-widest whitespace-nowrap">
            {layer.skills.length} signals
          </span>
        </div>
      </div>
    </div>
  )
}

// ── PCB substrate (reused pattern) ───────────────────────────────────────────

function PcbSubstrate(): React.ReactElement {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"
      aria-hidden="true" style={{ opacity: 0.18 }}>
      <defs>
        <pattern id="skills-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="0"  cy="0"  r="1" fill="rgba(184,115,51,1)"/>
          <circle cx="40" cy="0"  r="1" fill="rgba(184,115,51,1)"/>
          <circle cx="0"  cy="40" r="1" fill="rgba(184,115,51,1)"/>
          <circle cx="40" cy="40" r="1" fill="rgba(184,115,51,1)"/>
        </pattern>
      </defs>
      <rect width="1200" height="700" fill="url(#skills-dots)"/>
      <line x1="0" y1="200" x2="300" y2="200" stroke="rgba(184,115,51,0.8)" strokeWidth="1.2"/>
      <line x1="500" y1="200" x2="1200" y2="200" stroke="rgba(184,115,51,0.7)" strokeWidth="1.2"/>
      <line x1="0" y1="450" x2="180" y2="450" stroke="rgba(184,115,51,0.7)" strokeWidth="1.2"/>
      <line x1="400" y1="450" x2="750" y2="450" stroke="rgba(184,115,51,0.8)" strokeWidth="1.2"/>
      <line x1="900" y1="450" x2="1200" y2="450" stroke="rgba(184,115,51,0.6)" strokeWidth="1.2"/>
      <line x1="300" y1="140" x2="300" y2="260" stroke="rgba(184,115,51,0.7)" strokeWidth="1.2"/>
      <line x1="500" y1="140" x2="500" y2="260" stroke="rgba(184,115,51,0.6)" strokeWidth="1.2"/>
      <line x1="750" y1="380" x2="750" y2="520" stroke="rgba(184,115,51,0.7)" strokeWidth="1.2"/>
      <line x1="400" y1="380" x2="400" y2="520" stroke="rgba(184,115,51,0.6)" strokeWidth="1.2"/>
      {([
        [300,200],[500,200],[750,450],[400,450],
      ] as [number,number][]).map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="rgba(184,115,51,0.3)" stroke="rgba(200,140,60,0.6)" strokeWidth="1"/>
          <circle cx={cx} cy={cy} r="2" fill="rgba(8,12,8,0.95)"/>
        </g>
      ))}
      <circle cx="30" cy="30" r="7" fill="none" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
      <circle cx="30" cy="30" r="2" fill="rgba(184,115,51,0.4)"/>
      <circle cx="1170" cy="30" r="7" fill="none" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
      <circle cx="1170" cy="30" r="2" fill="rgba(184,115,51,0.4)"/>
    </svg>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────

export function SkillsSection(): React.ReactElement {
  const ref  = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden">
      <PcbSubstrate/>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-4">
          <p className="font-mono text-cyan-500 text-[10px] tracking-[0.3em] uppercase mb-2">
            // memory map · 0x00–0x5F
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills
          </h2>
          <p className="font-mono text-xs text-zinc-600 mt-1">
            firmware stack · bottom-up · hover to probe
          </p>
        </div>

        <TraceSeparator/>

        {/* Vertical bus rail label */}
        <div className="flex items-center gap-3 mb-3 mt-4">
          <div className="w-1 h-4 rounded-full bg-zinc-700"/>
          <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">system bus</span>
          <div className="flex-1 h-px bg-zinc-800"/>
          <span className="font-mono text-[8px] text-zinc-700">↑ application</span>
        </div>

        {/* Stack layers — bottom to top means we render top visually but label bottom-up */}
        <div ref={ref} className="flex flex-col-reverse gap-1.5">
          {STACK.map((layer, i) => (
            <StackLayer key={layer.addr} layer={layer} index={i} visible={visible}/>
          ))}
        </div>

        {/* Bottom bus label */}
        <div className="flex items-center gap-3 mt-3">
          <div className="w-1 h-4 rounded-full bg-zinc-700"/>
          <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">hardware</span>
          <div className="flex-1 h-px bg-zinc-800"/>
          <span className="font-mono text-[8px] text-zinc-700">↓ silicon</span>
        </div>
      </div>
    </section>
  )
}
