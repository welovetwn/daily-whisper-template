# 投稿自動同步 Google Sheets → JSON 教學

## 目標
使用 Google Sheets 作為投稿平台，將格言資料透過 Google Apps Script 轉換成 JSON 格式，供網站自動讀取更新，省去手動維護 `quotes.json` 的麻煩。

---

## Step 1：建立 Google Sheets 表單

1. 登入 Google 帳號，打開 Google Sheets：[https://sheets.google.com](https://sheets.google.com)  
2. 新增一個空白試算表，設定欄位標題（第1列）：  
   - `text` （格言文字）  
   - `author` （作者）  
   - `tags` （標籤，用逗號分隔）  
   - `createdDate` （建立日期，格式：YYYY-MM-DD，選填）  
   - `bgImage` （固定背景圖片網址，選填，留空則隨機）  
3. 範例資料：

| text                                | author       | tags         | createdDate | bgImage |
|-----------------------------------|--------------|--------------|-------------|---------|
| Be yourself; everyone else...     | Oscar Wilde  | life,identity| 2025-04-13  |         |
| 慢一點沒關係，只要不要停下來。     | 佚名          | 成長,堅持      | 2025-04-12  | https://example.com/bg.jpg |

---

## Step 2：新增 Google Apps Script

1. 點選上方選單「擴充功能」→「Apps Script」  
2. 會開啟一個新視窗編輯 Script  

貼上以下程式碼（確保和你的欄位順序一致）：

```javascript
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var json = [];
  for(var i=1;i<data.length;i++){
    json.push({
      text: data[i][0],
      author: data[i][1],
      tags: data[i][2] ? data[i][2].toString().split(',').map(s=>s.trim()) : []
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(json))
                        .setMimeType(ContentService.MimeType.JSON);
}

按「儲存」並輸入專案名稱（例如：QuotesAPI）
Step 3：部署成 Web App
點選「部署」 → 「新建部署」
選擇「網路應用程式」
輸入描述（例如：Quote JSON API）
設定「執行應用程式的身分」為 我（你的 Google 帳號）
設定「誰有權限存取」為 任何人（包含匿名使用者）
點擊「部署」
授權腳本所需權限（第一次部署會跳授權流程）
部署完成後會得到一個 URL（例如 https://script.google.com/macros/s/AKfycbxxxxxxxxx/exec），這個就是你的 API JSON 端點
Step 4：前端串接 API

在你的網站 js/app.js 中修改 fetch 路徑，改成你剛剛取得的 Web App URL：

async function loadQuotes(){
  const res = await fetch('https://script.google.com/macros/s/AKfycbxxxxxxxxx/exec');
  const quotes = await res.json();
  createSlides(quotes);
}

提示：

createSlides 是你負責把 JSON 格言渲染到頁面的函式。
建議加上錯誤處理（try/catch），以免網路問題造成網站崩潰。
Step 5：使用注意事項
Google Sheets 欄位順序要與程式碼對應，否則資料會錯位。
部署的 Web App URL 不要公開私密資訊，因為設定為「任何人都能訪問」。
若需要更新格言，只要編輯 Google Sheets，網站下次載入時即會自動更新。
如果需要編輯權限給他人，可以設定 Google Sheets 的分享權限。
附錄：擴充應用
你可以用 Google Forms 直接連結這個 Sheets，讓使用者透過表單投稿。
可加入欄位 date，透過 Apps Script 做更複雜的篩選。
若流量很大，建議搭配快取（Cache）策略減少對 Google Apps Script 的請求頻率。
總結

利用 Google Sheets + Apps Script 快速建立可編輯的格言資料庫，再用 Web App 提供 JSON API，達成投稿自動同步的功能，輕鬆更新、管理並無痛整合你的每日格言網站。

祝你開發順利！ 🚀
