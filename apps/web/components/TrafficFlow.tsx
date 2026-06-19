"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TrafficFlowProps {
  className?: string
  color?: string
  speed?: number
}

export function TrafficFlow({ 
  className = '', 
  color = '#FF8449',
  speed = 3
}: TrafficFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (!rect) return

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.scale(dpr, dpr)

    // Define connection points (relative to canvas)
    const nodes = [
      { x: 0.15, y: 0.4 },
      { x: 0.30, y: 0.4 },
      { x: 0.45, y: 0.4 },
      { x: 0.60, y: 0.4 },
      { x: 0.75, y: 0.4 },
    ]

    let time = 0
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      time += 0.02 * speed
      const pulse = Math.sin(time) * 0.3 + 0.7

      // Draw flowing particles along each connection
      for (let i = 0; i < nodes.length - 1; i++) {
        const start = nodes[i]
        const end = nodes[i + 1]
        
        // Draw the line
        ctx.beginPath()
        ctx.moveTo(start.x * rect.width, start.y * rect.height)
        ctx.lineTo(end.x * rect.width, end.y * rect.height)
        ctx.strokeStyle = `rgba(255, 132, 73, 0.06)`
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw flowing particles
        const numParticles = 3
        for (let p = 0; p < numParticles; p++) {
          const t = (time + p / numParticles) % 1
          const x = start.x + (end.x - start.x) * t
          const y = start.y + (end.y - start.y) * t
          
          const gradient = ctx.createRadialGradient(
            x * rect.width, y * rect.height, 0,
            x * rect.width, y * rect.height, 8
          )
          gradient.addColorStop(0, `rgba(255, 132, 73, ${0.3 * pulse})`)
          gradient.addColorStop(1, 'rgba(255, 132, 73, 0)')
          
          ctx.beginPath()
          ctx.arc(x * rect.width, y * rect.height, 8 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [color, speed])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} />
}
