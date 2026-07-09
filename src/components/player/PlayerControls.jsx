import { usePlayer } from '../../context/PlayerContext.jsx'
import {
  HiPlay, HiPause, HiRewind, HiFastForward,
  HiSwitchHorizontal, HiRefresh,
} from 'react-icons/hi'
import { MdRepeatOne } from 'react-icons/md'

export default function PlayerControls() {
  const { isPlaying, togglePlay, skipNext, skipPrev, isShuffle, setIsShuffle, repeatMode, cycleRepeat } = usePlayer()

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => setIsShuffle(s => !s)}
        className="cursor-pointer transition-all duration-200 hover:scale-110"
        style={{ background: 'none', border: 'none', padding: 0, color: isShuffle ? '#1DB954' : '#4a4a5a',
          filter: isShuffle ? 'drop-shadow(0 0 6px #1DB95480)' : 'none' }}
      >
        <HiSwitchHorizontal size={18} />
      </button>

      <button
        onClick={skipPrev}
        className="cursor-pointer transition-all duration-200 hover:scale-110"
        style={{ background: 'none', border: 'none', padding: 0, color: '#b3b3c3' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#b3b3c3'}
      >
        <HiRewind size={22} />
      </button>

      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #1DB954, #17d060)',
          boxShadow: '0 0 28px rgba(29,185,84,0.6), 0 0 56px rgba(29,185,84,0.2)',
          border: 'none',
        }}
      >
        {isPlaying
          ? <HiPause size={20} color="#000" />
          : <HiPlay size={20} color="#000" style={{ marginLeft: '2px' }} />
        }
      </button>

      <button
        onClick={skipNext}
        className="cursor-pointer transition-all duration-200 hover:scale-110"
        style={{ background: 'none', border: 'none', padding: 0, color: '#b3b3c3' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = '#b3b3c3'}
      >
        <HiFastForward size={22} />
      </button>

      <button
        onClick={cycleRepeat}
        className="cursor-pointer transition-all duration-200 hover:scale-110 relative"
        style={{ background: 'none', border: 'none', padding: 0,
          color: repeatMode !== 'off' ? '#1DB954' : '#4a4a5a',
          filter: repeatMode !== 'off' ? 'drop-shadow(0 0 6px #1DB95480)' : 'none' }}
      >
        {repeatMode === 'one' ? <MdRepeatOne size={20} /> : <HiRefresh size={18} />}
        {repeatMode !== 'off' && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
        )}
      </button>
    </div>
  )
}