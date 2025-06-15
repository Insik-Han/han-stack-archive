# Han Stack - 모던 SaaS 템플릿

[![ja](https://img.shields.io/badge/lang-ja-red.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ja.md)
[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.md)

최신 기술로 구축된 강력한 풀스택 SaaS 스타터 템플릿입니다. 이 템플릿은 모범 사례와 업계 표준 도구를 사용하여 확장 가능한 SaaS 애플리케이션을 구축하기 위한 견고한 기반을 제공합니다.

## 기능

- 🚀 **풀스택 TypeScript** - 엔드투엔드 타입 안정성
- ⚡ **고성능** - Vite를 사용한 성능 중심 설계
- 🔄 **모던 데이터 페칭** - TanStack Query 기반
- 🛣️ **타입 안전한 라우팅** - TanStack Router 사용
- 🔒 **타입 안전한 RPC** - ORPC를 통한 엔드투엔드 타입 안정성
- ✨ **모범 사례** - 현대적인 개발 표준 준수
- 🎨 **컴포넌트 아키텍처** - 잘 구성되고 확장 가능한 컴포넌트 구조
- 🛠️ **개발자 경험** - Biome 설정으로 향상
- 📊 **재사용 가능한 데이터 테이블** - 정렬, 필터링, 페이지네이션 기능이 있는 공통 DataTable 컴포넌트
- 👥 **사용자 관리** - 내장된 사용자 관리 기능

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

- [TanStack Start](https://tanstack.com/start/latest) - 풀스택 프레임워크 (베타)
- [ORPC](https://orpc.unnoq.com) - 엔드투엔드 타입 안정성을 위한 타입 안전 RPC
- [Prisma](https://www.prisma.io/) - 모던 데이터베이스 ORM
- [Better Auth](https://better-auth.com) - 인증 프레임워크

### 개발 & 툴링

- [TypeScript](https://www.typescriptlang.org) - 전체적인 타입 안정성
- [Biome](https://biomejs.dev) - 빠른 포매터 및 린터
- [Zod](https://zod.dev) - 런타임 타입 검증
- [Zod Prisma Types](https://github.com/chrishoermann/zod-prisma-types) - 자동 생성된 Zod 스키마
- [React Hook Form](https://react-hook-form.com) - 검증 기능이 있는 고성능 폼

## 시작하기

### 사전 요구사항

- Node.js 20+
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
pnpm install
```

4. 개발 환경 설정

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
│   ├── data-table/    # 재사용 가능한 데이터 테이블 컴포넌트
│   └── ...            # 기타 공유 컴포넌트
├── constants/         # 애플리케이션 상수
├── features/          # 기능 모듈
│   ├── auth/          # 인증 기능
│   ├── global-search/ # 전역 검색 기능
│   ├── settings/      # 설정 기능
│   ├── tasks/         # 작업 관리 기능
│   ├── users/         # 사용자 관리 기능
│   └── theme/         # 테마 기능
├── hooks/             # 커스텀 React 훅
├── lib/               # 공유 라이브러리 및 헬퍼
├── routes/            # 애플리케이션 라우트 및 페이지
│   ├── _admin-console/ # 관리자 콘솔 라우트
│   ├── api/           # API 라우트
│   ├── (auth)/        # 인증 관련 라우트
│   ├── (errors)/      # 에러 페이지
│   └── __root.tsx     # 루트 라우트 엔트리
├── server/            # 백엔드/서버 로직
│   ├── api/           # API 엔드포인트
│   │   ├── routes/    # API 라우트 핸들러
│   │   └── router.ts  # API 라우터
│   ├── handler.ts     # RPC 핸들러
│   └── db.ts          # 데이터베이스 연결
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
├── seed.ts            # 시드 데이터 스크립트 (테스트 데이터를 위해 faker.js 사용)

기타 주요 파일:
- package.json         # 프로젝트 메타데이터 및 의존성
- tsconfig.json        # TypeScript 설정
- biome.jsonc          # Biome (포매터/린터) 설정
- CLAUDE.md            # Claude AI 어시스턴트를 위한 가이드라인
```

각 디렉토리와 파일에 대한 자세한 내용은 코드와 주석을 참조하세요.

### 스크립트

#### 개발

- `pnpm run dev` - 포트 3000에서 개발 서버 시작
- `pnpm run build` - 프로덕션 빌드
- `pnpm run start` - 프로덕션 서버 시작

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

#### 테스팅

- `pnpm run test` - 모든 테스트 실행
- `pnpm run test:unit` - 유닛 테스트 실행
- `pnpm run test:ui` - UI 테스트 실행
- `pnpm run test:e2e` - Playwright로 E2E 테스트 실행
- `pnpm run test:e2e:ui` - Playwright UI 모드로 E2E 테스트 실행
- `pnpm run coverage` - 커버리지 리포트와 함께 테스트 실행

## 테스팅

프로젝트는 테스트 범위에 따라 다른 테스트 접근법을 사용합니다:

- **유닛 테스트** (`*.unit.spec.ts`) - Node.js 환경에서 실행되는 빠르고 격리된 테스트
- **UI 테스트** (`*.ui.spec.ts`) - 실제 브라우저 환경에서 실행되는 컴포넌트 테스트
- **E2E 테스트** (`*.test.ts`) - Playwright를 사용한 엔드투엔드 테스트

### 테스트 설정

#### Vitest 설정

프로젝트는 `vite.config.ts`에 설정된 두 개의 별도 테스트 프로젝트와 함께 Vitest를 사용합니다:

```typescript
test: {
  projects: [
    {
      test: {
        name: 'unit',
        include: ['src/**/*.unit.spec.{ts,tsx}'],
      },
    },
    {
      test: {
        name: 'ui',
        include: ['src/**/*.ui.spec.{ts,tsx}'],
        browser: {
          enabled: true,
          provider: 'playwright',
          instances: [{ browser: 'chromium' }],
          headless: true,
        },
      },
    },
  ],
}
```

#### Playwright 설정

E2E 테스트는 `playwright.config.ts`에 다음과 같이 설정되어 있습니다:

- 테스트 디렉토리: `./tests/e2e`
- 베이스 URL: `http://localhost:3000`
- 브라우저: Chromium과 WebKit
- 자동 개발 서버 시작

### 테스트 실행

#### 유닛 테스트

```bash
# 모든 유닛 테스트 실행
pnpm run test:unit

# 감시 모드로 테스트 실행
pnpm run test:unit --watch

# 특정 테스트 파일 실행
pnpm run test src/schemas/upload.unit.spec.ts
```

#### UI 테스트

```bash
# 모든 UI 테스트 실행
pnpm run test:ui

# 감시 모드로 실행
pnpm run test:ui --watch
```

#### E2E 테스트

```bash
# 모든 E2E 테스트 실행
pnpm run test:e2e

# 특정 테스트 실행
pnpm exec playwright test tests/e2e/example.test.ts

# 디버깅을 위한 UI 모드로 실행
pnpm run test:e2e:ui
```

### 테스트 작성

#### 유닛 테스트

유닛 테스트는 순수 로직, 유틸리티, 서버 사이드 코드를 테스트하기 위한 것입니다:

```typescript
// src/schemas/upload.unit.spec.ts
import { describe, expect, it } from "vitest";
import { fileSchema } from "./upload";

describe("fileSchema", () => {
  it("should accept any value in Node.js environment", () => {
    expect(fileSchema.safeParse("string").success).toBe(true);
  });
});
```

#### UI 테스트

UI 테스트는 DOM 상호작용을 통한 React 컴포넌트 테스트를 위한 것입니다:

```typescript
// src/hooks/use-mobile.ui.spec.ts
import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import { useMobile } from "./use-mobile";

test("should detect mobile viewport", () => {
  const { result } = renderHook(() => useMobile());
  expect(result.current).toBe(false);
});
```

#### E2E 테스트

E2E 테스트는 실제 사용자 상호작용을 시뮬레이션합니다:

```typescript
// tests/e2e/example.test.ts
import { expect, test } from "@playwright/test";

test("Go to sign-in", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(page.locator('[data-slot="card-title"]')).toHaveText("Login");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
```

### CI/CD 통합

프로젝트는 재사용 가능한 액션으로 최적화된 워크플로우를 사용하여 지속적 통합을 위해 GitHub Actions를 사용합니다:

#### 재사용 가능한 액션

`.github/actions/`에 위치:

- **setup-pnpm** - pnpm과 프로젝트 의존성 설치
- **setup-database** - 마이그레이션을 통한 테스트 데이터베이스 설정

#### CI 워크플로우

CI 워크플로우 (`.github/workflows/ci.yml`)는 풀 리퀘스트에서 실행되며 다음을 포함합니다:

1. **Biome** - 코드 포맷팅 및 린팅
2. **TypeScript** - 타입 검사
3. **Vitest** - 커버리지 리포팅을 포함한 유닛 및 UI 테스트
4. **Playwright** - 아티팩트 업로드를 포함한 E2E 테스트

### 모범 사례

#### 테스트 구성

- 테스트하는 코드 옆에 유닛 테스트를 배치 (예: `schema.ts` → `schema.unit.spec.ts`)
- 테스트하는 컴포넌트 가까이에 UI 테스트 유지
- 기능이나 사용자 플로우별로 E2E 테스트 그룹화

#### 테스트 네이밍

- 무엇을 테스트하는지 설명하는 설명적인 테스트 이름 사용
- 패턴 따르기: "should [예상 동작] when [조건]"
- `describe` 블록을 사용하여 관련 테스트 그룹화

#### 테스트 데이터

- 복잡한 테스트 데이터를 위해 팩토리나 빌더 사용
- 테스트 데이터를 최소한으로 유지하되 현실적으로
- 필요한 경우 테스트 후 테스트 데이터 정리

#### 단언문

- 일반적인 것보다 구체적인 단언문 사용
- 긍정적인 경우와 부정적인 경우 모두 테스트
- 테스트에 엣지 케이스 포함

### 환경 고려사항

#### 서버 사이드 vs 클라이언트 사이드

테스트 작성 시 환경 차이를 인식하세요:

- 서버 사이드 테스트는 Node.js에서 실행 (DOM 없음, 브라우저 API 없음)
- 클라이언트 사이드 테스트는 DOM 조작을 위해 브라우저 환경 필요
- 일부 스키마/유틸리티는 환경에 따라 다르게 동작할 수 있음

`upload.ts`의 예시:

```typescript
export const fileSchema = (
  typeof window === "undefined" ? z.any() : z.instanceof(FileList)
) as z.ZodType<FileList>;
```

#### 테스트 데이터베이스

- 테스트는 SQLite 데이터베이스 사용 (`.env.example`을 통해 설정)
- 필요한 경우 테스트 실행 간 데이터베이스 리셋
- 테스트 데이터를 채우려면 `pnpm run db:seed` 사용

### 테스트 디버깅

#### Vitest

- 빠른 디버깅을 위해 `console.log` 사용
- 브레이크포인트와 함께 VS Code의 디버거 사용
- UI 모드로 테스트 실행: `pnpm exec vitest --ui`

#### Playwright

- `--debug` 플래그 사용: `pnpm exec playwright test --debug`
- 실행을 일시 중지하려면 `page.pause()` 사용
- 추적 보기: `pnpm exec playwright show-trace`
- 스크린샷 찍기: `await page.screenshot({ path: 'debug.png' })`

### 커버리지

프로젝트는 좋은 테스트 커버리지를 목표로 합니다. 커버리지 리포트 보기:

```bash
# 커버리지 리포트 생성
pnpm run coverage

# 커버리지는 GitHub Actions를 통해 PR 코멘트에도 보고됩니다
```

### 문제 해결

#### 일반적인 문제

1. **"DataTransfer is not defined"** - 이 API는 Node.js에서 사용할 수 없습니다. 브라우저 특정 API에는 UI 테스트를 사용하세요.

2. **"Element not found"** - 셀렉터를 확인하고, 페이지가 로드되었는지 확인하고, `page.waitForSelector()`를 사용하세요.

3. **테스트의 타입 오류** - 적절한 TypeScript 설정과 테스트 타입이 설치되었는지 확인하세요.

#### 팁

- 푸시하기 전에 로컬에서 테스트 실행
- 자세한 오류 메시지를 위해 CI 로그 확인
- 테스트하는 내용에 적합한 테스트 타입 사용
- 테스트를 빠르고 집중적으로 유지

### 리소스

- [Vitest 문서](https://vitest.dev)
- [Playwright 문서](https://playwright.dev)
- [Testing Library](https://testing-library.com)
- [React 테스팅 모범 사례](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 배포

애플리케이션은 모든 Node.js 호스팅 플랫폼에 배포할 수 있습니다. `pnpm run build`로 프로젝트를 빌드한 후 `pnpm run start`로 프로덕션 서버를 시작할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다 - 자세한 내용은 LICENSE 파일을 참조하세요.

## 지원

이 템플릿이 도움이 된다면 스타 ⭐️를 주시기 바랍니다.

## 영감

이 프로젝트는 다음의 훌륭한 저장소들로부터 영감을 받았습니다:

- [shadcn-admin](https://github.com/satnaing/shadcn-admin)
- [create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack)

---

Built with ❤️ by Insik-Han
