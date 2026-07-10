import { useState, useCallback } from 'react'

const MOODS = ['energetic', 'chill', 'focus', 'sad', 'happy', 'hype', 'romantic', 'late-night']

const mockRecommendations = {
  energetic: [
    { id: 'r1', title: 'INDUSTRY BABY', artist: 'Lil Nas X', duration: 212, gradient: 'linear-gradient(135deg, #f9731640, #ef444430)', available: true },
    { id: 'r2', title: 'Blinding Lights', artist: 'The Weeknd', duration: 200, gradient: 'linear-gradient(135deg, #8b5cf640, #ec489930)', available: true },
    { id: 'r3', title: 'Levitating', artist: 'Dua Lipa', duration: 203, gradient: 'linear-gradient(135deg, #1DB95440, #0ea5e930)', available: true },
    { id: 'r4', title: 'Uptown Funk', artist: 'Bruno Mars', duration: 270, gradient: 'linear-gradient(135deg, #eab30840, #f9731630)', available: true },
  ],
  chill: [
    { id: 'r5', title: 'Sunflower', artist: 'Post Malone', duration: 158, gradient: 'linear-gradient(135deg, #eab30840, #1DB95430)', available: true },
    { id: 'r6', title: 'Golden', artist: 'Harry Styles', duration: 209, gradient: 'linear-gradient(135deg, #f9731640, #eab30830)', available: true },
    { id: 'r7', title: 'Watermelon Sugar', artist: 'Harry Styles', duration: 174, gradient: 'linear-gradient(135deg, #ef444440, #f9731630)', available: true },
    { id: 'r8', title: 'Heat Waves', artist: 'Glass Animals', duration: 238, gradient: 'linear-gradient(135deg, #0ea5e940, #8b5cf630)', available: true },
  ],
  focus: [
    { id: 'r9', title: 'Experience', artist: 'Ludovico Einaudi', duration: 348, gradient: 'linear-gradient(135deg, #6366f140, #8b5cf630)', available: true },
    { id: 'r10', title: 'Comptine dun autre', artist: 'Yann Tiersen', duration: 212, gradient: 'linear-gradient(135deg, #0ea5e940, #6366f130)', available: true },
    { id: 'r11', title: 'Intro', artist: 'The XX', duration: 130, gradient: 'linear-gradient(135deg, #1a1a3a, #2a2a5a)', available: true },
    { id: 'r12', title: 'Clair de Lune', artist: 'Debussy', duration: 296, gradient: 'linear-gradient(135deg, #8b5cf640, #ec489920)', available: true },
  ],
  hype: [
    { id: 'r13', title: 'SICKO MODE', artist: 'Travis Scott', duration: 312, gradient: 'linear-gradient(135deg, #ef444440, #8b5cf630)', available: true },
    { id: 'r14', title: 'God Did', artist: 'DJ Khaled', duration: 344, gradient: 'linear-gradient(135deg, #f9731640, #ef444430)', available: true },
    { id: 'r15', title: 'Rich Flex', artist: 'Drake', duration: 211, gradient: 'linear-gradient(135deg, #eab30840, #f9731630)', available: true },
    { id: 'r16', title: 'HUMBLE', artist: 'Kendrick Lamar', duration: 177, gradient: 'linear-gradient(135deg, #8b5cf640, #6366f130)', available: true },
  ],
  sad: [
    { id: 'r17', title: 'Drivers License', artist: 'Olivia Rodrigo', duration: 242, gradient: 'linear-gradient(135deg, #6366f140, #8b5cf630)', available: true },
    { id: 'r18', title: 'Happier', artist: 'Olivia Rodrigo', duration: 191, gradient: 'linear-gradient(135deg, #0ea5e940, #6366f130)', available: true },
    { id: 'r19', title: 'Someone Like You', artist: 'Adele', duration: 285, gradient: 'linear-gradient(135deg, #8b5cf640, #ec489930)', available: true },
    { id: 'r20', title: 'The Night Will Always Win', artist: 'Manchester Orchestra', duration: 222, gradient: 'linear-gradient(135deg, #1a1a3a, #3a3a6a)', available: true },
  ],
  happy: [
    { id: 'r21', title: 'Happy', artist: 'Pharrell Williams', duration: 233, gradient: 'linear-gradient(135deg, #eab30840, #1DB95430)', available: true },
    { id: 'r22', title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', duration: 237, gradient: 'linear-gradient(135deg, #f9731640, #eab30830)', available: true },
    { id: 'r23', title: 'Good as Hell', artist: 'Lizzo', duration: 159, gradient: 'linear-gradient(135deg, #ec489940, #f9731630)', available: true },
    { id: 'r24', title: 'Shake It Off', artist: 'Taylor Swift', duration: 219, gradient: 'linear-gradient(135deg, #1DB95440, #0ea5e930)', available: true },
  ],
  romantic: [
    { id: 'r25', title: 'Perfect', artist: 'Ed Sheeran', duration: 263, gradient: 'linear-gradient(135deg, #ec489940, #8b5cf630)', available: true },
    { id: 'r26', title: 'All of Me', artist: 'John Legend', duration: 269, gradient: 'linear-gradient(135deg, #f9731640, #ec489930)', available: true },
    { id: 'r27', title: 'Thinking Out Loud', artist: 'Ed Sheeran', duration: 281, gradient: 'linear-gradient(135deg, #eab30840, #f9731630)', available: true },
    { id: 'r28', title: 'Make You Feel My Love', artist: 'Adele', duration: 212, gradient: 'linear-gradient(135deg, #8b5cf640, #ec489930)', available: true },
  ],
  'late-night': [
    { id: 'r29', title: 'Starboy', artist: 'The Weeknd', duration: 230, gradient: 'linear-gradient(135deg, #1a1a3a, #3a1a5a)', available: true },
    { id: 'r30', title: 'Nights', artist: 'Frank Ocean', duration: 307, gradient: 'linear-gradient(135deg, #0a0a2a, #1a1a4a)', available: true },
    { id: 'r31', title: 'After Hours', artist: 'The Weeknd', duration: 361, gradient: 'linear-gradient(135deg, #3a1a1a, #1a0a2a)', available: true },
    { id: 'r32', title: 'Lost', artist: 'Frank Ocean', duration: 185, gradient: 'linear-gradient(135deg, #1a2a3a, #0a1a2a)', available: true },
  ],
}

export default function useAI() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [reasoning, setReasoning] = useState('')

  const fetchRecommendations = useCallback(async (mood) => {
    setLoading(true)
    setSelectedMood(mood)
    setReasoning('')
    await new Promise(r => setTimeout(r, 1200))
    // backend integration — call getAIRecommendations(mood) from services/ai.js
    setRecommendations(mockRecommendations[mood] || [])
    setReasoning(`Based on your ${mood} mood, I picked tracks with matching energy, tempo, and emotional tone from your listening history.`)
    setLoading(false)
  }, [])

  const clear = () => {
    setSelectedMood(null)
    setRecommendations([])
    setReasoning('')
  }

  return { selectedMood, recommendations, loading, reasoning, fetchRecommendations, clear, MOODS }
}