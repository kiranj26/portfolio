import { Mail } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { contactLinks } from "@/data/contact"
import type { ContactLink } from "@/types/portfolio"

function GithubIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function getIcon(icon: ContactLink["icon"], className?: string): React.ReactElement {
  if (icon === "github") return <GithubIcon className={className} />
  if (icon === "linkedin") return <LinkedinIcon className={className} />
  return <Mail className={className} />
}

export function ContactSection(): React.ReactElement {
  return (
    <section id="contact" className="py-24 px-4 bg-zinc-950/50">
      <div className="max-w-2xl mx-auto text-center">
        <BlurFade inView delay={0}>
          <p className="font-mono text-cyan-400 text-xs tracking-widest uppercase mb-2">// reach out</p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white mb-4">Contact</h2>
          <p className="font-sans text-zinc-400 text-base mb-10">
            Open to firmware roles, consulting, and interesting hardware problems.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="flex items-center justify-center gap-8">
            {contactLinks.map((link) => (
              <a
                key={link.icon}
                href={link.href}
                target={link.icon !== "email" ? "_blank" : undefined}
                rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="flex flex-col items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors group"
              >
                <span className="p-3 rounded-full border border-zinc-800 group-hover:border-cyan-700 transition-colors">
                  {getIcon(link.icon, "w-6 h-6")}
                </span>
                <span className="font-mono text-xs">{link.label}</span>
              </a>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
