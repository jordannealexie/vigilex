"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface CursorGlowProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function CursorGlow({ 
  children, 
  className = '', 
  color = 'rgba(255, 132, 73, 0.06)' 
}: CursorGlowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosition({ x, y })
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {!isTouch && isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${position.x}% ${position.y}%, ${color} 0%, transparent 70%)`,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}
    </div>
  )
}
