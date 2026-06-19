"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface SparklineProps {
  data: number[]
  color: string
  height?: number
  width?: number
}

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function Sparkline({ data, color, height = 24, width = 60 }: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      const max = Math.max(...data)
      const min = Math.min(...data)
      const range = max - min || 1
      const padding = 2

      // Get rgba versions of the color
      const colorRgba = hexToRgba(color, 0.3)
      const colorRgbaLight = hexToRgba(color, 0.05)

      // Draw glow line
      ctx.beginPath()
      ctx.strokeStyle = colorRgba
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * (width - padding * 2) + padding
        const y = height - padding - ((value - min) / range) * (height - padding * 2)
        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()

      // Draw main line
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * (width - padding * 2) + padding
        const y = height - padding - ((value - min) / range) * (height - padding * 2)
        if (index === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
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
      gradient.addColorStop(0, colorRgba)
      gradient.addColorStop(1, colorRgbaLight)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw endpoint dot
      const lastPointX = ((data.length - 1) / (data.length - 1)) * (width - padding * 2) + padding
      const lastPointY = height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2)
      
      ctx.beginPath()
      ctx.arc(lastPointX, lastPointY, 2, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(lastPointX, lastPointY, 4, 0, Math.PI * 2)
      ctx.fillStyle = hexToRgba(color, 0.3)
      ctx.fill()
    }

    animate()
  }, [data, color, height, width, isVisible])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{ height, width }}
    />
  )
}
