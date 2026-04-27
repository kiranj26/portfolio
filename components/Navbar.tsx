"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span className="font-mono text-cyan-400 font-semibold tracking-tight">
          kiran jojare
        </span>
        <ul className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
