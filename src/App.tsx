import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import PostCard from '@/components/PostCard'
import { posts } from '@/data/posts'

function App() {
  const [query, setQuery] = useState('')

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f0ede8]">
      <div className="max-w-6xl mx-auto">
        <Header />
        <Hero />
        <SearchBar onSearch={setQuery} />

        <div className="px-8 pb-16 columns-3 gap-4">
          {filtered.map((post) => (
            <div key={post.id} className="break-inside-avoid mb-4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
