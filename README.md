# Webex 動画ダウンローダー / Webex Video Downloader

## 日本語 / Japanese

Webex 会議やウェビナーの録画を簡単にダウンロードするための Chrome 拡張機能です。開発者ツールを使わずに、ワンクリックで Webex の動画をダウンロードできます。

![Webex 動画ダウンローダー](screenshots/popup.png)

### 機能

- Webex 動画ページで自動的にダウンロードボタンを表示
- ポップアップから動画 URL を抽出・ダウンロード
- 録画のタイトルを自動的にファイル名に使用
- シンプルで使いやすいインターフェース

### インストール方法


#### 手動でインストール (開発者向け)
1. このリポジトリをクローンまたはダウンロードして解凍
2. Chrome を開き、アドレスバーに `chrome://extensions/` と入力
3. 右上の「デベロッパーモード」をオンに切り替え
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. ダウンロードしたフォルダを選択

### 使い方

#### 方法 1: ページ内ボタンを使用
1. Webex の録画ページにアクセス
2. ページの右上に表示される「動画をダウンロード」ボタンをクリック
3. 動画のダウンロードが自動的に開始されます

#### 方法 2: 拡張機能のポップアップを使用
1. Webex の録画ページにアクセス
2. Chrome のツールバーにある拡張機能のアイコンをクリック
3. 「動画URLを抽出」ボタンをクリック
4. 「ダウンロード」ボタンをクリックして動画を保存

### 対応しているページ

この拡張機能は以下の Webex 動画ページに対応しています:
- Webex Meetings の録画ページ
- Webex Events の録画ページ
- Webex Training の録画ページ
- Webex の共有録画リンク

### プライバシーとセキュリティ

この拡張機能は以下の権限を必要とします:
- `activeTab`: 現在開いているタブの情報にアクセスするために必要
- `scripting`: ページ内の動画URLを検出するために必要
- `downloads`: ブラウザのダウンロード機能を使用するために必要

この拡張機能は:
- ユーザーデータを収集・保存しません
- 外部サーバーと通信しません
- Webex 以外のサイトでは機能しません

### よくある質問

#### Q: 動画が見つからないと表示される
A: Webex の一部のページでは、動画URLの検出が難しい場合があります。ページを一度リロードして再試行してください。それでも解決しない場合は、開発者ツールを使用して手動で動画URLを探す必要があるかもしれません。

#### Q: ダウンロードした動画が再生できない
A: 通常、ダウンロードした動画は MP4 形式ですが、まれに別の形式の場合があります。VLC などの多様な形式に対応したメディアプレーヤーでの再生をお試しください。

#### Q: 特定の Webex サイトで動作しない
A: 組織によっては、独自の設定を行っている Webex 環境があります。そのような環境では動作しない可能性があります。

### トラブルシューティング

問題が発生した場合は、以下の手順をお試しください:

1. Chrome を最新バージョンにアップデート
2. 拡張機能を再インストール
3. ブラウザのキャッシュをクリア
4. ページを再読み込み

### 開発者向け情報

この拡張機能は以下の技術で構築されています:
- JavaScript
- Chrome Extension Manifest V3
- HTML/CSS

コードの貢献や改善は大歓迎です。プルリクエストを送信してください。

### ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

### 免責事項

この拡張機能は、個人的な使用や教育目的のためのものです。ダウンロードした動画の使用は、Webex の利用規約および適用される著作権法に従ってください。この拡張機能の開発者は、ユーザーによる不適切な使用に対して責任を負いません。

### 連絡先

質問、提案、バグ報告は [Issues](https://github.com/Haruki1090/webex-downloader/issues) で受け付けています。

---

## English

A Chrome extension that allows you to easily download recorded videos from Webex meetings and webinars. Download Webex videos with a single click without using developer tools.

![Webex Video Downloader](screenshots/popup.png)

### Features

- Automatically displays a download button on Webex video pages
- Extract and download video URLs from the popup
- Automatically uses recording titles for filenames
- Simple and user-friendly interface

### Installation


#### Manual Installation (For Developers)
1. Clone or download and extract this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Toggle "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the downloaded folder

### How to Use

#### Method 1: Using the Page Button
1. Navigate to a Webex recording page
2. Click the "Download Video" button that appears in the top-right corner of the page
3. The video download will start automatically

#### Method 2: Using the Extension Popup
1. Navigate to a Webex recording page
2. Click the extension icon in the Chrome toolbar
3. Click the "Extract Video URL" button
4. Click the "Download" button to save the video

### Supported Pages

This extension works on the following Webex video pages:
- Webex Meetings recording pages
- Webex Events recording pages
- Webex Training recording pages
- Webex shared recording links

### Privacy and Security

This extension requires the following permissions:
- `activeTab`: Required to access information about the current tab
- `scripting`: Required to detect video URLs on the page
- `downloads`: Required to use the browser's download functionality

This extension:
- Does not collect or store user data
- Does not communicate with external servers
- Does not function on sites other than Webex

### Frequently Asked Questions

#### Q: It says "No video found"
A: On some Webex pages, it can be difficult to detect the video URL. Try refreshing the page and trying again. If the issue persists, you may need to use developer tools to manually find the video URL.

#### Q: The downloaded video won't play
A: Typically, downloaded videos are in MP4 format, but occasionally they may be in a different format. Try playing the video with a media player that supports various formats, such as VLC.

#### Q: It doesn't work on a specific Webex site
A: Some organizations have custom Webex environments with different configurations. The extension may not work in such environments.

### Troubleshooting

If you encounter issues, try the following steps:

1. Update Chrome to the latest version
2. Reinstall the extension
3. Clear your browser cache
4. Reload the page

### Developer Information

This extension is built with:
- JavaScript
- Chrome Extension Manifest V3
- HTML/CSS

Contributions and improvements to the code are welcome. Please submit pull requests.

### License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

### Disclaimer

This extension is intended for personal use and educational purposes. The use of downloaded videos should comply with Webex's terms of service and applicable copyright laws. The developers of this extension take no responsibility for improper use by users.

### Contact

Questions, suggestions, and bug reports can be submitted through [Issues](https://github.com/Haruki1090/webex-downloader/issues).

---

&copy; 2025 [Your Name/Organization]