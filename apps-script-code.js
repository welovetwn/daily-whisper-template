/**
 * Daily Whisper - Google Apps Script 完整程式碼 (極簡版)
 * 
 * 使用方法：
 * 1. 複製全部內容 (Ctrl+A, Ctrl+C)
 * 2. 前往 https://script.google.com
 * 3. 開啟你的專案，清空現有程式碼，貼上此內容
 * 4. 儲存 (Ctrl+S)
 * 5. 部署 → 管理部署 → 建立新部署 → 網頁應用程式
 * 6. 執行身分：我 / 存取權限：任何人
 * 7. 複製網頁應用程式 URL，更新到 submit.html
 */

// 讀取所有語錄 (GET) - 排序: createDate Desc + ROW Desc
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var json = [];
  
  for(var i=1; i<data.length; i++){
    json.push({
      text: data[i][0],
      author: data[i][1],
      tags: data[i][2] ? data[i][2].toString().split(',').map(s=>s.trim()) : [],
      row: i  // 儲存原始列號
    });
  }
  
  // 排序: createDate Desc, 再按 ROW Desc
  json.sort(function(a, b) {
    var dateA = data[a.row][3] || '';  // createDate 在第4欄 (index 3)
    var dateB = data[b.row][3] || '';
    
    // 先按 createDate Desc
    if (dateA !== dateB) {
      return dateB.localeCompare(dateA);
    }
    // 再按 ROW Desc
    return b.row - a.row;
  });
  
  // 移除 row 欄位後回傳
  var result = json.map(function(item) {
    return {
      text: item.text,
      author: item.author,
      tags: item.tags
    };
  });
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// 接收投稿 (POST) - 使用 e.postData.type 判斷格式
function doPost(e) {
  try {
    var params;
    
    // 檢查是否有 postData
    if (e.postData) {
      // 根據 contentType 判斷格式
      var contentType = e.postData.type || '';
      
      if (contentType.indexOf('application/json') > -1) {
        // JSON 格式
        params = JSON.parse(e.postData.contents);
      } else {
        // 表單格式 (application/x-www-form-urlencoded)
        params = {};
        var pairs = e.postData.contents.split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          if (pair[0]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
          }
        }
      }
    } else if (e.parameter) {
      // URL 參數
      params = e.parameter;
    }
    
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
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS 預檢請求 (OPTIONS)
function doOptions() {
  return ContentService.createTextOutput('');
}
