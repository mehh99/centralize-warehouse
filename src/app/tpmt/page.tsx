'use client'
import { useEffect, useState } from 'react'

type Item = {
  id: number
  name: string
  belum: number
  sudah: number
  tanggal: string
}

export default function TpmtPage() {
  const [items, setItems] = useState<Item[]>([])
  const [name, setName] = useState('')
  const [belum, setBelum] = useState<number>(0)
  const [sudah, setSudah] = useState<number>(0)
  const [editId, setEditId] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('tpmt_items')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('tpmt_items', JSON.stringify(items))
  }, [items])

  const tambahAtauEdit = () => {
    if (!name) return
    const sisa = belum - sudah
    const tanggal = new Date().toLocaleDateString()

    if (editId !== null) {
      setItems(prev =>
        prev.map(item =>
          item.id === editId
            ? { ...item, name, belum, sudah, tanggal }
            : item
        )
      )
      setEditId(null)
    } else {
      const newItem: Item = {
        id: Date.now(),
        name,
        belum,
        sudah,
        tanggal,
      }
      setItems(prev => [...prev, newItem])
    }

    setName('')
    setBelum(0)
    setSudah(0)
  }

  const hapus = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const edit = (item: Item) => {
    setEditId(item.id)
    setName(item.name)
    setBelum(item.belum)
    setSudah(item.sudah)
  }

  const totalBelum = items.reduce((sum, item) => sum + item.belum, 0)
  const totalSudah = items.reduce((sum, item) => sum + item.sudah, 0)
  const totalSisa = items.reduce((sum, item) => sum + (item.belum - item.sudah), 0)

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Halaman TP & MT</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nama Item"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 10, padding: 5, width: 140 }}
        />
        <input
          type="number"
          placeholder="Belum TP/MT"
          value={belum}
          onChange={e => setBelum(parseInt(e.target.value))}
          style={{ marginRight: 10, padding: 5, width: 110 }}
        />
        <input
          type="number"
          placeholder="Sudah TP/MT"
          value={sudah}
          onChange={e => setSudah(parseInt(e.target.value))}
          style={{ marginRight: 10, padding: 5, width: 110 }}
        />
        <button onClick={tambahAtauEdit} style={{ padding: '6px 12px' }}>
          {editId !== null ? 'Update' : 'Tambah'}
        </button>
      </div>

      {/* Table Items */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr>
            <th style={th}>No</th>
            <th style={th}>Item</th>
            <th style={th}>Belum</th>
            <th style={th}>Sudah</th>
            <th style={th}>Sisa</th>
            <th style={th}>Tanggal</th>
            <th style={th}>Status</th>
            <th style={th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const sisa = item.belum - item.sudah
            const status = sisa === 0 ? 'Done' : 'Progress'
            return (
              <tr key={item.id}>
                <td style={td}>{i + 1}</td>
                <td style={td}>{item.name}</td>
                <td style={td}>{item.belum}</td>
                <td style={td}>{item.sudah}</td>
                <td style={td}>{sisa}</td>
                <td style={td}>{item.tanggal}</td>
                <td style={td}>{status}</td>
                <td style={td}>
                  <button onClick={() => edit(item)} style={btn}>Edit</button>{' '}
                  <button onClick={() => hapus(item.id)} style={btnHapus}>Hapus</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Rekap Total */}
      <h3 style={{ marginTop: 40 }}>Rekap Total</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={th}>Total TP</th>
            <th style={th}>Total MT</th>
            <th style={th}>Sisa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>{totalBelum}</td>
            <td style={td}>{totalSudah}</td>
            <td style={td}>{totalSisa}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const th: React.CSSProperties = {
  padding: 8,
  background: '#eee',
  border: '1px solid #ccc',
  textAlign: 'center',
}

const td: React.CSSProperties = {
  padding: 8,
  border: '1px solid #ddd',
  textAlign: 'center',
}

const btn: React.CSSProperties = {
  padding: '4px 8px',
  fontSize: 12,
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
}

const btnHapus: React.CSSProperties = {
  ...btn,
  backgroundColor: '#f44336',
}
