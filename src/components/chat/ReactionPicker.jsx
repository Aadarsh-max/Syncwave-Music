import { useState } from 'react'
import { HiEmojiHappy } from 'react-icons/hi'

const reactions = ['🔥', '💚', '🎵', '⚡', '💜', '🤍', '👏', '😭']

export default function ReactionPicker({ onReact }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
        style={{
          background: open ? 'rgba(29,185,84,0.15)' : 'rgba(255,255,255,0.05)',
          border: open ? '1px solid rgba(29,185,84,0.3)' : '1px solid rgba(255,255,255,0.08)',
          color: open ? '#1DB954' : '#6a6a7a',
        }}
      >
        <HiEmojiHappy size={16} />
      </button>

      {open && (
        <div
          className="absolute bottom-10 left-0 flex items-center gap-1 p-2 rounded-2xl z-10"
          style={{
            background: 'linear-gradient(135deg, #0e0e1a, #0a0a14)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          {reactions.map(r => (
            <button
              key={r}
              onClick={() => { onReact(r); setOpen(false) }}
              className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-150 hover:scale-125 text-base"
              style={{ background: 'transparent', border: 'none' }}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}