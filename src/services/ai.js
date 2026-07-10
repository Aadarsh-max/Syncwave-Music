export async function getAIRecommendations(mood, topTracks = [], topGenres = []) {
  // backend integration — POST /api/ai/recommendations
  // sends { mood, topTracks, topGenres } returns { tracks: [], reasoning: '' }
  return null
}

export async function getMoodFromHistory(history = []) {
  // backend integration — POST /api/ai/mood returns { mood: string, confidence: number }
  return null
}