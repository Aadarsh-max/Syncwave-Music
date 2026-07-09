import { usePlayer } from '../../context/PlayerContext.jsx'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { MdVolumeDown } from 'react-icons/md'
import Slider from '../ui/Slider.jsx'

export default function VolumeControl() {
  const { volume, isMuted, changeVolume, toggleMute } = usePlayer()

  const displayVolume = isMuted ? 0 : volume
  const VolumeIcon = isMuted || volume === 0 ? HiVolumeOff : volume < 0.5 ? MdVolumeDown : HiVolumeUp

  return (
    <div className="flex items-center gap-2 justify-end w-full">
      <button
        onClick={toggleMute}
        className="cursor-pointer transition-all duration-200 hover:scale-110 shrink-0"
        style={{ background: 'none', border: 'none', padding: 0,
          color: isMuted ? '#4a4a5a' : '#6a6a7a' }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = isMuted ? '#4a4a5a' : '#6a6a7a'}
      >
        <VolumeIcon size={18} />
      </button>
      <div className="w-24">
        <Slider
          value={displayVolume}
          min={0}
          max={1}
          onChange={changeVolume}
          gradient="linear-gradient(90deg, #1DB954, #0ea5e9)"
          glow="rgba(29,185,84,0.5)"
          height={3}
        />
      </div>
    </div>
  )
}