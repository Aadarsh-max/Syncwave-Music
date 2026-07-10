import { useState, useEffect, useRef } from 'react'
import { usePlayer } from '../../context/PlayerContext.jsx'
import { HiMusicNote, HiX } from 'react-icons/hi'
import { MdLyrics } from 'react-icons/md'

const mockLyrics = [
  { time: 0, text: '♪ Instrumental ♪' },
  { time: 8, text: 'I been running through the jungle' },
  { time: 11, text: 'I been running with the wolves' },
  { time: 14, text: 'To get to you, to get to you' },
  { time: 17, text: 'I been down the darkest alleys' },
  { time: 20, text: 'Saw the dark side of the moon' },
  { time: 23, text: 'To get to you, to get to you' },
  { time: 27, text: '♪ Instrumental ♪' },
  { time: 32, text: 'I would go through all of this pain' },
  { time: 35, text: 'Take a bullet straight through my brain' },
  { time: 38, text: 'Yes I would, I would' },
  { time: 41, text: 'If I could only get to you' },
  { time: 45, text: 'If I could only get to you' },
  { time: 49, text: '♪ Instrumental ♪' },
  { time: 55, text: 'Oh oh oh oh oh' },
  { time: 58, text: 'Oh oh oh oh' },
  { time: 61, text: 'To get to you' },
  { time: 65, text: 'To get to you' },
]

export default function LyricsView({ onClose }) {
  const { currentTrack, progress } = usePlayer()
  const [activeLine, setActiveLine] = useState(0)
  const containerRef = useRef(null)
  const activeRef = useRef(null)

  useEffect(() => {
    const idx = mockLyrics.findLastIndex(l => l.time <= progress)
    if (idx !== activeLine) setActiveLine(idx)
  }, [progress])

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeLine])

  return (
    <div
      className="flex flex-col h-full relative"
      style={{ background: 'linear-gradient(180deg, #06060f 0%, #080812 100%)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(29,185,84,0.06), transparent)' }}
      />

      <div
        className="flex items-center justify-between px-6 py-4 shrink-0 relative z-10"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="flex items-center gap-2">
          <MdLyrics size={18} style={{ color: '#1DB954' }} />
          <h3
            className="text-sm font-black uppercase tracking-widest"
            style={{ color: '#4a4a5a' }}
          >
            Lyrics
          </h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#6a6a7a' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >
            <HiX size={14} />
          </button>
        )}
      </div>

      {!currentTrack ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.15)' }}
          >
            <HiMusicNote size={24} style={{ color: '#1DB954' }} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-bold text-white">No track playing</p>
            <p className="text-xs" style={{ color: '#4a4a5a' }}>Play a song to see lyrics</p>
          </div>
        </div>
      ) : (
        <>
          <div className="px-6 py-4 shrink-0 flex items-center gap-3 relative z-10">
            <div
              className="w-10 h-10 rounded-xl shrink-0"
              style={{
                background: currentTrack.artwork ? 'transparent' : 'linear-gradient(135deg, #1DB95440, #0ea5e930)',
                border: '1px solid rgba(29,185,84,0.2)',
              }}
            >
              {currentTrack.artwork && <img src={currentTrack.artwork} alt="" className="w-full h-full object-cover rounded-xl" />}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-bold truncate text-white">{currentTrack.title}</span>
              <span className="text-xs truncate" style={{ color: '#6a6a7a' }}>{currentTrack.artist}</span>
            </div>
          </div>

          <div ref={containerRef} className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 relative z-10">
            <div
              className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
              style={{ background: 'linear-gradient(180deg, #06060f, transparent)' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
              style={{ background: 'linear-gradient(0deg, #06060f, transparent)' }}
            />

            {mockLyrics.map((line, i) => {
              const isActive = i === activeLine
              const isPast = i < activeLine
              return (
                <p
                  key={i}
                  ref={isActive ? activeRef : null}
                  className="font-black leading-tight cursor-default transition-all duration-500"
                  style={{
                    fontSize: isActive ? '26px' : '20px',
                    color: isActive ? '#fff' : isPast ? '#2a2a3a' : '#3a3a4a',
                    letterSpacing: isActive ? '-0.5px' : '-0.3px',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: 'left center',
                    textShadow: isActive ? '0 0 40px rgba(29,185,84,0.4)' : 'none',
                    filter: isActive ? 'none' : 'blur(0.3px)',
                    opacity: isActive ? 1 : isPast ? 0.25 : 0.4,
                  }}
                >
                  {line.text}
                </p>
              )
            })}
          </div>
        </>
      )}

      <p className="text-[10px] text-center pb-3 shrink-0 relative z-10" style={{ color: '#2a2a3a' }}>
        {/* backend integration — lyrics from Genius/Musixmatch API */}
        Lyrics provided for demonstration
      </p>
    </div>
  )
}