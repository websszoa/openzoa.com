import { useState } from 'react'
import './App.css'

const menuItems = ['Details', 'Resources', 'About', 'Submit']

/** YouTube URL에서 video ID 추출 (파일명 등에 사용) */
function getYouTubeVideoId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com') && u.searchParams.has('v')) {
      return u.searchParams.get('v')
    }
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null
  } catch {
    return null
  }
  return null
}

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDownloadMd = () => {
    if (!result) return
    const videoId = getYouTubeVideoId(youtubeUrl.trim())
    const filename = videoId ? `analysis-${videoId}.md` : `analysis-${Date.now()}.md`
    const blob = new Blob([result], { type: 'text/markdown;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const handleAnalyze = async () => {
    const url = youtubeUrl.trim()
    if (!url) return
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: url }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || `요청 실패 (${res.status})`)
        return
      }
      setResult(data.text ?? '')
    } catch (e) {
      setError(e instanceof Error ? e.message : '연결할 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {/* 헤더: 왼쪽 로고, 오른쪽 메뉴 */}
      <header className="header">
        <a href="/" className="logo" aria-label="Home">
          <span className="logo-icon" />
        </a>
        <nav className="nav">
          {menuItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              - {item}
            </a>
          ))}
        </nav>
      </header>

      {/* 타이틀 섹션 */}
      <section className="hero">
        <h1 className="hero-title">
          A collection of small details
          <br />
          that make big difference
        </h1>
        <p className="hero-subtitle">Curated by Rexe Wang</p>
      </section>

      {/* 유튜브 영상 주소 입력 */}
      <section className="toolbar">
        <div className="toolbar-url">
          <label htmlFor="youtube-url" className="toolbar-label">
            유튜브 영상 주소
          </label>
          <input
            id="youtube-url"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="input input-url"
            autoComplete="url"
          />
          <button
            type="button"
            className="btn-analyze"
            aria-label="분석"
            onClick={handleAnalyze}
            disabled={loading || !youtubeUrl.trim()}
          >
            분석
          </button>
        </div>
      </section>

      {/* 분석 로딩 / 결과 (주소창 밑) */}
      <main className="main main-result">
        {loading && (
          <div className="analysis-loading" aria-live="polite">
            <span className="analysis-loading-dots">분석중</span>
          </div>
        )}
        {!loading && error && (
          <div className="analysis-error" role="alert">
            {error}
          </div>
        )}
        {!loading && result && (
          <div className="analysis-result">
            <div className="analysis-result-actions">
              <button
                type="button"
                className="btn-download-md"
                onClick={handleDownloadMd}
              >
                MD로 저장
              </button>
            </div>
            <pre className="analysis-result-text">{result}</pre>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
