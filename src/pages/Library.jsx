import { HiCollection, HiPlus } from 'react-icons/hi'

export default function Library() {
  return (
    <div className="p-6 min-h-full relative">
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.06) 0%, transparent 100%)' }}
      />
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-4xl font-black"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #9ca3af 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
            }}
          >
            Your Library
          </h1>
          <p className="text-sm font-medium mt-1" style={{ color: '#4a4a5a' }}>
            Your playlists and saved music
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #1DB954, #17d060)',
            boxShadow: '0 4px 20px rgba(29,185,84,0.4)',
            color: '#000',
            border: 'none',
          }}
        >
          <HiPlus size={16} />
          New Playlist
        </button>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        {[
          { name: 'Liked Songs', count: 284, gradient: 'linear-gradient(135deg, #5038a0, #7c3aed)' },
          { name: 'Late Night Drive', count: 18, gradient: 'linear-gradient(135deg, #1a1a3a, #4c1d95)' },
          { name: 'Workout Mix', count: 32, gradient: 'linear-gradient(135deg, #f97316, #ef4444)' },
          { name: 'Chill Sunday', count: 24, gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)' },
          { name: 'Focus Mode', count: 15, gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)' },
        ].map((playlist) => (
          <div
            key={playlist.name}
            className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-150 group"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)' }}
          >
            <div
              className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center"
              style={{ background: playlist.gradient, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}
            >
              <HiCollection size={22} color="rgba(255,255,255,0.8)" />
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-sm font-bold text-white truncate">{playlist.name}</span>
              <span className="text-xs" style={{ color: '#4a4a5a' }}>{playlist.count} songs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}