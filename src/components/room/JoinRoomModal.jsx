import { useState } from 'react'
import { useRoom } from '../../context/RoomContext.jsx'
import { useNavigate } from 'react-router-dom'
import Modal from '../ui/Modal.jsx'
import { HiArrowRight } from 'react-icons/hi'

export default function JoinRoomModal({ isOpen, onClose }) {
  const { joinRoom } = useRoom()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleJoin = async () => {
    if (code.trim().length < 4) { setError('Enter a valid room code'); return }
    setLoading(true)
    setError('')
    try {
      const room = await joinRoom(code.trim().toUpperCase())
      setLoading(false)
      onClose()
      navigate(`/room/${room.id}`)
    } catch {
      setError('Room not found. Check the code and try again.')
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join a room">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
            Room code
          </label>
          <input
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
            placeholder="e.g. AB12CD"
            maxLength={8}
            className="w-full px-4 py-3 rounded-xl text-sm font-black outline-none tracking-widest transition-all duration-200 text-center uppercase"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: error ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: '20px',
              letterSpacing: '6px',
            }}
            onFocus={e => { if (!error) { e.currentTarget.style.border = '1px solid rgba(29,185,84,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,185,84,0.08)' }}}
            onBlur={e => { if (!error) { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}}
            onKeyDown={e => e.key === 'Enter' && handleJoin()}
          />
          {error && <p className="text-xs font-medium" style={{ color: '#ef4444' }}>{error}</p>}
        </div>

        <button
          onClick={handleJoin}
          disabled={!code.trim() || loading}
          className="w-full py-3.5 rounded-xl font-black text-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          style={{
            background: code.trim() ? 'linear-gradient(135deg, #1DB954, #17d060)' : 'rgba(255,255,255,0.06)',
            boxShadow: code.trim() ? '0 4px 20px rgba(29,185,84,0.4)' : 'none',
            color: code.trim() ? '#000' : '#3a3a4a',
            border: 'none',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Joining...' : <><HiArrowRight size={16} /> Join room</>}
        </button>

        <p className="text-xs text-center" style={{ color: '#3a3a4a' }}>
          Get the code from your friend who created the room
        </p>
      </div>
    </Modal>
  )
}