# アーキテクチャとデザインパターン

## Next.js App Router構成
- **App Directory**: `src/app/` - ルーティング、レイアウト、API Routes
- **Features Directory**: `src/features/` - 機能別コンポーネント組織化
- **API Routes**: `src/app/api/` - バックエンドAPI実装
- **Page Structure**: layout.tsx + page.tsx パターン

## コンポーネント設計パターン

### 機能別組織化
```
src/features/
├── FeatureScreen.tsx      # 機能のエントリーポイント
└── feature-name/
    ├── Component1.tsx     # 関連コンポーネント
    ├── Component2.tsx
    └── utils/             # 機能固有のユーティリティ
```

### レイヤー別組織化
```
src/
├── app/                   # Next.js App Router（UI層）
├── features/              # 機能別ビジネスロジック
├── lib/                   # 外部API、ユーティリティ
├── hooks/                 # カスタムフック（状態管理）
├── types/                 # TypeScript型定義
├── components/ui/         # 再利用可能UIコンポーネント
├── providers/             # Context Providers（状態管理）
└── _client/               # クライアントサイドユーティリティ
```

### Client/Server Components
- **Server Components**: デフォルト（データフェッチ、SEO）
- **Client Components**: `"use client"` - インタラクション、state管理
- **API Routes**: `src/app/api/` - サーバーサイドAPI実装

## データフロー・状態管理パターン

### TanStack Query パターン
- **Provider**: `QueryProvider.tsx` - アプリケーション全体の状態管理
- **Custom Hooks**: `useChat.ts` - 機能固有のデータ管理
- **API Client**: `_client/fetcher.ts` - API通信の抽象化

### AI統合パターン
- **Client Class**: `GeminiClient.ts` - AI APIクライアント
- **API Route**: `api/chat/route.ts` - AI通信エンドポイント
- **Type Safety**: `types/chat.ts` - チャット関連型定義

## スタイリングパターン
- **Tailwind CSS**: ユーティリティファースト
- **shadcn/ui**: コンポーネントライブラリ
- **CSS Variables**: フォント変数（--font-geist-sans等）
- **Responsive Design**: `sm:`, `md:`, `lg:` ブレークポイント

## 状態管理パターン
- **Global State**: TanStack Query（サーバー状態）
- **Local State**: useState（コンポーネント状態）
- **Provider Pattern**: Context API（アプリケーション設定）
- **Custom Hooks**: 状態ロジックの再利用

## ファイル組織原則
1. 機能別でディレクトリ分割
2. 関連コンポーネントの近接配置
3. 共通コンポーネントは適切な抽象化レベルで配置
4. 設定ファイルはルートレベル
5. 型定義は機能別または共通types/に配置
6. API関連はlibディレクトリに抽象化

## TypeScript活用
- 型安全性重視
- インターフェース定義の適切な配置
- Next.jsの型サポート活用（Metadata等）
- API通信の型安全性確保