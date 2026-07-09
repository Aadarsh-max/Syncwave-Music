import { HiFire, HiMusicNote, HiLightningBolt, HiMoon, HiHeart, HiGlobe } from 'react-icons/hi'

const mockGenres = [
  { name: 'Pop', percent: 38, gradient: 'linear-gradient(135deg, #1DB954, #0ea5e9)', icon: HiMusicNote },
  { name: 'Hip-Hop', percent: 27, gradient: 'linear-gradient(135deg, #f97316, #ef4444)', icon: HiFire },
  { name: 'Electronic', percent: 18, gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)', icon: HiLightningBolt },
  { name: 'R&B', percent: 11, gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)', icon: HiHeart },
  { name: 'Lo-Fi', percent: 6, gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)', icon: HiMoon },
]

export default function TopGenres() {
  return (
    <div className="flex flex-col gap-4">
      <h2
        className="text-xl font-black"
        style={{
          background: 'linear-gradient(135deg, #fff, #9ca3af)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
        }}
      >
        Top genres
      </h2>

      <div className="flex flex-col gap-2">
        {mockGenres.map((g) => {
          const Icon = g.icon
          return (
            <div
              key={g.name}
              className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: g.gradient, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
              >
                <Icon size={18} color="#fff" />
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{g.name}</span>
                  <span className="text-xs font-bold" style={{ color: '#4a4a5a' }}>{g.percent}%</span>
                </div>
                <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${g.percent}%`, background: g.gradient }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}