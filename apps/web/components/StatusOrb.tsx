"use client"

import { motion } from "framer-motion"

interface StatusOrbProps {
  status: 'healthy' | 'warning' | 'critical'
  className?: string
}

export function StatusOrb({ status, className = '' }: StatusOrbProps) {
  const statusClass = {
    healthy: 'status-orb-healthy',
    warning: 'status-orb-warning',
    critical: 'status-orb-critical'
  }[status]

  return (
    <motion.div 
      className={`status-orb ${statusClass} ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}
