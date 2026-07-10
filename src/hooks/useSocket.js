import { useEffect, useRef } from 'react'

export default function useSocket(roomId) {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!roomId) return
    // backend integration — import { io } from 'socket.io-client'
    // socketRef.current = io(import.meta.env.VITE_SERVER_URL, { query: { roomId } })
    // socketRef.current.on('playback_sync', handler)
    // socketRef.current.on('member_joined', handler)
    // socketRef.current.on('member_left', handler)
    // socketRef.current.on('queue_updated', handler)
    // socketRef.current.on('vote_updated', handler)

    return () => {
      // socketRef.current?.disconnect()
    }
  }, [roomId])

  const emit = (event, data) => {
    // backend integration — socketRef.current?.emit(event, data)
  }

  return { emit }
}