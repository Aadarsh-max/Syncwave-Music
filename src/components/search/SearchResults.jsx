import TrackCard from './TrackCard.jsx'
import UnavailableFallbackCard from './UnavailableFallbackCard.jsx'
import Loader from '../ui/Loader.jsx'

export default function SearchResults({ results, loading, query }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader size={36} />
        <p className="text-sm font-medium" style={{ color: '#4a4a5a' }}>Searching...</p>
      </div>
    )
  }

  if (!query) return null

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-3xl" style={{ filter: 'grayscale(1)' }}>🔍</span>
        </div>
        <p className="font-bold text-white">No results for "{query}"</p>
        <p className="text-sm" style={{ color: '#4a4a5a' }}>Try different keywords</p>
      </div>
    )
  }

  const available = results.filter(t => t.available)
  const unavailable = results.filter(t => !t.available)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4 mb-2">
        <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: '#4a4a5a' }}>
          Songs
        </h3>
        <span className="text-xs" style={{ color: '#3a3a4a' }}>
          {results.length} results
        </span>
      </div>

      {available.map((track, i) => (
        <TrackCard key={track.id} track={track} index={i} queue={available} />
      ))}

      {unavailable.length > 0 && (
        <>
          <div className="px-4 mt-4 mb-2">
            <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: '#3a3a4a' }}>
              Not available on SyncWave
            </h3>
          </div>
          {unavailable.map((track) => (
            <UnavailableFallbackCard
              key={track.id}
              track={track}
              onPlayFallback={() => {
                // backend integration — find similar track on Audius
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}