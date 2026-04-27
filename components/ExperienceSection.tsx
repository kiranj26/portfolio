import { BlurFade } from "@/components/ui/blur-fade"
import { experience } from "@/data/experience"
import type { TechChip } from "@/types/portfolio"
import { cn } from "@/lib/utils"

const layerColors: Record<TechChip["layer"], string> = {
  firmware: "bg-cyan-950 text-cyan-300 border-cyan-800",
  tooling:  "bg-zinc-800 text-zinc-300 border-zinc-700",
  language: "bg-violet-950 text-violet-300 border-violet-800",
  standard: "bg-amber-950 text-amber-300 border-amber-800",
}

function formatDate(iso: string): string {
  const [year, month] = iso.split("-")
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function ExperienceSection(): React.ReactElement {
  return (
    <section id="experience" className="py-24 px-4 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <BlurFade inView delay={0}>
          <div className="mb-12">
            <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-2">// where i&apos;ve shipped</p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white">Experience</h2>
          </div>
        </BlurFade>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 ml-2 hidden sm:block" />

          <div className="space-y-10">
            {experience.map((role, i) => (
              <BlurFade key={`${role.company}-${i}`} inView delay={0.05 + i * 0.08}>
                <div className="sm:pl-10 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 border-cyan-500 bg-zinc-950 hidden sm:flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="font-mono text-white font-semibold">{role.company}</h3>
                        <p className="font-mono text-cyan-400 text-sm">{role.title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-mono text-xs text-zinc-500">
                          {formatDate(role.startDate)} — {role.endDate ? formatDate(role.endDate) : "Present"}
                        </p>
                        <p className="font-mono text-xs text-zinc-600">{role.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {role.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 font-sans text-sm text-zinc-400">
                          <span className="font-mono text-cyan-600 mt-0.5 shrink-0">›</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {role.stack.map((chip) => (
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
                      {role.standards?.map((std) => (
                        <span
                          key={std}
                          className="font-mono text-[10px] px-2 py-0.5 rounded border bg-amber-950 text-amber-300 border-amber-800"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
