import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Category from '@/components/Category'
import PostGrid from '@/components/PostGrid'
import { posts } from '@/data/posts'

function App() {
  const [active, setActive] = useState('전체')

  const filtered = active === '전체'
    ? posts
    : posts.filter((p) => p.tags.includes(active))

  return (
    <>
      <Header />
      <Hero />
      <Category active={active} onChange={setActive} />
      <PostGrid posts={filtered} />
    </>
  )
}

export default App
