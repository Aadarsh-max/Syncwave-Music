import { useState, useEffect } from 'react'
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiX } from 'react-icons/hi'

const config = {
  success: {
    icon: HiCheckCircle,
    gradient: 'linear-gradient(135deg, rgba(29,185,84,0.15), rgba(14,165,233,0.08))',
    border: '1px solid rgba(29,185,84,0.3)',
    iconColor: '#1DB954',
    glow: 'rgba(29,185,84,0.2)',
  },
  error: {
    icon: HiXCircle,
    gradient: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(220,38,38,0.08))',
    border: '1px solid rgba(239,68,68,0.3)',
    iconColor: '#ef4444',
    glow: 'rgba(239,68,68,0.2)',
  },
  info: {
    icon: HiInformationCircle,
    gradient: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.08))',
    border: '1px solid rgba(14,165,233,0.3)',
    iconColor: '#0ea5e9',
    glow: 'rgba(14,165,233,0.2)',
  },
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [visible, setVisible] = useState(true)
  const c = config[type] || config.info
  const Icon = c.icon

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl pointer-events-auto transition-all duration-300"
      style={{
        background: c.gradient,
        border: c.border,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${c.glow}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        minWidth: '260px',
        maxWidth: '360px',
      }}
    >
      <Icon size={20} style={{ color: c.iconColor, flexShrink: 0 }} />
      <span className="text-white text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300) }}
        className="cursor-pointer transition-colors"
        style={{ color: '#4a4a5a', background: 'none', border: 'none', padding: 0 }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#4a4a5a'}
      >
        <HiX size={16} />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      className="fixed bottom-[110px] right-6 flex flex-col gap-2 z-[100] pointer-events-none"
    >
      {toasts.map(t => (
        <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  )
}