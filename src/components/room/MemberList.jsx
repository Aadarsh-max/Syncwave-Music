import { useRoom } from '../../context/RoomContext.jsx'
import Avatar from '../ui/Avatar.jsx'
import { HiMusicNote } from 'react-icons/hi'

export default function MemberList() {
  const { members } = useRoom()

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
        Listening now · {members.length}
      </h3>

      <div className="flex flex-col gap-2">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Avatar name={member.name} size={34} />
              <div
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                style={{
                  background: member.isOnline ? '#1DB954' : '#3a3a4a',
                  border: '1.5px solid #06060f',
                  boxShadow: member.isOnline ? '0 0 6px #1DB954' : 'none',
                }}
              />
            </div>

            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold truncate text-white">
                  {member.name}
                </span>
                {member.isHost && (
                  <span
                    className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #1DB954, #0ea5e9)',
                      color: '#000',
                    }}
                  >
                    Host
                  </span>
                )}
              </div>
            </div>

            <HiMusicNote
              size={14}
              style={{
                color: '#1DB954',
                filter: 'drop-shadow(0 0 4px #1DB95480)',
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}