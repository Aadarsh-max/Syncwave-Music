import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRoom } from '../context/RoomContext.jsx'
import RoomHeader from '../components/room/RoomHeader.jsx'
import MemberList from '../components/room/MemberList.jsx'
import QueueList from '../components/room/QueueList.jsx'
import ChatBox from '../components/chat/ChatBox.jsx'
import LyricsView from '../components/lyrics/LyricsView.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import usePlaybackSync from '../hooks/usePlaybackSync.js'
import useSocket from '../hooks/useSocket.js'
import { HiPlay, HiPause, HiMusicNote, HiChat, HiCollection } from 'react-icons/hi'
import { MdLyrics } from 'react-icons/md'
import { formatTime } from '../utils/formatTime.js'

const TABS = [
  { key: 'queue', icon: HiCollection, label: 'Queue' },
  { key: 'chat', icon: HiChat, label: 'Chat' },
  { key: 'lyrics', icon: MdLyrics, label: 'Lyrics' },
]

export default function Room() {
  const { roomId } = useParams()
  const { room, joinRoom, isHost } = useRoom()
  const { currentTrack, isPlaying, play, pause, progress, duration } = usePlayer()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('queue')

  useSocket(roomId)
  usePlaybackSync(isHost)

  useEffect(() => {
    if (!room && roomId) {
      setLoading(true)
      joinRoom(roomId).finally(() => setLoading(false))
    }
  }, [roomId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: '#1DB954', borderRightColor: 'rgba(29,185,84,0.3)' }}
          />
          <p className="text-sm font-medium" style={{ color: '#4a4a5a' }}>Joining room...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full relative flex flex-col" style={{ height: 'calc(100vh - 64px - 90px)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(29,185,84,0.06) 0%, transparent 100%)' }}
      />

      <RoomHeader />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(29,185,84,0.04) 0%, transparent 60%)' }}
          />

          <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-xs">
            <div
              className="w-52 h-52 rounded-3xl relative overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #1DB95430, #0ea5e920)',
                border: '1px solid rgba(29,185,84,0.2)',
                boxShadow: isPlaying
                  ? '0 0 80px rgba(29,185,84,0.3), 0 0 160px rgba(29,185,84,0.1)'
                  : '0 0 30px rgba(0,0,0,0.5)',
              }}
            >
              {currentTrack?.artwork
                ? <img src={currentTrack.artwork} alt="" className="w-full h-full object-cover" />
                : (
                  <div className="w-full h-full flex items-center justify-center">
                    <HiMusicNote size={64} style={{ color: 'rgba(29,185,84,0.25)' }} />
                  </div>
                )
              }
              {isPlaying && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{ background: 'linear-gradient(135deg, rgba(29,185,84,0.06), transparent)', animationDuration: '2s' }}
                />
              )}
            </div>

            <div className="flex flex-col items-center gap-1 w-full text-center">
              <h2
                className="text-xl font-black truncate w-full"
                style={{
                  background: 'linear-gradient(135deg, #fff, #9ca3af)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.3px',
                }}
              >
                {currentTrack?.title || 'No track playing'}
              </h2>
              <p className="text-sm font-medium" style={{ color: '#6a6a7a' }}>
                {currentTrack?.artist || 'Waiting for host...'}
              </p>
            </div>

            <div className="w-full flex items-center gap-2">
              <span className="text-xs tabular-nums shrink-0" style={{ color: '#4a4a5a' }}>
                {formatTime(progress)}
              </span>
              <div className="flex-1 h-1 rounded-full relative" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${duration ? (progress / duration) * 100 : 0}%`,
                    background: 'linear-gradient(90deg, #1DB954, #0ea5e9)',
                    boxShadow: '0 0 8px rgba(29,185,84,0.5)',
                  }}
                />
              </div>
              <span className="text-xs tabular-nums shrink-0" style={{ color: '#4a4a5a' }}>
                {formatTime(duration)}
              </span>
            </div>

            {isHost ? (
              <button
                onClick={() => isPlaying ? pause() : play()}
                className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #1DB954, #17d060)',
                  boxShadow: '0 0 32px rgba(29,185,84,0.6), 0 0 64px rgba(29,185,84,0.2)',
                  border: 'none',
                }}
              >
                {isPlaying
                  ? <HiPause size={24} color="#000" />
                  : <HiPlay size={24} color="#000" style={{ marginLeft: '3px' }} />
                }
              </button>
            ) : (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#4a4a5a' }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#1DB954', boxShadow: '0 0 6px #1DB954' }} />
                Synced with host
              </div>
            )}
          </div>
        </div>

        <div
          className="w-[320px] flex flex-col shrink-0 overflow-hidden"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div
            className="flex items-center shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {TABS.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-bold cursor-pointer transition-all duration-200"
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === key ? '#fff' : '#4a4a5a',
                  borderBottom: activeTab === key ? '2px solid #1DB954' : '2px solid transparent',
                }}
                onMouseEnter={e => { if (activeTab !== key) e.currentTarget.style.color = '#9ca3af' }}
                onMouseLeave={e => { if (activeTab !== key) e.currentTarget.style.color = '#4a4a5a' }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'queue' && (
              <div className="p-4 h-full overflow-y-auto">
                <MemberList />
                <div className="mt-4">
                  <QueueList />
                </div>
              </div>
            )}
            {activeTab === 'chat' && <ChatBox />}
            {activeTab === 'lyrics' && <LyricsView />}
          </div>
        </div>
      </div>
    </div>
  )
}