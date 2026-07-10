import MoodPicker from './MoodPicker.jsx'
import RecommendationCard from './RecommendationCard.jsx'
import Loader from '../ui/Loader.jsx'
import useAI from '../../hooks/useAI.js'
import { usePlayer } from '../../context/PlayerContext.jsx'
import { HiSparkles, HiRefresh, HiPlay } from 'react-icons/hi'

export default function GrowPanel() {
  const { selectedMood, recommendations, loading, reasoning, fetchRecommendations, clear, MOODS } = useAI()
  const { play } = usePlayer()

  const playAll = () => {
    if (recommendations.length > 0) play(recommendations[0], recommendations, 0)
  }

  return (
    <div className="flex flex-col gap-8 p-6 min-h-full relative">
      <div
        className="absolute top-0 left-0 right-0 h-80 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.04) 40%, transparent 100%)' }}
      />
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              boxShadow: '0 0 24px rgba(139,92,246,0.5)',
            }}
          >
            <HiSparkles size={20} color="#fff" />
          </div>
          <div>
            <h1
              className="text-3xl font-black"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px',
              }}
            >
              Grow
            </h1>
            <p className="text-xs font-medium" style={{ color: '#4a4a5a' }}>
              AI-powered music discovery
            </p>
          </div>
        </div>

        {selectedMood && !loading && (
          <div className="flex items-center gap-2">
            <button
              onClick={playAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #1DB954, #17d060)',
                boxShadow: '0 4px 20px rgba(29,185,84,0.4)',
                color: '#000',
                border: 'none',
              }}
            >
              <HiPlay size={16} style={{ marginLeft: '1px' }} />
              Play all
            </button>
            <button
              onClick={clear}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#6a6a7a',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6a6a7a'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            >
              <HiRefresh size={16} />
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <MoodPicker
          selectedMood={selectedMood}
          onSelect={fetchRecommendations}
          loading={loading}
        />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 relative z-10">
          <div className="relative">
            <Loader size={44} color="#8b5cf6" />
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(139,92,246,0.1)', animationDuration: '1.5s' }}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-bold text-white">AI is curating your playlist</p>
            <p className="text-xs" style={{ color: '#4a4a5a' }}>Analyzing mood, tempo, and your taste...</p>
          </div>
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div className="flex flex-col gap-4 relative z-10">
          {reasoning && (
            <div
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.04))',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              <HiSparkles size={16} style={{ color: '#8b5cf6', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-sm font-medium" style={{ color: '#9ca3af', lineHeight: 1.6 }}>
                {reasoning}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3
              className="text-sm font-black uppercase tracking-widest"
              style={{ color: '#4a4a5a' }}
            >
              {recommendations.length} tracks for you
            </h3>
          </div>

          <div className="flex flex-col gap-1">
            {recommendations.map((track, i) => (
              <RecommendationCard
                key={track.id}
                track={track}
                index={i}
                queue={recommendations}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && !selectedMood && (
        <div
          className="flex flex-col items-center justify-center py-16 gap-4 relative z-10 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.08))',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            <HiSparkles size={28} style={{ color: '#8b5cf6' }} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="font-bold text-white">Select a mood above</p>
            <p className="text-sm text-center" style={{ color: '#4a4a5a' }}>
              AI will generate a personalized playlist based on your taste
            </p>
          </div>
        </div>
      )}
    </div>
  )
}