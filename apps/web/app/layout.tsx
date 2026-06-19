"use client"

import "./globals.css"
import "@fontsource/inter"
import "@fontsource/jetbrains-mono"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Zap, 
  Sun, 
  Moon, 
  Bell, 
  User,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react"

const navSections = [
  {
    label: "Monitoring",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      { icon: Activity, label: "Projects", href: "/projects" },
      { icon: AlertTriangle, label: "Incidents", href: "/incidents" },
      { icon: BarChart3, label: "Analytics", href: "/analytics" },
    ]
  },
  {
    label: "Workspace",
    items: [
      { icon: Bell, label: "Notifications", href: "/notifications" },
      { icon: User, label: "Profile", href: "/profile" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ]
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('dark')
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <html lang="en">
      <body>
        {/* Ambient Grain */}
        <div className="ambient-grain" />

        {/* Background Glow - No pulse animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF8449] opacity-[0.04] rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#0F445C] opacity-[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="flex h-screen relative p-4 md:p-5 gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-xl matte-glass"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-[var(--text-secondary)]" />
          </button>

          {/* Mobile Overlay */}
          {isMobile && isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Floating Sidebar - Matte Glass */}
          <motion.aside 
            className={`
              fixed md:relative z-40 sidebar-matte
              flex flex-col 
              transition-all duration-200 ease-out
              ${isSidebarOpen ? 'w-[240px]' : 'w-[64px]'}
              ${isMobile && !isSidebarOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
              h-[calc(100vh-40px)] md:h-[calc(100vh-40px)]
              overflow-hidden
            `}
            initial={false}
            animate={{
              width: isSidebarOpen ? 240 : 64,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Logo */}
            <div className="flex items-center h-14 px-4 border-b border-[var(--glass-border-top)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-lg font-semibold text-[var(--text-primary)] whitespace-nowrap"
                    >
                      Vigilex
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 overflow-y-auto py-3 px-2">
              {navSections.map((section) => (
                <div key={section.label}>
                  {isSidebarOpen && (
                    <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)] px-3 py-2">
                      {section.label}
                    </div>
                  )}
                  {section.items.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item ${active ? 'nav-item-active' : ''}`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <AnimatePresence>
                          {isSidebarOpen && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.15 }}
                              className="whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    )
                  })}
                  {isSidebarOpen && section !== navSections[navSections.length - 1] && (
                    <div className="h-px bg-[var(--glass-border-top)] mx-3 my-2" />
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom Controls - No status orb */}
            <div className="border-t border-[var(--glass-border-top)] py-3 px-2 flex-shrink-0 space-y-1">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-[var(--text-secondary)]">v2.0</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">© Vigilex</span>
              </div>
              
              <button 
                onClick={toggleTheme}
                className="nav-item w-full"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <Moon className="h-4 w-4 flex-shrink-0" />
                )}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap"
                    >
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              
              <button 
                onClick={toggleSidebar}
                className="nav-item w-full"
              >
                {isSidebarOpen ? (
                  <ChevronLeft className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                )}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap"
                    >
                      Collapse
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main 
            className="flex-1 overflow-auto bg-[var(--bg-secondary)] rounded-[var(--radius-card)] p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-[var(--bg-base)] rounded-[calc(var(--radius-card)-4px)] min-h-full p-1">
              <div className="max-w-[1440px] mx-auto">
                {children}
              </div>
            </div>
          </motion.main>
        </div>
      </body>
    </html>
  )
}
