"use client"

import { useState } from "react"

interface TactileButtonProps {
  onPress: () => void
  disabled?: boolean
}

export function TactileButton({ onPress, disabled = false }: TactileButtonProps): React.ReactElement {
  const [pressed, setPressed] = useState(false)

  const handlePress = (): void => {
    if (disabled) return
    setPressed(true)
    onPress()
    setTimeout(() => setPressed(false), 180)
  }

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      {/* Silkscreen label above */}
      <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
        SW1
      </span>

      {/* PCB footprint — 4 corner pads + switch body */}
      <div className="relative">
        {/* Corner solder pads */}
        {[
          "-top-2 -left-2",
          "-top-2 -right-2",
          "-bottom-2 -left-2",
          "-bottom-2 -right-2",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-3 h-3 rounded-sm`}
            style={{ background: "rgba(184,115,51,0.55)", border: "1px solid rgba(200,140,60,0.7)" }}
          />
        ))}

        {/* Switch body (outer housing) */}
        <div
          className="relative rounded-md cursor-pointer"
          style={{
            width: 72,
            height: 72,
            background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)",
            border: "1.5px solid #3a3a3a",
            boxShadow: pressed
              ? "0 1px 2px rgba(0,0,0,0.8), inset 0 1px 3px rgba(0,0,0,0.6)"
              : "0 4px 0 #0a0a0a, 0 6px 8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
            transform: pressed ? "translateY(3px)" : "translateY(0px)",
            transition: "transform 80ms ease, box-shadow 80ms ease",
          }}
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          role="button"
          aria-label="Boot sequence button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePress() }}
        >
          {/* Actuator cap (the part you actually press) */}
          <div
            className="absolute inset-0 m-3 rounded flex items-center justify-center"
            style={{
              background: pressed
                ? "linear-gradient(145deg, #1e1e1e 0%, #252525 100%)"
                : "linear-gradient(145deg, #353535 0%, #282828 100%)",
              boxShadow: pressed
                ? "inset 0 2px 4px rgba(0,0,0,0.8)"
                : "0 2px 0 rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              transition: "background 80ms ease, box-shadow 80ms ease",
            }}
          >
            {/* Center dot — physical marker */}
            <div
              className="rounded-full"
              style={{
                width: 10,
                height: 10,
                background: pressed ? "rgba(6,182,212,0.6)" : "rgba(80,80,80,0.8)",
                boxShadow: pressed ? "0 0 8px rgba(6,182,212,0.8)" : "none",
                transition: "background 80ms ease, box-shadow 80ms ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Silkscreen label below */}
      <div className="text-center">
        <p className="font-mono text-[10px] text-cyan-600 tracking-wider">// BOOT_SEQ</p>
        <p className="font-mono text-[9px] text-zinc-700 mt-0.5">press to init</p>
      </div>
    </div>
  )
}
