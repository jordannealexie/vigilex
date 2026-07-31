"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { 
  Zap, 
  Activity, 
  Bot, 
  Shield, 
  Globe, 
  BarChart3,
  ChevronRight,
  Menu,
  X,
  Users,
  Clock,
  Gauge,
  Layers
} from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F6F2] dark:bg-[#0D0E11]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#F8F6F2]/80 dark:bg-[#0D0E11]/80 backdrop-blur-xl border-b border-[#E8E4DC] dark:border-[#1A1C20]' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#FF8449] to-[#C9501C] shadow-lg shadow-[#FF8449]/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1A1C20] dark:text-[#F0EDE8]">Vigilex</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1A1C20] dark:hover:text-[#F0EDE8] transition-colors font-medium">
              Features
            </Link>
            <Link href="/auth" className="px-5 py-2 bg-[#1A1C20] dark:bg-[#F0EDE8] text-[#F0EDE8] dark:text-[#1A1C20] rounded-lg text-sm font-medium hover:opacity-85 transition-opacity">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#E8E4DC] dark:hover:bg-[#1A1C20] transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#1A1C20] dark:text-[#F0EDE8]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1A1C20] dark:text-[#F0EDE8]" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#F8F6F2] dark:bg-[#0D0E11] border-t border-[#E8E4DC] dark:border-[#1A1C20] px-6 py-4">
            <div className="flex flex-col gap-4">
              <Link href="#features" className="text-sm text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1A1C20] dark:hover:text-[#F0EDE8] transition-colors font-medium">
                Features
              </Link>
              <Link href="/auth" className="px-5 py-2 bg-[#1A1C20] dark:bg-[#F0EDE8] text-[#F0EDE8] dark:text-[#1A1C20] rounded-lg text-sm font-medium hover:opacity-85 transition-opacity text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF8449]/10 dark:bg-[#FF8449]/20 rounded-full border border-[#FF8449]/20">
              <span className="w-2 h-2 rounded-full bg-[#FF8449] animate-pulse"></span>
              <span className="text-xs font-medium text-[#C9501C] dark:text-[#FF8449]">Live Monitoring • 99.97% Uptime</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1A1C20] dark:text-[#F0EDE8] leading-[1.1]">
              AI-Powered
              <br />
              <span className="bg-gradient-to-r from-[#FF8449] to-[#C9501C] bg-clip-text text-transparent">Observability</span>
            </h1>

            <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] max-w-lg leading-relaxed">
              Monitor, analyze, and respond to incidents faster with AI-driven insights. 
              Built for modern engineering teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth"
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF8449] to-[#C9501C] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#FF8449]/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-3.5 border border-[#E8E4DC] dark:border-[#2A2C30] rounded-xl text-[#1A1C20] dark:text-[#F0EDE8] font-medium hover:bg-[#F0EDE8] dark:hover:bg-[#1A1C20] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {['#FF8449', '#C9501C', '#FF6B35'].map((color, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F8F6F2] dark:border-[#0D0E11]" style={{ background: color }}></div>
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1A1C20] dark:text-[#F0EDE8] flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  2,000+ engineers
                </div>
                <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Trust Vigilex daily</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF8449]/20 to-[#C9501C]/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-[#F0EDE8] dark:bg-[#1A1C20] rounded-3xl p-8 shadow-2xl border border-[#E8E4DC] dark:border-[#2A2C30]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#36D399]"></div>
                      <span className="text-sm font-medium text-[#1A1C20] dark:text-[#F0EDE8]">System Healthy</span>
                    </div>
                    <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">99.97%</span>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-[#FF8449]/20 to-[#FF8449]/5 rounded-xl flex items-end px-4 py-2">
                    <div className="flex items-end gap-1 w-full h-12">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm bg-[#FF8449]" style={{ height: `${h}%`, opacity: 0.5 + (h / 100) * 0.5 }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    <span>0 incidents</span>
                    <span>24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-[#E8E4DC] dark:border-[#1A1C20] bg-[#F5F2ED] dark:bg-[#0A0B0E]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-[#C9501C] dark:text-[#FF8449] tracking-wider uppercase">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1C20] dark:text-[#F0EDE8] mt-3">
              Built for Engineering Teams
            </h2>
            <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] mt-3 max-w-2xl mx-auto">
              Everything you need to monitor, debug, and optimize your systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: "Real-time Monitoring",
                desc: "Live metrics and logs with automatic anomaly detection and intelligent alerting."
              },
              {
                icon: Bot,
                title: "AI-Powered Analysis",
                desc: "Root cause analysis and incident summaries powered by advanced language models."
              },
              {
                icon: Shield,
                title: "Incident Management",
                desc: "Track, triage, and resolve incidents faster with AI-assisted workflows."
              },
              {
                icon: Globe,
                title: "Service Topology",
                desc: "Visual dependency mapping with live traffic flow and performance insights."
              }
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="group p-8 rounded-2xl bg-[#F8F6F2] dark:bg-[#121418] border border-[#E8E4DC] dark:border-[#1A1C20] hover:border-[#FF8449]/40 hover:shadow-lg hover:shadow-[#FF8449]/5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FF8449]/10 dark:bg-[#FF8449]/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#C9501C] dark:text-[#FF8449]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1C20] dark:text-[#F0EDE8]">{feature.title}</h3>
                  <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "99.97%", label: "Uptime", icon: Gauge },
            { value: "< 5s", label: "MTTD", icon: Clock },
            { value: "3x", label: "Faster Resolution", icon: BarChart3 },
            { value: "100+", label: "Integrations", icon: Layers }
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6 text-[#C9501C] dark:text-[#FF8449]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#1A1C20] dark:text-[#F0EDE8] tracking-tight">{stat.value}</div>
                <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-[#E8E4DC] dark:border-[#1A1C20]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-[#FF8449]/5 to-[#C9501C]/5 dark:from-[#FF8449]/10 dark:to-[#C9501C]/5 border border-[#FF8449]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1C20] dark:text-[#F0EDE8]">
              Ready to get started?
            </h2>
            <p className="text-lg text-[#6B7280] dark:text-[#9CA3AF] mt-3 max-w-xl mx-auto">
              Join thousands of engineers using Vigilex to monitor and optimize their systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/auth"
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF8449] to-[#C9501C] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#FF8449]/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                className="px-8 py-3.5 border border-[#E8E4DC] dark:border-[#2A2C30] rounded-xl text-[#1A1C20] dark:text-[#F0EDE8] font-medium hover:bg-[#F0EDE8] dark:hover:bg-[#1A1C20] transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E4DC] dark:border-[#1A1C20] px-6 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-[#FF8449]" />
            <span className="font-semibold text-[#1A1C20] dark:text-[#F0EDE8]">Vigilex</span>
            <span>© 2024</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-[#1A1C20] dark:hover:text-[#F0EDE8] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#1A1C20] dark:hover:text-[#F0EDE8] transition-colors">Terms</Link>
            <Link href="/support" className="hover:text-[#1A1C20] dark:hover:text-[#F0EDE8] transition-colors">Support</Link>
            <Link href="/blog" className="hover:text-[#1A1C20] dark:hover:text-[#F0EDE8] transition-colors">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
