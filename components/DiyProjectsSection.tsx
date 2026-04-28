"use client"

import { useState } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { TraceSeparator } from "@/components/ui/trace-separator"
import { HeroProjectCard, MediumProjectCard, ProjectCard } from "@/components/ProjectCard"
import { projects } from "@/data/projects"
import type { DomainTag } from "@/types/portfolio"

type FilterTag = "All" | DomainTag

const FILTER_TAGS: FilterTag[] = ["All", "RTOS", "Protocol Driver", "Wireless", "DSP/Motor", "EVSE", "Tooling"]

export function DiyProjectsSection(): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All")

  const filtered = projects.filter((p) =>
    activeFilter === "All" ? true : p.tags.includes(activeFilter as DomainTag)
  )

  // Magazine layout: first featured = hero, rest featured = 2-col medium, non-featured = 3-col grid
  const [heroProject, ...restFeatured] = filtered.filter((p) => p.featured)
  const grid = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <BlurFade inView delay={0}>
          <div className="mb-4">
            <p className="font-mono text-cyan-500 text-[10px] tracking-[0.3em] uppercase mb-2">
              // firmware · embedded · systems
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white tracking-tight">
              DIY Projects
            </h2>
            <p className="font-mono text-xs text-zinc-500 mt-1">
              {projects.length} entries · sorted by complexity
            </p>
          </div>
        </BlurFade>

        {/* PCB trace separator */}
        <BlurFade inView delay={0.04}>
          <TraceSeparator />
        </BlurFade>

        {/* Filter pills */}
        <BlurFade inView delay={0.08}>
          <div className="flex flex-wrap gap-2 mb-10 mt-2">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`font-mono text-[10px] px-3 py-1 rounded border transition-colors ${
                  activeFilter === tag
                    ? "bg-cyan-500 text-black border-cyan-500 font-semibold"
                    : "bg-transparent text-zinc-500 border-zinc-800 hover:border-cyan-700 hover:text-cyan-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </BlurFade>

        {filtered.length === 0 && (
          <p className="font-mono text-zinc-600 text-sm text-center py-16">
            No projects match this filter.
          </p>
        )}

        {/* ── Hero card (full width) ── */}
        {heroProject && (
          <BlurFade inView delay={0.1}>
            <div className="mb-4">
              <HeroProjectCard project={heroProject} />
            </div>
          </BlurFade>
        )}

        {/* ── 2-col medium cards ── */}
        {restFeatured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {restFeatured.map((project, i) => (
              <BlurFade key={project.id} inView delay={0.14 + i * 0.05}>
                <MediumProjectCard project={project} />
              </BlurFade>
            ))}
          </div>
        )}

        {/* ── 3-col compact grid ── */}
        {grid.length > 0 && (
          <>
            {(heroProject || restFeatured.length > 0) && (
              <BlurFade inView delay={0.2}>
                <div className="flex items-center gap-3 mb-4 mt-6">
                  <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">More Projects</span>
                  <div className="flex-1 h-px bg-zinc-800"/>
                </div>
              </BlurFade>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {grid.map((project, i) => (
                <BlurFade key={project.id} inView delay={0.22 + i * 0.04}>
                  <ProjectCard project={project} />
                </BlurFade>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
