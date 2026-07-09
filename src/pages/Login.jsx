import { TbWaveSine } from 'react-icons/tb'
import { FaSpotify } from 'react-icons/fa'
import { HiArrowRight, HiMusicNote, HiUserGroup, HiSparkles } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/ui/Loader.jsx'

const features = [
  { icon: HiMusicNote, label: 'Sync playback in real time' },
  { icon: HiUserGroup, label: 'Listen with friends in rooms' },
  { icon: HiSparkles, label: 'AI-powered recommendations' },
]

export default function Login() {
  const { loginWithSpotify, loginAsGuest, loading } = useAuth()
  const navigate = useNavigate()

  const handleGuest = () => {
    loginAsGuest()
    navigate('/')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#06060f' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(29,185,84,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)',
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-10 w-full max-w-sm px-6 relative z-10">
        <div className="flex flex-col items-center gap-5">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1DB954, #0ea5e9)',
              boxShadow: '0 0 60px rgba(29,185,84,0.5), 0 0 120px rgba(14,165,233,0.2)',
            }}
          >
            <TbWaveSine size={40} color="#000" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span
              className="font-black text-5xl"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #1DB954 50%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-2px',
              }}
            >
              SyncWave
            </span>
            <p className="text-sm font-medium text-center" style={{ color: '#4a4a5a' }}>
              Music is better together
            </p>
          </div>
        </div>

        <div
          className="w-full rounded-2xl p-4 flex flex-col gap-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(29,185,84,0.1)', border: '1px solid rgba(29,185,84,0.15)' }}
              >
                <Icon size={16} style={{ color: '#1DB954' }} />
              </div>
              <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={loginWithSpotify}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-sm text-black cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #1DB954, #17d060)',
              boxShadow: '0 4px 32px rgba(29,185,84,0.5), 0 0 80px rgba(29,185,84,0.15)',
              letterSpacing: '0.3px',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? <Loader size={18} color="#000" /> : <><FaSpotify size={20} /> Continue with Spotify</>}
          </button>

          <button
            onClick={handleGuest}
            className="w-full py-4 rounded-2xl font-bold text-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#6a6a7a',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
          >
            Continue as Guest
            <HiArrowRight size={16} />
          </button>
        </div>

        <p className="text-xs text-center" style={{ color: '#2a2a3a' }}>
          By continuing you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}