'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user && window.location.pathname !== '/login') {
      router.push('/login')
    }
  }, [])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  )
}
