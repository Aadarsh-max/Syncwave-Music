import Avatar from '../ui/Avatar.jsx'

export default function MessageBubble({ message, isOwn, showAvatar = true }) {
  return (
    <div
      className="flex items-end gap-2 group"
      style={{ flexDirection: isOwn ? 'row-reverse' : 'row' }}
    >
      {!isOwn && showAvatar && (
        <Avatar name={message.sender} size={26} />
      )}
      {!isOwn && !showAvatar && <div className="w-6.5 shrink-0" />}

      <div
        className="flex flex-col gap-1"
        style={{ alignItems: isOwn ? 'flex-end' : 'flex-start', maxWidth: '75%' }}
      >
        {showAvatar && !isOwn && (
          <span className="text-[10px] font-bold px-1" style={{ color: '#4a4a5a' }}>
            {message.sender}
          </span>
        )}
        <div
          className="px-3 py-2 rounded-2xl text-sm font-medium leading-relaxed"
          style={{
            background: isOwn
              ? 'linear-gradient(135deg, #1DB954, #17d060)'
              : 'rgba(255,255,255,0.06)',
            color: isOwn ? '#000' : '#e2e2e2',
            borderRadius: isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            boxShadow: isOwn ? '0 4px 16px rgba(29,185,84,0.3)' : 'none',
            border: isOwn ? 'none' : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {message.text}
        </div>
        <span
          className="text-[10px] px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: '#3a3a4a' }}
        >
          {message.time}
        </span>
      </div>
    </div>
  )
}