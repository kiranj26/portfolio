"use client"

import { useState } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { ProjectCard } from "@/components/ProjectCard"
import { projects } from "@/data/projects"
import type { DomainTag } from "@/types/portfolio"

type FilterTag = "All" | DomainTag

const FILTER_TAGS: FilterTag[] = ["All", "RTOS", "Protocol Driver", "Wireless", "DSP/Motor", "EVSE", "Tooling"]

export function DiyProjectsSection(): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("All")

  const filtered = projects.filter((p) =>
    activeFilter === "All" ? true : p.tags.includes(activeFilter as DomainTag)
  )

  const featured = filtered.filter((p) => p.featured)
  const grid = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <BlurFade inView delay={0}>
          <div className="mb-12">
            <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-2">// what i build on weekends</p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white">DIY Projects</h2>
          </div>
        </BlurFade>

        {/* Filter bar */}
        <BlurFade inView delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
                  activeFilter === tag
                    ? "bg-cyan-500 text-black border-cyan-500 font-semibold"
                    : "bg-transparent text-zinc-400 border-zinc-700 hover:border-cyan-600 hover:text-cyan-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </BlurFade>

        {/* Featured 2x cards */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {featured.map((project, i) => (
              <BlurFade key={project.id} inView delay={0.08 + i * 0.05}>
                <ProjectCard project={project} />
              </BlurFade>
            ))}
          </div>
        )}

        {/* Grid cards */}
        {grid.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grid.map((project, i) => (
              <BlurFade key={project.id} inView delay={0.08 + i * 0.05}>
                <ProjectCard project={project} />
              </BlurFade>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="font-mono text-zinc-500 text-sm text-center py-16">
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  )
}
