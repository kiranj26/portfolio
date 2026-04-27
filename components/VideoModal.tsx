"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface VideoModalProps {
  youtubeId: string
  onClose: () => void
}

export function VideoModal({ youtubeId, onClose }: VideoModalProps): React.ReactElement {
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="Project demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
