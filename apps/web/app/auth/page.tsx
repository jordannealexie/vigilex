"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  ChevronRight
} from "lucide-react"

// Topology nodes with varied sizes and brightness
const topologyNodes = [
  { x: 10, y: 20, size: 3, opacity: 0.6 },
  { x: 25, y: 45, size: 6, opacity: 0.8 },
  { x: 40, y: 15, size: 4, opacity: 0.5 },
  { x: 55, y: 55, size: 8, opacity: 0.9 },
  { x: 70, y: 25, size: 3, opacity: 0.4 },
  { x: 85, y: 50, size: 5, opacity: 0.7 },
  { x: 50, y: 75, size: 4, opacity: 0.6 },
  { x: 20, y: 80, size: 3, opacity: 0.5 },
  { x: 75, y: 80, size: 5, opacity: 0.7 },
  { x: 90, y: 10, size: 2, opacity: 0.3 },
  { x: 35, y: 35, size: 7, opacity: 0.8 },
  { x: 60, y: 40, size: 6, opacity: 0.7 },
  { x: 45, y: 60, size: 5, opacity: 0.6 },
  { x: 15, y: 55, size: 4, opacity: 0.4 },
  { x: 80, y: 35, size: 3, opacity: 0.5 },
]

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [7, 8], [8, 9], [9, 0],
  [1, 4], [2, 5], [3, 6], [7, 9], [2, 7],
  [0, 3], [5, 8], [1, 6], [4, 7], [9, 3],
  [10, 11], [11, 12], [12, 13], [13, 14], [14, 10]
]

// Particles for ambient field
const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: 20 + Math.random() * 80,
  size: 1 + Math.random() * 3,
  speed: 0.15 + Math.random() * 0.35,
  delay: Math.random() * 8,
  opacity: 0.05 + Math.random() * 0.15,
  flashOffset: Math.random() * 10
}))

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lightningFlash, setLightningFlash] = useState(false)
  const [isPoweredOn, setIsPoweredOn] = useState(false)
  const [boltGlowIntensity, setBoltGlowIntensity] = useState(1)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  // Check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Power-on animation
  useEffect(() => {
    if (!prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsPoweredOn(true)
      }, 400)
      return () => clearTimeout(timer)
    } else {
      setIsPoweredOn(true)
    }
  }, [prefersReducedMotion])

  // Lightning flash interval
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setLightningFlash(true)
      setTimeout(() => setLightningFlash(false), 800)
    }, 12000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Bolt glow pulse
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setBoltGlowIntensity(1.4)
      setTimeout(() => setBoltGlowIntensity(1), 800)
    }, 4000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value })
    let strength = 0
    if (value.length > 0) strength += 1
    if (value.length >= 8) strength += 1
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) strength += 1
    if (/\d/.test(value)) strength += 1
    if (/[^A-Za-z0-9]/.test(value)) strength += 1
    setPasswordStrength(Math.min(strength, 5))
  }

  const getStrengthColor = (strength: number) => {
    if (strength === 0) return 'var(--text-tertiary)'
    if (strength <= 2) return 'var(--severity-critical)'
    if (strength <= 3) return 'var(--severity-warning)'
    return 'var(--severity-healthy)'
  }

  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return ''
    if (strength <= 2) return 'Weak'
    if (strength <= 3) return 'Fair'
    if (strength <= 4) return 'Good'
    return 'Strong'
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setStep(1)
  }

  const handleOAuth = (provider: 'github' | 'google') => {
    setIsLoading(true)
    window.location.href = `/api/auth/${provider}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // Parallax offset
  const parallaxX = (mousePosition.x - 50) * 0.02
  const parallaxY = (mousePosition.y - 50) * 0.02

  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)] overflow-hidden relative">
      {/* Full-bleed Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF8449]/25 via-[#711A00]/15 to-[#1C1E21] dark:from-[#FF8449]/20 dark:via-[#711A00]/25 dark:to-[#1C1E21]" />
        
        {/* Drifting gradient layer - subtle movement */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-[#FF8449]/10 via-transparent to-[#711A00]/5"
            animate={{
              x: [0, 30, -20, 10, 0],
              y: [0, -20, 30, -10, 0],
              scale: [1, 1.05, 0.95, 1.02, 1]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Topology Graph Background */}
        <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-40">
          {connections.map(([from, to], idx) => {
            const nodeFrom = topologyNodes[from]
            const nodeTo = topologyNodes[to]
            const opacity = 0.1 + Math.random() * 0.15
            return (
              <line
                key={`line-${idx}`}
                x1={`${nodeFrom.x}%`}
                y1={`${nodeFrom.y}%`}
                x2={`${nodeTo.x}%`}
                y2={`${nodeTo.y}%`}
                stroke="#FF8449"
                strokeWidth="0.5"
                opacity={opacity}
                className={!prefersReducedMotion ? 'fade-line' : ''}
              >
                {!prefersReducedMotion && (
                  <animate attributeName="opacity" values={`${opacity};${opacity * 1.5};${opacity}`} dur={`${4 + Math.random() * 4}s`} repeatCount="indefinite" />
                )}
              </line>
            )
          })}
          {topologyNodes.map((node, idx) => (
            <circle
              key={`node-${idx}`}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="#FF8449"
              opacity={node.opacity * 0.4}
            />
          ))}
        </svg>

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => {
            const isNearBolt = Math.abs(particle.x - 50) < 20 && Math.abs(particle.y - 40) < 20
            return (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-[#FF8449]"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  opacity: particle.opacity,
                }}
                animate={!prefersReducedMotion ? {
                  y: [0, -120],
                  opacity: [particle.opacity, isNearBolt ? particle.opacity * 2 : 0],
                } : {}}
                transition={{
                  duration: 10 + particle.speed * 6,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear"
                }}
              />
            )
          })}
        </div>

        {/* Lightning Flash */}
        {!prefersReducedMotion && (
          <AnimatePresence>
            {lightningFlash && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.12 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                style={{
                  background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 132, 73, 0.3) 0%, transparent 70%)'
                }}
              />
            )}
          </AnimatePresence>
        )}

        {/* Seam blend - soft gradient fade on the right side */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-[var(--bg-base)]/30 dark:to-[var(--bg-base)]/40" style={{ width: '55%', right: 0 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Hero Panel - Left (45%) - Content directly on background */}
        <div className="hidden md:flex md:w-[45%] flex-col items-center justify-center relative px-8 py-12">
          {/* Bolt Glow Behind */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
            animate={!prefersReducedMotion ? {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,132,73,0.15) 0%, transparent 70%)',
              transform: `translate(-50%, -50%) translate(${parallaxX}px, ${parallaxY}px)`
            }}
          />

          {/* Bolt Drop Shadow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[50px] rounded-full pointer-events-none blur-2xl"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,132,73,0.2) 0%, transparent 70%)',
              transform: `translate(-50%, 80%) scale(1.2) translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`
            }}
          />

          {/* Glass Lightning Bolt */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ 
              opacity: isPoweredOn ? 1 : 0,
              scale: isPoweredOn ? 1 : 0.6
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Power-on burst */}
            {isPoweredOn && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,132,73,0.3) 0%, transparent 70%)'
                }}
              />
            )}

            <motion.div
              animate={!prefersReducedMotion ? {
                rotate: [0, 2, -1.5, 1.5, 0],
                y: [0, -6, 3, -3, 0],
                x: [0, 3, -2, 2, 0]
              } : {}}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`
              }}
            >
              {/* Bolt outer glow */}
              <motion.div
                className="absolute inset-0 blur-3xl"
                animate={!prefersReducedMotion ? {
                  opacity: [0.3, 0.6 * boltGlowIntensity, 0.3],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,132,73,0.3) 0%, transparent 70%)',
                  transform: 'scale(1.5)'
                }}
              />
              
              {/* Bolt SVG with matte liquid glass effect */}
              <svg
                width="160"
                height="200"
                viewBox="0 0 160 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 drop-shadow-[0_0_40px_rgba(255,132,73,0.2)]"
              >
                <defs>
                  <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF8449" stopOpacity="0.9"/>
                    <stop offset="40%" stopColor="#FF8449" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#711A00" stopOpacity="0.7"/>
                  </linearGradient>
                  <linearGradient id="boltHighlight" x1="0.2" y1="0" x2="0.8" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.25)"/>
                    <stop offset="40%" stopColor="rgba(255,255,255,0.05)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0.08)"/>
                  </linearGradient>
                  <filter id="glassFilter">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                    <feOffset dx="0" dy="4" result="offsetBlur"/>
                    <feFlood floodColor="rgba(255,132,73,0.2)" result="color"/>
                    <feComposite in="color" in2="offsetBlur" operator="in" result="shadow"/>
                    <feMerge>
                      <feMergeNode in="shadow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M80 0 L40 80 L70 80 L50 160 L100 90 L75 90 L110 40 L80 40 L120 10 L80 0Z"
                  fill="url(#boltGrad)"
                  stroke="rgba(255,132,73,0.2)"
                  strokeWidth="1.5"
                  filter="url(#glassFilter)"
                />
                <path
                  d="M80 0 L40 80 L70 80 L50 160 L100 90 L75 90 L110 40 L80 40 L120 10 L80 0Z"
                  fill="url(#boltHighlight)"
                  opacity="0.6"
                />
                {/* Edge highlight - soft, diffused */}
                <path
                  d="M80 0 L40 80 L70 80"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                  fill="none"
                  filter="blur(1px)"
                />
                <path
                  d="M100 90 L75 90 L110 40"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </motion.div>

            {/* Logo and Tagline - no card boundary */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isPoweredOn ? 1 : 0, y: isPoweredOn ? 0 : 20 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                Vigilex
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xs mx-auto">
                AI-powered observability, in real time
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Form Panel - Floating Glass Card (55%) */}
        <div className="flex-1 md:w-[55%] flex items-center justify-center p-6 md:p-8">
          <motion.div
            className="w-full max-w-md matte-glass-strong p-8 md:p-10 relative"
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ 
              opacity: isPoweredOn ? 1 : 0,
              x: isPoweredOn ? 0 : 30,
              y: isPoweredOn ? 0 : 20
            }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            style={{
              backdropFilter: 'blur(24px) saturate(140%)',
              WebkitBackdropFilter: 'blur(24px) saturate(140%)',
            }}
          >
            {/* Form Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                {isLogin ? 'Log in to Vigilex' : 'Create your account'}
              </h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                {isLogin 
                  ? 'Welcome back! Log in to monitor your systems.'
                  : 'Start monitoring your systems with AI-powered insights.'
                }
              </p>
            </div>

            {/* OAuth Buttons with shimmer */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleOAuth('github')}
                className="btn-secondary flex items-center justify-center gap-2 py-2.5 relative overflow-hidden border border-[var(--glass-border-top)] hover:bg-[var(--glass-bg-hover)] transition-all"
                disabled={isLoading}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className="text-sm">GitHub</span>
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
                    }}
                  />
                )}
              </button>
              <button
                onClick={() => handleOAuth('google')}
                className="btn-secondary flex items-center justify-center gap-2 py-2.5 relative overflow-hidden border border-[var(--glass-border-top)] hover:bg-[var(--glass-bg-hover)] transition-all"
                disabled={isLoading}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M15.545 6.558a9.42 9.42 0 01.139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 118 0a7.689 7.689 0 015.352 2.082l-2.284 2.284A4.347 4.347 0 008 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 000 3.06h.001c.635 1.893 2.405 3.301 4.492 3.301 1.445 0 2.636-.464 3.516-1.262.87-.789 1.291-1.896 1.309-3.184H8.022V6.558h7.523z" />
                </svg>
                <span className="text-sm">Google</span>
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)'
                    }}
                  />
                )}
              </button>
            </div>

            {/* Divider - gradient fade */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px" style={{
                  background: 'linear-gradient(90deg, transparent, var(--glass-border-top), transparent)'
                }} />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-[var(--bg-base)] dark:bg-[#1C1E21] text-[var(--text-tertiary)]">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
                      <input
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        className="glass-input pl-10 border border-[var(--glass-border-top)] focus:ring-2 focus:ring-[#FF8449] focus:ring-opacity-30 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
                      <input
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        className="glass-input pl-10 border border-[var(--glass-border-top)] focus:ring-2 focus:ring-[#FF8449] focus:ring-opacity-30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="glass-input pl-10 border border-[var(--glass-border-top)] focus:ring-2 focus:ring-[#FF8449] focus:ring-opacity-30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="glass-input pl-10 pr-12 border border-[var(--glass-border-top)] focus:ring-2 focus:ring-[#FF8449] focus:ring-opacity-30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {!isLogin && formData.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-[var(--border-glass)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            background: getStrengthColor(passwordStrength),
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span 
                        className="text-xs font-medium min-w-[40px] text-right"
                        style={{ color: getStrengthColor(passwordStrength) }}
                      >
                        {getStrengthLabel(passwordStrength)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button with gloss */}
              <motion.button
                type="submit"
                className="btn-primary w-full justify-center py-3 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={isLoading}
                style={{
                  boxShadow: '0 4px 16px rgba(255, 132, 73, 0.35)'
                }}
              >
                <span className="relative z-10">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    isLogin ? 'Log In' : 'Create Account'
                  )}
                </span>
                <div className="absolute inset-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-lg" />
              </motion.button>
            </form>

            {/* Toggle Login/Sign Up */}
            <div className="mt-6 text-center">
              <button
                onClick={toggleMode}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {isLogin ? (
                  <>Don't have an account? <span className="text-[#FF8449] hover:underline">Sign up</span></>
                ) : (
                  <>Already have an account? <span className="text-[#FF8449] hover:underline">Log in</span></>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS for fade-line animation */}
      <style jsx>{`
        .fade-line {
          animation: fadePulse 6s ease-in-out infinite;
        }
        @keyframes fadePulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  )
}
