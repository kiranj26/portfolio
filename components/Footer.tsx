export function Footer(): React.ReactElement {
  return (
    <footer className="py-8 px-4 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} Kiran Jojare
        </p>
        <a
          href="https://github.com/kiranj26"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-zinc-600 hover:text-cyan-400 transition-colors"
        >
          github.com/kiranj26
        </a>
      </div>
    </footer>
  )
}
