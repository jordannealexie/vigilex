"use client"

import { useState } from "react"
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Key,
  ChevronRight,
  Switch
} from "lucide-react"

const settings = [
  { 
    icon: User, 
    label: "Profile", 
    description: "Manage your personal information",
    type: "link"
  },
  { 
    icon: Shield, 
    label: "Security", 
    description: "Password and authentication settings",
    type: "link"
  },
  { 
    icon: Bell, 
    label: "Notifications", 
    description: "Configure alert preferences",
    type: "link"
  },
  { 
    icon: Key, 
    label: "API Keys", 
    description: "Manage API access tokens",
    type: "link"
  },
  { 
    icon: Globe, 
    label: "Language", 
    description: "Choose your preferred language",
    type: "select",
    value: "English"
  },
  { 
    icon: Palette, 
    label: "Dark Mode", 
    description: "Toggle dark/light theme",
    type: "toggle",
    value: true
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)]">Manage your account and preferences</p>
      </div>

      <div className="bg-[var(--bg-panel)] border border-[var(--border-hairline)] rounded-lg overflow-hidden">
        {settings.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer ${
              index < settings.length - 1 ? 'border-b border-[var(--border-hairline)]' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-md bg-[var(--bg-hover)] flex items-center justify-center">
                <item.icon className="h-4 w-4 text-[var(--text-secondary)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {item.type === "select" && (
                <span className="text-sm text-[var(--text-secondary)]">{item.value}</span>
              )}
              {item.type === "toggle" && (
                <div className="w-10 h-5 rounded-full bg-[var(--accent-amber)] relative cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 right-0.5 transition-all" />
                </div>
              )}
              {item.type === "link" && (
                <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
