"use client"

import { useState } from "react"
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Zap,
  Filter,
  Search,
  MoreVertical,
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
  const colors = {
    critical: 'var(--severity-critical)',
    warning: 'var(--severity-warning)',
    info: 'var(--severity-info)',
    healthy: 'var(--severity-healthy)'
  }
  return colors[severity as keyof typeof colors] || 'var(--text-tertiary)'
}

const getStatusColor = (status: string) => {
  const colors = {
    Investigating: 'var(--severity-critical)',
    Monitoring: 'var(--severity-warning)',
    Resolved: 'var(--severity-healthy)'
  }
  return colors[status as keyof typeof colors] || 'var(--text-tertiary)'
}

export default function IncidentsPage() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Incidents</h1>
          <p className="text-sm text-[var(--text-secondary)]">Track and manage system incidents</p>
        </div>
        <button className="btn-primary text-sm">
          <Zap className="h-4 w-4" />
          New Incident
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: '6', color: 'var(--text-primary)' },
          { label: 'Critical', value: '2', color: 'var(--severity-critical)' },
          { label: 'Warning', value: '3', color: 'var(--severity-warning)' },
          { label: 'Resolved', value: '3', color: 'var(--severity-healthy)' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg p-4">
            <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
            <p className="text-2xl font-bold mono" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
          <input 
            type="text" 
            placeholder="Search incidents..." 
            className="input-glass pl-9"
          />
        </div>
        <div className="flex bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-md overflow-hidden">
          {['all', 'critical', 'warning', 'info'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === s 
                  ? 'bg-[var(--accent-amber)] text-white' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn-secondary text-xs py-1.5">
          <Filter className="h-3 w-3" />
          More Filters
        </button>
      </div>

      {/* Incident Table */}
      <div className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-hairline)]">
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
                <tr 
                  key={idx} 
                  className="border-b border-[var(--border-hairline)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
