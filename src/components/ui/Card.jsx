const variants = {
  default: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  elevated: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  glow: {
    background: 'linear-gradient(135deg, rgba(29,185,84,0.08), rgba(14,165,233,0.04))',
    border: '1px solid rgba(29,185,84,0.2)',
    boxShadow: '0 0 40px rgba(29,185,84,0.08)',
  },
  purple: {
    background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.04))',
    border: '1px solid rgba(139,92,246,0.2)',
    boxShadow: '0 0 40px rgba(139,92,246,0.08)',
  },
}

export default function Card({
  children,
  variant = 'default',
  onClick,
  hoverable = false,
  padding = '16px',
  borderRadius = '16px',
  className = '',
  style = {},
}) {
  const v = variants[variant] || variants.default

  return (
    <div
      onClick={onClick}
      className={`transition-all duration-200 ${hoverable ? 'cursor-pointer' : ''} ${className}`}
      style={{
        ...v,
        padding,
        borderRadius,
        ...style,
      }}
      onMouseEnter={e => {
        if (!hoverable) return
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={e => {
        if (!hoverable) return
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = v.boxShadow || 'none'
      }}
    >
      {children}
    </div>
  )
}