'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    const user = login(username, password)
    if (user) {
      router.push(`/${user.role}`)
    } else {
      setError('Username atau password salah')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 20, background: 'white', borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', marginBottom: 10, padding: 10 }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 10, padding: 10 }} />
      <button onClick={handleLogin} style={{ width: '100%', padding: 10, background: '#0070f3', color: 'white', border: 'none', borderRadius: 5 }}>Login</button>
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</p>}
    </div>
  )
}
