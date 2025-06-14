# Han Stack - モダンなSaaSテンプレート

[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.md)
[![ko](https://img.shields.io/badge/lang-ko-blue.svg)](https://github.com/Insik-Han/han-stack/blob/dev/README.ko.md)

> このテンプレートは現在開発中です。サンプルコードは近日中に追加予定ですが、すでに本番環境で使用可能です。（Tanstack startのバージョンに依存）

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

- [TanStack Start](https://tanstack.com/start/latest) - フルスタックフレームワーク
- [ORPC](https://orpc.unnoq.com) - エンドツーエンドの型安全性を実現するRPC
- [Prisma](https://www.prisma.io/) - モダンなデータベースORM
- [Cloudflare Workers](https://workers.cloudflare.com) - エッジランタイムデプロイ

### 開発 & ツーリング

- [TypeScript](https://www.typescriptlang.org) - 全体を通じた型安全性
- [Biome](https://biomejs.dev) - 高速なフォーマッターとリンター
- [Zod](https://zod.dev) - ランタイム型検証
- [Zod Prisma Types](https://github.com/chrishoermann/zod-prisma-types) - 自動生成されたZodスキーマ
- [React Hook Form](https://react-hook-form.com) - 検証付きの高性能フォーム

## はじめに

### 前提条件

- Node.js (v20以上)
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
   pnpm install --frozen-lockfile
   ```

4. Prismaクライアントを生成

   ```bash
   pnpm run generate
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
│   └── ...            # その他の共有コンポーネント
├── constants/         # アプリケーション定数
├── features/          # 機能モジュール
│   ├── auth/          # 認証機能
│   ├── global-search/ # グローバル検索機能
│   ├── settings/      # 設定機能
│   ├── tasks/         # タスク管理機能
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
│   ├── routes/        # サーバーサイドルート
│   ├── handler.ts     # サーバーハンドラー
│   ├── prisma.ts      # Prismaインスタンス
│   └── router.ts      # サーバールーター
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
├── seed.ts            # シードデータスクリプト

その他の主要ファイル:
- package.json         # プロジェクトメタデータと依存関係
- tsconfig.json        # TypeScript設定
- postcss.config.js    # PostCSS設定
- wrangler.jsonc       # Cloudflare Workers設定
- biome.jsonc          # Biome（フォーマッター/リンター）設定
```

各ディレクトリとファイルの詳細については、コードとコメントを参照してください。

### スクリプト

#### 開発

- `pnpm run dev` - 開発サーバーをポート3000で起動
- `pnpm run build` - 本番用ビルド
- `pnpm run preview` - Wranglerでプレビュー（Cloudflare Workers）

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

## デプロイ

### Cloudflare Workers

Cloudflare Workersへのデプロイについては、[こちら](https://github.com/backpine/tanstack-start-beta-on-cloudflare)のガイドに従ってください。

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
