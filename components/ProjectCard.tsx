"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
import { VideoModal } from "@/components/VideoModal"
import type { Project, TechChip } from "@/types/portfolio"
import { cn } from "@/lib/utils"

function GithubIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

const layerColors: Record<TechChip["layer"], string> = {
  firmware: "bg-cyan-950 text-cyan-300 border-cyan-800",
  tooling:  "bg-zinc-800  text-zinc-300 border-zinc-700",
  language: "bg-violet-950 text-violet-300 border-violet-800",
  standard: "bg-amber-950  text-amber-300  border-amber-800",
}

// ── Hero card (full-width, has video thumbnail) ───────────────────────────────
export function HeroProjectCard({ project }: { project: Project }): React.ReactElement {
  const [showVideo, setShowVideo] = useState(false)
  const [thumbHover, setThumbHover] = useState(false)

  const thumbUrl = project.video
    ? `https://img.youtube.com/vi/${project.video.youtubeId}/maxresdefault.jpg`
    : null

  return (
    <>
      <div className="group relative rounded-xl border border-zinc-800 hover:border-cyan-800 bg-zinc-900/40 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]">

        {/* Part number strip — top of card like a datasheet header */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">// featured</span>
            <span className="font-mono text-[9px] text-zinc-700">·</span>
            {project.tags.map(t => (
              <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">{t}</span>
            ))}
          </div>
          <span className="font-mono text-[9px] text-zinc-700">{project.hardware}</span>
        </div>

        <div className="flex flex-col md:flex-row">

          {/* Left — content */}
          <div className="flex-1 p-6 flex flex-col gap-4">
            <div>
              <h3 className="font-mono text-white font-bold text-xl leading-snug mb-1">
                {project.title}
              </h3>
              <p className="font-mono text-sm text-cyan-500">{project.hardware}</p>
            </div>

            <p className="font-sans text-sm text-zinc-300 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div>
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map(chip => (
                  <span key={chip.label}
                    className={cn("font-mono text-[10px] px-2 py-0.5 rounded border", layerColors[chip.layer])}>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 mt-auto pt-2">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors">
                <GithubIcon className="w-3.5 h-3.5"/>GitHub
              </a>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5"/>Live
                </a>
              )}
            </div>
          </div>

          {/* Right — video thumbnail or blank panel */}
          {thumbUrl ? (
            <div
              className="md:w-72 shrink-0 relative cursor-pointer overflow-hidden border-t border-zinc-800 md:border-t-0 md:border-l md:border-zinc-800"
              style={{ minHeight: 200 }}
              onClick={() => setShowVideo(true)}
              onMouseEnter={() => setThumbHover(true)}
              onMouseLeave={() => setThumbHover(false)}
            >
              {/* Thumbnail */}
              <img
                src={thumbUrl}
                alt={`${project.title} demo thumbnail`}
                className="w-full h-full object-cover"
                style={{
                  transform: thumbHover ? "scale(1.05)" : "scale(1)",
                  transition: "transform 400ms ease",
                  filter: thumbHover ? "brightness(0.6)" : "brightness(0.45)",
                }}
              />

              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
              }}/>

              {/* Cyan tint */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "rgba(6,182,212,0.06)", mixBlendMode: "screen" }}/>

              {/* Play button — probe tip style */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="relative">
                  {/* Pulsing ring */}
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20"
                    style={{ animation: thumbHover ? "ping 1s cubic-bezier(0,0,0.2,1) infinite" : "none" }}/>
                  <div
                    className="relative w-14 h-14 rounded-full border-2 border-cyan-400 flex items-center justify-center"
                    style={{
                      background: thumbHover ? "rgba(6,182,212,0.25)" : "rgba(6,182,212,0.12)",
                      boxShadow: thumbHover ? "0 0 20px rgba(6,182,212,0.5)" : "0 0 10px rgba(6,182,212,0.2)",
                      transition: "all 250ms ease",
                    }}
                  >
                    <svg className="w-5 h-5 text-cyan-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase"
                  style={{ opacity: thumbHover ? 1 : 0.6, transition: "opacity 250ms" }}>
                  play demo
                </span>
              </div>

              {/* Corner label */}
              <div className="absolute top-2 left-2 font-mono text-[8px] text-cyan-500/60 bg-black/40 px-1.5 py-0.5 rounded">
                ▶ DEMO
              </div>
            </div>
          ) : (
            <div className="md:w-56 shrink-0 border-t border-zinc-800 md:border-t-0 md:border-l md:border-zinc-800 p-5 flex flex-col justify-center gap-3">
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">Hardware</p>
              <p className="font-mono text-xs text-zinc-300">{project.hardware}</p>
            </div>
          )}
        </div>
      </div>

      {showVideo && project.video && (
        <VideoModal project={project} onClose={() => setShowVideo(false)}/>
      )}
    </>
  )
}

// ── Medium card (2-col featured row) ─────────────────────────────────────────
export function MediumProjectCard({ project }: { project: Project }): React.ReactElement {
  const [showVideo, setShowVideo] = useState(false)
  const [thumbHover, setThumbHover] = useState(false)
  const thumbUrl = project.video
    ? `https://img.youtube.com/vi/${project.video.youtubeId}/mqdefault.jpg`
    : null

  return (
    <>
      <div className="group relative rounded-xl border border-zinc-800 hover:border-cyan-800 bg-zinc-900/40 overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.07)] flex flex-col h-full">

        {/* Thumbnail or header strip */}
        {thumbUrl ? (
          <div className="relative h-40 overflow-hidden cursor-pointer border-b border-zinc-800"
            onClick={() => setShowVideo(true)}
            onMouseEnter={() => setThumbHover(true)}
            onMouseLeave={() => setThumbHover(false)}
          >
            <img src={thumbUrl} alt="" className="w-full h-full object-cover"
              style={{
                transform: thumbHover ? "scale(1.06)" : "scale(1)",
                transition: "transform 400ms ease",
                filter: thumbHover ? "brightness(0.5)" : "brightness(0.38)",
              }}/>
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent 3px, rgba(0,0,0,0.10) 3px, rgba(0,0,0,0.10) 4px)",
            }}/>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(6,182,212,0.05)", mixBlendMode: "screen" }}/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full border-2 border-cyan-400 flex items-center justify-center"
                style={{
                  background: thumbHover ? "rgba(6,182,212,0.22)" : "rgba(6,182,212,0.10)",
                  boxShadow: thumbHover ? "0 0 16px rgba(6,182,212,0.45)" : "none",
                  transition: "all 250ms ease",
                }}>
                <svg className="w-4 h-4 text-cyan-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 left-2 font-mono text-[8px] text-cyan-500/60 bg-black/40 px-1.5 py-0.5 rounded">▶ DEMO</div>
          </div>
        ) : (
          <div className="h-2 bg-gradient-to-r from-transparent via-cyan-900/30 to-transparent border-b border-zinc-800"/>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {project.tags.map(t => (
                  <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">{t}</span>
                ))}
              </div>
              <h3 className="font-mono text-white font-semibold text-sm leading-snug">{project.title}</h3>
              <p className="font-mono text-[10px] text-cyan-600 mt-0.5">{project.hardware}</p>
            </div>
          </div>

          <p className="font-sans text-xs text-zinc-400 leading-relaxed flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(chip => (
              <span key={chip.label}
                className={cn("font-mono text-[9px] px-1.5 py-0.5 rounded border", layerColors[chip.layer])}>
                {chip.label}
              </span>
            ))}
          </div>

          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 hover:text-cyan-400 transition-colors mt-1">
            <GithubIcon className="w-3 h-3"/>GitHub
          </a>
        </div>
      </div>

      {showVideo && project.video && (
        <VideoModal project={project} onClose={() => setShowVideo(false)}/>
      )}
    </>
  )
}

// ── Compact grid card ─────────────────────────────────────────────────────────
export function ProjectCard({ project }: { project: Project }): React.ReactElement {
  return (
    <div className="group relative rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 p-4 flex flex-col gap-2.5 h-full transition-all duration-200 hover:bg-zinc-900/60">
      <div>
        <div className="flex flex-wrap gap-1 mb-1">
          {project.tags.map(t => (
            <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-600 border border-zinc-800">{t}</span>
          ))}
        </div>
        <h3 className="font-mono text-zinc-200 font-semibold text-sm leading-snug">{project.title}</h3>
        <p className="font-mono text-[10px] text-cyan-700 mt-0.5">{project.hardware}</p>
      </div>

      <p className="font-sans text-xs text-zinc-500 leading-relaxed flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-1">
        {project.stack.map(chip => (
          <span key={chip.label}
            className={cn("font-mono text-[8px] px-1.5 py-0.5 rounded border", layerColors[chip.layer])}>
            {chip.label}
          </span>
        ))}
      </div>

      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-[10px] text-zinc-600 hover:text-cyan-400 transition-colors">
        <GithubIcon className="w-3 h-3"/>GitHub
      </a>
    </div>
  )
}
