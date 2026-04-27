"use client"

import { useState } from "react"
import { Play, ExternalLink } from "lucide-react"

function GithubIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
import { MagicCard } from "@/components/ui/magic-card"
import { VideoModal } from "@/components/VideoModal"
import type { Project, TechChip } from "@/types/portfolio"
import { cn } from "@/lib/utils"

const layerColors: Record<TechChip["layer"], string> = {
  firmware: "bg-cyan-950 text-cyan-300 border-cyan-800",
  tooling:  "bg-zinc-800 text-zinc-300 border-zinc-700",
  language: "bg-violet-950 text-violet-300 border-violet-800",
  standard: "bg-amber-950 text-amber-300 border-amber-800",
}

interface ProjectCardProps {
  project: Project
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps): React.ReactElement {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <MagicCard
        className={cn(
          "h-full flex flex-col",
          wide && "md:col-span-2"
        )}
        gradientColor="#0e7490"
        gradientOpacity={0.12}
      >
        <div className="p-5 flex flex-col gap-3 h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-mono text-white font-semibold text-base leading-snug">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-cyan-500 mt-0.5">{project.hardware}</p>
            </div>
            {project.video && (
              <button
                onClick={() => setShowVideo(true)}
                className="shrink-0 flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-cyan-900 border border-zinc-700 hover:border-cyan-600 text-zinc-400 hover:text-cyan-400 text-xs font-mono transition-colors"
                aria-label={`Play demo for ${project.title}`}
              >
                <Play className="w-3 h-3 fill-current" />
                demo
              </button>
            )}
          </div>

          {/* Domain tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-zinc-400 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((chip) => (
              <span
                key={chip.label}
                className={cn(
                  "font-mono text-[10px] px-2 py-0.5 rounded border",
                  layerColors[chip.layer]
                )}
              >
                {chip.label}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live
              </a>
            )}
          </div>
        </div>
      </MagicCard>

      {showVideo && project.video && (
        <VideoModal
          youtubeId={project.video.youtubeId}
          onClose={() => setShowVideo(false)}
        />
      )}
    </>
  )
}
