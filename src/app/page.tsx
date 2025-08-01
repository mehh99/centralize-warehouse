'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const user = localStorage.getItem('user')
    if (user) {
      const parsed = JSON.parse(user)
      router.push(`/${parsed.role}`)
    } else {
      router.push('/login')
    }
  }, [])

  // Supaya tidak error saat server render
  if (!mounted) return null

  return null
}
