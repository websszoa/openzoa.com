/**
 * Gemini API Proxy
 * - API 키는 서버(env)에만 두고, 클라이언트는 이 엔드포인트로만 요청합니다.
 * - README의 "프롬프트" 분석 기준을 사용합니다.
 * @see https://ai.google.dev/api
 * @see https://ai.google.dev/gemini-api/docs/quickstart
 */

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

/** README에 정의된 분석용 시스템 프롬프트 */
const ANALYSIS_PROMPT = `[분석 기준]

- 단순 요약이 아닌, 논리 구조 및 예측력 중심 분석
- 사후적 편향(hindsight bias)을 최소화
- 감정적 평가가 아닌 데이터 기반 관점 유지

1. 핵심 주장 분석

- 영상에서 제시하는 핵심 주장들을 항목별로 정리해줘.
- 각 주장에 대해 다음을 함께 분석해줘:
  • 주장 요약
  • 근거 및 사용된 논리
  • 전제(Assumption)
  • 전제 → 추론 → 결론 구조

2. 제작 시점 기준 환경 분석

- 영상 제작 연도를 명시해줘.
- 당시의 거시경제 환경을 간략히 요약해줘.
  • 금리 수준
  • 유동성 환경
  • 정책 방향
  • 주요 시장 이벤트
- 해당 환경이 주장 형성에 어떤 영향을 주었는지도 설명해줘.

3. 2026년 현재 기준 사후 검증(Post-analysis)

- 각 주장에 대해 다음을 퍼센트로 구분하여 평가해줘:
  • 정확하게 적중한 부분 (%) — 이유 설명
  • 명확하게 빗나간 부분 (%) — 이유 설명
  • 부분적으로 적중한 부분 (%) — 이유 설명
  • 전제가 무너진 부분 (%) — 이유 설명
- 가능하다면 실제 시장 데이터 또는 구조적 변화 요인을 근거로 제시해줘.

4. 종합 평가

- 영상 전체 주장에 대한 종합 정확도를 퍼센트로 제시해줘.
- 제작 시점과 현재 시점의 구조적 차이를 비교해줘.
- 결과적으로 이 영상이 갖는 현재적 의미를 정리해줘.
- 장기 투자 전략 관점에서 유효성 여부도 함께 평가해줘.

출력 형식:

- 표를 사용하지 말 것
- 번호 및 리스트 형식으로 구조적으로 정리할 것
- 전문적이고 분석 보고서 스타일로 작성할 것
- 사실적이고 객관적인 내용을 적시할 것
- **반드시 Markdown 형식으로 작성할 것** (제목은 #, ##, 소제목·리스트는 -, 1. 등 활용)

---

아래 텍스트를 위 분석 기준에 따라 분석해줘.

`

interface Env {
  GEMINI_API_KEY?: string
}

interface GeminiRequestBody {
  contents: Array<{
    role?: string
    parts: Array<{ text: string }>
  }>
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> }
    finishReason?: string
  }>
  error?: { message?: string; code?: number }
}

type PagesFunctionContext = { env: Env; request: Request }

export const onRequestPost = async (
  context: PagesFunctionContext
): Promise<Response> => {
  const apiKey = context.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body: { content?: string }
  try {
    body = (await context.request.json()) as { content?: string }
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const userContent = body?.content?.trim()
  if (!userContent) {
    return new Response(
      JSON.stringify({ error: 'Body must include "content" (text to analyze)' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const prompt = ANALYSIS_PROMPT + userContent
  const requestBody: GeminiRequestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  }

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(requestBody),
  })

  const data = (await res.json()) as GeminiResponse

  if (!res.ok) {
    return new Response(
      JSON.stringify({
        error: data.error?.message || 'Gemini API error',
        status: res.status,
      }),
      { status: res.status, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  return new Response(
    JSON.stringify({ text, finishReason: data.candidates?.[0]?.finishReason }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
