import { useNavigate } from 'react-router-dom'
import { HiChevronLeft, HiChevronRight, HiBell } from 'react-icons/hi'

export default function Topbar() {
  const navigate = useNavigate()

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
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#6a6a7a'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
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
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-black text-xs font-black cursor-pointer select-none transition-all duration-200 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #1DB954, #0ea5e9)',
            boxShadow: '0 0 20px rgba(29,185,84,0.5), 0 0 40px rgba(14,165,233,0.2)',
          }}
        >
          U
        </div>
      </div>
    </header>
  )
}