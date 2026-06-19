"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight,
  Filter,
  Download,
  Activity,
  Zap,
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
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { CountUp } from "@/components/CountUp"

const requestData = [
  { hour: '00:00', requests: 120, errors: 2 },
  { hour: '04:00', requests: 80, errors: 1 },
  { hour: '08:00', requests: 340, errors: 8 },
  { hour: '12:00', requests: 420, errors: 5 },
  { hour: '16:00', requests: 380, errors: 12 },
  { hour: '20:00', requests: 200, errors: 3 },
  { hour: '23:00', requests: 90, errors: 1 },
]

const comparisonData = [
  { day: 'Mon', requests: 320, errors: 4 },
  { day: 'Tue', requests: 450, errors: 6 },
  { day: 'Wed', requests: 380, errors: 3 },
  { day: 'Thu', requests: 520, errors: 8 },
  { day: 'Fri', requests: 490, errors: 5 },
  { day: 'Sat', requests: 280, errors: 2 },
  { day: 'Sun', requests: 210, errors: 1 },
]

const endpointData = [
  { name: 'GET /api/users', requests: 45200, latency: 24, errors: 0.8 },
  { name: 'POST /api/auth', requests: 32800, latency: 42, errors: 1.2 },
  { name: 'GET /api/products', requests: 28400, latency: 18, errors: 0.3 },
  { name: 'POST /api/orders', requests: 15600, latency: 56, errors: 2.1 },
  { name: 'GET /api/payments', requests: 12300, latency: 34, errors: 0.5 },
]

const severityData = [
  { name: 'Critical', value: 2 },
  { name: 'Warning', value: 3 },
  { name: 'Info', value: 4 },
]

const COLORS = ['#711A00', '#FF8449', '#0F445C']

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  const metrics = [
    { label: 'Total Requests', value: '2.4M', change: '+12%', icon: BarChart3, color: '#FF8449' },
    { label: 'Active Users', value: '1,847', change: '+8%', icon: Users, color: '#0F445C' },
    { label: 'Avg Response Time', value: '124ms', change: '-5%', icon: Clock, color: '#3E8B5C' },
    { label: 'Error Rate', value: '1.2%', change: '-0.3%', icon: Activity, color: '#711A00' },
  ]

  return (
    <motion.div 
      className="p-4 md:p-6 space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Topbar */}
      <div className="matte-glass-strong p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1>Analytics</h1>
          <p className="text-sm text-[var(--text-secondary)]">System performance and usage insights</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="segmented-control">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`segmented-item ${timeRange === range ? 'segmented-item-active' : ''}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="btn-secondary text-xs py-1.5 px-3">
            <Download className="h-3 w-3" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <div key={idx} className="matte-glass p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="label">{metric.label}</span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ 
                  background: metric.color + '15',
                  border: '1px solid ' + metric.color + '20'
                }}>
                  <Icon className="h-4 w-4" style={{ color: metric.color }} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold mono text-[var(--text-primary)]">{metric.value}</span>
                <span className={`text-xs mono ${metric.change.startsWith('+') ? 'text-[#711A00]' : 'text-[#3E8B5C]'}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Hero Chart - No container, just hoverable */}
      <div 
        className="p-5 rounded-[var(--radius-card)] hover:bg-[var(--glass-bg-hover)] hover:shadow-[var(--shadow-glass-hover)] transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>Request Volume & Error Trends</h2>
            <span className="text-xs text-[var(--text-tertiary)]">Last 24 hours</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm" style={{ background: 'var(--accent)' }}></span>
              <span className="text-[var(--text-secondary)]">Requests</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm" style={{ background: '#711A00' }}></span>
              <span className="text-[var(--text-secondary)]">Errors</span>
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={requestData}>
            <defs>
              <linearGradient id="requestGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF8449" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#FF8449" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" vertical={false} />
            <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} width={30} />
            <Tooltip contentStyle={{ 
              background: 'var(--glass-bg)', 
              backdropFilter: 'blur(24px) saturate(140%)',
              border: '1px solid var(--glass-border-top)',
              borderRadius: '12px',
              fontSize: '12px',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-glass)'
            }} />
            <Area type="monotone" dataKey="requests" stroke="#FF8449" strokeWidth={2.5} fill="url(#requestGradient)" />
            <Line type="monotone" dataKey="errors" stroke="#711A00" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Small Multiples - Comparison Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="matte-glass p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Weekly Comparison</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} width={30} />
              <Tooltip contentStyle={{ 
                background: 'var(--glass-bg)', 
                backdropFilter: 'blur(24px) saturate(140%)',
                border: '1px solid var(--glass-border-top)',
                borderRadius: '12px',
                fontSize: '12px',
                boxShadow: 'var(--shadow-glass)'
              }} />
              <Bar dataKey="requests" fill="#FF8449" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="matte-glass p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Error Distribution</h3>
          <div className="flex items-center justify-center h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ 
                  background: 'var(--glass-bg)', 
                  backdropFilter: 'blur(24px) saturate(140%)',
                  border: '1px solid var(--glass-border-top)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: 'var(--shadow-glass)'
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
