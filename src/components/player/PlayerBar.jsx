import { usePlayer } from '../../context/PlayerContext.jsx'
import PlayerControls from './PlayerControls.jsx'
import VolumeControl from './VolumeControl.jsx'
import NowPlayingCard from './NowPlayingCard.jsx'
import Slider from '../ui/Slider.jsx'
import { formatTime } from '../../utils/formatTime.js'

export default function PlayerBar() {
  const { progress, duration, seek } = usePlayer()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-22.5 flex items-center justify-between px-6 z-50"
      style={{
        background: 'linear-gradient(180deg, rgba(8,8,16,0.97) 0%, rgba(5,5,12,0.99) 100%)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 -20px 60px rgba(29,185,84,0.04)',
      }}
    >
      <div className="w-[30%]">
        <NowPlayingCard />
      </div>

      <div className="flex flex-col items-center gap-2 w-[40%]">
        <PlayerControls />
        <div className="w-full flex items-center gap-2">
          <span className="text-[11px] tabular-nums shrink-0" style={{ color: '#4a4a5a' }}>
            {formatTime(progress)}
          </span>
          <Slider
            value={progress}
            min={0}
            max={duration || 1}
            onChange={seek}
            gradient="linear-gradient(90deg, #1DB954, #0ea5e9)"
            glow="rgba(29,185,84,0.6)"
            height={3}
          />
          <span className="text-[11px] tabular-nums shrink-0" style={{ color: '#4a4a5a' }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="w-[30%]">
        <VolumeControl />
      </div>
    </div>
  )
}