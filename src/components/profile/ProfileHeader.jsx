import { useAuth } from '../../context/AuthContext.jsx'
import { HiPencil, HiLogout } from 'react-icons/hi'
import Avatar from '../ui/Avatar.jsx'

export default function ProfileHeader() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none rounded-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(29,185,84,0.12), rgba(14,165,233,0.06), rgba(139,92,246,0.08))' }}
      />

      <div className="relative z-10 flex items-end gap-6 p-6 pb-0">
        <div className="relative">
          <Avatar name={user.name} size={100} />
          {!user.isGuest && (
            <button
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #1DB954, #0ea5e9)',
                border: '2px solid #06060f',
                boxShadow: '0 0 16px rgba(29,185,84,0.4)',
              }}
            >
              <HiPencil size={14} color="#000" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1 pb-4 flex-1">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
            {user.isGuest ? 'Guest' : 'Profile'}
          </span>
          <h1
            className="font-black text-4xl"
            style={{
              background: 'linear-gradient(135deg, #fff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
            }}
          >
            {user.name}
          </h1>
          {!user.isGuest && (
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm" style={{ color: '#6a6a7a' }}>
                <span className="font-bold text-white">{user.followers || 0}</span> followers
              </span>
              <span className="text-sm" style={{ color: '#6a6a7a' }}>
                <span className="font-bold text-white">{user.following || 0}</span> following
              </span>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-105 mb-4"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#ef4444',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
        >
          <HiLogout size={16} />
          Sign out
        </button>
      </div>
    </div>
  )
}