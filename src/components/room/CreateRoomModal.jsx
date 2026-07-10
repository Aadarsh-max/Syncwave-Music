import { useState } from 'react'
import { useRoom } from '../../context/RoomContext.jsx'
import { useNavigate } from 'react-router-dom'
import Modal from '../ui/Modal.jsx'
import { HiLockClosed, HiGlobe } from 'react-icons/hi'

export default function CreateRoomModal({ isOpen, onClose }) {
  const { createRoom } = useRoom()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) return
    setLoading(true)
    const room = await createRoom(name.trim(), isPrivate)
    setLoading(false)
    onClose()
    navigate(`/room/${room.id}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a room">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
            Room name
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Late Night Vibes"
            maxLength={40}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
            }}
            onFocus={e => { e.currentTarget.style.border = '1px solid rgba(29,185,84,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,185,84,0.08)' }}
            onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
            Visibility
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: false, icon: HiGlobe, label: 'Public', desc: 'Anyone can join' },
              { value: true, icon: HiLockClosed, label: 'Private', desc: 'Invite only' },
            ].map(({ value, icon: Icon, label, desc }) => (
              <button
                key={label}
                onClick={() => setIsPrivate(value)}
                className="flex flex-col items-start gap-1 p-3 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: isPrivate === value ? 'rgba(29,185,84,0.1)' : 'rgba(255,255,255,0.04)',
                  border: isPrivate === value ? '1px solid rgba(29,185,84,0.3)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <Icon size={16} style={{ color: isPrivate === value ? '#1DB954' : '#6a6a7a' }} />
                <span className="text-sm font-bold" style={{ color: isPrivate === value ? '#fff' : '#6a6a7a' }}>
                  {label}
                </span>
                <span className="text-xs" style={{ color: '#4a4a5a' }}>{desc}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={!name.trim() || loading}
          className="w-full py-3.5 rounded-xl font-black text-sm text-black cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: name.trim() ? 'linear-gradient(135deg, #1DB954, #17d060)' : 'rgba(255,255,255,0.06)',
            boxShadow: name.trim() ? '0 4px 20px rgba(29,185,84,0.4)' : 'none',
            color: name.trim() ? '#000' : '#3a3a4a',
            border: 'none',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Creating...' : 'Create room'}
        </button>
      </div>
    </Modal>
  )
}