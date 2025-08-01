'use client'
import { useState, useEffect } from 'react'
import { getUser } from '@/utils/auth'
import { useRouter } from 'next/navigation'

interface Item {
  name: string
  total: string
  collected: string
  sisa: number
}

export default function Collect() {
  const [items, setItems] = useState<Item[]>([])
  const [name, setName] = useState('')
  const [total, setTotal] = useState('')
  const [collected, setCollected] = useState('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = getUser()
    if (!user || user.role !== 'collect') router.push('/login')
    const saved = localStorage.getItem('collect_items')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  const resetForm = () => {
    setName('')
    setTotal('')
    setCollected('')
    setEditIndex(null)
  }

  const handleSubmit = () => {
    const sisa = parseInt(total) - parseInt(collected)
    const newItem = { name, total, collected, sisa }

    let updatedItems: Item[]
    if (editIndex !== null) {
      updatedItems = [...items]
      updatedItems[editIndex] = newItem
    } else {
      updatedItems = [...items, newItem]
    }

    localStorage.setItem('collect_items', JSON.stringify(updatedItems))
    setItems(updatedItems)
    resetForm()
  }

  const handleEdit = (index: number) => {
    const item = items[index]
    setName(item.name)
    setTotal(item.total)
    setCollected(item.collected)
    setEditIndex(index)
  }

  const handleDelete = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index)
    localStorage.setItem('collect_items', JSON.stringify(updatedItems))
    setItems(updatedItems)
  }

  const getStatus = (sisa: number) => {
    if (sisa <= 0) return '✅ Terkumpul'
    if (sisa < parseInt(total)) return '⚠️ Sebagian'
    return '❌ Belum'
  }

  return (
    <div style={{
      padding: 20,
      maxWidth: 480,
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>📦 Collect Items</h2>

      <input
        placeholder="Nama Item"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' }}
      />
      <input
        type="number"
        placeholder="Total"
        value={total}
        onChange={e => setTotal(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' }}
      />
      <input
        type="number"
        placeholder="Terkumpul"
        value={collected}
        onChange={e => setCollected(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 5, border: '1px solid #ccc' }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: 12,
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          fontWeight: 'bold',
          marginBottom: 20
        }}
      >
        {editIndex !== null ? 'Update' : 'Tambah'}
      </button>

      <div>
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#f9f9f9',
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>
              Total: {item.total} | Collected: {item.collected} | Sisa: {item.sisa}
            </div>
            <div style={{ fontSize: 14, marginTop: 4 }}>
              Status: <strong>{getStatus(item.sisa)}</strong>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
              <button
                onClick={() => handleEdit(idx)}
                style={{ flex: 1, padding: 8, backgroundColor: '#ffc107', border: 'none', borderRadius: 5 }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(idx)}
                style={{ flex: 1, padding: 8, backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 5 }}
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
