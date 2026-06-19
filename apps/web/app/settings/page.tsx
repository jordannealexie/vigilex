"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Key,
  ChevronRight,
  Zap,
  Mail,
  Lock,
  Sun,
  Moon,
  Monitor,
  Check
} from "lucide-react"

const navItems = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: Key, label: "API Keys", id: "api-keys" },
  { icon: Palette, label: "Appearance", id: "appearance" },
  { icon: Shield, label: "Security", id: "security" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const renderContent = () => {
    switch(activeTab) {
      case "profile":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Profile Information</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Full Name</label>
                <input className="glass-input w-full" value="John Doe" />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Email</label>
                <input className="glass-input w-full" value="john.doe@vigilex.com" />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Role</label>
                <input className="glass-input w-full" value="Senior Engineer" />
              </div>
              <button className="btn-primary text-sm">Save Changes</button>
            </div>
          </div>
        )
      case "notifications":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Notification Preferences</h3>
            <div className="space-y-3">
              {['Critical Incidents', 'Warnings', 'Deployments', 'System Health'].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
                  <span className="text-sm text-[var(--text-primary)]">{item}</span>
                  <div className="w-10 h-5 rounded-full bg-[var(--accent)] relative cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 right-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "api-keys":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">API Keys</h3>
            <div className="space-y-3">
              {['Production', 'Staging', 'Development'].map((key) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
                  <div>
                    <span className="text-sm text-[var(--text-primary)]">{key}</span>
                    <div className="text-xs text-[var(--text-tertiary)] font-mono">vx_live_{'*'.repeat(12)}</div>
                  </div>
                  <button className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Regenerate</button>
                </div>
              ))}
              <button className="btn-secondary text-sm">+ Generate New Key</button>
            </div>
          </div>
        )
      case "appearance":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Appearance</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                {[
                  { icon: Sun, label: 'Light' },
                  { icon: Moon, label: 'Dark' },
                  { icon: Monitor, label: 'System' },
                ].map((theme) => (
                  <button key={theme.label} className="flex-1 p-3 rounded-xl text-center" style={{ 
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border-top)'
                  }}>
                    <theme.icon className="h-5 w-5 mx-auto mb-1 text-[var(--text-secondary)]" />
                    <span className="text-xs text-[var(--text-secondary)]">{theme.label}</span>
                  </button>
                ))}
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Accent Color</label>
                <div className="flex gap-2">
                  {['#FF8449', '#0F445C', '#3E8B5C', '#711A00'].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-transparent hover:border-[var(--text-primary)] transition-all"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case "security":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Security</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Current Password</label>
                <input className="glass-input w-full" type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">New Password</label>
                <input className="glass-input w-full" type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] block mb-1">Confirm Password</label>
                <input className="glass-input w-full" type="password" placeholder="••••••••" />
              </div>
              <button className="btn-primary text-sm">Update Password</button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div 
      className="p-4 md:p-6 space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Topbar */}
      <div className="matte-glass-strong p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1>Settings</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your account and preferences</p>
        </div>
        <button className="btn-primary text-sm">
          <Zap className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Navigation - Left Column */}
        <div className="md:col-span-1 matte-glass p-2 h-fit">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive 
                    ? 'bg-[var(--glass-bg-hover)] text-[var(--accent)]' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </button>
            )
          })}
        </div>

        {/* Content - Right Column */}
        <div className="md:col-span-3 matte-glass p-5">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  )
}
