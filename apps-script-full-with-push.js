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
const VAPID_PRIVATE_KEY = '8svRRpYpXbQb-kTassxft2VywrfvpOXat8UW8_3TM54';
const VAPID_PUBLIC_KEY = 'BLq1lbKiZZKTyRD9hpPI-pw43n1pTS_azcTZCRYdMSzKS2S63cvMk1fx65b2W4M9xsMTHyXrfoT902sOLXo_hNs';
const VAPID_SUBJECT = 'mailto:你的email@example.com';

// ==================== doGet - 讀取語錄 ====================
function doGet(e) {
  var action = e.parameter.action;
  
  // 取得 VAPID 公鑰
  if (action === 'vapidPublicKey') {
    return ContentService.createTextOutput(JSON.stringify({
      publicKey: VAPID_PUBLIC_KEY
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // 預設：讀取所有語錄
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var json = [];
  for (var i = 1; i < data.length; i++) {
    json.push({
      text: data[i][0],
      author: data[i][1],
      tags: data[i][2] ? data[i][2].toString().split(',').map(s => s.trim()) : []
    });
  }
  return ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== doPost - 投稿 + 推送訂閱 ====================
function doPost(e) {
  try {
    var params = parseParams(e);
    var action = params.action || e.parameter.action;
    
    // 處理推送訂閱
    if (action === 'subscribe') {
      return handleSubscribe(params);
    }
    if (action === 'unsubscribe') {
      return handleUnsubscribe(params);
    }
    
    // 預設：處理投稿
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
  
  if (!text || !author) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: '缺少必要欄位: text 或 author'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([text, author, tags]);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: '投稿成功！',
    data: { text: text, author: author, tags: tags }
  })).setMimeType(ContentService.MimeType.JSON);
}

// ==================== 推送訂閱處理 ====================
function handleSubscribe(params) {
  try {
    var subscription = JSON.parse(params.subscription);
    var sheet = getOrCreateSheet('PushSubscriptions');
    
    var data = sheet.getDataRange().getValues();
    var endpoint = subscription.endpoint;
    var exists = false;
    var rowIndex = -1;
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === endpoint) {
        exists = true;
        rowIndex = i + 1;
        break;
      }
    }
    
    if (!exists) {
      sheet.appendRow([
        endpoint,
        JSON.stringify(subscription),
        new Date().toISOString(),
        'active'
      ]);
    } else {
      sheet.getRange(rowIndex, 4).setValue('active');
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '已訂閱推送通知'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== 取消訂閱處理 ====================
function handleUnsubscribe(params) {
  try {
    var endpoint = params.endpoint;
    var sheet = getOrCreateSheet('PushSubscriptions');
    var data = sheet.getDataRange().getValues();
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === endpoint) {
        sheet.getRange(i + 1, 4).setValue('unsubscribed');
        break;
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: '已取消訂閱'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
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

// ==================== 手動測試推送 ====================
function testPush() {
  var sheet = getOrCreateSheet('PushSubscriptions');
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    Logger.log('沒有訂閱者');
    return;
  }
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][3] === 'active') {
      var subscription = JSON.parse(data[i][1]);
      Logger.log('找到訂閱者: ' + subscription.endpoint.substring(0, 50) + '...');
      
      // 注意：這裡需要實作 Web Push 發送邏輯
      // 實際發送需要使用 web-push 庫或第三方服務
      Logger.log('請手動發送測試通知');
    }
  }
}
