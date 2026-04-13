/**
 * Daily Whisper - Google Apps Script 完整程式碼 (含推送通知)
 * 
 * 使用方法：
 * 1. 將 VAPID_PRIVATE_KEY 和 VAPID_PUBLIC_KEY 替換成你的金鑰
 * 2. 將 VAPID_SUBJECT 替換成你的 email
 * 3. 複製全部內容 (Ctrl+A, Ctrl+C)
 * 4. 前往 https://script.google.com
 * 5. 開啟你的專案，清空現有程式碼，貼上此內容
 * 6. 儲存 (Ctrl+S)
 * 7. 部署 → 管理部署 → 建立新部署 → 網頁應用程式
 * 8. 執行身分：我 / 存取權限：任何人
 * 9. 複製網頁應用程式 URL，更新到 js/app.js 和 submit.html
 */

// ==================== 設定區 ====================
// Push 通知功能已移除 - VAPID 金鑰已刪除

// ==================== doGet - 讀取語錄 ====================
function doGet(e) {
  // 預設：讀取所有語錄
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var json = [];
  for (var i = 1; i < data.length; i++) {
    json.push({
      text: data[i][0],
      author: data[i][1],
      tags: data[i][2] ? data[i][2].toString().split(/[,|]/).map(s => s.trim()).filter(s => s) : [],
      createdDate: data[i][3] || '',
      bgImage: data[i][4] || ''
    });
  }
  // 依 createdDate 降冪排序（新到舊），無日期者排最後
  json.sort(function(a, b) {
    if (!a.createdDate && !b.createdDate) return 0;
    if (!a.createdDate) return 1;
    if (!b.createdDate) return -1;
    return new Date(b.createdDate) - new Date(a.createdDate);
  });
  return ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== doPost - 投稿 ====================
function doPost(e) {
  try {
    var params = parseParams(e);
    return handleSubmit(params);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== doOptions - CORS ====================
function doOptions() {
  return ContentService.createTextOutput('');
}

// ==================== 參數解析 ====================
function parseParams(e) {
  var params = {};
  
  if (e.postData) {
    var contentType = e.postData.type || '';
    if (contentType.indexOf('application/json') > -1) {
      params = JSON.parse(e.postData.contents);
    } else {
      var pairs = e.postData.contents.split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        if (pair[0]) {
          params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
      }
    }
  } else if (e.parameter) {
    params = e.parameter;
  }
  
  return params;
}

// ==================== 投稿處理 ====================
function handleSubmit(params) {
  var text = params.text || '';
  var author = params.author || '';
  var tags = params.tags || '';
  var bgImage = params.bgImage || '';
  
  if (!text || !author) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: '缺少必要欄位: text 或 author'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var createdDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  sheet.appendRow([text, author, tags, createdDate, bgImage]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: '投稿成功！',
    data: { text: text, author: author, tags: tags, createdDate: createdDate, bgImage: bgImage }
  })).setMimeType(ContentService.MimeType.JSON);
}

// ==================== 輔助函數 ====================
function getOrCreateSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(['endpoint', 'subscription', 'createdAt', 'status']);
  }
  
  return sheet;
}

