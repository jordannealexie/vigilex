"use client"

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface CountUpProps {
  value: number
  duration?: number
  delay?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function CountUp({ 
  value, 
  duration = 600, 
  delay = 0,
  className = '',
  prefix = '',
  suffix = ''
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: delay / 1000, duration: 0.3 }
      })
      
      // Animate the number
      const element = ref.current
      if (!element) return

      const startTime = Date.now()
      const startValue = 0

      const updateNumber = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.floor(progress * value)
        element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber)
        }
      }
      
      requestAnimationFrame(updateNumber)
    }
  }, [isInView, value, duration, delay, controls, prefix, suffix])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={controls}
      className={className}
    >
      {prefix}0{suffix}
    </motion.span>
  )
}
