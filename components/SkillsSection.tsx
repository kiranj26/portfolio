import { BlurFade } from "@/components/ui/blur-fade"
import { skills } from "@/data/skills"

export function SkillsSection(): React.ReactElement {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <BlurFade inView delay={0}>
          <div className="mb-12">
            <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-2">// the stack</p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white">Skills</h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => (
            <BlurFade key={group.category} inView delay={0.05 + i * 0.07}>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
                <h3 className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-2.5 py-1 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-cyan-700 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
