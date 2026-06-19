"use client"

import { useEffect, useRef } from 'react'

interface SparklineProps {
  data: number[]
  color: string
  height?: number
  width?: number
}

export function Sparkline({ data, color, height = 24, width = 60 }: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, width, height)

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const padding = 2

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding
      const y = height - padding - ((value - min) / range) * (height - padding * 2)
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw area fill
    const lastX = ((data.length - 1) / (data.length - 1)) * (width - padding * 2) + padding
    const firstX = padding
    const bottomY = height - padding
    const lastY = height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2)
    const firstY = height - padding - ((data[0] - min) / range) * (height - padding * 2)

    ctx.beginPath()
    ctx.moveTo(firstX, bottomY)
    ctx.lineTo(firstX, firstY)
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding
      const y = height - padding - ((value - min) / range) * (height - padding * 2)
      ctx.lineTo(x, y)
    })
    ctx.lineTo(lastX, bottomY)
    ctx.closePath()
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, color + '30')
    gradient.addColorStop(1, color + '05')
    ctx.fillStyle = gradient
    ctx.fill()

  }, [data, color, height, width])

  return <canvas ref={canvasRef} />
}
