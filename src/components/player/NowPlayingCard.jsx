import { usePlayer } from '../../context/PlayerContext.jsx'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useState } from 'react'

export default function NowPlayingCard() {
  const { currentTrack } = usePlayer()
  const [liked, setLiked] = useState(false)

  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className="w-14 h-14 rounded-xl shrink-0 overflow-hidden relative"
        style={{
          background: currentTrack?.artwork
            ? 'transparent'
            : 'linear-gradient(135deg, #1DB95440, #0ea5e930)',
          border: '1px solid rgba(29,185,84,0.2)',
          boxShadow: '0 0 20px rgba(29,185,84,0.15)',
        }}
      >
        {currentTrack?.artwork && (
          <img src={currentTrack.artwork} alt={currentTrack.title} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span
          className="text-sm font-bold truncate"
          style={{ color: currentTrack ? '#fff' : '#3a3a4a' }}
        >
          {currentTrack?.title || 'No track playing'}
        </span>
        <span
          className="text-xs truncate"
          style={{ color: currentTrack ? '#6a6a7a' : '#2a2a3a' }}
        >
          {currentTrack?.artist || '—'}
        </span>
      </div>

      <button
        onClick={() => setLiked(l => !l)}
        className="cursor-pointer transition-all duration-200 hover:scale-125 shrink-0"
        style={{ background: 'none', border: 'none', padding: 0,
          color: liked ? '#1DB954' : '#3a3a4a',
          filter: liked ? 'drop-shadow(0 0 6px #1DB95480)' : 'none' }}
      >
        {liked ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
      </button>
    </div>
  )
}