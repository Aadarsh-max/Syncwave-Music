import { useState } from 'react'
import { usePlayer } from '../../context/PlayerContext.jsx'
import PlayerControls from './PlayerControls.jsx'
import VolumeControl from './VolumeControl.jsx'
import NowPlayingCard from './NowPlayingCard.jsx'
import Slider from '../ui/Slider.jsx'
import LyricsView from '../lyrics/LyricsView.jsx'
import { formatTime } from '../../utils/formatTime.js'
import { MdLyrics } from 'react-icons/md'

export default function PlayerBar() {
  const { progress, duration, seek } = usePlayer()
  const [lyricsOpen, setLyricsOpen] = useState(false)

  return (
    <>
      {lyricsOpen && (
        <div
          className="fixed bottom-22.5 right-6 w-90 z-50 rounded-2xl overflow-hidden"
          style={{
            height: '480px',
            background: '#06060f',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 -8px 60px rgba(0,0,0,0.8), 0 0 40px rgba(29,185,84,0.06)',
          }}
        >
          <LyricsView onClose={() => setLyricsOpen(false)} />
        </div>
      )}

      <div
        className="fixed bottom-0 left-0 right-0 h-22.5 flex items-center justify-between px-6 z-50"
        style={{
          background: 'linear-gradient(180deg, rgba(8,8,16,0.97) 0%, rgba(5,5,12,0.99) 100%)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 -20px 60px rgba(29,185,84,0.04)',
        }}
      >
        <div className="w-[30%]">
          <NowPlayingCard />
        </div>

        <div className="flex flex-col items-center gap-2 w-[40%]">
          <PlayerControls />
          <div className="w-full flex items-center gap-2">
            <span className="text-[11px] tabular-nums shrink-0" style={{ color: '#4a4a5a' }}>
              {formatTime(progress)}
            </span>
            <Slider
              value={progress}
              min={0}
              max={duration || 1}
              onChange={seek}
              gradient="linear-gradient(90deg, #1DB954, #0ea5e9)"
              glow="rgba(29,185,84,0.6)"
              height={3}
            />
            <span className="text-[11px] tabular-nums shrink-0" style={{ color: '#4a4a5a' }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="w-[30%] flex items-center justify-end gap-3">
          <button
            onClick={() => setLyricsOpen(o => !o)}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
            style={{
              background: 'none', border: 'none', padding: 0,
              color: lyricsOpen ? '#1DB954' : '#4a4a5a',
              filter: lyricsOpen ? 'drop-shadow(0 0 6px #1DB95480)' : 'none',
            }}
            onMouseEnter={e => { if (!lyricsOpen) e.currentTarget.style.color = '#9ca3af' }}
            onMouseLeave={e => { if (!lyricsOpen) e.currentTarget.style.color = '#4a4a5a' }}
          >
            <MdLyrics size={18} />
          </button>
          <VolumeControl />
        </div>
      </div>
    </>
  )
}