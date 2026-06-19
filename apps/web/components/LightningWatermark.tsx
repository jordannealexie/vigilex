"use client"

import { Zap } from "lucide-react"

interface LightningWatermarkProps {
  className?: string
  size?: number
}

export function LightningWatermark({ className = '', size = 120 }: LightningWatermarkProps) {
  return (
    <div className={`lightning-watermark ${className}`}>
      <Zap size={size} strokeWidth={0.5} />
    </div>
  )
}
