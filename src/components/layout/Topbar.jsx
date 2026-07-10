import { useNavigate } from 'react-router-dom'
import { HiChevronLeft, HiChevronRight, HiBell } from 'react-icons/hi'
import { TbWaveSine } from 'react-icons/tb'
import { useAuth } from '../../context/AuthContext.jsx'
import Avatar from '../ui/Avatar.jsx'

export default function Topbar() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 h-16 shrink-0 z-30"
      style={{
        background: 'rgba(8,8,16,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 md:hidden"
          style={{ marginRight: '8px' }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1DB954, #0ea5e9)', boxShadow: '0 0 16px #1DB95460' }}
          >
            <TbWaveSine size={16} color="#000" />
          </div>
          <span
            className="font-black text-base"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #1DB954 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            SyncWave
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {[
            { icon: HiChevronLeft, action: () => navigate(-1) },
            { icon: HiChevronRight, action: () => navigate(1) },
          ].map(({ icon: Icon, action }, i) => (
            <button
              key={i}
              onClick={action}
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#6a6a7a' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#6a6a7a' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
        >
          <HiBell size={16} />
        </button>
        <div onClick={() => navigate('/profile')} className="cursor-pointer">
          <Avatar name={user?.name || 'U'} size={32} />
        </div>
      </div>
    </header>
  )
}