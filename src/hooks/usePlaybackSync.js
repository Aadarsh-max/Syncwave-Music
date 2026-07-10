import { useEffect, useRef } from 'react'
import { usePlayer } from '../context/PlayerContext.jsx'

export default function usePlaybackSync(isHost) {
  const { progress, isPlaying, seek, togglePlay } = usePlayer()
  const offsetRef = useRef(0)

  useEffect(() => {
    // backend integration — calculate clock offset from server timestamp
    // offsetRef.current = Date.now() - serverTimestamp

    // backend integration — on sync event from socket:
    // const adjustedPosition = event.position + (Date.now() - event.serverTime + offsetRef.current) / 1000
    // if (Math.abs(adjustedPosition - progress) > 0.5) seek(adjustedPosition)
    // if (event.isPlaying !== isPlaying) togglePlay()
  }, [isHost])

  const broadcastSync = () => {
    // backend integration — emit playback_sync { position: progress, isPlaying, serverTime: Date.now() }
  }

  return { broadcastSync }
}