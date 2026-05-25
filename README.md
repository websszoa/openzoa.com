# openzoa.com

React + TypeScript + Vite 기반 블로그 프로젝트

## 기술 스택

- **React 19** + **TypeScript**
- **Vite 8** — 빌드 도구
- **React Router DOM v7** — 클라이언트 사이드 라우팅
- **Tailwind CSS v4** — 유틸리티 기반 스타일링 (`@tailwindcss/vite` 플러그인)
- **shadcn/ui** — Radix UI 기반 컴포넌트 라이브러리

## 설치

```bash
npm create vite@latest . -- --template react-ts
npm install react-router-dom
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init -d
```

## 설정 내용

### vite.config.ts
- `@tailwindcss/vite` 플러그인 추가
- `@` → `./src` 경로 alias 설정

### tsconfig.app.json
- `baseUrl`, `paths` 설정 (`@/*` → `./src/*`)

### src/index.css
- `@import "tailwindcss"` 추가
- shadcn 기본 CSS 변수 포함

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
- **Output directory**: `dist`
- SPA 라우팅을 위해 `public/_redirects` 파일 필요:
  ```
  /* /index.html 200
  ```
