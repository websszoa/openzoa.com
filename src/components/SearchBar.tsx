import { useState } from 'react'

type Props = {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('')

  return (
    <div className="flex items-center gap-3 px-8 mb-8">
      {/* Email */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white text-sm text-gray-500 min-w-48">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 7 10-7" />
        </svg>
        <span>hi@openzoa.com</span>
        <div className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-gray-900 text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white text-sm text-gray-400 flex-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search details"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onSearch(e.target.value)
          }}
          className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400"
        />
        <span className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-400">F</span>
      </div>

      {/* Filter */}
      <button className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white text-sm text-gray-600 hover:border-gray-400 transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 3H2l8 9.46V19l4 2V12.46z" />
        </svg>
        Filter
        <span className="text-gray-300">—</span>
      </button>
    </div>
  )
}
