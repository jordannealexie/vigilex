"use client"

import "./globals.css"
import "@fontsource/inter"
import "@fontsource/jetbrains-mono"
import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  LayoutDashboard, 
  Settings, 
  Zap, 
  Sun, 
  Moon, 
  Bell, 
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Projects", href: "/projects" },
  { icon: AlertTriangle, label: "Incidents", href: "/incidents" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Default to dark mode
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

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="fixed top-3 left-3 z-50 md:hidden p-2 rounded-md bg-[#0E1014] border border-[var(--border-hairline)]"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-[var(--text-secondary)]" />
          </button>

          {/* Mobile Overlay */}
          {isMobile && isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside 
            className={`
              fixed md:relative z-40
              sidebar
              flex flex-col 
              transition-all duration-200 ease-out
              ${isSidebarOpen ? 'w-[240px]' : 'w-[64px]'}
              ${isMobile && !isSidebarOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
              h-screen
            `}
          >
            {/* Logo */}
            <div className="flex items-center h-14 px-4 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-[#FF7A33] flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="text-lg font-semibold text-[var(--text-primary)]">Vigilex</span>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${item.href === '/' ? 'nav-item-active' : ''}`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-[var(--border-hairline)] py-4 px-2 space-y-1">
              <button className="nav-item w-full">
                <Bell className="h-4 w-4 flex-shrink-0" />
                {isSidebarOpen && (
                  <>
                    <span>Notifications</span>
                    <span className="ml-auto text-xs px-1.5 py-0.5 rounded-sm bg-[#FF7A33] text-white">3</span>
                  </>
                )}
                {!isSidebarOpen && (
                  <span className="ml-auto text-[10px] px-1 py-0.5 rounded-sm bg-[#FF7A33] text-white">3</span>
                )}
              </button>
              
              <button className="nav-item w-full">
                <User className="h-4 w-4 flex-shrink-0" />
                {isSidebarOpen && <span>Profile</span>}
              </button>

              <button 
                onClick={toggleTheme}
                className="nav-item w-full"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <Moon className="h-4 w-4 flex-shrink-0" />
                )}
                {isSidebarOpen && (
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                )}
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
                {isSidebarOpen && <span>Collapse</span>}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-[var(--bg-base)]">
            <div className="p-4 md:p-6 max-w-[1440px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
