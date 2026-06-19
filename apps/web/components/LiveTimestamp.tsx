"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LiveTimestampProps {
  initialTime?: string
  className?: string
}

export function LiveTimestamp({ initialTime = '', className = '' }: LiveTimestampProps) {
  const [timestamp, setTimestamp] = useState(initialTime || new Date().toLocaleTimeString())
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
      const now = new Date()
      setTimestamp(now.toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span 
      className={`mono text-xs text-[var(--text-tertiary)] ${className}`}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      Updated: {timestamp} (+{seconds}s)
    </motion.span>
  )
}
