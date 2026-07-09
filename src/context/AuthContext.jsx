import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const loginWithSpotify = async () => {
    setLoading(true)
    // backend integration — redirect to /api/auth/spotify
    window.location.href = '/api/auth/spotify'
  }

  const loginAsGuest = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      avatar: '',
      isGuest: true,
      topGenres: [],
      following: 0,
      followers: 0,
    })
  }

  const logout = () => {
    setUser(null)
    // backend integration — call /api/auth/logout
  }

  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }))

  return (
    <AuthContext.Provider value={{ user, loading, loginWithSpotify, loginAsGuest, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}