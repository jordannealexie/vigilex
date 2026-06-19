"use client"

import { motion } from "framer-motion"
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Key,
  ChevronRight,
  Zap
} from "lucide-react"

const settings = [
  { 
    icon: User, 
    label: "Profile", 
    description: "Manage your personal information",
  },
  { 
    icon: Shield, 
    label: "Security", 
    description: "Password and authentication settings",
  },
  { 
    icon: Bell, 
    label: "Notifications", 
    description: "Configure alert preferences",
  },
  { 
    icon: Key, 
    label: "API Keys", 
    description: "Manage API access tokens",
  },
  { 
    icon: Globe, 
    label: "Language", 
    description: "Choose your preferred language",
    value: "English"
  },
  { 
    icon: Palette, 
    label: "Theme", 
    description: "Toggle dark/light mode",
    value: "Dark"
  },
]

export default function SettingsPage() {
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
          <h1>Settings</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your account and preferences</p>
        </div>
        <button className="btn-primary text-sm">
          <Zap className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Settings List */}
      <div className="glass-card overflow-hidden">
        {settings.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`flex items-center justify-between p-4 hover:bg-[var(--bg-glass-hover)] transition-colors cursor-pointer ${
                index < settings.length - 1 ? 'border-b border-[var(--border-glass)]' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ 
                  background: '#FF8449' + '15',
                  border: '1px solid ' + '#FF8449' + '20'
                }}>
                  <Icon className="h-4 w-4" style={{ color: '#FF8449' }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {item.value && (
                  <span className="text-sm text-[var(--text-secondary)]">{item.value}</span>
                )}
                <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)]" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
