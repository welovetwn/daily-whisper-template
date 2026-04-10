# Daily Whisper Platform

A minimal, aesthetic daily quote web app with PWA, Google Sheets submission, favorites, and shareable images.

## Features
- Mobile-first (RWD)
- Smooth slide
- Random background images
- Hashtag filtering
- Favorites
- Google Sheets Submission
- Share images (IG Story)
- PWA (installable)

## Bug Fixes (2024-04-10)

### Fixed: Share Image Function
- **Issue**: Share function used random background image instead of current slide's image
- **Fix**: Modified `shareImage()` in `js/app.js` to use the actual background image of the currently visible slide
- **Impact**: Downloaded images now match exactly what user sees on screen

### Fixed: Text Wrapping in Shared Images
- **Issue**: Chinese text (and text with line breaks from Google Sheets) did not wrap properly in shared images
- **Fix**: Rewrote `wrapText()` function in `js/app.js` to:
  - Support `\n` line breaks from Google Sheets data
  - Support automatic character-by-character wrapping for CJK text
  - Center text vertically based on total line count
- **Impact**: All languages and pre-formatted text now render correctly in shared images

### Fixed: Control Button Visibility
- **Issue**: Control buttons were hidden behind slide background after image loaded
- **Fix**: Added `z-index: 100` to `.controls` in `css/style.css`
- **Impact**: Buttons remain visible and clickable at all times

### Fixed: Incomplete HTML Structure
- **Issue**: `submit.html` and `favorites.html` lacked proper HTML structure and mobile viewport support
- **Fix**: 
  - Added complete HTML5 structure (DOCTYPE, html lang, head, viewport meta) to both files
  - Added mobile-responsive CSS styling
  - Added back navigation links to both pages
  - Enhanced `favorites.html` with remove functionality and empty state handling
  - Changed quote input to `<textarea>` to support multi-line quotes
- **Impact**: All pages now properly support mobile devices and have consistent navigation

### New: Direct Submission to Google Sheets
- **Feature**: Users can now submit quotes directly from the website to Google Sheets
- **Implementation**:
  - Updated `submit.html` with `fetch()` POST request to Google Apps Script
  - Added loading states and error handling
  - Created setup guide: `google-apps-script-submit.md`
- **Setup Required**: Follow `google-apps-script-submit.md` to configure the POST endpoint
- **Impact**: Complete end-to-end submission workflow without leaving the website

### Fixed: Error Handling & Stability (Issue #3)
- **Issue**: Missing error handling caused silent failures when network requests failed
- **Fix**: Added comprehensive error handling in `js/app.js`:
  - `loadQuotes()`: Added try/catch with user-friendly error display and reload button
  - `shareImage()`: Added validation checks for quotes, slides, background elements; added `img.onerror` handler
  - `createSlides()`: Added data validation (array check, empty check, object validation)
- **Impact**: Better user experience with clear error messages and graceful degradation

### Fixed: Favorites Enhancement (Issue #4)
- **Issue**: Favorite toggle had no visual feedback or status indication
- **Fix**: Added comprehensive favorites improvements in `js/app.js`:
  - Added `showToast()` function for non-intrusive status messages (success/error)
  - Enhanced `toggleFavorite()` with try/catch error handling and toast notifications
  - Added `updateFavoriteButton()` to visually indicate favorite status (❤️/🤍)
  - Integrated `updateFavoriteButton()` into slide observer for real-time updates
- **Features**:
  - Toast notification shows "已加入收藏" or "已從收藏移除"
  - Favorite button changes icon based on current slide's favorite status
  - Error handling with user-friendly messages
- **Impact**: Users now have clear visual feedback when adding/removing favorites

## Deploy

### 部署前檢查清單
- [ ] 確認 `js/app.js` 中的 Google Apps Script URL 已正確設定
- [ ] 確認 `submit.html` 中的 `SUBMIT_API_URL` 已正確設定（與上面相同）
- [ ] 確認 Google Apps Script 已部署並支援 `doGet` 和 `doPost`
- [ ] 確認 CORS 設定已完成（參考 `google-apps-script-submit.md`）

### 部署步驟
1. Push 到 GitHub：`git push origin main`
2. 前往 GitHub → Settings → Pages
3. 選擇 Source：Deploy from a branch → Branch: main → Folder: / (root)
4. 等待 1-2 分鐘，訪問 `https://yourname.github.io/daily-whisper-template/`

### 相關文件
- `google-sheets-sync.md` - Google Sheets 讀取設定教學
- `google-apps-script-submit.md` - Google Sheets 投稿接收設定教學（詳細說明）
- `apps-script-code.js` - **Google Apps Script 完整程式碼，直接複製貼上使用**
