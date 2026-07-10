import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiHome, HiSearch, HiCollection, HiPlus, HiUserGroup, HiSparkles } from 'react-icons/hi'
import { TbWaveSine } from 'react-icons/tb'
import CreateRoomModal from '../room/CreateRoomModal.jsx'
import JoinRoomModal from '../room/JoinRoomModal.jsx'

const nav = [
  { to: '/', icon: HiHome, label: 'Home', exact: true },
  { to: '/search', icon: HiSearch, label: 'Search' },
  { to: '/library', icon: HiCollection, label: 'Your Library' },
]

export default function Sidebar() {
  const [createOpen, setCreateOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)

  return (
    <>
      <aside
        className="hidden md:flex fixed top-0 left-0 h-screen w-60 flex-col z-40"
        style={{
          background: 'linear-gradient(180deg, #080810 0%, #0a0a14 60%, #06060f 100%)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="flex items-center gap-3 px-5 h-16 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1DB954, #0ea5e9)',
              boxShadow: '0 0 20px #1DB95470, 0 0 40px #0ea5e920',
            }}
          >
            <TbWaveSine size={18} color="#000" />
          </div>
          <span
            className="font-black text-lg"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #1DB954 50%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            SyncWave
          </span>
        </div>

        <nav className="flex flex-col gap-0.5 p-3 mt-1">
          {nav.map(({ to, icon: Icon, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className="no-underline"
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '12px',
                fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.2s',
                color: isActive ? '#fff' : '#6a6a7a',
                background: isActive ? 'linear-gradient(135deg, rgba(29,185,84,0.15), rgba(14,165,233,0.08))' : 'transparent',
                border: isActive ? '1px solid rgba(29,185,84,0.25)' : '1px solid transparent',
                boxShadow: isActive ? '0 0 20px rgba(29,185,84,0.08)' : 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} style={{ color: isActive ? '#1DB954' : '#6a6a7a', filter: isActive ? 'drop-shadow(0 0 6px #1DB95480)' : 'none', flexShrink: 0 }} />
                  <span>{label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#1DB954', boxShadow: '0 0 8px #1DB954' }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 mt-3">
          <p className="text-[10px] font-black uppercase px-3 mb-2" style={{ color: '#ffffff30', letterSpacing: '2px' }}>
            Rooms
          </p>
          <div className="flex flex-col gap-0.5">
            {[
              { label: 'Create Room', icon: HiUserGroup, action: () => setCreateOpen(true) },
              { label: 'Join Room', icon: HiSparkles, action: () => setJoinOpen(true) },
            ].map(({ label, icon: Icon, action }) => (
              <button
                key={label}
                onClick={action}
                className="flex items-center gap-3 w-full cursor-pointer transition-all duration-200 rounded-xl"
                style={{ padding: '10px 12px', fontSize: '14px', fontWeight: 600, color: '#6a6a7a', background: 'transparent', border: '1px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {label}
              </button>
            ))}
            <NavLink
              to="/grow"
              className="no-underline"
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '12px',
                fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.2s',
                color: isActive ? '#fff' : '#6a6a7a',
                background: isActive ? 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.08))' : 'transparent',
                border: isActive ? '1px solid rgba(139,92,246,0.25)' : '1px solid transparent',
              })}
            >
              {({ isActive }) => (
                <>
                  <HiSparkles size={20} style={{ color: isActive ? '#8b5cf6' : '#6a6a7a', flexShrink: 0 }} />
                  <span>Grow (AI)</span>
                </>
              )}
            </NavLink>
          </div>
        </div>

        <div className="px-3 mt-1">
          <button
            className="flex items-center gap-3 w-full cursor-pointer transition-all duration-200 rounded-xl"
            style={{ padding: '10px 12px', fontSize: '14px', fontWeight: 600, color: '#6a6a7a', background: 'transparent', border: '1px solid transparent' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'transparent' }}
          >
            <HiPlus size={20} style={{ flexShrink: 0 }} />
            New Playlist
          </button>
        </div>

        <div className="mt-auto p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <NavLink
            to="/profile"
            className="no-underline"
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '12px',
              fontSize: '14px', fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.2s',
              color: isActive ? '#fff' : '#6a6a7a',
              background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
              border: '1px solid transparent',
            })}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-black text-xs font-black shrink-0"
              style={{ background: 'linear-gradient(135deg, #1DB954, #0ea5e9)', boxShadow: '0 0 14px rgba(29,185,84,0.5)' }}
            >
              U
            </div>
            Profile
          </NavLink>
        </div>
      </aside>

      <CreateRoomModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
      <JoinRoomModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
    </>
  )
}