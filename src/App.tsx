import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Ranking from '@/pages/Ranking'
import Detail from '@/pages/Detail'
import ScrollToTop from '@/components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/tool/:slug" element={<Detail />} />
      </Routes>
    </>
  )
}

export default App
