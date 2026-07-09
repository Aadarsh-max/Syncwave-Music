import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ProfileHeader from '../components/profile/ProfileHeader.jsx'
import TopGenres from '../components/profile/TopGenres.jsx'
import HistoryList from '../components/profile/HistoryList.jsx'

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  if (!user) return null

  return (
    <div className="min-h-full relative">
      <div
        className="absolute top-0 left-0 right-0 h-72 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(29,185,84,0.07) 0%, rgba(14,165,233,0.03) 40%, transparent 100%)' }}
      />

      <div className="relative z-10">
        <ProfileHeader />

        <div className="p-6 mt-4 flex flex-col gap-8">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Songs played', value: '1,284', gradient: 'linear-gradient(135deg, #1DB954, #0ea5e9)' },
              { label: 'Hours listened', value: '347', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
              { label: 'Rooms joined', value: '23', gradient: 'linear-gradient(135deg, #f97316, #eab308)' },
            ].map(({ label, value, gradient }) => (
              <div
                key={label}
                className="flex flex-col gap-1 p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span
                  className="text-2xl font-black"
                  style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {value}
                </span>
                <span className="text-xs font-medium" style={{ color: '#4a4a5a' }}>{label}</span>
              </div>
            ))}
          </div>

          <HistoryList />
          <TopGenres />
        </div>
      </div>
    </div>
  )
}