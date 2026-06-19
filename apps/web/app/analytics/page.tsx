"use client"

import { useState } from "react"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight,
  Filter,
  Download,
  Activity,
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
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const requestData = [
  { hour: '00:00', requests: 120, errors: 2 },
  { hour: '04:00', requests: 80, errors: 1 },
  { hour: '08:00', requests: 340, errors: 8 },
  { hour: '12:00', requests: 420, errors: 5 },
  { hour: '16:00', requests: 380, errors: 12 },
  { hour: '20:00', requests: 200, errors: 3 },
  { hour: '23:00', requests: 90, errors: 1 },
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

const COLORS = ['var(--severity-critical)', 'var(--severity-warning)', 'var(--severity-info)']

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Analytics</h1>
          <p className="text-sm text-[var(--text-secondary)]">System performance and usage insights</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-md overflow-hidden">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  timeRange === range 
                    ? 'bg-[var(--accent-amber)] text-white' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="btn-secondary text-xs py-1.5">
            <Download className="h-3 w-3" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: '2.4M', change: '+12%', icon: BarChart3 },
          { label: 'Active Users', value: '1,847', change: '+8%', icon: Users },
          { label: 'Avg Response Time', value: '124ms', change: '-5%', icon: Clock },
          { label: 'Error Rate', value: '1.2%', change: '-0.3%', icon: Activity },
        ].map((metric, idx) => (
          <div key={idx} className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--text-secondary)]">{metric.label}</span>
              <metric.icon className="h-4 w-4 text-[var(--text-tertiary)]" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold mono text-[var(--text-primary)]">{metric.value}</span>
              <span className={`text-xs mono ${
                metric.change.startsWith('+') ? 'text-[var(--severity-critical)]' : 'text-[var(--severity-healthy)]'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Request Volume */}
        <div className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Request Volume</h3>
              <span className="text-xs text-[var(--text-tertiary)]">Last 24 hours</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={requestData}>
              <defs>
                <linearGradient id="requestVolGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-hairline)" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} width={30} />
              <Tooltip contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-hairline)', borderRadius: '6px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="requests" stroke="#4FD1C5" strokeWidth={2} fill="url(#requestVolGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Error Distribution */}
        <div className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Error Distribution</h3>
              <span className="text-xs text-[var(--text-tertiary)]">By severity</span>
            </div>
          </div>
          <div className="flex items-center justify-center h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-hairline)', borderRadius: '6px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Endpoints */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Top Endpoints</h3>
            <span className="text-xs text-[var(--text-tertiary)]">By request count</span>
          </div>
        </div>
        <div className="space-y-2">
          {endpointData.map((endpoint, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)] last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--text-tertiary)]">#{idx + 1}</span>
                <span className="text-sm text-[var(--text-primary)]">{endpoint.name}</span>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <span className="text-[var(--text-secondary)]">{endpoint.requests.toLocaleString()}</span>
                <span className="text-[var(--text-secondary)]">{endpoint.latency}ms</span>
                <span className={`${endpoint.errors > 1 ? 'text-[var(--severity-critical)]' : 'text-[var(--severity-healthy)]'}`}>
                  {endpoint.errors}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
