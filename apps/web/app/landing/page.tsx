"use client"

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#EDE3D8] dark:bg-[#1C1E21] flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FF8449] to-[#711A00] text-white text-4xl font-bold">
            ⚡
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[#1C1E21] dark:text-[#EEEBE4] tracking-tight mb-4">
          AI-Powered Observability
          <br />
          <span className="text-[#FF8449]">in Real Time</span>
        </h1>

        <p className="text-lg md:text-xl text-[#5B6470] dark:text-[#A1AEB1] max-w-2xl mx-auto mb-8">
          Monitor, analyze, and respond to incidents faster with AI-driven insights.
          Built for modern engineering teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth"
            className="px-8 py-3 bg-gradient-to-br from-[#FF8449] to-[#711A00] text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Get Started
            <span>→</span>
          </Link>
          <Link
            href="#features"
            className="px-8 py-3 border border-[#DCCFBE] dark:border-[#27272A] rounded-lg text-[#1C1E21] dark:text-[#EEEBE4] hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button className="px-5 py-2 border border-[#DCCFBE] dark:border-[#27272A] rounded-lg text-sm text-[#1C1E21] dark:text-[#EEEBE4] flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            <span>GitHub</span>
          </button>
          <button className="px-5 py-2 border border-[#DCCFBE] dark:border-[#27272A] rounded-lg text-sm text-[#1C1E21] dark:text-[#EEEBE4] flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            <span>Google</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div>
            <div className="text-3xl font-mono font-bold text-[#1C1E21] dark:text-[#EEEBE4]">99.97%</div>
            <div className="text-sm text-[#5B6470] dark:text-[#A1AEB1]">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-[#1C1E21] dark:text-[#EEEBE4]">&lt; 5s</div>
            <div className="text-sm text-[#5B6470] dark:text-[#A1AEB1]">MTTD</div>
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-[#1C1E21] dark:text-[#EEEBE4]">3x</div>
            <div className="text-sm text-[#5B6470] dark:text-[#A1AEB1]">Faster Resolution</div>
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-[#1C1E21] dark:text-[#EEEBE4]">100+</div>
            <div className="text-sm text-[#5B6470] dark:text-[#A1AEB1]">Integrations</div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            { title: "Real-time Monitoring", desc: "Live metrics and logs with automatic anomaly detection." },
            { title: "AI-Powered Analysis", desc: "Root cause analysis powered by GPT-4o." },
            { title: "Incident Management", desc: "Track and resolve incidents faster with AI assistance." },
            { title: "Service Topology", desc: "Visual dependency mapping with live traffic flow." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
              <h3 className="text-lg font-semibold text-[#1C1E21] dark:text-[#EEEBE4]">{feature.title}</h3>
              <p className="text-sm text-[#5B6470] dark:text-[#A1AEB1] mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10">
          <h2 className="text-3xl font-bold text-[#1C1E21] dark:text-[#EEEBE4]">Ready to get started?</h2>
          <p className="text-lg text-[#5B6470] dark:text-[#A1AEB1] mt-2">Join thousands of engineers using Vigilex.</p>
          <Link
            href="/auth"
            className="inline-block mt-6 px-8 py-3 bg-gradient-to-br from-[#FF8449] to-[#711A00] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#DCCFBE] dark:border-[#27272A] w-full flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#5B6470] dark:text-[#A1AEB1]">
          <div className="flex items-center gap-2">
            <span className="text-[#FF8449]">⚡</span>
            <span className="font-semibold text-[#1C1E21] dark:text-[#EEEBE4]">Vigilex</span>
            <span>© 2024</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#1C1E21] dark:hover:text-[#EEEBE4]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#1C1E21] dark:hover:text-[#EEEBE4]">Terms</Link>
            <Link href="/support" className="hover:text-[#1C1E21] dark:hover:text-[#EEEBE4]">Support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
