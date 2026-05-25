# openzoa.com

React + TypeScript + Vite 기반 블로그 프로젝트

## 기술 스택

| 패키지 | 버전 | 용도 |
|--------|------|------|
| react | ^19 | UI 라이브러리 |
| typescript | ~6.0 | 타입 시스템 |
| vite | ^8 | 빌드 도구 |
| react-router-dom | ^7 | 클라이언트 라우팅 |
| tailwindcss | ^4 | 유틸리티 CSS |
| @tailwindcss/vite | ^4 | Tailwind Vite 플러그인 |
| shadcn | ^4 | 컴포넌트 라이브러리 |
| lucide-react | ^1 | 아이콘 |
| @radix-ui/react-slot | ^1 | shadcn 의존성 |
| class-variance-authority | ^0.7 | 컴포넌트 variant 관리 |
| clsx + tailwind-merge | latest | 클래스 조합 유틸 (`cn()`) |
| @fontsource-variable/geist | ^5 | Geist 폰트 |
| tw-animate-css | ^1 | Tailwind 애니메이션 |

## 설치

```bash
npm create vite@latest . -- --template react-ts
npm install react-router-dom
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init -d
npm install @radix-ui/react-slot
```

## 설정 내용

### vite.config.ts
- `@tailwindcss/vite` 플러그인 추가
- `@` → `./src` 경로 alias 설정

### tsconfig.app.json
- `baseUrl`, `paths` 설정 (`@/*` → `./src/*`)
- `ignoreDeprecations: "6.0"` — TypeScript 6.0 호환

### src/index.css
- Tailwind, shadcn, Geist 폰트 import
- `@font-face` — Anyvid, Paperlogy (400/600/900), NanumSquareNeo
- `@theme inline` — Tailwind 커스텀 토큰 (`font-anyvid`, `font-paperlogy`, `font-nanum`)
- CSS 변수 — `--background: #F9F7F3` 등

### .vscode/settings.json
- `css.lint.unknownAtRules: ignore` — Tailwind v4 `@theme` 경고 제거

## 폰트 사용법

```tsx
<p className="font-anyvid">Anyvid</p>
<p className="font-paperlogy font-normal">Paperlogy Regular</p>
<p className="font-paperlogy font-semibold">Paperlogy Semibold</p>
<p className="font-paperlogy font-black">Paperlogy Black</p>
<p className="font-nanum">나눔스퀘어네오</p>
```

## shadcn 컴포넌트 추가 방법

```bash
npx shadcn@latest add [컴포넌트명]

# 예시
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add input
```

## 개발 서버 실행

```bash
npm run dev
```

## 빌드

```bash
npm run build
```

## 배포 (Cloudflare Pages)

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- SPA 라우팅을 위해 `public/_redirects` 파일 필요:
  ```
  /* /index.html 200
  ```
