"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import type { Project, TechChip } from "@/types/portfolio"
import { cn } from "@/lib/utils"

const layerColors: Record<TechChip["layer"], string> = {
  firmware: "bg-cyan-950 text-cyan-300 border-cyan-800",
  tooling:  "bg-zinc-800  text-zinc-300 border-zinc-700",
  language: "bg-violet-950 text-violet-300 border-violet-800",
  standard: "bg-amber-950  text-amber-300  border-amber-800",
}

interface VideoModalProps {
  project: Project
  onClose: () => void
}

export function VideoModal({ project, onClose }: VideoModalProps): React.ReactElement {
  const backdropRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Fade in
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => { if (e.key === "Escape") handleClose() }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = (): void => {
    setVisible(false)
    setTimeout(onClose, 220)
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: visible ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(6px)" : "blur(0px)",
        transition: "background 220ms ease, backdrop-filter 220ms ease",
      }}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose() }}
    >
      <div
        className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-zinc-800"
        style={{
          background: "#0a0f0a",
          transform: visible ? "scale(1)" : "scale(0.96)",
          opacity: visible ? 1 : 0,
          transition: "transform 220ms cubic-bezier(0.34,1.56,0.64,1), opacity 220ms ease",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70"/>
              <div className="w-3 h-3 rounded-full bg-yellow-500/40"/>
              <div className="w-3 h-3 rounded-full bg-green-500/40"/>
            </div>
            <span className="font-mono text-xs text-zinc-400">
              {project.title}
              <span className="text-zinc-600 ml-2">· {project.hardware}</span>
            </span>
          </div>
          <button onClick={handleClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <X className="w-4 h-4"/>
          </button>
        </div>

        {/* Body: video + spec panel */}
        <div className="flex flex-col lg:flex-row">

          {/* YouTube iframe */}
          <div className="flex-1 min-w-0 bg-black">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${project.video!.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Spec panel */}
          <div className="lg:w-72 shrink-0 p-5 border-t border-zinc-800 lg:border-t-0 lg:border-l lg:border-zinc-800 flex flex-col gap-4">

            {/* Project title */}
            <div>
              <p className="font-mono text-[10px] text-cyan-500 tracking-widest uppercase mb-1">
                // project spec
              </p>
              <h3 className="font-mono text-white font-semibold text-sm leading-snug">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-cyan-600 mt-0.5">{project.hardware}</p>
            </div>

            {/* Description */}
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              {project.description}
            </p>

            {/* Domain tags */}
            <div>
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-1.5">Domain</p>
              <div className="flex flex-wrap gap-1">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stack chips */}
            <div>
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mb-1.5">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map(chip => (
                  <span key={chip.label}
                    className={cn("font-mono text-[9px] px-2 py-0.5 rounded border", layerColors[chip.layer])}>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors border border-zinc-700 hover:border-cyan-700 rounded px-3 py-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
