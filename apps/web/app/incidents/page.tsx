"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Zap,
  Filter,
  Search,
  ArrowUpRight
} from "lucide-react"

const incidents = [
  { id: "INC-1023", title: "API Gateway Timeout", severity: "critical", status: "Investigating", service: "api-gateway", time: "14:23:45", duration: "12m" },
  { id: "INC-1022", title: "Auth Service Unavailable", severity: "warning", status: "Monitoring", service: "auth", time: "13:58:12", duration: "45m" },
  { id: "INC-1021", title: "Payment Processing Delay", severity: "warning", status: "Resolved", service: "payment", time: "11:20:18", duration: "2h" },
  { id: "INC-1020", title: "Database Connection Pool Exhausted", severity: "critical", status: "Resolved", service: "database", time: "10:05:22", duration: "1.5h" },
  { id: "INC-1019", title: "Cache Miss Rate Spike", severity: "info", status: "Resolved", service: "redis", time: "08:45:33", duration: "45m" },
  { id: "INC-1018", title: "Deployment Rollback Required", severity: "warning", status: "Monitoring", service: "api", time: "07:30:12", duration: "3h" },
]

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    critical: '#711A00',
    warning: '#FF8449',
    info: '#0F445C',
    healthy: '#3E8B5C'
  }
  return colors[severity] || '#6B7679'
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Investigating: '#711A00',
    Monitoring: '#FF8449',
    Resolved: '#3E8B5C'
  }
  return colors[status] || '#6B7679'
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

export default function IncidentsPage() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { label: 'Total', value: '6', color: 'var(--text-primary)' },
    { label: 'Critical', value: '2', color: '#711A00' },
    { label: 'Warning', value: '3', color: '#FF8449' },
    { label: 'Resolved', value: '3', color: '#3E8B5C' },
  ]

  return (
    <motion.div 
      className="p-4 md:p-6 space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Topbar */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h1>Incidents</h1>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
            <input 
              type="text" 
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="segmented-control">
            {['all', 'critical', 'warning', 'info'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`segmented-item ${filter === s ? 'segmented-item-active' : ''}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn-secondary text-xs py-1.5 px-3">
            <Filter className="h-3 w-3" />
            Filters
          </button>
          <button className="btn-primary text-sm">
            <Zap className="h-4 w-4" />
            New Incident
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-4">
            <div className="label">{stat.label}</div>
            <div className="text-2xl font-bold mono" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Incident Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-glass)]">
                <th className="text-left text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">ID</th>
                <th className="text-left text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">Title</th>
                <th className="text-left text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">Severity</th>
                <th className="text-left text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">Service</th>
                <th className="text-left text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">Time</th>
                <th className="text-left text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-4 py-3">Duration</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident, idx) => (
                <motion.tr 
                  key={idx} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-[var(--border-glass)] hover:bg-[var(--bg-glass-hover)] transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-[var(--text-primary)]">{incident.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[var(--text-primary)]">{incident.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-sm" style={{ background: getSeverityColor(incident.severity) }} />
                      <span className="text-sm capitalize text-[var(--text-secondary)]">{incident.severity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm" style={{ color: getStatusColor(incident.status) }}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-[var(--text-tertiary)]">{incident.service}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-[var(--text-tertiary)]">{incident.time}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-[var(--text-tertiary)]">{incident.duration}</span>
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)]" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
