# 推送通知設定指南 (P1-1)

## 架構說明

Web Push 通知需要以下元件：
1. **前端** - 訂閱管理 (已完成 ✅)
2. **Service Worker** - 接收推送 (已完成 ✅)
3. **Apps Script 伺服器** - 發送推送 (待設定)
4. **VAPID 金鑰對** - 驗證身分 (需產生)

---

## 實作步驟

### Step 1: 產生 VAPID 金鑰

VAPID 金鑰需要使用 **ECDSA P-256** 演算法產生，無法在瀏覽器中直接生成。

#### 方法 A: 使用 Node.js (推薦)

```bash
# 安裝 web-push 工具
npm install -g web-push

# 產生金鑰對
web-push generate-vapid-keys
```

或直接使用 npx：
```bash
npx web-push generate-vapid-keys
```

#### 方法 B: 使用線上工具

前往 https://vapidkeys.com/ 產生金鑰對

#### 正確的金鑰格式

會得到類似以下的結果：
```
Public Key:  BBLOcRXNhKGMnA4e54qP9T3b3vUf7Wq6QxYz8AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefABCDEF1234567890ab (約 86-88 字符)
Private Key:  cRm5tYuPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJk (約 43 字符)
```

**重要**：公鑰必須以 `B` 開頭，長度約 86-88 字符。如果只有 43 字符，表示使用了錯誤的演算法！

---

### Step 2: 建立 Apps Script 推送伺服器

建立新專案，貼上以下程式碼：

```javascript
// ==================== 設定 ====================
const SPREADSHEET_ID = '你的試算表ID';
const SHEET_NAME = 'PushSubscriptions';
const VAPID_PRIVATE_KEY = '你的Private Key';
const VAPID_PUBLIC_KEY = '你的Public Key';
const VAPID_SUBJECT = 'mailto:your-email@example.com';

// ==================== Web Push 函式庫 ====================
// 需新增 Web Push 函式庫：
// 1. 前往 https://github.com/Minishlink/web-push/tree/master/src
// 2. 或使用 Apps Script 內建方式發送

// ==================== 主要函數 ====================

function doPost(e){
  const action = e.parameter.action;
  
  if(action === 'subscribe'){
    return handleSubscribe(e);
  } else if(action === 'unsubscribe'){
    return handleUnsubscribe(e);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: 'Unknown action'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e){
  const action = e.parameter.action;
  
  if(action === 'vapidPublicKey'){
    return ContentService.createTextOutput(JSON.stringify({
      publicKey: VAPID_PUBLIC_KEY
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false
  })).setMimeType(ContentService.MimeType.JSON);
}

function doOptions(){
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ==================== 訂閱管理 ====================

function handleSubscribe(e){
  try{
    const subscription = JSON.parse(e.parameter.subscription);
    const sheet = getOrCreateSheet(SHEET_NAME);
    
    // 檢查是否已存在
    const data = sheet.getDataRange().getValues();
    const endpoint = subscription.endpoint;
    const exists = data.some(row => row[0] === endpoint);
    
    if(!exists){
      sheet.appendRow([
        endpoint,
        JSON.stringify(subscription),
        new Date().toISOString(),
        'active'
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Subscribed'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleUnsubscribe(e){
  try{
    const endpoint = e.parameter.endpoint;
    const sheet = getOrCreateSheet(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    for(let i = 0; i < data.length; i++){
      if(data[i][0] === endpoint){
        sheet.getRange(i + 1, 4).setValue('unsubscribed');
        break;
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== 推送發送 ====================

function sendDailyPush(){
  // 取得今日語錄
  const quote = getTodayQuote();
  
  // 取得所有訂閱
  const sheet = getOrCreateSheet(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  const payload = JSON.stringify({
    title: 'Daily Whisper',
    body: quote.text + ' — ' + quote.author,
    url: 'https://yourname.github.io/daily-whisper-template/'
  });
  
  // 發送給所有訂閱者
  for(let i = 1; i < data.length; i++){
    if(data[i][3] === 'active'){
      const subscription = JSON.parse(data[i][1]);
      sendPushNotification(subscription, payload);
    }
  }
}

function sendPushNotification(subscription, payload){
  // 使用 Apps Script 的 UrlFetchApp 發送 Web Push
  // 需要實作 VAPID 簽章邏輯
  // 詳見：https://github.com/web-push-libs/web-push
  
  // 簡化版本：使用 Firebase Cloud Messaging 作為替代方案
  // 或使用第三方服務如 OneSignal
}

// ==================== 輔助函數 ====================

function getOrCreateSheet(name){
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  
  if(!sheet){
    sheet = ss.insertSheet(name);
    sheet.appendRow(['endpoint', 'subscription', 'createdAt', 'status']);
  }
  
  return sheet;
}

function getTodayQuote(){
  // 從 Quotes sheet 取得今日語錄
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Quotes');
  const data = sheet.getDataRange().getValues();
  
  // 使用日期作為種子取得隨機語錄
  const today = new Date().getDate();
  const index = (today % (data.length - 1)) + 1;
  
  return {
    text: data[index][0],
    author: data[index][1]
  };
}

// ==================== 觸發器設定 ====================

function createDailyTrigger(){
  // 每天上午 8:00 執行
  ScriptApp.newTrigger('sendDailyPush')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}
```

---

### Step 3: 部署並設定觸發器

1. 儲存專案
2. 點擊「部署」→「新增部署作業」
   - 類型：Web 應用程式
   - 執行身份：我
   - 存取權：任何人
3. 複製 Web App URL
4. 執行 `createDailyTrigger()` 建立每日觸發器

---

### Step 4: 更新前端 VAPID 公鑰

修改 `js/app.js` 中的：
```javascript
const vapidPublicKey = '你的Public Key';
```

---

## 替代方案

如果 Web Push 實作複雜，可考慮：

### 方案 A: Firebase Cloud Messaging (FCM)
- 更穩定，但需 Firebase 專案
- 免費額度充足

### 方案 B: OneSignal
- 第三方推送服務
- 免費版支援最多 10,000 訂閱者

### 方案 C: Telegram Bot
- 用戶訂閱 Telegram Bot
- Apps Script 發送 Telegram 訊息
- 免費且穩定

---

## 測試檢查清單

- [ ] 點擊 🔔 按鈕請求通知權限
- [ ] 允許權限後按鈕變為 🔕
- [ ] Apps Script 收到訂閱資料
- [ ] 手動執行 `sendDailyPush()` 測試
- [ ] 收到通知時點擊可開啟網站
- [ ] 取消訂閱後不再收到通知

---

## 注意事項

1. **Web Push 需要 HTTPS** - GitHub Pages 已支援
2. **iOS 支援** - iOS 16.4+ 支援 Web Push (PWA 模式)
3. **Android 支援** - Chrome/Edge/Samsung 皆支援
4. **VAPID 金鑰** - 請妥善保管 Private Key，勿上傳到 GitHub

---

*文件版本: 2025-04-10*
