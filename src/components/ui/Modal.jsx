import { useEffect } from 'react'
import { HiX } from 'react-icons/hi'

export default function Modal({ isOpen, onClose, title, children, width = '480px' }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative flex flex-col"
        style={{
          width,
          maxWidth: '95vw',
          maxHeight: '85vh',
          background: 'linear-gradient(135deg, #0e0e1a, #0a0a14)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(29,185,84,0.06)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2
            className="font-black text-lg"
            style={{
              background: 'linear-gradient(135deg, #fff, #9ca3af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.3px',
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#6a6a7a' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >
            <HiX size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  )
}