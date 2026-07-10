import { HiLightningBolt, HiMoon, HiStar, HiHeart, HiFire, HiMusicNote, HiSparkles } from 'react-icons/hi'
import { MdNightlight, MdSentimentVerySatisfied } from 'react-icons/md'

const moodConfig = {
  energetic: { icon: HiLightningBolt, label: 'Energetic', gradient: 'linear-gradient(135deg, #f97316, #ef4444)', glow: 'rgba(249,115,22,0.4)' },
  chill: { icon: HiMoon, label: 'Chill', gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)', glow: 'rgba(14,165,233,0.4)' },
  focus: { icon: HiStar, label: 'Focus', gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)', glow: 'rgba(139,92,246,0.4)' },
  sad: { icon: MdNightlight, label: 'Sad', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)', glow: 'rgba(99,102,241,0.4)' },
  happy: { icon: MdSentimentVerySatisfied, label: 'Happy', gradient: 'linear-gradient(135deg, #eab308, #f97316)', glow: 'rgba(234,179,8,0.4)' },
  hype: { icon: HiFire, label: 'Hype', gradient: 'linear-gradient(135deg, #ef4444, #ec4899)', glow: 'rgba(239,68,68,0.4)' },
  romantic: { icon: HiHeart, label: 'Romantic', gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)', glow: 'rgba(236,72,153,0.4)' },
  'late-night': { icon: HiSparkles, label: 'Late Night', gradient: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', glow: 'rgba(139,92,246,0.3)' },
}

export default function MoodPicker({ selectedMood, onSelect, loading }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2
          className="text-2xl font-black"
          style={{
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          How are you feeling?
        </h2>
        <p className="text-sm font-medium" style={{ color: '#4a4a5a' }}>
          Pick a mood and AI will curate the perfect playlist
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Object.entries(moodConfig).map(([key, config]) => {
          const Icon = config.icon
          const isSelected = selectedMood === key
          return (
            <button
              key={key}
              onClick={() => !loading && onSelect(key)}
              disabled={loading}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
              style={{
                background: isSelected
                  ? config.gradient
                  : 'rgba(255,255,255,0.04)',
                border: isSelected
                  ? '1px solid rgba(255,255,255,0.2)'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isSelected ? `0 0 24px ${config.glow}, 0 8px 32px rgba(0,0,0,0.4)` : 'none',
                opacity: loading && !isSelected ? 0.5 : 1,
              }}
              onMouseEnter={e => {
                if (!isSelected && !loading) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'
                }
              }}
            >
              <Icon
                size={24}
                style={{
                  color: isSelected ? '#fff' : '#6a6a7a',
                  filter: isSelected ? `drop-shadow(0 0 8px rgba(255,255,255,0.6))` : 'none',
                }}
              />
              <span
                className="text-xs font-bold"
                style={{ color: isSelected ? '#fff' : '#6a6a7a' }}
              >
                {config.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}