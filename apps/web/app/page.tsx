"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Clock,
  Zap,
  ArrowUpRight,
  Filter,
  RefreshCw
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

// Sample data
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

const activityLog = [
  { time: '14:23:45', severity: 'critical', message: 'API Gateway timeout rate exceeded 5%', status: 'INCIDENT', tag: 'INC-1023' },
  { time: '13:58:12', severity: 'warning', message: 'Auth service response time spike to 2.4s', status: 'WARNING', tag: 'auth' },
  { time: '13:12:07', severity: 'info', message: 'Deployment v1.4.3 completed to production', status: 'DEPLOYED', tag: 'api' },
  { time: '12:45:33', severity: 'healthy', message: 'System health check passed all services', status: 'OK', tag: 'health' },
  { time: '11:20:18', severity: 'warning', message: 'Payment service error rate increased to 3.8%', status: 'MONITORING', tag: 'payment' },
  { time: '10:05:22', severity: 'critical', message: 'Database connection pool exhausted', status: 'RESOLVED', tag: 'INC-1022' },
  { time: '09:30:44', severity: 'info', message: 'New alert rule created: High error rate', status: 'ALERT', tag: 'rules' },
]

const metrics = [
  { label: 'Active Incidents', value: '3', change: '+2', severity: 'critical', sparkline: sparklineData.slice(0, 8) },
  { label: 'Error Rate', value: '1.8%', change: '+0.5%', severity: 'warning', sparkline: sparklineData.slice(5, 13) },
  { label: 'Response Time (p95)', value: '184ms', change: '-12ms', severity: 'healthy', sparkline: sparklineData.slice(8, 16) },
  { label: 'Uptime', value: '99.97%', change: '+0.02%', severity: 'healthy', sparkline: sparklineData.slice(3, 11) },
  { label: 'Throughput', value: '1.2M', change: '+8%', severity: 'info', sparkline: sparklineData.slice(10, 18) },
]

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    critical: '#FF5C5C',
    warning: '#FFB020',
    healthy: '#36D399',
    info: '#5B8DEF'
  }
  return colors[severity] || '#565E6B'
}

const getSeverityTagClass = (severity: string) => {
  const classes: Record<string, string> = {
    critical: 'tag-critical',
    warning: 'tag-warning',
    healthy: 'tag-healthy',
    info: 'tag-info'
  }
  return classes[severity] || ''
}

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Dashboard</h1>
          <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
            <span className="mono">Last updated: 14:23:45</span>
            <button className="p-1 hover:bg-[var(--bg-hover)] rounded-sm">
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-md overflow-hidden">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  selectedTimeRange === range 
                    ? 'bg-[var(--accent-amber)] text-white' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="btn-secondary text-xs py-1.5">
            <Filter className="h-3 w-3" />
            Filters
          </button>
        </div>
      </div>

      {/* Active Incidents Banner */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[var(--severity-critical)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">3 Active Incidents</span>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="text-[var(--severity-critical)] mono">1 Critical</span>
            <span className="text-[var(--severity-warning)] mono">2 Warning</span>
          </div>
        </div>
        <button className="btn-primary text-xs py-1.5 px-4">
          View All
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      {/* Metric Strip */}
      <div className="metric-strip">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-item">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[var(--text-secondary)]">{metric.label}</span>
              <span className={`text-[10px] mono ${
                metric.change.startsWith('+') ? 'text-[var(--severity-critical)]' : 'text-[var(--severity-healthy)]'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold mono text-[var(--text-primary)]">
                {metric.value}
              </span>
              <Sparkline 
                data={metric.sparkline} 
                color={getSeverityColor(metric.severity)}
                height={24}
                width={60}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart + Side List */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Chart */}
        <div className="md:col-span-2 chart-container">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Error Rate & Request Volume</h3>
              <span className="text-xs text-[var(--text-tertiary)]">Last 24 hours</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#FF7A33]"></span>
                <span className="text-[var(--text-secondary)]">Errors</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#4FD1C5]"></span>
                <span className="text-[var(--text-secondary)]">Requests</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF7A33" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#FF7A33" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="requestGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-hairline)" vertical={false} />
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
                  background: 'var(--bg-panel)', 
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: 'var(--text-primary)'
                }}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="errors" 
                stroke="#FF7A33" 
                strokeWidth={2}
                fill="url(#errorGradient)"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="requests" 
                stroke="#4FD1C5" 
                strokeWidth={1.5}
                fill="url(#requestGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-4 md:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Activity Feed</h3>
            <button className="btn-ghost text-xs">View All</button>
          </div>
          <div className="space-y-0.5 max-h-[280px] overflow-y-auto">
            {activityLog.map((log, idx) => (
              <div key={idx} className="log-row py-2 px-2">
                <div 
                  className="log-severity-bar" 
                  style={{ background: getSeverityColor(log.severity) }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--text-primary)] truncate">
                      {log.message}
                    </span>
                    <span className={`tag ${getSeverityTagClass(log.severity)}`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-tertiary)]">
                    <span className="mono">{log.time}</span>
                    <span>{log.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
