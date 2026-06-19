"use client"

import { useState, useEffect } from "react"
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
  Bell,
  Zap
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

const activities = [
  { 
    title: "API Gateway timeout rate exceeded 5%",
    description: "Response times spiked to 2.4s average over 5 minutes",
    severity: "critical",
    tag: "INCIDENT",
    time: "14:23:45",
    source: "api-gateway",
    linked: 3
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
    value: "3", 
    delta: "+2 from yesterday",
    severity: "critical",
    icon: AlertTriangle,
    color: "#711A00"
  },
  { 
    label: "Error Rate", 
    value: "1.8%", 
    delta: "+0.5% from yesterday",
    severity: "warning",
    icon: Activity,
    color: "#FF8449"
  },
  { 
    label: "Response Time", 
    value: "184ms", 
    delta: "-12ms from yesterday",
    severity: "healthy",
    icon: Clock,
    color: "#3E8B5C"
  },
  { 
    label: "Uptime", 
    value: "99.97%", 
    delta: "+0.02% from yesterday",
    severity: "healthy",
    icon: CheckCircle,
    color: "#3E8B5C"
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  })
}

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <motion.div 
      className="p-4 md:p-6 space-y-5 page-enter"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Topbar */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h1>Dashboard</h1>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="label mb-2">{stat.label}</div>
                  <div className="text-2xl font-bold mono text-[var(--text-primary)]">{stat.value}</div>
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
      </div>

      {/* Chart + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <motion.div 
          className="lg:col-span-2 glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2>Error Rate & Request Volume</h2>
              <span className="text-xs text-[var(--text-tertiary)]">Last 24 hours</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm" style={{ background: 'var(--accent)' }}></span>
                <span className="text-[var(--text-secondary)]">Errors</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm" style={{ background: '#0F445C' }}></span>
                <span className="text-[var(--text-secondary)]">Requests</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8449" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#FF8449" stopOpacity={0.02}/>
                </linearGradient>
                <linearGradient id="requestGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F445C" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#0F445C" stopOpacity={0.02}/>
                </linearGradient>
                <filter id="chartGlow">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" vertical={false} />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }}
                tickFormatter={(value) => `${value}`}
                width={30}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }}
                tickFormatter={(value) => `${value}`}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-glass)', 
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-glass)'
                }}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="errors" 
                stroke="#FF8449" 
                strokeWidth={2.5}
                fill="url(#errorGradient)"
                filter="url(#chartGlow)"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="requests" 
                stroke="#0F445C" 
                strokeWidth={2}
                fill="url(#requestGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Feed */}
        <motion.div 
          className="glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2>Activity Feed</h2>
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
                className="glass-card p-3 border border-[var(--border-glass)]"
              >
                <div className="flex items-start gap-2 mb-1.5">
                  <span className={`tag ${getTagClass(activity.severity)}`}>
                    {activity.tag}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)] mono">{activity.time}</span>
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
                      <span className="h-3 w-3" />
                      {activity.linked} linked
                    </span>
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
