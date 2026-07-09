import { useState } from 'react'
import { usePlayer } from '../../context/PlayerContext.jsx'
import { HiPlay, HiPause, HiHeart, HiOutlineHeart, HiDotsHorizontal } from 'react-icons/hi'
import { formatTime } from '../../utils/formatTime.js'

export default function TrackCard({ track, index, queue = [] }) {
  const { currentTrack, isPlaying, play, pause } = usePlayer()
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  const isActive = currentTrack?.id === track.id
  const isCurrentlyPlaying = isActive && isPlaying

  const handlePlay = () => {
    if (isActive) {
      if (isPlaying) pause()
      else play()
    } else {
      play(track, queue, index)
    }
  }

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 group cursor-pointer"
      style={{
        background: isActive ? 'rgba(29,185,84,0.08)' : hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: isActive ? '1px solid rgba(29,185,84,0.15)' : '1px solid transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handlePlay}
    >
      <div className="w-8 flex items-center justify-center shrink-0">
        {hovered || isActive ? (
          <button
            onClick={e => { e.stopPropagation(); handlePlay() }}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ background: 'none', border: 'none', padding: 0,
              color: isActive ? '#1DB954' : '#fff',
              filter: isActive ? 'drop-shadow(0 0 6px #1DB95480)' : 'none' }}
          >
            {isCurrentlyPlaying ? <HiPause size={18} /> : <HiPlay size={18} style={{ marginLeft: '2px' }} />}
          </button>
        ) : (
          <span className="text-sm font-medium" style={{ color: '#4a4a5a' }}>
            {index + 1}
          </span>
        )}
      </div>

      <div
        className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center overflow-hidden"
        style={{
          background: track.artwork ? 'transparent' : `linear-gradient(135deg, ${['#1DB95440,#0ea5e930', '#8b5cf640,#ec489930', '#f9731640,#ef444430', '#0ea5e940,#6366f130'][index % 4]})`,
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {track.artwork && <img src={track.artwork} alt={track.title} className="w-full h-full object-cover" />}
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span
          className="text-sm font-semibold truncate"
          style={{ color: isActive ? '#1DB954' : '#fff' }}
        >
          {track.title}
        </span>
        <span className="text-xs truncate" style={{ color: '#6a6a7a' }}>
          {track.artist} · {track.album}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l) }}
          className="cursor-pointer transition-all duration-200 hover:scale-125"
          style={{
            background: 'none', border: 'none', padding: 0,
            color: liked ? '#1DB954' : '#3a3a4a',
            opacity: liked || hovered ? 1 : 0,
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
          onClick={e => e.stopPropagation()}
          className="cursor-pointer transition-all duration-200 hover:scale-110"
          style={{
            background: 'none', border: 'none', padding: 0,
            color: '#4a4a5a',
            opacity: hovered ? 1 : 0,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#4a4a5a'}
        >
          <HiDotsHorizontal size={16} />
        </button>
      </div>
    </div>
  )
}