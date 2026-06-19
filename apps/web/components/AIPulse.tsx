"use client"

import { motion } from "framer-motion"

interface AIPulseProps {
  label?: string
  className?: string
}

export function AIPulse({ label = 'AI analyzing', className = '' }: AIPulseProps) {
  return (
    <div className={`ai-pulse ${className}`}>
      <motion.span 
        className="dot"
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 1, 0.2]
        }}
        transition={{ 
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.span 
        className="dot"
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 1, 0.2]
        }}
        transition={{ 
          duration: 1.2,
          delay: 0.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.span 
        className="dot"
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 1, 0.2]
        }}
        transition={{ 
          duration: 1.2,
          delay: 0.4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
    </div>
  )
}
