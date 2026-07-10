import { useState } from 'react'
import { usePlayer } from '../../context/PlayerContext.jsx'
import { HiPlay, HiPause, HiHeart, HiOutlineHeart, HiPlus } from 'react-icons/hi'
import { formatTime } from '../../utils/formatTime.js'

export default function RecommendationCard({ track, index, queue = [] }) {
  const { currentTrack, isPlaying, play, pause } = usePlayer()
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  const isActive = currentTrack?.id === track.id
  const isCurrentlyPlaying = isActive && isPlaying

  const handlePlay = () => {
    if (isActive) isPlaying ? pause() : play()
    else play(track, queue, index)
  }

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 group"
      style={{
        background: isActive
          ? 'rgba(29,185,84,0.08)'
          : hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: isActive
          ? '1px solid rgba(29,185,84,0.2)'
          : hovered ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.03)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handlePlay}
    >
      <div
        className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{
          background: track.gradient,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: isActive ? '0 0 20px rgba(29,185,84,0.3)' : 'none',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: hovered || isActive ? 1 : 0, background: 'rgba(0,0,0,0.4)' }}
        >
          {isCurrentlyPlaying
            ? <HiPause size={18} color="#fff" />
            : <HiPlay size={18} color="#fff" style={{ marginLeft: '2px' }} />
          }
        </div>
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span
          className="text-sm font-bold truncate"
          style={{ color: isActive ? '#1DB954' : '#fff' }}
        >
          {track.title}
        </span>
        <span className="text-xs truncate" style={{ color: '#6a6a7a' }}>
          {track.artist}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l) }}
          className="cursor-pointer transition-all duration-200 hover:scale-125"
          style={{
            background: 'none', border: 'none', padding: 0,
            color: liked ? '#1DB954' : '#3a3a4a',
            opacity: hovered || liked ? 1 : 0,
            filter: liked ? 'drop-shadow(0 0 6px #1DB95480)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {liked ? <HiHeart size={16} /> : <HiOutlineHeart size={16} />}
        </button>

        <span className="text-xs tabular-nums" style={{ color: '#4a4a5a' }}>
          {formatTime(track.duration)}
        </span>

        <button
          onClick={e => { e.stopPropagation() }}
          className="cursor-pointer transition-all duration-200 hover:scale-110"
          style={{
            background: 'none', border: 'none', padding: 0,
            color: '#4a4a5a',
            opacity: hovered ? 1 : 0,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#1DB954'}
          onMouseLeave={e => e.currentTarget.style.color = '#4a4a5a'}
        >
          <HiPlus size={16} />
        </button>
      </div>
    </div>
  )
}