"use client"

import { motion } from "framer-motion"
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Activity,
  ChevronRight,
  Zap
} from "lucide-react"

const notifications = [
  { 
    title: "Incident INC-1023 resolved",
    description: "API Gateway timeout issue has been resolved",
    time: "2 min ago",
    type: "success"
  },
  { 
    title: "High error rate detected",
    description: "Auth service error rate exceeded 5% threshold",
    time: "15 min ago",
    type: "warning"
  },
  { 
    title: "Deployment v1.4.3 completed",
    description: "Successfully deployed to production",
    time: "1 hour ago",
    type: "info"
  },
  { 
    title: "New alert rule created",
    description: "High error rate alert configured",
    time: "3 hours ago",
    type: "info"
  },
  { 
    title: "System health check passed",
    description: "All services are operational",
    time: "5 hours ago",
    type: "success"
  },
]

const getIcon = (type: string) => {
  const icons: Record<string, any> = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: Activity
  }
  return icons[type] || Bell
}

const getColor = (type: string) => {
  const colors: Record<string, string> = {
    success: '#3E8B5C',
    warning: '#FF8449',
    info: '#0F445C'
  }
  return colors[type] || '#6B7679'
}

export default function NotificationsPage() {
  return (
    <motion.div 
      className="p-4 md:p-6 space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Topbar */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1>Notifications</h1>
          <p className="text-sm text-[var(--text-secondary)]">Stay updated with system events</p>
        </div>
        <button className="btn-secondary text-sm">
          <CheckCircle className="h-4 w-4" />
          Mark All Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="glass-card overflow-hidden">
        {notifications.map((notification, index) => {
          const Icon = getIcon(notification.type)
          const color = getColor(notification.type)
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-4 hover:bg-[var(--bg-glass-hover)] transition-colors cursor-pointer ${
                index < notifications.length - 1 ? 'border-b border-[var(--border-glass)]' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ 
                  background: color + '15',
                  border: '1px solid ' + color + '20'
                }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{notification.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{notification.description}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">{notification.time}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)]" />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
