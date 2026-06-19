"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScanningSweepProps {
  className?: string
  interval?: number
}

export function ScanningSweep({ className = '', interval = 8000 }: ScanningSweepProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 1500)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: '100%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={`absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#FF8449] to-transparent opacity-[0.04] ${className}`}
          style={{ width: '30%' }}
        />
      )}
    </AnimatePresence>
  )
}
