"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  FolderGit2, 
  Plus, 
  Server, 
  Activity, 
  Search,
  Filter,
  Zap,
  ArrowUpRight,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Sparkline } from "@/components/sparkline"
import { CountUp } from "@/components/CountUp"

const services = [
  { 
    name: "API Gateway", 
    status: "healthy", 
    environment: "Production",
    services: 4, 
    errors: "0.2%",
    uptime: 99.98,
    lastDeploy: "2h ago",
    sparkline: [2, 3, 1, 4, 2, 3, 1, 2, 3, 2, 1, 3],
    team: "Platform"
  },
  { 
    name: "Auth Service", 
    status: "healthy", 
    environment: "Production",
    services: 2, 
    errors: "0.8%",
    uptime: 99.92,
    lastDeploy: "1d ago",
    sparkline: [5, 4, 6, 3, 5, 4, 3, 2, 4, 5, 3, 4],
    team: "Identity"
  },
  { 
    name: "Payment Service", 
    status: "warning", 
    environment: "Production",
    services: 3, 
    errors: "1.5%",
    uptime: 99.85,
    lastDeploy: "3d ago",
    sparkline: [8, 6, 7, 5, 8, 6, 5, 4, 7, 8, 6, 7],
    team: "Commerce"
  },
  { 
    name: "Notification Service", 
    status: "healthy", 
    environment: "Staging",
    services: 2, 
    errors: "0.1%",
    uptime: 99.99,
    lastDeploy: "5h ago",
    sparkline: [1, 2, 1, 3, 1, 2, 1, 1, 2, 1, 3, 1],
    team: "Platform"
  },
  { 
    name: "Search Service", 
    status: "healthy", 
    environment: "Production",
    services: 3, 
    errors: "0.3%",
    uptime: 99.95,
    lastDeploy: "2d ago",
    sparkline: [3, 4, 2, 3, 4, 3, 2, 4, 3, 2, 3, 4],
    team: "Search"
  },
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'healthy': '#3E8B5C',
    'warning': '#FF8449',
    'critical': '#711A00'
  }
  return colors[status] || '#6B7679'
}

const getRingColor = (status: string) => {
  const colors: Record<string, string> = {
    'healthy': '#3E8B5C',
    'warning': '#FF8449',
    'critical': '#711A00'
  }
  return colors[status] || '#6B7679'
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Production': true,
    'Staging': false
  })

  const toggleSection = (env: string) => {
    setExpandedSections(prev => ({ ...prev, [env]: !prev[env] }))
  }

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.environment]) acc[service.environment] = []
    acc[service.environment].push(service)
    return acc
  }, {} as Record<string, typeof services>)

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
          <h1>Projects</h1>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
            <input 
              type="text" 
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="btn-secondary text-xs py-1.5 px-3">
            <Filter className="h-3 w-3" />
            Filters
          </button>
          <button className="btn-primary text-sm">
            <Plus className="h-4 w-4" />
            New Service
          </button>
        </div>
      </div>

      {/* Collapsible Sections */}
      {Object.entries(groupedServices).map(([environment, envServices]) => (
        <div key={environment} className="space-y-3">
          <button
            onClick={() => toggleSection(environment)}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            {expandedSections[environment] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
            {environment}
            <span className="text-xs font-normal text-[var(--text-tertiary)]">
              ({envServices.length} services)
            </span>
          </button>
          
          {expandedSections[environment] !== false && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {envServices.map((service, idx) => {
                const statusColor = getStatusColor(service.status)
                const ringColor = getRingColor(service.status)
                const circumference = 2 * Math.PI * 28
                const strokeDashoffset = circumference * (1 - service.uptime / 100)
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="matte-glass p-5 card-spine"
                    style={{ 
                      borderLeftColor: statusColor,
                      boxShadow: `0 8px 32px ${statusColor}15, var(--shadow-glass)`
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ 
                          background: statusColor + '15',
                          border: '1px solid ' + statusColor + '20'
                        }}>
                          <Server className="h-5 w-5" style={{ color: statusColor }} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--text-primary)]">{service.name}</h3>
                          <span className="text-xs text-[var(--text-tertiary)]">{service.team}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[var(--text-tertiary)]" />
                    </div>

                    {/* Uptime Ring */}
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <svg className="w-14 h-14 -rotate-90">
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke="var(--glass-border-top)"
                            strokeWidth="4"
                            fill="none"
                          />
                          <circle
                            cx="28"
                            cy="28"
                            r="24"
                            stroke={ringColor}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold mono" style={{ color: ringColor }}>
                            {service.uptime}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[var(--text-tertiary)]">Error Rate</div>
                        <div className="text-sm font-mono text-[var(--text-primary)]">{service.errors}</div>
                        <div className="text-xs text-[var(--text-tertiary)] mt-1">Deployed {service.lastDeploy}</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[var(--glass-border-top)]">
                      <Sparkline 
                        data={service.sparkline} 
                        color={statusColor}
                        height={24}
                        width={120}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  )
}
