"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Clock,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Search,
  Zap,
  Server,
  GitBranch,
  Circle,
  Calendar
} from "lucide-react"
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Sparkline } from "@/components/sparkline"
import { CountUp } from "@/components/CountUp"
import { StatusOrb } from "@/components/StatusOrb"
import { AIPulse } from "@/components/AIPulse"
import { LightningWatermark } from "@/components/LightningWatermark"

const chartData = [
  { time: '00:00', errors: 12, requests: 340 },
  { time: '04:00', errors: 8, requests: 280 },
  { time: '08:00', errors: 45, requests: 890 },
  { time: '12:00', errors: 23, requests: 1200 },
  { time: '16:00', errors: 67, requests: 980 },
  { time: '20:00', errors: 15, requests: 450 },
  { time: '23:00', errors: 5, requests: 210 },
]

const sparklineData = [2, 5, 3, 8, 4, 6, 3, 9, 5, 4, 7, 2, 6, 3, 8, 4, 5, 7, 3, 6]

const services = [
  { name: 'API Gateway', status: 'healthy', requests: '1.2M', errorRate: '0.2%', latency: '24ms', color: '#3E8B5C' },
  { name: 'Auth Service', status: 'healthy', requests: '892K', errorRate: '0.8%', latency: '42ms', color: '#3E8B5C' },
  { name: 'Payment Service', status: 'warning', requests: '543K', errorRate: '1.5%', latency: '56ms', color: '#FF8449' },
  { name: 'Notification Service', status: 'healthy', requests: '321K', errorRate: '0.1%', latency: '18ms', color: '#3E8B5C' },
  { name: 'Database', status: 'critical', requests: '234K', errorRate: '3.2%', latency: '89ms', color: '#711A00' },
]

const activities = [
  { 
    title: "API Gateway timeout rate exceeded 5%",
    description: "Response times spiked to 2.4s average over 5 minutes",
    severity: "critical",
    tag: "INCIDENT",
    time: "14:23:45",
    source: "api-gateway",
    linked: 3,
    aiAnalyzed: true
  },
  { 
    title: "Auth service response time spike",
    description: "P95 latency increased to 2.4s, above 1.5s threshold",
    severity: "warning",
    tag: "WARNING",
    time: "13:58:12",
    source: "auth-service",
    linked: 1
  },
  { 
    title: "Deployment v1.4.3 completed",
    description: "Successfully deployed to production environment",
    severity: "info",
    tag: "DEPLOYED",
    time: "13:12:07",
    source: "api",
    linked: 0
  },
  { 
    title: "System health check passed",
    description: "All services reported healthy status",
    severity: "healthy",
    tag: "OK",
    time: "12:45:33",
    source: "health",
    linked: 0
  },
  { 
    title: "Payment service error rate increased",
    description: "Error rate rose to 3.8%, exceeded 2% threshold",
    severity: "warning",
    tag: "MONITORING",
    time: "11:20:18",
    source: "payment",
    linked: 2
  },
]

const stats = [
  { 
    label: "Active Incidents", 
    value: 3, 
    delta: "+2 from yesterday",
    severity: "critical",
    icon: AlertTriangle,
    color: "#711A00"
  },
  { 
    label: "Error Rate", 
    value: 1.8, 
    delta: "+0.5% from yesterday",
    severity: "warning",
    icon: Activity,
    color: "#FF8449",
    suffix: "%"
  },
  { 
    label: "Response Time", 
    value: 184, 
    delta: "-12ms from yesterday",
    severity: "healthy",
    icon: Clock,
    color: "#3E8B5C",
    suffix: "ms"
  },
  { 
    label: "Uptime", 
    value: 99.97, 
    delta: "+0.02% from yesterday",
    severity: "healthy",
    icon: CheckCircle,
    color: "#3E8B5C",
    suffix: "%"
  },
]

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    critical: '#711A00',
    warning: '#FF8449',
    healthy: '#3E8B5C',
    info: '#0F445C'
  }
  return colors[severity] || '#6B7679'
}

const getTagClass = (severity: string) => {
  const classes: Record<string, string> = {
    critical: 'tag-critical',
    warning: 'tag-warning',
    healthy: 'tag-healthy',
    info: 'tag-info'
  }
  return classes[severity] || ''
}

const getStatusDotColor = (status: string) => {
  const colors: Record<string, string> = {
    healthy: '#3E8B5C',
    warning: '#FF8449',
    critical: '#711A00'
  }
  return colors[status] || '#6B7679'
}

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <motion.div 
      className="p-4 md:p-6 space-y-5 relative"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Lightning Watermark */}
      <LightningWatermark className="absolute right-10 bottom-10 opacity-[0.03]" size={160} />

      {/* Topbar */}
      <div className="glass-topbar p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <h1>Dashboard</h1>
            <StatusOrb status="healthy" />
          </div>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="segmented-control">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`segmented-item ${selectedTimeRange === range ? 'segmented-item-active' : ''}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="btn-secondary text-xs py-1.5 px-3">
            <Filter className="h-3 w-3" />
            Filters
          </button>
          <button className="btn-secondary text-xs py-1.5 px-3">
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Bento Grid - Asymmetric Layout */}
      <div className="bento-grid">
        {/* Stat Cards - 4 in a row but with varied sizing */}
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          const isHero = idx === 0
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className={`${isHero ? 'bento-col-span-4' : 'bento-col-span-3'} glass-card p-5`}
              style={isHero ? { 
                boxShadow: '0 8px 32px rgba(255, 132, 73, 0.12), var(--shadow-glass)'
              } : {}}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="label mb-2">{stat.label}</div>
                  <div className="text-2xl font-bold mono text-[var(--text-primary)]">
                    {isHero ? (
                      <span className="text-gradient">
                        <CountUp value={stat.value} suffix={stat.suffix || ''} />
                      </span>
                    ) : (
                      <CountUp value={stat.value} suffix={stat.suffix || ''} />
                    )}
                  </div>
                  <div className="text-xs mt-1" style={{ color: stat.color }}>
                    {stat.delta}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ 
                  background: stat.color + '15',
                  border: '1px solid ' + stat.color + '20'
                }}>
                  <Icon className="h-4 w-4" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="mt-3">
                <Sparkline 
                  data={sparklineData.slice(idx * 4, idx * 4 + 8)} 
                  color={stat.color}
                  height={32}
                  width={64}
                />
              </div>
            </motion.div>
          )
        })}

        {/* Service Dependency Graph - Dominant Card */}
        <motion.div 
          className="bento-col-span-8 glass-card p-5 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <div className="graph-paper absolute inset-0 opacity-[0.03] pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2>Service Topology</h2>
              <span className="text-xs text-[var(--text-tertiary)]">Real-time dependency graph</span>
            </div>
            <AIPulse label="AI analyzing topology" />
          </div>
          
          <div className="h-[180px] flex items-center justify-center relative">
            {/* Simplified service nodes */}
            <div className="flex items-center gap-8">
              {services.map((service, idx) => {
                const isPulsing = service.status === 'critical' || service.status === 'warning'
                return (
                  <motion.div 
                    key={idx} 
                    className="flex flex-col items-center gap-2"
                    animate={isPulsing ? {
                      scale: [1, 1.08, 1],
                      transition: { duration: 1.5, repeat: Infinity }
                    } : {}}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{
                        borderColor: service.color + '40',
                        background: service.color + '15'
                      }}>
                        <Server className="h-5 w-5" style={{ color: service.color }} />
                      </div>
                      {isPulsing && (
                        <div className="absolute -inset-1 rounded-xl border-2 border-[#FF8449] opacity-50 animate-ping" />
                      )}
                    </div>
                    <span className="text-[10px] text-[var(--text-secondary)]">{service.name}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: service.color }} />
                  </motion.div>
                )
              })}
            </div>
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
              <line x1="15%" y1="40%" x2="30%" y2="40%" stroke="#FF8449" strokeWidth="1" strokeDasharray="4" />
              <line x1="30%" y1="40%" x2="45%" y2="40%" stroke="#FF8449" strokeWidth="1" strokeDasharray="4" />
              <line x1="45%" y1="40%" x2="60%" y2="40%" stroke="#FF8449" strokeWidth="1" strokeDasharray="4" />
              <line x1="60%" y1="40%" x2="75%" y2="40%" stroke="#FF8449" strokeWidth="1" strokeDasharray="4" />
            </svg>
          </div>
        </motion.div>

        {/* Incident Heatmap - Satellite Card */}
        <motion.div 
          className="bento-col-span-4 glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold">Incident Heatmap</h3>
              <span className="text-xs text-[var(--text-tertiary)]">Last 30 days</span>
            </div>
            <Calendar className="h-4 w-4 text-[var(--text-tertiary)]" />
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const intensity = Math.random()
              const color = intensity > 0.7 ? '#711A00' : 
                           intensity > 0.4 ? '#FF8449' : 
                           intensity > 0.1 ? '#0F445C' : '#6B7679'
              const opacity = intensity > 0.7 ? 0.8 : 
                             intensity > 0.4 ? 0.5 : 
                             intensity > 0.1 ? 0.3 : 0.1
              return (
                <div
                  key={i}
                  className="aspect-square rounded-sm transition-all hover:scale-110 cursor-pointer"
                  style={{ background: color, opacity }}
                />
              )
            })}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          className="bento-col-span-12 glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2>Activity Feed</h2>
              <span className="text-xs text-[var(--text-tertiary)]">Latest system events</span>
            </div>
            <button className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {activities.map((activity, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.2 }}
                className={`glass p-3 card-spine card-spine-${activity.severity}`}
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="flex items-start gap-2 mb-1.5">
                  <span className={`tag ${getTagClass(activity.severity)}`}>
                    {activity.tag}
                  </span>
                  {activity.aiAnalyzed && (
                    <span className="sticker-tag text-[10px] font-medium px-2 py-0.5 rounded" style={{
                      background: 'var(--accent-gradient)',
                      color: 'white'
                    }}>
                      AI Detected
                    </span>
                  )}
                  <span className="text-xs text-[var(--text-tertiary)] mono ml-auto">{activity.time}</span>
                </div>
                <h3 className="text-sm font-medium text-[var(--text-primary)]">{activity.title}</h3>
                {activity.description && (
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{activity.description}</p>
                )}
                <div className="flex items-center gap-3 mt-2 text-[10px] text-[var(--text-tertiary)]">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {activity.source}
                  </span>
                  {activity.linked > 0 && (
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      {activity.linked} linked
                    </span>
                  )}
                  {activity.aiAnalyzed && (
                    <AIPulse label="" className="ml-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
