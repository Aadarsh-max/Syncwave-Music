const variants = {
  primary: {
    background: 'linear-gradient(135deg, #1DB954, #17d060)',
    boxShadow: '0 4px 24px rgba(29,185,84,0.4)',
    color: '#000',
    border: 'none',
  },
  secondary: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    border: '1px solid transparent',
    color: '#6a6a7a',
    boxShadow: 'none',
  },
  danger: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    boxShadow: '0 4px 24px rgba(239,68,68,0.4)',
    color: '#fff',
    border: 'none',
  },
  purple: {
    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    boxShadow: '0 4px 24px rgba(139,92,246,0.4)',
    color: '#fff',
    border: 'none',
  },
}

const sizes = {
  sm: { padding: '6px 14px', fontSize: '12px', borderRadius: '10px' },
  md: { padding: '10px 20px', fontSize: '14px', borderRadius: '12px' },
  lg: { padding: '14px 28px', fontSize: '15px', borderRadius: '14px' },
  icon: { padding: '8px', borderRadius: '10px', lineHeight: 0 },
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  style = {},
}) {
  const v = variants[variant] || variants.secondary
  const s = sizes[size] || sizes.md

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-bold cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        ...v,
        ...s,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onMouseEnter={e => {
        if (disabled) return
        if (variant === 'ghost') e.currentTarget.style.color = '#fff'
        if (variant === 'secondary') e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
      }}
      onMouseLeave={e => {
        if (disabled) return
        if (variant === 'ghost') e.currentTarget.style.color = '#6a6a7a'
        if (variant === 'secondary') e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
      }}
    >
      {children}
    </button>
  )
}