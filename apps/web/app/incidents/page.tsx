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
  ArrowUpRight,
  Server,
  GitBranch,
  User,
  Calendar,
  Activity,
  X
} from "lucide-react"
import { CountUp } from "@/components/CountUp"
import { AIPulse } from "@/components/AIPulse"

const incidents = [
  { 
    id: "INC-1023", 
    title: "API Gateway Timeout", 
    severity: "critical", 
    status: "Investigating", 
    service: "api-gateway", 
    time: "14:23:45", 
    duration: "12m",
    description: "Response times exceeded 5s threshold causing cascading failures",
    timeline: [
      { time: "14:23:45", event: "Alert triggered - timeout rate exceeded 5%" },
      { time: "14:25:12", event: "Auto-scaling initiated" },
      { time: "14:28:30", event: "Rollback to previous version initiated" },
    ],
    affectedServices: ["api-gateway", "auth-service", "payment-service"],
    aiSummary: "API Gateway experienced a 5x increase in latency due to a memory leak in the connection pool. Auto-scaling was triggered and a rollback is in progress."
  },
  { 
    id: "INC-1022", 
    title: "Auth Service Unavailable", 
    severity: "warning", 
    status: "Monitoring", 
    service: "auth", 
    time: "13:58:12", 
    duration: "45m",
    description: "Authentication service returning 503 errors",
    timeline: [
      { time: "13:58:12", event: "Error rate spike detected" },
      { time: "14:02:00", event: "Circuit breaker opened" },
    ],
    affectedServices: ["auth-service"],
    aiSummary: "Auth service encountered a database connection timeout. Circuit breaker opened to prevent cascading failures."
  },
  { 
    id: "INC-1021", 
    title: "Payment Processing Delay", 
    severity: "warning", 
    status: "Resolved", 
    service: "payment", 
    time: "11:20:18", 
    duration: "2h",
    description: "Payment processing queue backed up",
    timeline: [
      { time: "11:20:18", event: "Queue depth exceeded threshold" },
      { time: "11:45:00", event: "Workers scaled up" },
      { time: "13:15:00", event: "Queue cleared" },
    ],
    affectedServices: ["payment-service"],
    aiSummary: "Payment processing experienced a 3x increase in traffic. Workers were scaled up to handle the load."
  },
  { 
    id: "INC-1020", 
    title: "Database Connection Pool Exhausted", 
    severity: "critical", 
    status: "Resolved", 
    service: "database", 
    time: "10:05:22", 
    duration: "1.5h",
    description: "Database connections exceeded pool limit",
    timeline: [
      { time: "10:05:22", event: "Connection pool at 95% capacity" },
      { time: "10:15:00", event: "Pool limit increased" },
      { time: "11:30:00", event: "Connections normalized" },
    ],
    affectedServices: ["database", "auth-service", "payment-service"],
    aiSummary: "Database connection pool was exhausted due to a leak in the payment service. Pool size was increased and leak fixed."
  },
]

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    critical: '#711A00',
    warning: '#FF8449',
    info: '#0F445C'
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
    info: 'tag-info'
  }
  return classes[severity] || ''
}

export default function IncidentsPage() {
  const [selectedIncident, setSelectedIncident] = useState(incidents[0])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { label: 'Total', value: '4', color: 'var(--text-primary)' },
    { label: 'Critical', value: '2', color: '#711A00' },
    { label: 'Warning', value: '2', color: '#FF8449' },
    { label: 'Resolved', value: '2', color: '#3E8B5C' },
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
            {['all', 'critical', 'warning'].map((s) => (
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
          <div key={idx} className="matte-glass p-4">
            <div className="label">{stat.label}</div>
            <div className="text-2xl font-bold mono" style={{ color: stat.color }}>
              <CountUp value={parseInt(stat.value)} />
            </div>
          </div>
        ))}
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Master List - 1/3 */}
        <div className="lg:col-span-1 matte-glass p-2 max-h-[600px] overflow-y-auto">
          <div className="text-xs text-[var(--text-tertiary)] px-3 py-2 font-medium">
            {incidents.length} incidents
          </div>
          {incidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className={`p-3 rounded-xl cursor-pointer transition-all ${
                selectedIncident.id === incident.id 
                  ? 'bg-[var(--glass-bg-hover)] shadow-critical' 
                  : 'hover:bg-[var(--glass-bg-hover)]'
              } card-spine card-spine-${incident.severity}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{incident.id}</span>
                    <span className={`tag ${getTagClass(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-[var(--text-primary)] mt-1">{incident.title}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-tertiary)]">
                    <span style={{ color: getStatusColor(incident.status) }}>{incident.status}</span>
                    <span>{incident.service}</span>
                    <span>{incident.time}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)] flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel - 2/3 */}
        {selectedIncident && (
          <div className="lg:col-span-2 matte-glass p-5 max-h-[600px] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono text-[var(--text-primary)]">{selectedIncident.id}</span>
                  <span className={`tag ${getTagClass(selectedIncident.severity)}`}>
                    {selectedIncident.severity}
                  </span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: getStatusColor(selectedIncident.status) }}
                  >
                    {selectedIncident.status}
                  </span>
                </div>
                <h2 className="mt-2">{selectedIncident.title}</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{selectedIncident.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs py-1.5 px-3 hover:bg-[var(--glass-bg-hover)]">Acknowledge</button>
                <button className="btn-primary text-xs py-1.5 px-3">Assign</button>
              </div>
            </div>

            {/* AI Summary */}
            <div className="matte-glass p-4 mb-4" style={{ background: 'rgba(255,132,73,0.04)' }}>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-4 w-4 text-[var(--accent)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">AI Root Cause Analysis</span>
                <AIPulse label="" />
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{selectedIncident.aiSummary}</p>
            </div>

            {/* Timeline */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Timeline</h3>
              <div className="space-y-2">
                {selectedIncident.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-xl hover:bg-[var(--glass-bg-hover)] transition-all">
                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: getSeverityColor(selectedIncident.severity) }} />
                    <div>
                      <div className="text-xs font-mono text-[var(--text-tertiary)]">{event.time}</div>
                      <div className="text-sm text-[var(--text-primary)]">{event.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Affected Services */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Affected Services</h3>
              <div className="flex gap-2">
                {selectedIncident.affectedServices.map((service, idx) => (
                  <span key={idx} className="tag tag-info hover:opacity-80 cursor-default">{service}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
