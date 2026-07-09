import { useNavigate } from 'react-router-dom'
import { HiChevronLeft, HiChevronRight, HiBell } from 'react-icons/hi'
import { useAuth } from '../../context/AuthContext.jsx'
import Avatar from '../ui/Avatar.jsx'

export default function Topbar() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <header
      className="flex items-center justify-between px-6 h-16 shrink-0 z-30"
      style={{
        background: 'rgba(8,8,16,0.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="flex items-center gap-2">
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