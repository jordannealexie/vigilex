"use client"

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  className = '',
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.4, 
          delay: delay / 1000,
          ease: "easeOut"
        }
      })
    }
  }, [isInView, controls, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  )
}
