# Phase #1 驗證測試指南

## 測試環境需求

- Chrome/Edge 瀏覽器（Web Push 支援最佳）
- Android 手機（實際推送測試）或 Chrome DevTools
- HTTPS 環境（GitHub Pages 已滿足）

---

## P1-1: 推送通知功能測試

### 測試 1: UI 顯示檢查 ✅

| 步驟 | 預期結果 |
|------|---------|
| 開啟 `index.html` | 控制區顯示 🔔 按鈕 |
| 檢查按鈕位置 | 位於分享按鈕 📤 右邊 |
| 點擊前狀態 | 顯示 🔔（未訂閱）或 🔕（已訂閱）|

**通過標準**：能看到鈴鐺圖示且可以點擊

---

### 測試 2: 權限請求測試 🔐

| 步驟 | 操作 | 預期結果 |
|------|------|---------|
| 1 | 點擊 🔔 按鈕 | 瀏覽器顯示通知權限請求 |
| 2 | 點擊「封鎖」| 顯示錯誤 toast「請允許通知權限」|
| 3 | 重新整理頁面 | 按鈕仍顯示 🔔 |
| 4 | 再次點擊 🔔 | 再次出現權限請求 |
| 5 | 點擊「允許」| 顯示成功 toast「已開啟每日推送」|
| 6 | 檢查按鈕 | 變為 🔕 |

**通過標準**：權限流程正常，UI 狀態正確切換

---

### 測試 3: Apps Script 訂閱檢查 📝

| 步驟 | 操作 | 預期結果 |
|------|------|---------|
| 1 | 前往 Google Sheets | 看到「PushSubscriptions」工作表 |
| 2 | 檢查欄位 | endpoint / subscription / createdAt / status |
| 3 | 檢查資料列 | 有一筆 endpoint 和 subscription JSON |
| 4 | status 欄位 | 顯示「active」|

**通過標準**：訂閱資料成功寫入 Sheets

---

### 測試 4: 取消訂閱測試 ❌

| 步驟 | 操作 | 預期結果 |
|------|------|---------|
| 1 | 點擊 🔕 按鈕 | 顯示 toast「已關閉每日推送」|
| 2 | 檢查按鈕 | 變回 🔔 |
| 3 | 檢查 Sheets | status 欄位變為「unsubscribed」|

**通過標準**：取消訂閱流程正常

---

### 測試 5: Service Worker 檢查 ⚙️

| 步驟 | 操作 | 預期結果 |
|------|------|---------|
| 1 | Chrome DevTools → Application → Service Workers | 看到 `sw.js` 已啟動 |
| 2 | 檢查 Push 事件監聽器 | 看到 `push` 事件處理 |
| 3 | 檢查 Notification 事件 | 看到 `notificationclick` 事件 |

**通過標準**：Service Worker 正確註冊且包含 Push 處理

---

### 測試 6: 手動推送測試 📲

**方法 A: Chrome DevTools 模擬**

```javascript
// 在 Console 執行
navigator.serviceWorker.ready.then(reg => {
  reg.pushManager.getSubscription().then(sub => {
    // 模擬推送
    fetch('你的AppsScriptURL', {
      method: 'POST',
      body: new URLSearchParams({
        action: 'testPush',
        subscription: JSON.stringify(sub)
      })
    });
  });
});
```

**方法 B: 使用 Push API 測試工具**

1. 前往 https://web-push-codelab.glitch.me/
2. 複製你的 subscription endpoint
3. 貼到工具中發送測試

**預期結果**：
- 收到系統通知
- 通知標題：「Daily Whisper」
- 內容：今日語錄文字
- 點擊通知開啟網站

---

## P1-2: 主題切換（待實作）

| 測試項目 | 狀態 |
|---------|------|
| 主題切換按鈕 | ⏸️ 待實作 |
| 深色模式 | ⏸️ 待實作 |
| 淺色模式 | ⏸️ 待實作 |
| 記住偏好 | ⏸️ 待實作 |

---

## P1-3: 語錄搜尋（待實作）

| 測試項目 | 狀態 |
|---------|------|
| 搜尋輸入框 | ⏸️ 待實作 |
| 即時搜尋 | ⏸️ 待實作 |
| 搜尋結果 | ⏸️ 待實作 |
| 清除搜尋 | ⏸️ 待實作 |

---

## 完整驗收標準

P1-1 推送通知功能 **驗收通過** 需要：

- [ ] UI 顯示正確（🔔/🔕 切換）
- [ ] 權限請求正常
- [ ] 訂閱寫入 Sheets
- [ ] 取消訂閱正常
- [ ] 收到測試通知
- [ ] 點擊通知開啟網站

---

## 常見問題排解

### Q: 點擊 🔔 沒反應？
- 檢查 `js/app.js` 是否有 `togglePush()` 函數
- 檢查 `index.html` 按鈕 `onclick` 是否正確

### Q: 權限請求沒出現？
- 確認使用 HTTPS（GitHub Pages 已滿足）
- 檢查瀏覽器是否封鎖了通知

### Q: Sheets 沒有資料？
- 檢查 Apps Script URL 是否正確
- 檢查 Apps Script 是否有 `handleSubscribe` 函數
- 檢查 CORS 設定

### Q: 收不到推送？
- 確認 VAPID 金鑰正確設定
- 檢查 Service Worker 是否有 `push` 事件監聽
- 使用 DevTools 檢查 Console 錯誤

---

*測試指南版本: 2025-04-10*
