import { HiExclamation, HiRefresh } from 'react-icons/hi'

export default function UnavailableFallbackCard({ track, onPlayFallback }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: 'rgba(239,68,68,0.04)',
        border: '1px solid rgba(239,68,68,0.12)',
      }}
    >
      <div
        className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center"
        style={{ background: 'rgba(239,68,68,0.1)' }}
      >
        <HiExclamation size={18} style={{ color: '#ef4444' }} />
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-sm font-semibold truncate" style={{ color: '#6a6a7a' }}>
          {track.title}
        </span>
        <span className="text-xs" style={{ color: '#3a3a4a' }}>
          Not available to stream · Try a similar track
        </span>
      </div>

      {onPlayFallback && (
        <button
          onClick={onPlayFallback}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105 shrink-0"
          style={{
            background: 'rgba(29,185,84,0.1)',
            border: '1px solid rgba(29,185,84,0.2)',
            color: '#1DB954',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(29,185,84,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(29,185,84,0.1)'}
        >
          <HiRefresh size={14} />
          Find similar
        </button>
      )}
    </div>
  )
}