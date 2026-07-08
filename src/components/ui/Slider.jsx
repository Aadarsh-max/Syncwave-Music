import { useState, useRef } from 'react'

export default function Slider({
  value = 0,
  min = 0,
  max = 100,
  onChange,
  gradient = 'linear-gradient(90deg, #1DB954, #0ea5e9)',
  glow = 'rgba(29,185,84,0.5)',
  height = 4,
}) {
  const [hovering, setHovering] = useState(false)
  const trackRef = useRef(null)

  const pct = ((value - min) / (max - min)) * 100

  const handleClick = (e) => {
    if (!trackRef.current || !onChange) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPct = Math.max(0, Math.min(1, x / rect.width))
    onChange(min + newPct * (max - min))
  }

  return (
    <div
      ref={trackRef}
      className="relative cursor-pointer group flex items-center"
      style={{ height: `${Math.max(height + 8, 16)}px` }}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="w-full rounded-full relative overflow-hidden"
        style={{ height: `${height}px`, background: 'rgba(255,255,255,0.1)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${pct}%`,
            background: gradient,
            boxShadow: hovering ? `0 0 10px ${glow}` : 'none',
          }}
        />
      </div>
      {hovering && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '12px',
            height: '12px',
            background: '#fff',
            left: `calc(${pct}% - 6px)`,
            boxShadow: `0 0 8px ${glow}, 0 0 16px ${glow}`,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      )}
    </div>
  )
}