/**
 * Daily Whisper - Google Apps Script 完整程式碼
 * 
 * 使用方式：
 * 1. 複製此檔案全部內容 (Ctrl+A, Ctrl+C)
 * 2. 前往 Google Apps Script (https://script.google.com)
 * 3. 開啟你的 QuotesAPI 專案
 * 4. 清空現有程式碼，貼上此內容 (Ctrl+A, Ctrl+V)
 * 5. 儲存 (Ctrl+S)
 * 6. 部署 → 管理部署 → 編輯 → 新版本 → 部署
 * 7. 重新授權（務必點擊授權連結）
 */

// 主要入口 - 自動分派 GET/POST/OPTIONS
function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function doOptions(e) {
  return handleRequest(e, 'OPTIONS');
}

// 統一處理所有請求
function handleRequest(e, method) {
  // 處理 CORS 預檢請求
  if (method === 'OPTIONS') {
    return ContentService.createTextOutput('')
      .setMimeType(ContentService.MimeType.TEXT);
  }
  
  // GET 請求 - 回傳所有語錄
  if (method === 'GET') {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var json = [];
    for(var i=1; i<data.length; i++){
      json.push({
        text: data[i][0],
        author: data[i][1],
        tags: data[i][2] ? data[i][2].toString().split(',').map(s=>s.trim()) : []
      });
    }
    return ContentService.createTextOutput(JSON.stringify(json))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // POST 請求 - 接收投稿
  if (method === 'POST') {
    try {
      const params = JSON.parse(e.postData.contents);
      const text = params.text;
      const author = params.author;
      const tags = params.tags || [];
      
      if (!text || !author) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: '缺少必要欄位: text 或 author'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const newRow = [text, author, tags.join(', ')];
      sheet.appendRow(newRow);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: '投稿成功！',
        data: { text: text, author: author, tags: tags }
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
}
