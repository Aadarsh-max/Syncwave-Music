import { usePlayer } from '../../context/PlayerContext.jsx'
import { HiPlay, HiClock } from 'react-icons/hi'
import { formatTime } from '../../utils/formatTime.js'

const mockHistory = [
  { id: 'h1', title: 'Blinding Lights', artist: 'The Weeknd', duration: 200, playedAt: '2 mins ago', gradient: 'linear-gradient(135deg, #1DB95440, #0ea5e920)' },
  { id: 'h2', title: 'As It Was', artist: 'Harry Styles', duration: 167, playedAt: '18 mins ago', gradient: 'linear-gradient(135deg, #8b5cf640, #ec489920)' },
  { id: 'h3', title: 'Levitating', artist: 'Dua Lipa', duration: 203, playedAt: '1 hour ago', gradient: 'linear-gradient(135deg, #f9731640, #ef444420)' },
  { id: 'h4', title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: 178, playedAt: '3 hours ago', gradient: 'linear-gradient(135deg, #0ea5e940, #6366f120)' },
  { id: 'h5', title: 'Montero', artist: 'Lil Nas X', duration: 137, playedAt: 'Yesterday', gradient: 'linear-gradient(135deg, #eab30840, #f9731620)' },
]

export default function HistoryList() {
  const { play, currentTrack, isPlaying, pause } = usePlayer()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2
          className="text-xl font-black"
          style={{
            background: 'linear-gradient(135deg, #fff, #9ca3af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          Recently played
        </h2>
        <div className="flex items-center gap-1.5" style={{ color: '#4a4a5a' }}>
          <HiClock size={14} />
          <span className="text-xs font-medium">History</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {mockHistory.map((track, i) => {
          const isActive = currentTrack?.id === track.id
          return (
            <div
              key={track.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group"
              style={{
                background: isActive ? 'rgba(29,185,84,0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(29,185,84,0.15)' : '1px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              onClick={() => {
                if (isActive && isPlaying) pause()
                else play(track, mockHistory, i)
              }}
            >
              <div
                className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center relative overflow-hidden"
                style={{ background: track.gradient, border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <HiPlay
                  size={14}
                  color="rgba(255,255,255,0.6)"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ marginLeft: '1px' }}
                />
              </div>

              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span
                  className="text-sm font-semibold truncate"
                  style={{ color: isActive ? '#1DB954' : '#fff' }}
                >
                  {track.title}
                </span>
                <span className="text-xs truncate" style={{ color: '#6a6a7a' }}>
                  {track.artist}
                </span>
              </div>

              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <span className="text-xs tabular-nums" style={{ color: '#4a4a5a' }}>
                  {formatTime(track.duration)}
                </span>
                <span className="text-[10px]" style={{ color: '#3a3a4a' }}>
                  {track.playedAt}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}