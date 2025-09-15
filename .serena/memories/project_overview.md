# Web AI Indian - プロジェクト概要

## プロジェクトの目的
- Next.js 15を使用したReactアプリケーション
- TypeScriptで開発されたモダンなWebアプリケーション
- AI Indian（AIアシスタント）機能を提供するアプリケーション
- Gemini AIを使用したチャット機能

## 技術スタック
- **フレームワーク**: Next.js 15.5.3 (App Router)
- **言語**: TypeScript 5
- **UI**: React 19.1.0, Tailwind CSS 4, shadcn/ui
- **ランタイム**: Bun (bunlock存在)
- **AI**: Google Gemini API
- **状態管理**: TanStack Query
- **フォント**: Geist Sans & Geist Mono (Vercelのフォント)
- **リンティング**: ESLint 9 with Next.js config
- **パッケージマネージャー**: Bun

## プロジェクト構造
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # メインページ
│   ├── layout.tsx         # レイアウト
│   ├── globals.css        # グローバルスタイル
│   ├── favicon.ico
│   └── api/               # API Routes
│       └── chat/          # チャットAPI
│           └── route.ts   # チャットAPIエンドポイント
├── features/              # 機能別コンポーネント
│   ├── HomeScreen.tsx     # ホーム画面
│   └── home/              # ホーム機能関連
│       ├── indian.tsx     # AIIndianアプリメインコンポーネント
│       ├── ChatArea.tsx   # チャット領域
│       ├── ChatMessage.tsx # チャットメッセージ
│       ├── Header.tsx     # ヘッダー
│       ├── EngineerStatus.tsx # エンジニアステータス
│       └── MaintenanceScreen.tsx # メンテナンス画面
├── lib/                   # ユーティリティライブラリ
│   ├── utils.ts          # 共通ユーティリティ
│   └── GeminiClient.ts   # Gemini AI クライアント
├── hooks/                 # カスタムフック
│   └── useChat.ts        # チャット機能フック
├── types/                 # TypeScript型定義
│   └── chat.ts           # チャット関連型
├── components/            # 共通コンポーネント
│   └── ui/               # UIコンポーネント（shadcn/ui）
├── providers/             # Context Providers
│   └── QueryProvider.tsx # TanStack Query Provider
├── _client/               # クライアントサイドユーティリティ
│   └── fetcher.ts        # API fetcher
└── scripts/               # ユーティリティスクリプト
    └── execute.ts        # 実行スクリプト
```

## 開発環境
- Node.js環境
- Next.js App Router使用
- TypeScript strict mode有効
- ESModule使用
- Path aliasing: @/* -> ./src/*

## 主要機能
- AI チャット機能（Google Gemini API使用）
- リアルタイムチャットUI
- エンジニアステータス表示
- メンテナンス画面