import { useRoom } from '../../context/RoomContext.jsx'
import { useNavigate } from 'react-router-dom'
import { HiUsers, HiLockClosed, HiLogout, HiShare, HiClipboardCopy } from 'react-icons/hi'
import { useState } from 'react'

export default function RoomHeader() {
  const { room, members, isHost, leaveRoom } = useRoom()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  if (!room) return null

  const handleLeave = () => {
    leaveRoom()
    navigate('/')
  }

  const copyCode = () => {
    navigator.clipboard.writeText(room.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="relative flex items-center justify-between px-6 py-4"
      style={{
        background: 'linear-gradient(135deg, rgba(29,185,84,0.08), rgba(14,165,233,0.04))',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(29,185,84,0.06), transparent 60%)' }}
      />

      <div className="flex flex-col gap-1 relative z-10">
        <div className="flex items-center gap-2">
          {room.isPrivate && <HiLockClosed size={14} style={{ color: '#6a6a7a' }} />}
          <h1
            className="text-2xl font-black"
            style={{
              background: 'linear-gradient(135deg, #fff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            {room.name}
          </h1>
          {isHost && (
            <span
              className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #1DB954, #0ea5e9)',
                color: '#000',
                letterSpacing: '1px',
              }}
            >
              Host
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <HiUsers size={14} style={{ color: '#4a4a5a' }} />
            <span className="text-xs font-medium" style={{ color: '#4a4a5a' }}>
              {members.length} listening
            </span>
          </div>
          <div className="w-1 h-1 rounded-full" style={{ background: '#2a2a3a' }} />
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#1DB954', boxShadow: '0 0 6px #1DB954' }}
            />
            <span className="text-xs font-medium" style={{ color: '#1DB954' }}>Live</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 relative z-10">
        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105"
          style={{
            background: copied ? 'rgba(29,185,84,0.15)' : 'rgba(255,255,255,0.06)',
            border: copied ? '1px solid rgba(29,185,84,0.3)' : '1px solid rgba(255,255,255,0.1)',
            color: copied ? '#1DB954' : '#6a6a7a',
          }}
        >
          {copied ? <HiClipboardCopy size={14} /> : <HiShare size={14} />}
          {copied ? 'Copied!' : room.code}
        </button>

        <button
          onClick={handleLeave}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105"
          style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.15)',
            color: '#ef4444',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
        >
          <HiLogout size={14} />
          Leave
        </button>
      </div>
    </div>
  )
}