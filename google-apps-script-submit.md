# Google Apps Script 投稿接收端點設定

## 步驟 1: 在現有 Apps Script 中加入 POST 處理

打開你的 Google Apps Script（已經有 doGet 的那個），加入以下 `doPost` 函數：

```javascript
function doPost(e) {
  try {
    // 解析 POST 資料
    const params = JSON.parse(e.postData.contents);
    const text = params.text;
    const author = params.author;
    const tags = params.tags || [];
    
    // 檢查必要欄位
    if (!text || !author) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: '缺少必要欄位: text 或 author'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 寫入 Google Sheets
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const newRow = [text, author, tags.join(', ')];
    sheet.appendRow(newRow);
    
    // 回傳成功訊息
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '投稿成功！',
      data: {
        text: text,
        author: author,
        tags: tags
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 處理 CORS 預檢請求 (OPTIONS)
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## 步驟 2: 重新部署 Web App

1. 點選「部署」 → 「管理部署」
2. 找到現有的部署，點選「編輯」
3. 選擇「新版本」
4. 輸入版本描述：「新增 POST 投稿功能」
5. 點擊「部署」

**重要**：重新部署後 URL 不會改變，但必須重新授權！

## 步驟 3: 設定 CORS (跨域)

在 Apps Script 最上方加入（與 doGet/doPost 同層）：

```javascript
function doOptions(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

## 步驟 4: 測試

部署完成後，你的 Web App URL 同時支援：
- `GET` - 取得所有語錄（原有功能）
- `POST` - 投稿新語錄（新功能）

## 注意事項

1. **權限設定**：部署時選擇「任何人（包含匿名使用者）」才能讓公開網站投稿
2. **每日限制**：Google Apps Script 有每日執行配額，一般使用不會超過
3. **資料驗證**：建議在 Sheets 中設定資料驗證規則
4. **備份**：重要資料請定期備份 Google Sheets

## 前端整合

前端 `submit.html` 會使用 `fetch()` 發送 POST 請求到同一個 Web App URL。
