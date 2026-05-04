/**
 * Daily Whisper - Images API (Google Apps Script)
 * 
 * 使用方法：
 * 1. 前往 https://script.google.com 建立新專案
 * 2. 命名為「Daily Whisper Images API」
 * 3. 貼上此程式碼
 * 4. 在同一個 Google Sheets 中建立名為 "Images" 的工作表
 *    （與 Quotes 工作表同一個試算表）
 * 5. 欄位順序：url, category, active
 * 6. 儲存 (Ctrl+S)
 * 7. 部署 → 建立新部署 → 網頁應用程式
 * 8. 執行身分：我 / 存取權限：任何人
 * 9. 複製網頁應用程式 URL，更新到 js/app.js 中的 IMAGES_API_URL
 */

// 讀取所有圖片 (GET) - 函式名稱改為 getImages 避免衝突
function getImages(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Images');
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Images sheet not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var data = sheet.getDataRange().getValues();
    var images = [];
    
    // 從第2行開始（跳過標題列）
    for (var i = 1; i < data.length; i++) {
      var url = data[i][0];
      var category = data[i][1] || '';
      var active = data[i][2];
      
      // 只包含 active 為 TRUE 且有 url 的圖片
      if (url && active === true) {
        images.push({
          url: url.toString().trim(),
          category: category.toString().trim()
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify(images))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS 預檢請求 (OPTIONS)
function doOptions() {
  return ContentService.createTextOutput('');
}

// 入口函式 - 呼叫 getImages
function doGet(e) {
  return getImages(e);
}
