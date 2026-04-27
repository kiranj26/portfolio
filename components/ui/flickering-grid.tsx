"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4, gridGap = 6, flickerChance = 0.3,
  color = "rgb(0,0,0)", width, height, className, maxOpacity = 0.3, ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const memoizedColor = useMemo(() => {
    if (typeof window === "undefined") return "rgba(0,0,0,"
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const c = canvas.getContext("2d")
    if (!c) return "rgba(255,0,0,"
    c.fillStyle = color
    c.fillRect(0, 0, 1, 1)
    const [r, g, b] = Array.from(c.getImageData(0, 0, 1, 1).data)
    return `rgba(${r},${g},${b},`
  }, [color])

  const setupCanvas = useCallback((canvas: HTMLCanvasElement, w: number, h: number) => {
    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr; canvas.height = h * dpr
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
    const cols = Math.ceil(w / (squareSize + gridGap))
    const rows = Math.ceil(h / (squareSize + gridGap))
    const squares = new Float32Array(cols * rows)
    for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity
    return { cols, rows, squares, dpr }
  }, [squareSize, gridGap, maxOpacity])

  const updateSquares = useCallback((squares: Float32Array, dt: number) => {
    for (let i = 0; i < squares.length; i++) {
      if (Math.random() < flickerChance * dt) squares[i] = Math.random() * maxOpacity
    }
  }, [flickerChance, maxOpacity])

  const drawGrid = useCallback((
    ctx: CanvasRenderingContext2D, w: number, h: number,
    cols: number, rows: number, squares: Float32Array, dpr: number
  ) => {
    ctx.clearRect(0, 0, w, h)
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        ctx.fillStyle = `${memoizedColor}${squares[i * rows + j]})`
        ctx.fillRect(i * (squareSize + gridGap) * dpr, j * (squareSize + gridGap) * dpr, squareSize * dpr, squareSize * dpr)
      }
    }
  }, [memoizedColor, squareSize, gridGap])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext("2d") ?? null
    let rafId: number | null = null
    let gridParams: ReturnType<typeof setupCanvas> | null = null

    if (!canvas || !container || !ctx) return

    const updateSize = (): void => {
      const nw = width || container.clientWidth
      const nh = height || container.clientHeight
      setCanvasSize({ width: nw, height: nh })
      gridParams = setupCanvas(canvas, nw, nh)
    }
    updateSize()

    let lastTime = 0
    const animate = (time: number): void => {
      if (!isInView || !gridParams) return
      updateSquares(gridParams.squares, (time - lastTime) / 1000)
      lastTime = time
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
      rafId = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(updateSize)
    ro.observe(container)
    const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0 })
    io.observe(canvas)
    if (isInView) rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      ro.disconnect(); io.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none" style={{ width: canvasSize.width, height: canvasSize.height }} />
    </div>
  )
}
