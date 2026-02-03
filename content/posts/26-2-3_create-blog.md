---
title: "Next.jsでブログを作成してみる"
publishedAt: "2026-02-03"
updatedAt: "2026-02-03"
description: "Next.jsを使ってシンプルなブログを作成してみた。"
tags:
  - note
  - Next.js
---

# Next.jsでブログを作成してみる

PHP/Laravelばかりの開発に飽きてきたので、勉強&ポートフォリオ作成を兼ねてNext.jsを使ってシンプルなブログを作成してみた。

まだ開発途中だが、ログとして残しておく。

## リポジトリ

リポジトリは[こちら](https://github.com/gingama4/gingama4.com)。

## 開発ログ

### 使用技術

- Next.js
- TypeScript
- Tailwind CSS

### 目的

- Next.jsの学習
  - フロント周り全般
- ポートフォリオサイトの作成
- ブログ機能の実装

### 実装内容

- ブログ記事一覧ページの作成
- Markdownファイルから記事を読み込む機能の実装
- sitemap.xmlの自動生成

## 感想

Copilotが優秀すぎてビビる。WordPressやLaravelばかり使っていたので、ブログのためにDBや管理画面を用意する必要があると思っていた。  
が、Copilotに相談したところ、Markdownファイルベースの管理方法を提案してくれた。

Next.jsもちょっとずつ理解、以外とシンプルに実装できることが分かった。

動作確認用に記事数が欲しいので、今後も開発ログを兼ねて記事を追加していく予定。
