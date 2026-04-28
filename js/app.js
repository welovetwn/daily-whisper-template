
let quotes=[], currentIndex=0;
const images = [
  // Mountains & Lakes
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1604440095301-4ec2f9230155",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg",
  "https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg",
  "https://images.pexels.com/photos/23973445/pexels-photo-23973445.jpeg",
  "https://images.pexels.com/photos/13873466/pexels-photo-13873466.jpeg",

  // Forest & Trees
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df",
  "https://images.pexels.com/photos/33279929/pexels-photo-33279929.jpeg",
  "https://images.pexels.com/photos/164008/pexels-photo-164008.jpeg",
  "https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg",
  "https://images.pexels.com/photos/32076508/pexels-photo-32076508.jpeg",
  "https://images.pexels.com/photos/6406918/pexels-photo-6406918.jpeg",
  "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",

  // Ocean & Beach
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.pexels.com/photos/12987464/pexels-photo-12987464.jpeg",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
  "https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg",
  "https://images.pexels.com/photos/33374145/pexels-photo-33374145.jpeg",
  "https://images.pexels.com/photos/12925698/pexels-photo-12925698.jpeg",
  "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
  "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",

  // Sunset & Sunrise
  "https://images.pexels.com/photos/728841/pexels-photo-728841.jpeg",
  "https://images.pexels.com/photos/34021102/pexels-photo-34021102.jpeg",
  "https://images.pexels.com/photos/462353/pexels-photo-462353.jpeg",
  "https://images.pexels.com/photos/35461529/pexels-photo-35461529.jpeg",
  "https://images.pexels.com/photos/30685474/pexels-photo-30685474.jpeg",
  "https://images.pexels.com/photos/19611627/pexels-photo-19611627.jpeg",
  "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",

  // Scenery & Nature
  "https://images.pexels.com/photos/34625026/pexels-photo-34625026.jpeg",
  "https://images.pexels.com/photos/10731758/pexels-photo-10731758.jpeg",
  "https://images.pexels.com/photos/29686303/pexels-photo-29686303.jpeg",
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
  "https://images.pexels.com/photos/36850515/pexels-photo-36850515.jpeg",

  // Clouds & Skies
  "https://images.pexels.com/photos/246230/pexels-photo-246230.png",
  "https://images.unsplash.com/photo-1448375240586-882707db888b",
  "https://images.pexels.com/photos/9854061/pexels-photo-9854061.jpeg",
  "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
  "https://images.pexels.com/photos/34210398/pexels-photo-34210398.jpeg",
  "https://images.pexels.com/photos/13768451/pexels-photo-13768451.jpeg",
  "https://images.pexels.com/photos/29413967/pexels-photo-29413967.jpeg",

  // Mountains Extended
  "https://images.pexels.com/photos/33130105/pexels-photo-33130105.jpeg",
  "https://images.pexels.com/photos/14672474/pexels-photo-14672474.jpeg",
  "https://images.pexels.com/photos/16654642/pexels-photo-16654642.jpeg",
  "https://images.pexels.com/photos/35900181/pexels-photo-35900181.jpeg",
  "https://images.pexels.com/photos/17881053/pexels-photo-17881053.jpeg",
  "https://images.pexels.com/photos/20077185/pexels-photo-20077185.jpeg",

  // More scenic variety
  "https://images.pexels.com/photos/1410232/pexels-photo-1410232.jpeg",
  "https://images.pexels.com/photos/29222109/pexels-photo-29222109.jpeg",
  "https://images.pexels.com/photos/34289149/pexels-photo-34289149.jpeg",
  "https://images.pexels.com/photos/13733430/pexels-photo-13733430.jpeg",
  "https://images.pexels.com/photos/347140/pexels-photo-347140.jpeg",

  // Even more landscapes
  "https://images.pexels.com/photos/8787041/pexels-photo-8787041.jpeg",
  "https://images.pexels.com/photos/31986352/pexels-photo-31986352.jpeg",
  "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
  "https://images.pexels.com/photos/7694761/pexels-photo-7694761.jpeg",
  "https://images.pexels.com/photos/9957253/pexels-photo-9957253.jpeg",
  "https://images.pexels.com/photos/32392574/pexels-photo-32392574.jpeg",

  // others staff
  "https://images.unsplash.com/photo-1749834182231-0bc0c7984786?q=60",
  "https://images.unsplash.com/photo-1756916475341-ef71802fe5d3?q=60",
  "https://images.unsplash.com/photo-1756758005190-92941d91b8b2?q=60",
  "https://images.unsplash.com/photo-1757161969591-874937df864b?q=60",
  "https://images.unsplash.com/photo-1757137911040-c9d81879b212?q=60",
  "https://images.unsplash.com/photo-1756758006047-efc2f2b7d493?q=60",
  "https://images.unsplash.com/photo-1756669086471-58531cdeb0c7?q=60",
  "https://images.unsplash.com/photo-1756768937629-febe4bf15fcf?q=60",
  "https://images.unsplash.com/photo-1756680967015-435aa03c1367?q=60",
  "https://images.unsplash.com/photo-1754620731794-f16ab70963ec?q=60",
  "https://images.unsplash.com/photo-1755371033904-21dd8a9d002b?q=60",
  "https://images.unsplash.com/photo-1741557571786-e922da981949?q=60",
  "https://images.unsplash.com/photo-1749920937484-a61e6a9566a9?q=60",
  "https://images.unsplash.com/photo-1755366204962-3cb4bc8452b1?q=60",
  "https://images.unsplash.com/photo-1754764464593-638adca1eb4f?q=60",
  "https://images.unsplash.com/photo-1749627995669-4d4dda3a9c1d?q=60",
  "https://images.unsplash.com/photo-1750779941037-b3cbfde22acb?q=60",
  "https://images.unsplash.com/photo-1750779941284-09ee2d6a619c?q=60",
  "https://images.unsplash.com/photo-1749334927556-d9fae29d0637?q=60",
  "https://images.unsplash.com/photo-1750126833705-ba98013f16f3?q=60",
  "https://images.unsplash.com/photo-1542997830-49fc838e4c61?q=60",
  "https://images.unsplash.com/photo-1754273844587-f6071584597b?q=60",
  "https://images.unsplash.com/photo-1754772512355-299e9c2b1b76?q=60",
  "https://images.unsplash.com/photo-1522030865324-4062412a2023?q=60",
  "https://images.unsplash.com/photo-1751441839591-119ba895ce19?q=60",
  "https://images.unsplash.com/photo-1752035680973-79d3836f317a?q=60",
  "https://images.unsplash.com/photo-1750711642160-efc6e052751a?q=60",
  "https://images.unsplash.com/photo-1470093014438-2ede8d7a4818?q=60",
  "https://images.unsplash.com/photo-1749259560252-ca132892004f?q=60",
  "https://images.unsplash.com/photo-1745669754254-c30c98e5f8b1?q=60",
  "https://images.unsplash.com/photo-1744671904209-671573b35fd9?q=60",
  "https://images.unsplash.com/photo-1422363119751-1d2b703a7546?q=60",
  "https://images.unsplash.com/photo-1745750747234-9584cbd65358?q=60",
  "https://images.unsplash.com/photo-1503919483171-9ffc1debc390?q=60",
  "https://images.unsplash.com/photo-1485808269728-77bb07c059a8?q=60",
  "https://plus.unsplash.com/premium_photo-1681825187840-74ac15b37e6b?q=60",
  "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=60",
  "https://images.unsplash.com/photo-1457139621581-298d1801c832?q=60",
  "https://images.unsplash.com/photo-1742845918430-c6093f93f740?q=60",
  "https://images.unsplash.com/photo-1610131635230-9c4afb6238b7?q=60",
  "https://images.unsplash.com/photo-1595744080904-82b7732e8bf0?q=60",
  "https://images.unsplash.com/photo-1532362091753-d53721a3e82c?q=60",
  "https://images.unsplash.com/photo-1470432581262-e7880e8fe79a?q=60",
  "https://images.unsplash.com/photo-1454486837617-ce8e1ba5ebfe?q=60",
  "https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?q=60",
  "https://images.unsplash.com/photo-1514519273132-6a1abd48302c?q=60",
  "https://images.unsplash.com/photo-1464660439080-b79116909ce7?q=60",
  "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?q=60"
];
function randomImg(){ return images[Math.floor(Math.random()*images.length)]; }

async function loadQuotes(){
  try {
    // 檢查是否有從篩選頁面傳來的單個 quote
    const urlParams = new URLSearchParams(window.location.search);
    const singleQuoteText = urlParams.get('text');
    const singleQuoteAuthor = urlParams.get('author');
    const singleQuoteBg = urlParams.get('bg');
    
    if (singleQuoteText) {
      // 單個 quote 模式（從 tag/author 篩選頁面點擊進入）
      quotes = [{
        text: singleQuoteText,
        author: singleQuoteAuthor || '佚名',
        bgImage: singleQuoteBg || null,
        tags: []
      }];
      createSlides(quotes);
      return;
    }
    
    // 正常模式：從 API 載入所有語錄
    const res = await fetch('https://script.google.com/macros/s/AKfycbyGnwnu0FDnCLGXofOwB4s7leYLEk3ssHfJsJCjTgOR5KEfwNWhoh6XdZFNnKkso1de/exec');
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    quotes = await res.json();
    if (!Array.isArray(quotes) || quotes.length === 0) {
      throw new Error('No quotes data received');
    }
    createSlides(quotes);
  } catch (error) {
    console.error('Failed to load quotes:', error);
    const container = document.getElementById('container');
    container.innerHTML = `
      <div style="padding:40px;text-align:center;color:#fff">
        <p>無法載入語錄資料</p>
        <p style="color:#666;font-size:14px">${error.message}</p>
        <button onclick="location.reload()" style="margin-top:20px;padding:10px 20px;background:#fff;color:#000;border:none;border-radius:4px;cursor:pointer">重新載入</button>
      </div>
    `;
  }
}

function createSlides(data) {
  const container = document.getElementById('container');
  container.innerHTML = '';

  // 資料驗證
  if (!Array.isArray(data)) {
    console.error('createSlides: data is not an array', data);
    container.innerHTML = '<div style="padding:40px;text-align:center;color:#fff"><p>資料格式錯誤</p></div>';
    return;
  }

  if (data.length === 0) {
    container.innerHTML = '<div style="padding:40px;text-align:center;color:#fff"><p>沒有可顯示的語錄</p></div>';
    return;
  }

  data.forEach(q => {
    // 驗證每個語錄物件
    if (!q || typeof q !== 'object') {
      console.warn('createSlides: invalid quote object', q);
      return;
    }
    if (!q.text) {
      console.warn('createSlides: quote missing text', q);
      return;
    }
    const slide = document.createElement('div');
    slide.className = 'slide';

    const bg = document.createElement('div');
    bg.className = 'bg';
    // 使用固定背景图片（如果有），否则使用随机图片
    const bgUrl = q.bgImage && q.bgImage.trim() ? q.bgImage.trim() : randomImg();
    bg.style.backgroundImage = 'url(' + bgUrl + ')';

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // 這裡加上 class 'quote-container'
    const content = document.createElement('div');
    content.className = 'quote-container';

    const quote = document.createElement('div');
    quote.className = 'quote';
    quote.innerText = q.text;

    const author = document.createElement('div');
    author.className = 'author';
    author.innerText =  q.author;

    const tags = document.createElement('div');
    q.tags.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.innerText = '#' + t;
      span.onclick = () => filterTag(t);
      tags.appendChild(span);
    });

    content.appendChild(quote);
    content.appendChild(author);
    content.appendChild(tags);

    slide.appendChild(bg);
    slide.appendChild(overlay);
    slide.appendChild(content);

    container.appendChild(slide);
  });
  observe();
}

function observe(){
  const slides=document.querySelectorAll('.slide');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ 
        e.target.classList.add('active'); 
        currentIndex=[...slides].indexOf(e.target);
      }
    });
  },{threshold:0.6});
  slides.forEach(s=>io.observe(s));
}

function filterTag(tag){ createSlides(quotes.filter(q=>q.tags.includes(tag))); }

function nextSlide(){ document.querySelector('.container').scrollBy({top:window.innerHeight,behavior:'smooth'});}

// 更換當前頁面背景圖片
function changeBackground() {
  const slides = document.querySelectorAll('.slide');
  const currentSlide = slides[currentIndex];
  if (!currentSlide) return;
  
  const bgElement = currentSlide.querySelector('.bg');
  if (!bgElement) return;
  
  // 隨機選擇一張新背景圖（排除當前相同的圖）
  const currentBg = bgElement.style.backgroundImage;
  let newBg;
  do {
    newBg = images[Math.floor(Math.random() * images.length)];
  } while (`url("${newBg}")` === currentBg && images.length > 1);
  
  bgElement.style.backgroundImage = `url(${newBg})`;
}

// IG Story 分享
function shareImage(){
  const q = quotes[currentIndex];
  if (!q) {
    alert('請先選擇一個語錄');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  // 取得當前幻燈片的背景圖片
  const slides = document.querySelectorAll('.slide');
  const currentSlide = slides[currentIndex];
  if (!currentSlide) {
    alert('無法取得當前幻燈片');
    return;
  }

  const bgElement = currentSlide.querySelector('.bg');
  if (!bgElement) {
    alert('無法取得背景元素');
    return;
  }

  const bgUrl = bgElement.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
  if (!bgUrl || bgUrl === 'none') {
    alert('無法取得背景圖片');
    return;
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = bgUrl;

  img.onerror = () => {
    alert('圖片載入失敗，請稍後再試');
  };

  img.onload = async ()=>{
    // 使用 cover 算法保持图片比例 (类似 CSS background-size: cover)
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imgRatio > canvasRatio) {
      // 图片较宽，以高度为基准，左右裁剪
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // 图片较高，以宽度为基准，上下裁剪
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    const grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0,'rgba(0,0,0,0.2)');
    grad.addColorStop(1,'rgba(0,0,0,0.7)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    // 繪製文字背景框（圓角半透明）
    const boxPadding = 60;
    const lineHeight = 90;
    const authorHeight = 60;
    const gap = 40;
    const maxTextWidth = 830;
    
    // 等待 Chiron GoRound TC 字體加載
    await document.fonts.load('bold 60px "Chiron GoRound TC"');
    await document.fonts.load('bold 40px "Chiron GoRound TC"');
    
    // 計算文字行數來決定框的高度
    ctx.font = 'bold 60px "Chiron GoRound TC", sans-serif';
    const lines = getTextLines(ctx, q.text, maxTextWidth);
    
    // 根據實際文字行寬動態計算背景框寬度
    let maxLineWidth = 0;
    lines.forEach(line => {
      const w = ctx.measureText(line).width;
      if (w > maxLineWidth) maxLineWidth = w;
    });
    ctx.font = 'bold 40px "Chiron GoRound TC", sans-serif';
    const authorWidth = ctx.measureText(q.author || '').width;
    const contentMaxWidth = Math.max(maxLineWidth, authorWidth);
    const boxWidth = Math.max(Math.min(contentMaxWidth + boxPadding * 2, 950), 400);
    
    const textHeight = lines.length * lineHeight;
    const boxHeight = textHeight + authorHeight + gap + boxPadding * 2;
    const boxX = (canvas.width - boxWidth) / 2;
    const boxY = canvas.height / 2 - boxHeight / 2;
    
    // 繪製半透明圓角背景框
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 20);
    ctx.fill();
    ctx.restore();
    
    // 繪製文字
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 60px "Chiron GoRound TC", sans-serif';
    ctx.textAlign = 'center';
    wrapText(ctx, q.text, canvas.width / 2, canvas.height / 2 - authorHeight / 2, maxTextWidth, lineHeight);
    ctx.font = 'bold 40px "Chiron GoRound TC", sans-serif';
    ctx.fillText( q.author, canvas.width / 2, canvas.height / 2 + textHeight / 2 + gap);
    
    // 等待水印字體加載完成
    await document.fonts.load('30px Iansui');
    await document.fonts.load('30px Sriracha');
    
    // 繪製右下角水印
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'right';
    // 中文使用芫荽體
    ctx.font = '30px Iansui, sans-serif';
    ctx.fillText('微光輕語🌿', canvas.width - 40, canvas.height - 80);
    // 英文使用 Sriracha
    ctx.font = '30px Sriracha, cursive';
    ctx.fillText('Daily Whisper🕯️', canvas.width - 40, canvas.height - 40);
    ctx.restore();
    
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = 'DailyWhisper.png';
    a.click();
  };
}

// 計算文本行數（用於 shareImage 背景框高度計算）
function getTextLines(ctx, text, maxWidth) {
  const paragraphs = text.split('\n');
  let allLines = [];
  
  paragraphs.forEach(paragraph => {
    const chars = paragraph.split('');
    let line = '';
    for (let n = 0; n < chars.length; n++) {
      const testLine = line + chars[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        allLines.push(line);
        line = chars[n];
      } else {
        line = testLine;
      }
    }
    allLines.push(line);
  });
  
  return allLines;
}

// 繪製圓角矩形
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  // 先按 Google Sheets 的換行符分割
  const paragraphs = text.split('\n');
  let allLines = [];

  paragraphs.forEach(paragraph => {
    const chars = paragraph.split('');
    let line = '';
    for(let n=0; n<chars.length; n++){
      const testLine = line + chars[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if(testWidth > maxWidth && n > 0){
        allLines.push(line);
        line = chars[n];
      } else {
        line = testLine;
      }
    }
    allLines.push(line);
  });

  // 垂直置中調整起始 Y 位置
  const totalHeight = allLines.length * lineHeight;
  const startY = y - totalHeight / 2 + lineHeight / 2;
  for(let i=0; i<allLines.length; i++){
    ctx.fillText(allLines[i], x, startY + i*lineHeight);
  }
}

if('serviceWorker' in navigator){ 
  navigator.serviceWorker.register('sw.js').then(reg => {
    console.log('[SW] Registered:', reg.scope);
  }).catch(err => {
    console.error('[SW] Registration failed:', err);
  });
}
// 清除快取並重新載入
async function clearCacheAndReload() {
  const lastMod = document.lastModified;
  const deployInfo = lastMod ? `\n\n系統最後修改時間：${lastMod}` : '';
  if (!confirm('要清除快取並重新載入？\n\n這將清除：\n- 頁面快取\n- 重新載入最新資料\n' + deployInfo)) {
    return;
  }
  
  try {
    // 1. 清除 localStorage
    localStorage.clear();
    console.log('[Cache] localStorage cleared');
    
    // 2. 清除 Service Worker 註冊
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
        console.log('[Cache] Service Worker unregistered');
      }
    }
    
    // 3. 清除快取
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        await caches.delete(name);
        console.log('[Cache] Cache deleted:', name);
      }
    }
    
    // 4. 強制重新載入（帶時間戳避免快取）
    const timestamp = new Date().getTime();
    window.location.href = window.location.pathname + '?_=' + timestamp;
    
  } catch (error) {
    console.error('[Cache] Clear failed:', error);
    alert('清除快取失敗: ' + error.message);
  }
}

window.onload=loadQuotes;
