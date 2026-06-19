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
  ArrowUpRight
} from "lucide-react"
import { Sparkline } from "@/components/sparkline"

const projects = [
  { 
    name: "API Gateway", 
    status: "Active", 
    services: 4, 
    errors: "0.2%",
    uptime: "99.98%",
    lastDeploy: "2h ago",
    sparkline: [2, 3, 1, 4, 2, 3, 1, 2]
  },
  { 
    name: "Auth Service", 
    status: "Active", 
    services: 2, 
    errors: "0.8%",
    uptime: "99.92%",
    lastDeploy: "1d ago",
    sparkline: [5, 4, 6, 3, 5, 4, 3, 2]
  },
  { 
    name: "Payment Service", 
    status: "Maintenance", 
    services: 3, 
    errors: "1.5%",
    uptime: "99.85%",
    lastDeploy: "3d ago",
    sparkline: [8, 6, 7, 5, 8, 6, 5, 4]
  },
  { 
    name: "Notification Service", 
    status: "Active", 
    services: 2, 
    errors: "0.1%",
    uptime: "99.99%",
    lastDeploy: "5h ago",
    sparkline: [1, 2, 1, 3, 1, 2, 1, 1]
  },
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Active': '#3E8B5C',
    'Maintenance': '#FF8449',
    'Inactive': '#711A00'
  }
  return colors[status] || '#6B7679'
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

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')

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
          <h1>Projects</h1>
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
            <input 
              type="text" 
              placeholder="Search projects..."
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
            New Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ 
                  background: '#FF8449' + '15',
                  border: '1px solid ' + '#FF8449' + '20'
                }}>
                  <FolderGit2 className="h-5 w-5" style={{ color: '#FF8449' }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{project.name}</h3>
                  <span 
                    className="text-xs font-medium"
                    style={{ color: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <button className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-[var(--text-tertiary)]">Services</div>
                <div className="font-mono text-[var(--text-primary)]">{project.services}</div>
              </div>
              <div>
                <div className="text-[var(--text-tertiary)]">Error Rate</div>
                <div className={`font-mono ${parseFloat(project.errors) > 1 ? 'text-[#711A00]' : 'text-[#3E8B5C]'}`}>
                  {project.errors}
                </div>
              </div>
              <div>
                <div className="text-[var(--text-tertiary)]">Uptime</div>
                <div className="font-mono text-[var(--text-primary)]">{project.uptime}</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-glass)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkline 
                  data={project.sparkline} 
                  color={getStatusColor(project.status)}
                  height={24}
                  width={48}
                />
                <span className="text-xs text-[var(--text-tertiary)]">7d trend</span>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">Deployed {project.lastDeploy}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
