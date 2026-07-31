"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('auth-storage')
    if (isAuth) {
      router.push('/dashboard')
    } else {
      router.push('/landing')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)]">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8449] border-t-transparent"></div>
    </div>
  )
}
