import { createContext, useContext, useState, useRef } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState('off')
  const [queue, setQueue] = useState([])
  const [queueIndex, setQueueIndex] = useState(0)
  const audioRef = useRef(null)

  const play = (track, trackQueue = [], index = 0) => {
    if (track) {
      setCurrentTrack(track)
      setQueue(trackQueue)
      setQueueIndex(index)
      setIsPlaying(true)
      if (audioRef.current) {
        // backend integration — set audioRef.current.src to Audius stream URL
        audioRef.current.play().catch(() => {})
      }
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {})
      }
      setIsPlaying(true)
    }
  }

  const pause = () => {
    if (audioRef.current) audioRef.current.pause()
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (isPlaying) pause()
    else play()
  }

  const seek = (val) => {
    if (audioRef.current) audioRef.current.currentTime = val
    setProgress(val)
  }

  const changeVolume = (val) => {
    setVolume(val)
    if (audioRef.current) audioRef.current.volume = val
    if (val === 0) setIsMuted(true)
    else setIsMuted(false)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const skipNext = () => {
    if (queue.length === 0) return
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * queue.length)
      : (queueIndex + 1) % queue.length
    setQueueIndex(nextIndex)
    setCurrentTrack(queue[nextIndex])
    setIsPlaying(true)
    // backend integration — load next Audius stream URL
  }

  const skipPrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      seek(0)
      return
    }
    if (queue.length === 0) return
    const prevIndex = queueIndex === 0 ? queue.length - 1 : queueIndex - 1
    setQueueIndex(prevIndex)
    setCurrentTrack(queue[prevIndex])
    setIsPlaying(true)
    // backend integration — load prev Audius stream URL
  }

  const cycleRepeat = () => {
    setRepeatMode(r => r === 'off' ? 'all' : r === 'all' ? 'one' : 'off')
  }

  const onTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime)
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const onEnded = () => {
    if (repeatMode === 'one') {
      seek(0)
      play()
    } else if (repeatMode === 'all' || queueIndex < queue.length - 1) {
      skipNext()
    } else {
      setIsPlaying(false)
      setProgress(0)
    }
  }

  return (
    <PlayerContext.Provider value={{
      currentTrack, isPlaying, progress, duration,
      volume, isMuted, isShuffle, repeatMode, queue,
      play, pause, togglePlay, seek, changeVolume,
      toggleMute, skipNext, skipPrev, cycleRepeat,
      setIsShuffle, audioRef,
    }}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider')
  return ctx
}