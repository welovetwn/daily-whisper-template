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
 *    注意：確保 Apps Script 已綁定到 Google Sheets（點擊「專案設定」→「試算表」）
 */

// 讀取所有圖片 (GET) - 函式名稱改為 getImages 避免衝突
function getImages(e) {
  try {
    // 嘗試取得目前綁定的試算表，如果沒有則從參數取得
    var spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {
      // 如果沒有綁定，嘗試從 ssId 參數取得
      var ssId = e.parameter.ssId;
      if (ssId) {
        spreadsheet = SpreadsheetApp.openById(ssId);
      } else {
        throw new Error('No spreadsheet bound. Please add ?ssId=YOUR_SPREADSHEET_ID to the URL');
      }
    }
    
    if (!spreadsheet) {
      throw new Error('Cannot access spreadsheet');
    }
    
    var sheet = spreadsheet.getSheetByName('Images');
    
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
      
      // 支援 TRUE (布林) 或 "TRUE" (字串)
      var isActive = (active === true || active === 'TRUE' || active === true || active == 'true');
      
      // 只包含 active 為 TRUE 且有 url 的圖片
      if (url && isActive) {
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
