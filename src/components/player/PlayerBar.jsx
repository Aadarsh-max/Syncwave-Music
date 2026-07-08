import { HiPlay, HiRewind, HiFastForward, HiVolumeUp, HiSwitchHorizontal, HiRefresh, HiHeart } from 'react-icons/hi'

export default function PlayerBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-[90px] flex items-center justify-between px-6 z-50"
      style={{
        background: 'linear-gradient(180deg, rgba(8,8,16,0.95) 0%, rgba(5,5,12,0.98) 100%)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 -20px 60px rgba(29,185,84,0.05)',
      }}
    >
      <div className="flex items-center gap-3 w-[30%]">
        <div
          className="w-14 h-14 rounded-xl shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1DB95440, #0ea5e930)',
            border: '1px solid rgba(29,185,84,0.25)',
            boxShadow: '0 0 20px rgba(29,185,84,0.15)',
          }}
        />
        <div className="flex flex-col gap-2 min-w-0">
          <div
            className="h-2.5 rounded-full w-32"
            style={{ background: 'linear-gradient(90deg, #2a2a3a, #1a1a2a)' }}
          />
          <div className="h-2 rounded-full w-20" style={{ background: '#1a1a2a' }} />
        </div>
        <HiHeart size={18} className="ml-2 shrink-0" style={{ color: '#3a3a4a' }} />
      </div>

      <div className="flex flex-col items-center gap-3 w-[40%]">
        <div className="flex items-center gap-5">
          <HiSwitchHorizontal size={18} style={{ color: '#4a4a5a', cursor: 'pointer' }} />
          <HiRewind size={22} style={{ color: '#b3b3c3', cursor: 'pointer' }} />
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #1DB954, #0ea5e9)',
              boxShadow: '0 0 24px rgba(29,185,84,0.6), 0 0 48px rgba(14,165,233,0.2)',
            }}
          >
            <HiPlay size={18} color="#000" style={{ marginLeft: '2px' }} />
          </div>
          <HiFastForward size={22} style={{ color: '#b3b3c3', cursor: 'pointer' }} />
          <HiRefresh size={18} style={{ color: '#4a4a5a', cursor: 'pointer' }} />
        </div>

        <div className="w-full flex items-center gap-2">
          <span className="text-[11px] tabular-nums" style={{ color: '#4a4a5a' }}>0:00</span>
          <div
            className="flex-1 h-1 rounded-full cursor-pointer relative group"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: '0%',
                background: 'linear-gradient(90deg, #1DB954, #0ea5e9)',
                boxShadow: '0 0 8px #1DB95460',
              }}
            />
          </div>
          <span className="text-[11px] tabular-nums" style={{ color: '#4a4a5a' }}>0:00</span>
        </div>
      </div>

      <div className="flex items-center gap-3 justify-end w-[30%]">
        <HiVolumeUp size={18} style={{ color: '#6a6a7a' }} />
        <div
          className="w-24 h-1 rounded-full relative"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="h-full rounded-full w-3/4"
            style={{
              background: 'linear-gradient(90deg, #1DB954, #0ea5e9)',
              boxShadow: '0 0 8px #1DB95440',
            }}
          />
        </div>
      </div>
    </div>
  )
}