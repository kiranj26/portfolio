"use client"

import { useState, useEffect } from "react"
import { ExternalLink, ChevronDown, ChevronRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { TraceSeparator } from "@/components/ui/trace-separator"
import { VideoModal } from "@/components/VideoModal"
import { projects } from "@/data/projects"
import type { Project, TechChip } from "@/types/portfolio"
import { cn } from "@/lib/utils"

// ── constants ────────────────────────────────────────────────────────────────

const VIDEO_PROJECTS = ["drum-esp32", "ble-gesture-efr32"]
const TABLE_PROJECT_IDS = [
  "ocpp-stm32f4", "can-library-c2000", "rp2040-projects",
  "c2000-piccolo", "esp32-stm32-uart", "can-log-parser",
  "posture-esp32", "evse-fault-injector", "stm32-platformio",
]

const layerColors: Record<TechChip["layer"], string> = {
  firmware: "bg-cyan-950 text-cyan-300 border-cyan-800",
  tooling:  "bg-zinc-800  text-zinc-300 border-zinc-700",
  language: "bg-violet-950 text-violet-300 border-violet-800",
  standard: "bg-amber-950  text-amber-300  border-amber-800",
}

function GithubIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

// ── C: PCB substrate background ───────────────────────────────────────────────

function PcbSubstrate(): React.ReactElement {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.045 }}
    >
      <defs>
        <pattern id="pcb-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="0.8" fill="rgba(184,115,51,0.9)"/>
          <circle cx="0"  cy="0"  r="0.8" fill="rgba(184,115,51,0.9)"/>
          <circle cx="40" cy="0"  r="0.8" fill="rgba(184,115,51,0.9)"/>
          <circle cx="0"  cy="40" r="0.8" fill="rgba(184,115,51,0.9)"/>
        </pattern>
      </defs>

      {/* Dot grid */}
      <rect width="100%" height="100%" fill="url(#pcb-grid)"/>

      {/* Sparse horizontal traces */}
      <line x1="0"   y1="120" x2="18%"  y2="120" stroke="rgba(184,115,51,0.7)" strokeWidth="1"/>
      <line x1="22%" y1="120" x2="45%"  y2="120" stroke="rgba(184,115,51,0.7)" strokeWidth="1"/>
      <line x1="60%" y1="120" x2="100%" y2="120" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>

      <line x1="0"   y1="340" x2="30%"  y2="340" stroke="rgba(184,115,51,0.6)" strokeWidth="1"/>
      <line x1="55%" y1="340" x2="80%"  y2="340" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
      <line x1="85%" y1="340" x2="100%" y2="340" stroke="rgba(184,115,51,0.4)" strokeWidth="1"/>

      <line x1="0"   y1="560" x2="12%"  y2="560" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
      <line x1="40%" y1="560" x2="68%"  y2="560" stroke="rgba(184,115,51,0.6)" strokeWidth="1"/>
      <line x1="75%" y1="560" x2="100%" y2="560" stroke="rgba(184,115,51,0.4)" strokeWidth="1"/>

      {/* Sparse vertical traces */}
      <line x1="18%"  y1="80"  x2="18%"  y2="160" stroke="rgba(184,115,51,0.6)" strokeWidth="1"/>
      <line x1="45%"  y1="80"  x2="45%"  y2="200" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>
      <line x1="60%"  y1="60"  x2="60%"  y2="140" stroke="rgba(184,115,51,0.4)" strokeWidth="1"/>
      <line x1="80%"  y1="300" x2="80%"  y2="380" stroke="rgba(184,115,51,0.5)" strokeWidth="1"/>

      {/* Via dots at trace junctions */}
      {[
        [18, 120], [45, 120], [60, 120],
        [80, 340], [30, 340],
        [40, 560], [68, 560],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={`${cx}%`} cy={cy} r="4"   fill="rgba(184,115,51,0.25)" stroke="rgba(200,140,60,0.4)" strokeWidth="0.8"/>
          <circle cx={`${cx}%`} cy={cy} r="1.5" fill="rgba(10,15,10,0.9)"/>
        </g>
      ))}

      {/* Corner fiducials */}
      <circle cx="24" cy="24" r="6" fill="none" stroke="rgba(184,115,51,0.4)" strokeWidth="0.8"/>
      <circle cx="24" cy="24" r="2" fill="rgba(184,115,51,0.3)"/>
    </svg>
  )
}

// ── D: Row pulse on expand ────────────────────────────────────────────────────

function RowPulse({ active }: { active: boolean }): React.ReactElement {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) { setVisible(false); return }
    setVisible(true)
    const id = setTimeout(() => setVisible(false), 380)
    return () => clearTimeout(id)
  }, [active])

  return (
    <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden pointer-events-none">
      <div style={{
        height: "100%",
        background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.9) 50%, transparent 100%)",
        width: "60%",
        transform: visible ? "translateX(167%)" : "translateX(-100%)",
        transition: visible ? "transform 360ms cubic-bezier(0.4,0,0.2,1)" : "none",
        boxShadow: "0 0 8px rgba(6,182,212,0.8)",
      }}/>
    </div>
  )
}

// ── F: Sequenced chip reveal ──────────────────────────────────────────────────

function SequencedChips({ chips, open }: { chips: TechChip[]; open: boolean }): React.ReactElement {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!open) { setVisibleCount(0); return }
    let i = 0
    const tick = (): void => {
      i++
      setVisibleCount(i)
      if (i < chips.length) setTimeout(tick, 45)
    }
    const id = setTimeout(tick, 60)
    return () => clearTimeout(id)
  }, [open, chips.length])

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip, idx) => (
        <span
          key={chip.label}
          className={cn("font-mono text-[9px] px-2 py-0.5 rounded border transition-all duration-150", layerColors[chip.layer])}
          style={{
            opacity:   idx < visibleCount ? 1 : 0,
            transform: idx < visibleCount ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {chip.label}
        </span>
      ))}
    </div>
  )
}

// ── Video hero card ───────────────────────────────────────────────────────────

function VideoHeroCard({ project }: { project: Project }): React.ReactElement {
  const [hovered, setHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const thumbUrl = project.video
    ? `https://img.youtube.com/vi/${project.video.youtubeId}/maxresdefault.jpg`
    : null

  return (
    <>
      <div
        className="relative rounded-xl border border-zinc-800 overflow-hidden cursor-pointer"
        style={{ height: 320 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* Thumbnail fades in on hover */}
        {thumbUrl && (
          <img
            src={thumbUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity:    hovered ? 1 : 0,
              transform:  hovered ? "scale(1.04)" : "scale(1.0)",
              transition: "opacity 400ms ease, transform 600ms ease",
              filter:     "brightness(0.38)",
            }}
          />
        )}

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.10) 3px, rgba(0,0,0,0.10) 4px)",
          opacity:    hovered ? 1 : 0,
          transition: "opacity 400ms ease",
        }}/>

        {/* Resting dark bg */}
        <div className="absolute inset-0 bg-zinc-900/90"
          style={{ opacity: hovered ? 0 : 1, transition: "opacity 350ms ease" }}/>

        {/* Resting content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between"
          style={{ opacity: hovered ? 0 : 1, transition: "opacity 250ms ease" }}
        >
          <div>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tags.map(t => (
                <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">{t}</span>
              ))}
            </div>
            <h3 className="font-mono text-white font-bold text-xl leading-snug mb-1">{project.title}</h3>
            <p className="font-mono text-xs text-cyan-600">{project.hardware}</p>
          </div>
          <div>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map(chip => (
                <span key={chip.label}
                  className={cn("font-mono text-[9px] px-2 py-0.5 rounded border", layerColors[chip.layer])}>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hovered: play overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 350ms ease" }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full"
              style={{ animation: hovered ? "ping 1s cubic-bezier(0,0,0.2,1) infinite" : "none", background: "rgba(6,182,212,0.2)" }}/>
            <div className="relative w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center"
              style={{ background: "rgba(6,182,212,0.2)", boxShadow: "0 0 30px rgba(6,182,212,0.5)" }}>
              <svg className="w-6 h-6 text-cyan-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">play demo</span>
          <p className="font-mono text-[10px] text-zinc-400 px-8 text-center mt-1">{project.description}</p>
        </div>

        {/* Corner tag */}
        <div className="absolute top-3 right-3 font-mono text-[8px] text-cyan-500/70 bg-black/50 px-2 py-0.5 rounded border border-cyan-900/40">
          ▶ DEMO
        </div>

        {/* Bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
          style={{ opacity: hovered ? 1 : 0, boxShadow: "0 0 12px rgba(6,182,212,0.8)", transition: "opacity 350ms ease" }}/>
      </div>

      {showModal && (
        <VideoModal project={project} onClose={() => setShowModal(false)}/>
      )}
    </>
  )
}

// ── Terminal table row ────────────────────────────────────────────────────────

function TableRow({
  project, index, isExpanded, onToggle,
}: {
  project: Project
  index: number
  isExpanded: boolean
  onToggle: () => void
}): React.ReactElement {
  const [pulseKey, setPulseKey] = useState(0)
  const rowNum = String(index + 1).padStart(2, "0")

  const handleToggle = (): void => {
    if (!isExpanded) setPulseKey(k => k + 1)
    onToggle()
  }

  return (
    <>
      <tr
        className={cn(
          "relative border-b border-zinc-800/60 cursor-pointer group transition-colors",
          isExpanded ? "bg-zinc-900/60" : "hover:bg-zinc-900/40"
        )}
        onClick={handleToggle}
      >
        <td className="py-3 pl-4 pr-3 font-mono text-[10px] text-zinc-700 select-none w-8">{rowNum}</td>
        <td className="py-3 pr-3 w-5">
          {isExpanded
            ? <ChevronDown className="w-3.5 h-3.5 text-cyan-500"/>
            : <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors"/>
          }
        </td>
        <td className="py-3 pr-4">
          <span className={cn("font-mono text-sm font-semibold transition-colors",
            isExpanded ? "text-cyan-400" : "text-zinc-200 group-hover:text-white")}>
            {project.title}
          </span>
        </td>
        <td className="py-3 pr-4 hidden md:table-cell">
          <span className="font-mono text-[10px] text-zinc-500">{project.hardware}</span>
        </td>
        <td className="py-3 pr-4 hidden lg:table-cell">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map(t => (
              <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-500 border border-zinc-700/60">{t}</span>
            ))}
          </div>
        </td>
        <td className="py-3 pr-4 hidden xl:table-cell">
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map(chip => (
              <span key={chip.label}
                className={cn("font-mono text-[8px] px-1.5 py-0.5 rounded border", layerColors[chip.layer])}>
                {chip.label}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="font-mono text-[8px] text-zinc-600">+{project.stack.length - 3}</span>
            )}
          </div>
        </td>
        <td className="py-3 pl-2 pr-4 text-right w-16">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 font-mono text-[9px] text-zinc-600 hover:text-cyan-400 transition-colors"
          >
            <GithubIcon className="w-3 h-3"/>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </td>

        {/* D: clock-edge pulse on expand */}
        <RowPulse active={pulseKey > 0} key={`pulse-${pulseKey}`}/>
      </tr>

      {/* Expanded drawer */}
      {isExpanded && (
        <tr className="border-b border-cyan-900/30">
          <td colSpan={7} className="p-0">
            <div
              className="px-6 py-5 bg-zinc-900/50 border-l-2 border-cyan-800/50"
              style={{ animation: "drawerOpen 200ms ease forwards" }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Description</p>
                  <p className="font-sans text-sm text-zinc-300 leading-relaxed mb-4">{project.description}</p>

                  <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-2">Stack</p>
                  {/* F: chips sequence in */}
                  <div className="mb-4">
                    <SequencedChips chips={project.stack} open={isExpanded}/>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors border border-zinc-700 hover:border-cyan-700 rounded px-3 py-1.5"
                    >
                      <GithubIcon className="w-3.5 h-3.5"/>
                      View on GitHub
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors border border-zinc-700 hover:border-cyan-700 rounded px-3 py-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5"/>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:w-48 shrink-0">
                  <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Hardware</p>
                  <p className="font-mono text-xs text-zinc-300 mb-3">{project.hardware}</p>

                  <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-1">Domain</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map(t => (
                      <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────

export function DiyProjectsSection(): React.ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const videoProjects = VIDEO_PROJECTS
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean) as Project[]

  const tableProjects = TABLE_PROJECT_IDS
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean) as Project[]

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">

      {/* C: PCB substrate */}
      <PcbSubstrate/>

      <style>{`
        @keyframes drawerOpen {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <BlurFade inView delay={0}>
          <div className="mb-4">
            <p className="font-mono text-cyan-500 text-[10px] tracking-[0.3em] uppercase mb-2">
              // firmware · embedded · systems
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Projects
            </h2>
            <p className="font-mono text-xs text-zinc-600 mt-1">
              {projects.length} repositories · hover to explore
            </p>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.04}>
          <TraceSeparator/>
        </BlurFade>

        {/* Two video hero cards */}
        <BlurFade inView delay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {videoProjects.map(project => (
              <VideoHeroCard key={project.id} project={project}/>
            ))}
          </div>
        </BlurFade>

        {/* Terminal table */}
        <BlurFade inView delay={0.12}>
          <div className="rounded-xl border border-zinc-800 overflow-hidden">

            {/* Chrome bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/70">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"/>
                </div>
                <span className="font-mono text-[9px] text-zinc-600 ml-2 tracking-widest">
                  projects.index — {tableProjects.length} entries
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-700">↵ expand row</span>
            </div>

            {/* Column headers */}
            <div className="border-b border-zinc-800/60 bg-zinc-900/40">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2 pl-4 pr-3 text-left font-mono text-[8px] text-zinc-700 uppercase tracking-widest w-8">#</th>
                    <th className="py-2 pr-3 w-5"/>
                    <th className="py-2 pr-4 text-left font-mono text-[8px] text-zinc-700 uppercase tracking-widest">Project</th>
                    <th className="py-2 pr-4 text-left font-mono text-[8px] text-zinc-700 uppercase tracking-widest hidden md:table-cell">Hardware</th>
                    <th className="py-2 pr-4 text-left font-mono text-[8px] text-zinc-700 uppercase tracking-widest hidden lg:table-cell">Domain</th>
                    <th className="py-2 pr-4 text-left font-mono text-[8px] text-zinc-700 uppercase tracking-widest hidden xl:table-cell">Stack</th>
                    <th className="py-2 pr-4 w-16"/>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Rows */}
            <table className="w-full">
              <tbody>
                {tableProjects.map((project, i) => (
                  <TableRow
                    key={project.id}
                    project={project}
                    index={i}
                    isExpanded={expandedId === project.id}
                    onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
