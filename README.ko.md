# Han Stack - 모던 SaaS 템플릿

[![ja](https://img.shields.io/badge/lang-ja-red.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ja.md)
[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.md)

> 이 템플릿은 현재 개발 중입니다. 예제 코드는 곧 추가될 예정이지만, 프로덕션 환경에서 사용 가능합니다. (Tanstack start 버전에 따라 다름)

최신 기술로 구축된 강력한 풀스택 SaaS 스타터 템플릿입니다. 이 템플릿은 모범 사례와 업계 표준 도구를 사용하여 확장 가능한 SaaS 애플리케이션을 구축하기 위한 견고한 기반을 제공합니다.

## 기능

- 🚀 **풀스택 TypeScript** - 엔드투엔드 타입 안정성
- ⚡ **고성능** - Vite를 사용한 성능 중심 설계
- 🔄 **모던 데이터 페칭** - TanStack Query 기반
- 🛣️ **타입 안전한 라우팅** - TanStack Router 사용
- 🔒 **타입 안전한 RPC** - ORPC를 통한 엔드투엔드 타입 안정성
- ✨ **모범 사례** - 현대적인 개발 표준 준수
- 🎨 **컴포넌트 아키텍처** - 잘 구성되고 확장 가능한 구조
- 🛠️ **개발자 경험** - Biome 설정으로 향상

## 기술 스택

### 프론트엔드

- [React](https://react.dev) - UI 라이브러리 (v19.1)
- [TanStack Router](https://tanstack.com/router/latest) - 타입 안전한 라우팅
- [TanStack Query](https://tanstack.com/query/latest) - 데이터 동기화
- [Tailwind CSS v4](https://tailwindcss.com) - 유틸리티 우선 CSS 프레임워크
- [Radix UI](https://www.radix-ui.com) - 헤드리스 UI 컴포넌트
- [shadcn/ui](https://ui.shadcn.com) - Radix UI 기반 재사용 가능한 컴포넌트
- [Vite](https://vitejs.dev) - 빌드 도구 및 개발 서버

### 백엔드 & API

- [TanStack Start](https://tanstack.com/start/latest) - 풀스택 프레임워크
- [ORPC](https://orpc.unnoq.com) - 엔드투엔드 타입 안정성을 위한 타입 안전 RPC
- [Prisma](https://www.prisma.io/) - 모던 데이터베이스 ORM
- [Cloudflare Workers](https://workers.cloudflare.com) - 엣지 런타임 배포

### 개발 & 툴링

- [TypeScript](https://www.typescriptlang.org) - 전체적인 타입 안정성
- [Biome](https://biomejs.dev) - 빠른 포매터 및 린터
- [Zod](https://zod.dev) - 런타임 타입 검증
- [Zod Prisma Types](https://github.com/chrishoermann/zod-prisma-types) - 자동 생성된 Zod 스키마
- [React Hook Form](https://react-hook-form.com) - 검증 기능이 있는 고성능 폼

## 시작하기

### 사전 요구사항

- Node.js (v20 이상)
- pnpm

### 설치

1. 저장소 복제

   ```bash
   git clone https://github.com/Insik-Han/han-stack.git
   cd han-stack
   ```

2. .env 생성

   ```bash
   cp .env.example .env
   ```

3. 의존성 설치

   ```bash
   pnpm install --frozen-lockfile
   ```

4. 패키지 셋업

   ```bash
   pnpm run setup
   ```

5. 개발 서버 시작

   ```bash
   pnpm run dev
   ```

## 개발

### 프로젝트 구조

```txt
src/
├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── ui/            # 원자/분자 UI 컴포넌트
│   ├── layout/        # 레이아웃 관련 컴포넌트
│   ├── errors/        # 에러 핸들링 컴포넌트
│   └── ...            # 기타 공유 컴포넌트
├── constants/         # 애플리케이션 상수
├── features/          # 기능 모듈
│   ├── auth/          # 인증 기능
│   ├── global-search/ # 전역 검색 기능
│   ├── settings/      # 설정 기능
│   ├── tasks/         # 작업 관리 기능
│   └── theme/         # 테마 기능
├── hooks/             # 커스텀 React 훅
├── lib/               # 공유 라이브러리 및 헬퍼
├── routes/            # 애플리케이션 라우트 및 페이지
│   ├── _admin-console/ # 관리자 콘솔 라우트
│   ├── api/           # API 라우트
│   ├── (auth)/        # 인증 관련 라우트
│   ├── (errors)/      # 에러 페이지
│   └── __root.tsx     # 루트 엔트리
├── server/            # 백엔드/서버 로직
│   ├── routes/        # 서버 사이드 라우트
│   ├── handler.ts     # 서버 핸들러
│   ├── prisma.ts      # Prisma 인스턴스
│   └── router.ts      # 서버 라우터
├── styles/            # 전역 및 컴포넌트 스타일
├── utils/             # 유틸리티 함수
├── router.tsx         # 클라이언트 라우터
├── routeTree.gen.ts   # 자동 생성된 라우트 트리
└── ...
public/                # 정적 파일 (이미지, favicon 등)
├── assets/            # 정적 자산 (예: 로고)
├── favicon.ico        # 파비콘
prisma/                # Prisma 스키마 및 시드 데이터
├── schema.prisma      # Prisma DB 스키마
├── seed.ts            # 시드 데이터 스크립트

기타 주요 파일:
- package.json         # 프로젝트 메타데이터 및 의존성
- tsconfig.json        # TypeScript 설정
- postcss.config.js    # PostCSS 설정
- wrangler.jsonc       # Cloudflare Workers 설정
- biome.jsonc          # Biome (포매터/린터) 설정
```

각 디렉토리와 파일에 대한 자세한 내용은 코드와 주석을 참조하세요.

### 스크립트

#### 개발

- `pnpm run dev` - 포트 3000에서 개발 서버 시작
- `pnpm run build` - 프로덕션 빌드
- `pnpm run preview` - Wrangler로 프리뷰 (Cloudflare Workers)

#### 데이터베이스

- `pnpm run generate` - Prisma 클라이언트 및 Zod 타입 생성
- `pnpm run prisma:studio` - Prisma Studio GUI 열기
- `pnpm run db:seed` - 테스트 데이터로 데이터베이스 시드
- `pnpm run db:reset` - 데이터베이스 및 마이그레이션 리셋
- `pnpm run migrate:dev` - 개발 환경에서 Prisma 마이그레이션 실행
- `pnpm run migrate` - 프로덕션에 마이그레이션 배포

#### 코드 품질

- `pnpm run biome` - Biome으로 코드 포맷 및 린트
- `pnpm run tsc` - TypeScript 타입 검사 실행

## 배포

### Cloudflare Workers

Cloudflare Workers로 배포하려면 [여기](https://github.com/backpine/tanstack-start-beta-on-cloudflare)의 가이드를 따르세요.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다 - 자세한 내용은 LICENSE 파일을 참조하세요.

## 지원

이 템플릿이 도움이 된다면 스타⭐️를 주시기 바랍니다.

## 영감

이 프로젝트는 다음의 훌륭한 저장소들로부터 영감을 받았습니다:

- [shadcn-admin](https://github.com/satnaing/shadcn-admin)
- [create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack)

---

Built with ❤️ by Insik-Han
