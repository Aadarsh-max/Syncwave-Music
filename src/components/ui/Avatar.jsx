const gradients = [
  'linear-gradient(135deg, #1DB954, #0ea5e9)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
  'linear-gradient(135deg, #f97316, #ef4444)',
  'linear-gradient(135deg, #0ea5e9, #6366f1)',
  'linear-gradient(135deg, #eab308, #f97316)',
]

export default function Avatar({ src, name = '', size = 36, onClick }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const gradientIndex = name.charCodeAt(0) % gradients.length
  const gradient = gradients[gradientIndex] || gradients[0]

  const dim = `${size}px`
  const fontSize = `${Math.floor(size * 0.35)}px`

  return (
    <div
      onClick={onClick}
      className="rounded-full flex items-center justify-center font-black select-none shrink-0 overflow-hidden"
      style={{
        width: dim,
        height: dim,
        fontSize,
        cursor: onClick ? 'pointer' : 'default',
        background: src ? 'transparent' : gradient,
        boxShadow: `0 0 16px rgba(29,185,84,0.3)`,
        transition: 'all 0.2s',
        color: '#000',
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.transform = 'scale(1.1)' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.transform = 'scale(1)' }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials || 'U'
      )}
    </div>
  )
}