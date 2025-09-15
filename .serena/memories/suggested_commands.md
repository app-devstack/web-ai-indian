# 推奨コマンド

## 開発コマンド
- `bun dev` または `npm run dev` - 開発サーバー起動 (localhost:3000)
- `bun run build` または `npm run build` - プロダクションビルド
- `bun start` または `npm start` - プロダクションサーバー起動
- `bun run lint` または `npm run lint` - ESLintチェック

## パッケージ管理
- `bun install` - 依存関係インストール
- `bun add <package>` - パッケージ追加
- `bun remove <package>` - パッケージ削除

## Gitコマンド
- `git status` - 変更状況確認
- `git add .` - 変更をステージング
- `git commit -m "message"` - コミット
- `git push` - リモートにプッシュ
- `git pull` - リモートから更新

## ファイル操作
- `ls -la` - ファイル一覧表示
- `find . -name "*.tsx"` - TypeScriptファイル検索
- `grep -r "searchterm" src/` - ソースコード内検索

## 開発サーバー
- 開発サーバーURL: http://localhost:3000
- ホットリロード機能有効
- TypeScriptの型チェック自動実行