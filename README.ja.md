# Han Stack - モダンなSaaSテンプレート

[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.md)
[![ko](https://img.shields.io/badge/lang-ko-blue.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ko.md)

最新技術で構築された強力なフルスタックSaaSスターターテンプレート。このテンプレートは、ベストプラクティスと業界標準のツールを使用して、スケーラブルなSaaSアプリケーションを構築するための堅固な基盤を提供します。

## 機能

- 🚀 **フルスタックTypeScript** - エンドツーエンドの型安全性
- ⚡ **高性能** - Viteを使用したパフォーマンス重視の設計
- 🔄 **モダンなデータフェッチング** - TanStack Queryを採用
- 🛣️ **型安全なルーティング** - TanStack Routerを使用
- 🔒 **型安全なRPC** - ORPCによるエンドツーエンドの型安全性
- ✨ **ベストプラクティス** - 最新の開発標準に準拠
- 🎨 **コンポーネントアーキテクチャ** - 整理されたスケーラブルな構造
- 🛠️ **開発者体験** - Biome設定による強化
- 📊 **再利用可能なデータテーブル** - ソート、フィルタリング、ページネーション機能を備えた共通DataTableコンポーネント
- 👥 **ユーザー管理** - 組み込みのユーザー管理機能

## 技術スタック

### フロントエンド

- [React](https://react.dev) - UIライブラリ (v19.1)
- [TanStack Router](https://tanstack.com/router/latest) - 型安全なルーティング
- [TanStack Query](https://tanstack.com/query/latest) - データ同期
- [Tailwind CSS v4](https://tailwindcss.com) - ユーティリティファーストのCSSフレームワーク
- [Radix UI](https://www.radix-ui.com) - ヘッドレスUIコンポーネント
- [shadcn/ui](https://ui.shadcn.com) - Radix UI上に構築された再利用可能なコンポーネント
- [Vite](https://vitejs.dev) - ビルドツールと開発サーバー

### バックエンド & API

- [TanStack Start](https://tanstack.com/start/latest) - フルスタックフレームワーク（ベータ版）
- [ORPC](https://orpc.unnoq.com) - エンドツーエンドの型安全性を実現するRPC
- [Prisma](https://www.prisma.io/) - モダンなデータベースORM
- [Better Auth](https://better-auth.com) - 認証フレームワーク

### 開発 & ツーリング

- [TypeScript](https://www.typescriptlang.org) - 全体を通じた型安全性
- [Biome](https://biomejs.dev) - 高速なフォーマッターとリンター
- [Zod](https://zod.dev) - ランタイム型検証
- [Zod Prisma Types](https://github.com/chrishoermann/zod-prisma-types) - 自動生成されたZodスキーマ
- [React Hook Form](https://react-hook-form.com) - 検証付きの高性能フォーム

## はじめに

### 前提条件

- Node.js 20+
- pnpm

### インストール

1. リポジトリをクローン

```bash
git clone https://github.com/Insik-Han/han-stack.git
cd han-stack
```

2. .envを作成

```bash
cp .env.example .env
```

3. 依存関係をインストール

```bash
pnpm install
```

4. 開発環境をセットアップ

```bash
pnpm run setup
```

5. 開発サーバーを起動

```bash
pnpm run dev
```

## 開発

### プロジェクト構造

```txt
src/
├── components/        # 再利用可能なUIコンポーネント
│   ├── ui/            # アトミック/分子UIコンポーネント
│   ├── layout/        # レイアウト関連コンポーネント
│   ├── errors/        # エラーハンドリングコンポーネント
│   ├── data-table/    # 再利用可能なデータテーブルコンポーネント
│   └── ...            # その他の共有コンポーネント
├── constants/         # アプリケーション定数
├── features/          # 機能モジュール
│   ├── auth/          # 認証機能
│   ├── global-search/ # グローバル検索機能
│   ├── settings/      # 設定機能
│   ├── tasks/         # タスク管理機能
│   ├── users/         # ユーザー管理機能
│   └── theme/         # テーマ機能
├── hooks/             # カスタムReactフック
├── lib/               # 共有ライブラリとヘルパー
├── routes/            # アプリケーションルートとページ
│   ├── _admin-console/ # 管理コンソールルート
│   ├── api/           # APIルート
│   ├── (auth)/        # 認証関連ルート
│   ├── (errors)/      # エラーページ
│   └── __root.tsx     # ルートエントリー
├── server/            # バックエンド/サーバーロジック
│   ├── api/           # APIエンドポイント
│   │   ├── routes/    # APIルートハンドラー
│   │   └── router.ts  # APIルーター
│   ├── handler.ts     # RPCハンドラー
│   └── db.ts          # データベース接続
├── styles/            # グローバルおよびコンポーネントスタイル
├── utils/             # ユーティリティ関数
├── router.tsx         # クライアントルーター
├── routeTree.gen.ts   # 自動生成されたルートツリー
└── ...
public/                # 静的ファイル（画像、favicon等）
├── assets/            # 静的アセット（例：ロゴ）
├── favicon.ico        # ファビコン
prisma/                # Prismaスキーマとシードデータ
├── schema.prisma      # Prisma DBスキーマ
├── seed.ts            # シードデータスクリプト（faker.jsを使用してテストデータを生成）

その他の主要ファイル:
- package.json         # プロジェクトメタデータと依存関係
- tsconfig.json        # TypeScript設定
- biome.jsonc          # Biome（フォーマッター/リンター）設定
- CLAUDE.md            # Claude AIアシスタント用ガイドライン
```

各ディレクトリとファイルの詳細については、コードとコメントを参照してください。

### スクリプト

#### 開発

- `pnpm run dev` - 開発サーバーをポート3000で起動
- `pnpm run build` - 本番用ビルド
- `pnpm run start` - 本番サーバーを起動

#### データベース

- `pnpm run generate` - PrismaクライアントとZod型を生成
- `pnpm run prisma:studio` - Prisma Studio GUIを開く
- `pnpm run db:seed` - テストデータでデータベースをシード
- `pnpm run db:reset` - データベースとマイグレーションをリセット
- `pnpm run migrate:dev` - 開発環境でPrismaマイグレーションを実行
- `pnpm run migrate` - 本番環境にマイグレーションをデプロイ

#### コード品質

- `pnpm run biome` - Biomeでコードをフォーマット＆リント
- `pnpm run tsc` - TypeScript型チェックを実行

#### テスト

- `pnpm run test` - すべてのテストを実行
- `pnpm run test:unit` - ユニットテストを実行
- `pnpm run test:ui` - UIテストを実行
- `pnpm run test:e2e` - PlaywrightでE2Eテストを実行
- `pnpm run test:e2e:ui` - PlaywrightのUIモードでE2Eテストを実行
- `pnpm run coverage` - カバレッジレポート付きでテストを実行

## テスト

プロジェクトでは、テストスコープに基づいて異なるテスト手法を使用しています：

- **ユニットテスト** (`*.unit.spec.ts`) - Node.js環境で実行される高速で独立したテスト
- **UIテスト** (`*.ui.spec.ts`) - 実際のブラウザ環境で実行されるコンポーネントテスト
- **E2Eテスト** (`*.test.ts`) - Playwrightを使用したエンドツーエンドテスト

### テスト設定

#### Vitest設定

プロジェクトでは、`vite.config.ts`で設定された2つの別々のテストプロジェクトでVitestを使用しています：

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

#### Playwright設定

E2Eテストは`playwright.config.ts`で以下の設定を行っています：

- テストディレクトリ：`./tests/e2e`
- ベースURL：`http://localhost:3000`
- ブラウザ：ChromiumとWebKit
- 開発サーバーの自動起動

### テストの実行

#### ユニットテスト

```bash
# すべてのユニットテストを実行
pnpm run test:unit

# ウォッチモードでテストを実行
pnpm run test:unit --watch

# 特定のテストファイルを実行
pnpm run test src/schemas/upload.unit.spec.ts
```

#### UIテスト

```bash
# すべてのUIテストを実行
pnpm run test:ui

# ウォッチモードで実行
pnpm run test:ui --watch
```

#### E2Eテスト

```bash
# すべてのE2Eテストを実行
pnpm run test:e2e

# 特定のテストを実行
pnpm exec playwright test tests/e2e/example.test.ts

# デバッグ用のUIモードで実行
pnpm run test:e2e:ui
```

### テストの書き方

#### ユニットテスト

ユニットテストは、純粋なロジック、ユーティリティ、サーバーサイドコードのテストに使用します：

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

#### UIテスト

UIテストは、DOM操作を含むReactコンポーネントのテストに使用します：

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

#### E2Eテスト

E2Eテストは実際のユーザー操作をシミュレートします：

```typescript
// tests/e2e/example.test.ts
import { expect, test } from "@playwright/test";

test("Go to sign-in", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(page.locator('[data-slot="card-title"]')).toHaveText("Login");
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
```

### CI/CD統合

プロジェクトでは、再利用可能なアクションを使用した最適化されたワークフローで、継続的インテグレーションのためにGitHub Actionsを使用しています：

#### 再利用可能なアクション

`.github/actions/`に配置：

- **setup-pnpm** - pnpmとプロジェクトの依存関係をインストール
- **setup-database** - マイグレーションでテストデータベースをセットアップ

#### CIワークフロー

CIワークフロー（`.github/workflows/ci.yml`）はプルリクエストで実行され、以下を含みます：

1. **Biome** - コードフォーマットとリンティング
2. **TypeScript** - 型チェック
3. **Vitest** - カバレッジレポート付きのユニットおよびUIテスト
4. **Playwright** - アーティファクトアップロード付きのE2Eテスト

### ベストプラクティス

#### テストの整理

- ユニットテストはテスト対象のコードの隣に配置（例：`schema.ts` → `schema.unit.spec.ts`）
- UIテストはテスト対象のコンポーネントの近くに配置
- E2Eテストは機能またはユーザーフロー別にグループ化

#### テストの命名

- 何がテストされているかを説明する記述的なテスト名を使用
- パターンに従う：「[条件]のとき[期待される動作]すべき」
- `describe`ブロックを使用して関連するテストをグループ化

#### テストデータ

- 複雑なテストデータにはファクトリーまたはビルダーを使用
- テストデータは最小限かつ現実的に保つ
- 必要に応じてテスト後にテストデータをクリーンアップ

#### アサーション

- 一般的なアサーションよりも具体的なアサーションを使用
- 正のケースと負のケースの両方をテスト
- エッジケースをテストに含める

### 環境の考慮事項

#### サーバーサイド vs クライアントサイド

テストを書くときは環境の違いに注意してください：

- サーバーサイドテストはNode.jsで実行（DOM、ブラウザAPIなし）
- クライアントサイドテストにはDOM操作のためのブラウザ環境が必要
- 一部のスキーマ/ユーティリティは環境によって動作が異なる場合があります

`upload.ts`の例：

```typescript
export const fileSchema = (
  typeof window === "undefined" ? z.any() : z.instanceof(FileList)
) as z.ZodType<FileList>;
```

#### テストデータベース

- テストはSQLiteデータベースを使用（`.env.example`で設定）
- 必要に応じてテスト実行間でデータベースがリセットされます
- `pnpm run db:seed`を使用してテストデータを投入

### テストのデバッグ

#### Vitest

- クイックデバッグには`console.log`を使用
- ブレークポイントを使用してVS Codeのデバッガーを使用
- UIモードでテストを実行：`pnpm exec vitest --ui`

#### Playwright

- `--debug`フラグを使用：`pnpm exec playwright test --debug`
- 実行を一時停止するには`page.pause()`を使用
- トレースを表示：`pnpm exec playwright show-trace`
- スクリーンショットを撮る：`await page.screenshot({ path: 'debug.png' })`

### カバレッジ

プロジェクトは良好なテストカバレッジを目指しています。カバレッジレポートを表示：

```bash
# カバレッジレポートを生成
pnpm run coverage

# カバレッジはGitHub Actions経由でPRコメントにも報告されます
```

### トラブルシューティング

#### よくある問題

1. **「DataTransfer is not defined」** - このAPIはNode.jsでは利用できません。ブラウザ固有のAPIにはUIテストを使用してください。

2. **「Element not found」** - セレクターを確認し、ページがロードされていることを確認し、`page.waitForSelector()`を使用してください。

3. **テストでの型エラー** - 適切なTypeScript設定とテスト型がインストールされていることを確認してください。

#### ヒント

- プッシュする前にローカルでテストを実行
- 詳細なエラーメッセージについてはCIログを確認
- テスト対象に適したテストタイプを使用
- テストを高速で焦点を絞ったものに保つ

### リソース

- [Vitestドキュメント](https://vitest.dev)
- [Playwrightドキュメント](https://playwright.dev)
- [Testing Library](https://testing-library.com)
- [Reactテストのベストプラクティス](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## デプロイ

アプリケーションは任意のNode.jsホスティングプラットフォームにデプロイできます。`pnpm run build`でプロジェクトをビルドした後、`pnpm run start`で本番サーバーを起動できます。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細はLICENSEファイルをご覧ください。

## サポート

このテンプレートが役立つと思われる場合は、スター⭐️をお願いします。

## インスピレーション

このプロジェクトは以下の素晴らしいリポジトリからインスピレーションを得ています：

- [shadcn-admin](https://github.com/satnaing/shadcn-admin)
- [create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack)

---

Built with ❤️ by Insik-Han
