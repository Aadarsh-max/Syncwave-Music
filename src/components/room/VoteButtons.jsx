import { useRoom } from '../../context/RoomContext.jsx'
import { HiThumbUp, HiThumbDown } from 'react-icons/hi'

export default function VoteButtons({ trackId, voteCount }) {
  const { votes, voteTrack } = useRoom()
  const myVote = votes[trackId]

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={e => { e.stopPropagation(); voteTrack(trackId, 'up') }}
        className="flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-all duration-200 hover:scale-110"
        style={{
          background: myVote === 'up' ? 'rgba(29,185,84,0.15)' : 'rgba(255,255,255,0.04)',
          border: myVote === 'up' ? '1px solid rgba(29,185,84,0.3)' : '1px solid rgba(255,255,255,0.06)',
          color: myVote === 'up' ? '#1DB954' : '#4a4a5a',
        }}
      >
        <HiThumbUp size={12} />
        <span className="text-[11px] font-bold">{voteCount}</span>
      </button>

      <button
        onClick={e => { e.stopPropagation(); voteTrack(trackId, 'down') }}
        className="flex items-center justify-center w-7 h-7 rounded-lg cursor-pointer transition-all duration-200 hover:scale-110"
        style={{
          background: myVote === 'down' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.04)',
          border: myVote === 'down' ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(255,255,255,0.06)',
          color: myVote === 'down' ? '#ef4444' : '#4a4a5a',
        }}
      >
        <HiThumbDown size={12} />
      </button>
    </div>
  )
}