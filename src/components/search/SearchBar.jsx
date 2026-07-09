import { useState, useRef, useEffect } from 'react'
import { HiSearch, HiX } from 'react-icons/hi'

export default function SearchBar({ onSearch, onClear, autoFocus = false }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus()
  }, [autoFocus])

  const handleChange = (e) => {
    const val = e.target.value
    setValue(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (val.trim()) onSearch(val)
      else onClear()
    }, 350)
  }

  const handleClear = () => {
    setValue('')
    onClear()
    inputRef.current?.focus()
  }

  return (
    <div
      className="flex items-center gap-3 px-4 rounded-2xl transition-all duration-200"
      style={{
        background: focused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
        border: focused ? '1px solid rgba(29,185,84,0.4)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: focused ? '0 0 0 3px rgba(29,185,84,0.08), 0 0 24px rgba(29,185,84,0.06)' : 'none',
        height: '48px',
      }}
    >
      <HiSearch
        size={20}
        style={{ color: focused ? '#1DB954' : '#4a4a5a', flexShrink: 0, transition: 'color 0.2s' }}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search songs, artists, albums..."
        className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[#3a3a4a]"
        style={{ color: '#fff', border: 'none' }}
      />
      {value && (
        <button
          onClick={handleClear}
          className="cursor-pointer transition-all duration-200 hover:scale-110 shrink-0"
          style={{ background: 'none', border: 'none', padding: 0, color: '#4a4a5a' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#4a4a5a'}
        >
          <HiX size={16} />
        </button>
      )}
    </div>
  )
}