"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  format?: (val: number) => string
}

export function AnimatedNumber({ 
  value, 
  duration = 800, 
  className = '',
  prefix = '',
  suffix = '',
  format
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setIsAnimating(true)
      // Trigger glow pulse
      const timer = setTimeout(() => setIsAnimating(false), 600)
      
      // Animate the number
      const startTime = performance.now()
      const startValue = prevValueRef.current
      const endValue = value
      const diff = endValue - startValue

      const updateNumber = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = startValue + diff * eased
        
        if (format) {
          setDisplayValue(parseFloat(current.toFixed(2)))
        } else if (Number.isInteger(value)) {
          setDisplayValue(Math.round(current))
        } else {
          setDisplayValue(parseFloat(current.toFixed(1)))
        }
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber)
        } else {
          setDisplayValue(endValue)
          prevValueRef.current = endValue
        }
      }
      
      requestAnimationFrame(updateNumber)
      return () => clearTimeout(timer)
    }
    prevValueRef.current = value
  }, [value, duration, format])

  const formattedValue = format ? format(displayValue) : 
    Number.isInteger(displayValue) ? displayValue.toString() : 
    displayValue.toFixed(1)

  return (
    <motion.span
      className={`${className} ${isAnimating ? 'glow-pulse' : ''}`}
      animate={isAnimating ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      {prefix}{formattedValue}{suffix}
    </motion.span>
  )
}
