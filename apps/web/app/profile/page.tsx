"use client"

import { motion } from "framer-motion"
import { 
  User, 
  Mail, 
  Calendar, 
  Shield,
  Edit,
  Zap
} from "lucide-react"

export default function ProfilePage() {
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
          <h1>Profile</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your account information</p>
        </div>
        <button className="btn-primary text-sm">
          <Edit className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-6 max-w-2xl">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold" style={{ 
            background: '#FF8449' + '20',
            border: '1px solid ' + '#FF8449' + '30',
            color: '#FF8449'
          }}>
            JD
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">John Doe</h2>
            <p className="text-sm text-[var(--text-secondary)]">Senior Engineer</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                john.doe@vigilex.com
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Joined Jan 2024
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        {[
          { label: "Email", value: "john.doe@vigilex.com", icon: Mail },
          { label: "Role", value: "Senior Engineer", icon: Shield },
          { label: "Department", value: "Engineering", icon: User },
          { label: "Time Zone", value: "UTC-5 (EST)", icon: Calendar },
        ].map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ 
                  background: '#0F445C' + '15',
                  border: '1px solid ' + '#0F445C' + '20'
                }}>
                  <Icon className="h-4 w-4" style={{ color: '#0F445C' }} />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-tertiary)]">{item.label}</div>
                  <div className="text-sm text-[var(--text-primary)]">{item.value}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
