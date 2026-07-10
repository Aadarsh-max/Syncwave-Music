import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import MessageBubble from './MessageBubble.jsx'
import ReactionPicker from './ReactionPicker.jsx'
import { HiPaperAirplane } from 'react-icons/hi'

const mockMessages = [
  { id: 'm1', sender: 'Alex', text: 'This track is 🔥', time: '8:42 PM', isOwn: false },
  { id: 'm2', sender: 'Maya', text: 'Agreed! Add Levitating next', time: '8:43 PM', isOwn: false },
  { id: 'm3', sender: 'You', text: 'Already in the queue 😄', time: '8:43 PM', isOwn: true },
  { id: 'm4', sender: 'Jordan', text: 'The vibes tonight are immaculate', time: '8:44 PM', isOwn: false },
  { id: 'm5', sender: 'Alex', text: 'Can we add some Frank Ocean after this?', time: '8:45 PM', isOwn: false },
  { id: 'm6', sender: 'You', text: 'Yes! Nights is perfect for this mood', time: '8:45 PM', isOwn: true },
]

export default function ChatBox() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const [reactions, setReactions] = useState([])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const msg = {
      id: 'm' + Date.now(),
      sender: user?.name || 'You',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    }
    // backend integration — socket emit chat_message { text: input.trim(), roomId }
    setMessages(prev => [...prev, msg])
    setInput('')
    inputRef.current?.focus()
  }

  const sendReaction = (emoji) => {
    const r = { id: Date.now(), emoji, x: Math.random() * 80 + 10 }
    // backend integration — socket emit reaction { emoji, roomId }
    setReactions(prev => [...prev, r])
    setTimeout(() => setReactions(prev => prev.filter(rx => rx.id !== r.id)), 2500)
  }

  const isPrevSameSender = (i) =>
    i > 0 && messages[i].sender === messages[i - 1].sender && messages[i].isOwn === messages[i - 1].isOwn

  return (
    <div
      className="flex flex-col h-full relative"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="px-4 py-3 shrink-0 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
          Live chat
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#1DB954', boxShadow: '0 0 6px #1DB954' }} />
          <span className="text-[10px] font-bold" style={{ color: '#1DB954' }}>Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 relative">
        {messages.map((msg, i) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.isOwn}
            showAvatar={!isPrevSameSender(i)}
          />
        ))}
        <div ref={bottomRef} />

        {reactions.map(r => (
          <div
            key={r.id}
            className="absolute bottom-4 text-2xl pointer-events-none"
            style={{
              left: `${r.x}%`,
              animation: 'floatUp 2.5s ease forwards',
            }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      <div
        className="flex items-center gap-2 px-3 py-3 shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <ReactionPicker onReact={sendReaction} />

        <div
          className="flex-1 flex items-center gap-2 px-3 rounded-xl transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            height: '36px',
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Say something..."
            className="flex-1 bg-transparent outline-none text-sm font-medium"
            style={{ color: '#fff', border: 'none' }}
            onFocus={e => {
              e.currentTarget.parentElement.style.border = '1px solid rgba(29,185,84,0.3)'
              e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.07)'
            }}
            onBlur={e => {
              e.currentTarget.parentElement.style.border = '1px solid rgba(255,255,255,0.08)'
              e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.05)'
            }}
          />
        </div>

        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
          style={{
            background: input.trim() ? 'linear-gradient(135deg, #1DB954, #17d060)' : 'rgba(255,255,255,0.04)',
            border: input.trim() ? 'none' : '1px solid rgba(255,255,255,0.06)',
            boxShadow: input.trim() ? '0 4px 16px rgba(29,185,84,0.4)' : 'none',
            color: input.trim() ? '#000' : '#3a3a4a',
            opacity: input.trim() ? 1 : 0.5,
          }}
        >
          <HiPaperAirplane size={16} style={{ transform: 'rotate(90deg)' }} />
        </button>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120px) scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}