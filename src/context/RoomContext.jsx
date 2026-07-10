import { createContext, useContext, useState, useCallback } from 'react'

const RoomContext = createContext(null)

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(null)
  const [members, setMembers] = useState([])
  const [queue, setQueue] = useState([])
  const [votes, setVotes] = useState({})
  const [isHost, setIsHost] = useState(false)

  const createRoom = useCallback(async (name, isPrivate) => {
    // backend integration — POST /api/room/create returns { roomId, code }
    const mockRoom = {
      id: 'room_' + Date.now(),
      name,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      isPrivate,
      createdAt: new Date(),
      listeners: 1,
    }
    setRoom(mockRoom)
    setIsHost(true)
    setMembers([{ id: 'u1', name: 'You', avatar: '', isHost: true, isOnline: true }])
    return mockRoom
  }, [])

  const joinRoom = useCallback(async (code) => {
    // backend integration — POST /api/room/join { code } returns room data
    const mockRoom = {
      id: 'room_abc',
      name: 'Chill Session',
      code,
      isPrivate: false,
      listeners: 4,
    }
    setRoom(mockRoom)
    setIsHost(false)
    setMembers([
      { id: 'u1', name: 'Alex', avatar: '', isHost: true, isOnline: true },
      { id: 'u2', name: 'Maya', avatar: '', isHost: false, isOnline: true },
      { id: 'u3', name: 'Jordan', avatar: '', isHost: false, isOnline: true },
      { id: 'u4', name: 'You', avatar: '', isHost: false, isOnline: true },
    ])
    setQueue([
      { id: 'q1', title: 'Blinding Lights', artist: 'The Weeknd', duration: 200, addedBy: 'Alex', votes: 3, gradient: 'linear-gradient(135deg, #8b5cf640, #ec489930)' },
      { id: 'q2', title: 'Levitating', artist: 'Dua Lipa', duration: 203, addedBy: 'Maya', votes: 1, gradient: 'linear-gradient(135deg, #1DB95440, #0ea5e930)' },
      { id: 'q3', title: 'INDUSTRY BABY', artist: 'Lil Nas X', duration: 212, addedBy: 'Jordan', votes: 2, gradient: 'linear-gradient(135deg, #f9731640, #ef444430)' },
    ])
    return mockRoom
  }, [])

  const leaveRoom = useCallback(() => {
    // backend integration — POST /api/room/leave
    setRoom(null)
    setMembers([])
    setQueue([])
    setVotes({})
    setIsHost(false)
  }, [])

  const voteTrack = useCallback((trackId, direction) => {
    // backend integration — socket emit vote_track { trackId, direction }
    setVotes(prev => ({ ...prev, [trackId]: direction }))
    setQueue(prev => prev.map(t =>
      t.id === trackId
        ? { ...t, votes: t.votes + (direction === 'up' ? 1 : -1) }
        : t
    ).sort((a, b) => b.votes - a.votes))
  }, [])

  const addToQueue = useCallback((track) => {
    // backend integration — socket emit add_to_queue { track }
    setQueue(prev => [...prev, { ...track, votes: 0, addedBy: 'You' }])
  }, [])

  const removeFromQueue = useCallback((trackId) => {
    // backend integration — socket emit remove_from_queue { trackId }
    setQueue(prev => prev.filter(t => t.id !== trackId))
  }, [])

  return (
    <RoomContext.Provider value={{
      room, members, queue, votes, isHost,
      createRoom, joinRoom, leaveRoom, voteTrack, addToQueue, removeFromQueue,
    }}>
      {children}
    </RoomContext.Provider>
  )
}

export function useRoom() {
  const ctx = useContext(RoomContext)
  if (!ctx) throw new Error('useRoom must be used inside RoomProvider')
  return ctx
}