import { useState, useCallback } from 'react'

export default function useSpotifySearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  const search = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); return }
    setQuery(q)
    setLoading(true)
    setError(null)
    try {
      // backend integration — GET /api/search?q=q returns { tracks: [] }
      const mockResults = [
        { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, artwork: '', available: true },
        { id: '2', title: 'As It Was', artist: 'Harry Styles', album: 'Harrys House', duration: 167, available: true },
        { id: '3', title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: 230, available: false },
        { id: '4', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203, available: true },
        { id: '5', title: 'Stay', artist: 'Kid Laroi', album: 'F*ck Love', duration: 141, available: true },
        { id: '6', title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: 198, available: false },
        { id: '7', title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: 178, available: true },
        { id: '8', title: 'Montero', artist: 'Lil Nas X', album: 'Montero', duration: 137, available: true },
      ].filter(t => t.title.toLowerCase().includes(q.toLowerCase()) || t.artist.toLowerCase().includes(q.toLowerCase()))
      setResults(mockResults)
    } catch (e) {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = () => { setResults([]); setQuery('') }

  return { results, loading, error, query, search, clear }
}