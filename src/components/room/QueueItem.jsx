import { usePlayer } from '../../context/PlayerContext.jsx'
import { useRoom } from '../../context/RoomContext.jsx'
import VoteButtons from './VoteButtons.jsx'
import { HiPlay, HiPause, HiTrash } from 'react-icons/hi'
import { formatTime } from '../../utils/formatTime.js'
import { useState } from 'react'

export default function QueueItem({ track, index, isNext = false }) {
  const { currentTrack, isPlaying, play, pause } = usePlayer()
  const { isHost, removeFromQueue } = useRoom()
  const [hovered, setHovered] = useState(false)

  const isActive = currentTrack?.id === track.id
  const isCurrentlyPlaying = isActive && isPlaying

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150 cursor-pointer group"
      style={{
        background: isActive
          ? 'rgba(29,185,84,0.08)'
          : isNext ? 'rgba(255,255,255,0.04)' : hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: isActive
          ? '1px solid rgba(29,185,84,0.15)'
          : isNext ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => isActive ? (isPlaying ? pause() : play()) : play(track, [], index)}
    >
      <div className="w-6 flex items-center justify-center shrink-0">
        {hovered || isActive ? (
          <button
            onClick={e => { e.stopPropagation(); isActive ? (isPlaying ? pause() : play()) : play(track, [], index) }}
            style={{ background: 'none', border: 'none', padding: 0, color: isActive ? '#1DB954' : '#fff', cursor: 'pointer' }}
          >
            {isCurrentlyPlaying ? <HiPause size={16} /> : <HiPlay size={16} style={{ marginLeft: '1px' }} />}
          </button>
        ) : (
          <span className="text-xs font-medium" style={{ color: '#3a3a4a' }}>{index + 1}</span>
        )}
      </div>

      <div
        className="w-10 h-10 rounded-lg shrink-0"
        style={{
          background: track.gradient || 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: isActive ? '0 0 16px rgba(29,185,84,0.25)' : 'none',
        }}
      />

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-sm font-semibold truncate" style={{ color: isActive ? '#1DB954' : '#fff' }}>
          {track.title}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs truncate" style={{ color: '#6a6a7a' }}>{track.artist}</span>
          <span className="text-[10px]" style={{ color: '#3a3a4a' }}>· added by {track.addedBy}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <VoteButtons trackId={track.id} voteCount={track.votes} />
        <span className="text-xs tabular-nums" style={{ color: '#4a4a5a' }}>
          {formatTime(track.duration)}
        </span>
        {isHost && (
          <button
            onClick={e => { e.stopPropagation(); removeFromQueue(track.id) }}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
            style={{
              background: 'none', border: 'none', padding: 0,
              color: '#3a3a4a',
              opacity: hovered ? 1 : 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={e => e.currentTarget.style.color = '#3a3a4a'}
          >
            <HiTrash size={14} />
          </button>
        )}
      </div>
    </div>
  )
}