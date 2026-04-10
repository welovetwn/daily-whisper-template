# PWA 圖示設定

## 需要的圖示檔案

PWA 安裝功能需要以下圖示檔案：

- `icon-192.png` - 192x192 像素，用於一般顯示
- `icon-512.png` - 512x512 像素，用於安裝畫面和啟動畫面

## 產生圖示的方法

### 方法 1：使用 icon-generator.html（推薦）

1. 在瀏覽器中開啟 `assets/icon-generator.html`
2. 點擊「下載 icon-192.png」和「下載 icon-512.png」
3. 將下載的檔案放入 `assets/` 資料夾

### 方法 2：使用線上工具

1. 前往 [Favicon.io](https://favicon.io/) 或 [PWA Asset Generator](https://pwa-asset-generator.nicepkg.cn/)
2. 上傳你的 logo 圖片
3. 下載產生的圖示包
4. 將圖示放入 `assets/` 資料夾

### 方法 3：手動建立

使用任何圖片編輯器建立：
- 黑色背景（#000000）
- 白色文字「W」
- 尺寸：192x192 和 512x512

## 驗證 PWA 安裝

1. 開啟 Chrome DevTools → Application → Manifest
2. 確認圖示正確載入
3. 開啟 Application → Service Workers，確認 sw.js 已啟動
4. 在網址列應該看到「安裝」圖示（電腦版）或「加入主畫面」提示（手機版）

## 測試離線功能

1. 開啟網站
2. DevTools → Network → 勾選「Offline」
3. 重新整理頁面，應該仍能正常顯示
