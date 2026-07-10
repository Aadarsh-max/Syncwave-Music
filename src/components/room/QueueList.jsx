import { useRoom } from '../../context/RoomContext.jsx'
import QueueItem from './QueueItem.jsx'
import { HiCollection, HiPlus } from 'react-icons/hi'

export default function QueueList() {
  const { queue } = useRoom()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiCollection size={16} style={{ color: '#4a4a5a' }} />
          <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
            Queue · {queue.length}
          </h3>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-105"
          style={{
            background: 'rgba(29,185,84,0.08)',
            border: '1px solid rgba(29,185,84,0.15)',
            color: '#1DB954',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(29,185,84,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(29,185,84,0.08)'}
        >
          <HiPlus size={12} />
          Add track
        </button>
      </div>

      {queue.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-10 gap-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.06)' }}
        >
          <HiCollection size={28} style={{ color: '#2a2a3a' }} />
          <p className="text-sm font-medium" style={{ color: '#3a3a4a' }}>Queue is empty</p>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {queue.map((track, i) => (
            <QueueItem key={track.id} track={track} index={i} isNext={i === 0} />
          ))}
        </div>
      )}
    </div>
  )
}