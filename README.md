# openzoa.com

## 스택 (Stack)

### 런타임 / 빌드

- **React** `^19.2.0` – UI 라이브러리
- **React DOM** `^19.2.0` – React DOM 렌더러
- **Vite** `^7.3.1` – 빌드 도구 및 dev 서버
- **@vitejs/plugin-react** `^5.1.1` – Vite용 React 플러그인 (Fast Refresh 등)
- **Wrangler** `^3.99.0` – Cloudflare Pages/Workers CLI (배포 및 로컬 Functions)

### 언어 / 타입

- **TypeScript** `~5.9.3` – 타입 체크 및 빌드
- **@types/node** `^24.10.1` – Node 타입 정의
- **@types/react** `^19.2.7` – React 타입 정의
- **@types/react-dom** `^19.2.3` – React DOM 타입 정의

### 린트

- **ESLint** `^9.39.1` – 린터
- **@eslint/js** `^9.39.1` – ESLint JS 설정
- **typescript-eslint** `^8.48.0` – TypeScript용 ESLint 규칙
- **eslint-plugin-react-hooks** `^7.0.1` – React Hooks 규칙
- **eslint-plugin-react-refresh** `^0.4.24` – React Fast Refresh 규칙
- **globals** `^16.5.0` – 전역 변수 정의 (ESLint용)

---

## 스크립트

| 명령어                 | 설명                                             |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | 개발 서버 실행 (Vite)                            |
| `npm run build`        | TypeScript 체크 후 프로덕션 빌드                 |
| `npm run preview`      | 빌드 결과물 로컬 미리보기                        |
| `npm run lint`         | ESLint 실행                                      |
| `npm run pages:dev`    | Cloudflare Pages + Functions 로컬 실행 (빌드 후) |
| `npm run pages:deploy` | Cloudflare Pages에 배포                          |

---

## 프로젝트 구조 (요약)

```
openzoa.com/
├── functions/       # Cloudflare Functions (API 등)
├── src/
│   ├── App.tsx      # 메인 앱 컴포넌트
│   ├── App.css
│   ├── main.tsx     # 엔트리
│   └── index.css    # 글로벌 스타일
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

---

## Cloudflare Pages + Functions

정적 사이트(Vite 빌드 결과)는 **Cloudflare Pages**에, API·서버 로직은 **Cloudflare Functions**로 배포합니다.

### 전제

- [Cloudflare 계정](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (전역 또는 프로젝트 내 `npx` 사용)

### 1. Wrangler 설치 (선택)

```bash
npm install -D wrangler
```

### 2. Functions 폴더 구조

프로젝트 **루트**에 `functions` 폴더를 만들고, 파일 이름이 경로가 됩니다.

```
openzoa.com/
├── functions/           # Cloudflare Functions (루트에 둠)
│   ├── api/
│   │   └── hello.ts     # → /api/hello
│   └── health.ts        # → /health
├── src/
├── dist/                # Vite 빌드 결과 (배포 대상)
└── ...
```

### 3. Function 예시

`functions/api/hello.ts`:

```ts
export const onRequestGet = () => {
  return new Response(JSON.stringify({ message: "Hello from Cloudflare" }), {
    headers: { "Content-Type": "application/json" },
  });
};
```

[Pages Functions 문서](https://developers.cloudflare.com/pages/functions/)에서 `onRequest`, `onRequestGet` 등 다양한 라이프사이클 훅을 확인할 수 있습니다.

### 4. 배포 설정

**방법 A – Git 연동 (권장)**  
Cloudflare 대시보드 → Pages → Create project → Connect Git → 이 저장소 연결 후:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** (비워두거나 프로젝트 루트)
- Functions는 루트의 `functions` 폴더를 자동으로 인식합니다.

**방법 B – Wrangler로 직접 배포**

```bash
npm run build
npx wrangler pages deploy dist --project-name=openzoa-com
```

첫 배포 시 `wrangler pages project create openzoa-com`으로 프로젝트를 만들 수 있습니다.

### 5. 로컬에서 테스트 (두 가지 방법)

**방법 1 – 빌드 후 Pages 로컬 서버만 사용**

```bash
npm run build
npm run pages:dev
```

브라우저에서 **http://localhost:8788** 로 접속하면 앱 + API가 함께 동작합니다. (Vite HMR 없음)

**방법 2 – Vite 개발 서버 + API 프록시 (HMR 사용)**

1. **터미널 1:** API 서버 실행 (한 번만 빌드 후 실행)

   ```bash
   npm run build && npm run pages:dev
   ```

2. **터미널 2:** Vite 개발 서버 실행

   ```bash
   npm run dev
   ```

브라우저에서 **http://localhost:5173** 로 접속합니다. 코드 수정 시 바로 반영되고, `/api/*` 요청은 자동으로 8788로 프록시되어 **분석** 버튼이 로컬에서 동작합니다.

> `.dev.vars`에 `GEMINI_API_KEY`가 있어야 분석이 정상 동작합니다.

### 요약

| 작업                | 명령어                                                        |
| ------------------- | ------------------------------------------------------------- |
| 로컬 테스트 (앱+API) | `npm run build` 후 `npm run pages:dev` → http://localhost:8788 |
| 로컬 테스트 (HMR)   | 터미널1: `npm run build && npm run pages:dev` / 터미널2: `npm run dev` → http://localhost:5173 |
| Pages에 배포        | Git 푸시 (연동 시 자동) 또는 `npx wrangler pages deploy dist` |

---

## Gemini API 설정

분석용 API는 [Gemini API](https://ai.google.dev/api)를 사용하며, **Cloudflare Function**에서만 호출합니다. API 키는 클라이언트에 노출되지 않습니다.

- [Gemini API reference](https://ai.google.dev/api)
- [Gemini API quickstart](https://ai.google.dev/gemini-api/docs/quickstart)

### 1. API 키 발급

[Google AI Studio](https://aistudio.google.com/apikey)에서 API 키를 발급합니다.

### 2. 환경 변수 설정

**로컬에서 Pages + Functions 실행할 때**

프로젝트 루트에 `.dev.vars` 파일을 만들고 다음 한 줄을 넣습니다.

```bash
GEMINI_API_KEY=발급받은_API_키
```

`.dev.vars.example`을 복사해 `.dev.vars`로 저장한 뒤 값을 채워도 됩니다. (`.dev.vars`는 `.gitignore`에 포함되어 커밋되지 않습니다.)

**Cloudflare Pages 배포 환경**

대시보드 → **Pages** → 해당 프로젝트 → **Settings** → **Environment variables**에서 다음을 추가합니다.

| 이름             | 값              | 비고   |
| ---------------- | --------------- | ------ |
| `GEMINI_API_KEY` | (발급받은 키)   | Secret 권장 |

### 3. API 사용 방법

**엔드포인트:** `POST /api/gemini`

**요청 body (JSON):**

```json
{
  "content": "분석할 텍스트 (예: 영상 대본 또는 요약)"
}
```

**응답 (JSON):**

```json
{
  "text": "Gemini가 분석 기준에 따라 생성한 분석 결과 텍스트",
  "finishReason": "STOP"
}
```

에러 시 `error` 필드와 HTTP 상태 코드가 반환됩니다.

**예시 (curl):**

```bash
curl -X POST http://localhost:8788/api/gemini \
  -H "Content-Type: application/json" \
  -d '{"content":"2020년 영상 요약: 금리 인하 예상..."}'
```

분석 기준(프롬프트)은 README의 **프롬프트** 섹션과 동일하게 `functions/api/gemini.ts`에 포함되어 있습니다.

### 4. API 결과 저장 (MD / MDX)

- **화면에서:** 분석 결과 아래 **MD로 저장** 버튼을 누르면 `.md` 파일로 다운로드됩니다. 파일명은 `analysis-{영상ID}.md` 또는 `analysis-{타임스탬프}.md`입니다.
- **형식:** Gemini 응답은 Markdown으로 생성되므로, 그대로 `.md`로 저장해 두고 나중에 `.mdx`로 확장자만 바꿔서 MDX 파이프라인에 넣을 수 있습니다. (MDX는 Markdown + JSX이므로, 지금처럼 텍스트만 있어도 동작합니다.)
- **서버에 저장하고 싶다면:** Cloudflare KV·D1·R2에 저장하는 API를 추가하면 됩니다. (현재는 클라이언트 다운로드만 지원합니다.)

---

## 처음 설정 및 실행

이 프로젝트는 **Vite** 공식 스캐폴딩으로 생성했습니다 (`npm create vite@latest`).

### 프로젝트를 새로 만들 때

```bash
npm create vite@latest
# 프로젝트 이름 입력 후, React + TypeScript 템플릿 선택

npm install -D wrangler
```

### 프롬프트

[분석 기준]

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
