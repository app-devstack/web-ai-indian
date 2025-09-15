# コードスタイル・規約

## TypeScript設定
- **厳格モード有効**: `strict: true`
- **ESModules**: `module: "esnext"`
- **JSX**: `jsx: "preserve"` (Next.js用)
- **パスエイリアス**: `@/*` -> `./src/*`
- **ターゲット**: ES2017

## コーディング規約
### ファイル命名
- コンポーネント: PascalCase (例: `HomeScreen.tsx`, `ChatMessage.tsx`)
- 機能別ディレクトリ: kebab-case (例: `features/home/`)
- 設定ファイル: 標準的な命名 (例: `next.config.ts`)

### コンポーネント構造
- 機能別にディレクトリ分割 (`src/features/`)
- 関連コンポーネントは同一ディレクトリにまとめる
- Clientコンポーネントには `"use client"` ディレクティブ使用

### インポート順序
1. 外部ライブラリ (React, Next.js等)
2. 内部コンポーネント (`@/` エイリアス使用)
3. 相対パス

### TypeScript
- default export使用
- 型定義は必要に応じて明示
- React.FC型は使用せず、関数宣言形式推奨

## ESLint設定
- Next.js推奨ルール適用
- TypeScript対応
- Core Web Vitals準拠
- 無視パターン: node_modules, .next, out, build