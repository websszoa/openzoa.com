import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Category from '@/components/Category'
import PostGrid from '@/components/PostGrid'
import Footer from '@/components/Footer'
import { posts } from '@/data/posts'

export default function Home() {
  const [active, setActive] = useState('전체')

  const filtered = active === '전체'
    ? posts
    : posts.filter((p) => p.tags?.includes(active))

  return (
    <>
      <Header />
      <Hero />
      <Category active={active} onChange={setActive} />
      <PostGrid posts={filtered} />
      <Footer />
    </>
  )
}
