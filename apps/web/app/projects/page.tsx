"use client"

import { useState } from "react"
import { 
  FolderGit2, 
  Plus, 
  Server, 
  Activity, 
  MoreVertical,
  Search,
  Filter
} from "lucide-react"

const projects = [
  { 
    name: "API Gateway", 
    status: "Active", 
    services: 4, 
    errors: "0.2%",
    uptime: "99.98%",
    lastDeploy: "2h ago"
  },
  { 
    name: "Auth Service", 
    status: "Active", 
    services: 2, 
    errors: "0.8%",
    uptime: "99.92%",
    lastDeploy: "1d ago"
  },
  { 
    name: "Payment Service", 
    status: "Maintenance", 
    services: 3, 
    errors: "1.5%",
    uptime: "99.85%",
    lastDeploy: "3d ago"
  },
  { 
    name: "Notification Service", 
    status: "Active", 
    services: 2, 
    errors: "0.1%",
    uptime: "99.99%",
    lastDeploy: "5h ago"
  },
]

const getStatusColor = (status: string) => {
  const colors = {
    'Active': 'var(--severity-healthy)',
    'Maintenance': 'var(--severity-warning)',
    'Inactive': 'var(--severity-critical)'
  }
  return colors[status as keyof typeof colors] || 'var(--text-tertiary)'
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Projects</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your monitoring projects</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="input-glass pl-9"
          />
        </div>
        <button className="btn-secondary text-xs py-1.5">
          <Filter className="h-3 w-3" />
          Filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg p-4 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[var(--bg-hover)] flex items-center justify-center">
                  <FolderGit2 className="h-5 w-5 text-[var(--accent-amber)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{project.name}</h3>
                  <span 
                    className="text-xs font-mono" 
                    style={{ color: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <button className="p-1 hover:bg-[var(--bg-hover)] rounded-sm">
                <MoreVertical className="h-4 w-4 text-[var(--text-tertiary)]" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-[var(--text-tertiary)]">Services</p>
                <p className="font-mono text-[var(--text-primary)]">{project.services}</p>
              </div>
              <div>
                <p className="text-[var(--text-tertiary)]">Error Rate</p>
                <p className={`font-mono ${
                  parseFloat(project.errors) > 1 ? 'text-[var(--severity-critical)]' : 'text-[var(--severity-healthy)]'
                }`}>
                  {project.errors}
                </p>
              </div>
              <div>
                <p className="text-[var(--text-tertiary)]">Uptime</p>
                <p className="font-mono text-[var(--text-primary)]">{project.uptime}</p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-tertiary)]">Deployed {project.lastDeploy}</span>
              <span className="text-[var(--text-secondary)]">View →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
