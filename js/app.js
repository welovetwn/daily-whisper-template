
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
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/35461529/pexels-photo-35461529.jpeg",
  "https://images.pexels.com/photos/30685474/pexels-photo-30685474.jpeg",
  "https://images.pexels.com/photos/19611627/pexels-photo-19611627.jpeg",
  "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",

  // Scenery & Nature
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.pexels.com/photos/34625026/pexels-photo-34625026.jpeg",
  "https://images.pexels.com/photos/10731758/pexels-photo-10731758.jpeg",
  "https://images.pexels.com/photos/29686303/pexels-photo-29686303.jpeg",
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/672142/pexels-photo-672142.jpeg",
  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
  "https://images.pexels.com/photos/36850515/pexels-photo-36850515.jpeg",

  // Clouds & Skies
  "https://images.pexels.com/photos/246230/pexels-photo-246230.png",
  "https://images.unsplash.com/photo-1448375240586-882707db888b",
  "https://images.pexels.com/photos/9854061/pexels-photo-9854061.jpeg",
  "https://images.pexels.com/photos/9923779/pexels-photo-9923779.jpeg",
  "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
  "https://images.pexels.com/photos/34210398/pexels-photo-34210398.jpeg",
  "https://images.pexels.com/photos/13768451/pexels-photo-13768451.jpeg",
  "https://images.pexels.com/photos/29413967/pexels-photo-29413967.jpeg",

  // Mountains Extended
  "https://images.pexels.com/photos/33130105/pexels-photo-33130105.jpeg",
  "https://images.pexels.com/photos/14672474/pexels-photo-14672474.jpeg",
  "https://images.pexels.com/photos/16654642/pexels-photo-16654642.jpeg",
  "https://images.pexels.com/photos/35900181/pexels-photo-35900181.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/422088/pexels-photo-422088.jpeg",
  "https://images.pexels.com/photos/17881053/pexels-photo-17881053.jpeg",
  "https://images.pexels.com/photos/20077185/pexels-photo-20077185.jpeg",

  // More scenic variety
  "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
  "https://images.pexels.com/photos/1410232/pexels-photo-1410232.jpeg",
  "https://images.pexels.com/photos/29222109/pexels-photo-29222109.jpeg",
  "https://images.pexels.com/photos/34289149/pexels-photo-34289149.jpeg",
  "https://images.pexels.com/photos/13733430/pexels-photo-13733430.jpeg",
  "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
  "https://images.pexels.com/photos/347140/pexels-photo-347140.jpeg",
  "https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg",

  // Even more landscapes
  "https://images.pexels.com/photos/8787041/pexels-photo-8787041.jpeg",
  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
  "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",
  "https://images.pexels.com/photos/31986352/pexels-photo-31986352.jpeg",
  "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
  "https://images.pexels.com/photos/7694761/pexels-photo-7694761.jpeg",
  "https://images.pexels.com/photos/9957253/pexels-photo-9957253.jpeg",
  "https://images.pexels.com/photos/32392574/pexels-photo-32392574.jpeg"
];
function randomImg(){ return images[Math.floor(Math.random()*images.length)]; }

async function loadQuotes(){
  try {
    // Google Sheets JSON URL 替換成你的 Web App
    const res = await fetch('https://script.google.com/macros/s/AKfycby_73WaISHrq2ij7IdR_90Z9UxLi-ttQOL-_urt29nyuPnnAPIT4k4yeDUYD-WTV0WH/exec');
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
    bg.style.backgroundImage = 'url(' + randomImg() + ')';

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
        updateFavoriteButton();
      }
    });
  },{threshold:0.6});
  slides.forEach(s=>io.observe(s));
}

function filterTag(tag){ createSlides(quotes.filter(q=>q.tags.includes(tag))); }

// 顯示 Toast 提示
function showToast(message, isSuccess = true) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background: ${isSuccess ? '#4CAF50' : '#f44336'};
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
  `;
  document.body.appendChild(toast);
  
  // 淡入
  setTimeout(() => toast.style.opacity = '1', 10);
  
  // 3秒後淡出移除
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function toggleFavorite(){
  try {
    const q = quotes[currentIndex];
    if (!q) {
      showToast('請先選擇一個語錄', false);
      return;
    }
    
    let favs = JSON.parse(localStorage.getItem('fav') || '[]');
    const isAlreadyFav = favs.find(f => f.text === q.text);
    
    if (isAlreadyFav) {
      favs = favs.filter(f => f.text !== q.text);
      showToast('✓ 已從收藏移除');
    } else {
      favs.push(q);
      showToast('✓ 已加入收藏');
    }
    
    localStorage.setItem('fav', JSON.stringify(favs));
    updateFavoriteButton();
  } catch (error) {
    console.error('toggleFavorite error:', error);
    showToast('收藏操作失敗，請稍後再試', false);
  }
}

// 更新收藏按鈕的視覺狀態
function updateFavoriteButton() {
  const q = quotes[currentIndex];
  if (!q) return;
  
  const favBtn = document.querySelector('.btn[onclick="toggleFavorite()"]');
  if (!favBtn) return;
  
  const favs = JSON.parse(localStorage.getItem('fav') || '[]');
  const isFav = favs.find(f => f.text === q.text);
  
  favBtn.textContent = isFav ? '❤️' : '🤍';
  favBtn.style.opacity = isFav ? '1' : '0.6';
}

function nextSlide(){ document.querySelector('.container').scrollBy({top:window.innerHeight,behavior:'smooth'});}

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

  img.onload = ()=>{
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0,'rgba(0,0,0,0.2)');
    grad.addColorStop(1,'rgba(0,0,0,0.7)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 60px sans-serif';
    ctx.textAlign = 'center';
    wrapText(ctx,q.text,canvas.width/2,canvas.height/2,900,70);
    ctx.font = 'bold 40px sans-serif';
    ctx.fillText('― '+q.author, canvas.width/2, canvas.height/2 + 250);
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download='DailyWhisper.png'; a.click();
  };
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

// Push 通知訂閱管理
const PUSH_API_URL = 'https://script.google.com/macros/s/AKfycbw5m7P3QTMnLdt1gl0cTDIrqizXx99nzjg-JMfNkWgo80GiX2Z24SbjKhZiDnd5S782/exec';

async function togglePush(){
  console.log('[Push] togglePush called');
  
  if(!('Notification' in window)){
    console.error('[Push] Notification API not supported');
    showToast('您的瀏覽器不支援通知功能', 'error');
    return;
  }
  
  console.log('[Push] Notification API supported');
  
  // 等待 Service Worker 準備就緒（最多 10 秒）
  let registration;
  try{
    console.log('[Push] Waiting for Service Worker...');
    registration = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Service Worker timeout')), 10000))
    ]);
    console.log('[Push] Service Worker ready:', registration.scope);
  } catch(swErr){
    console.error('[Push] Service Worker not ready:', swErr);
    showToast('Service Worker 尚未準備就緒，請重新整理頁面後再試', 'error');
    return;
  }
  
  try{
    
    const subscription = await registration.pushManager.getSubscription();
    console.log('[Push] Current subscription:', subscription);
    
    if(subscription){
      // 取消訂閱
      await subscription.unsubscribe();
      localStorage.removeItem('pushEnabled');
      updatePushButton(false);
      showToast('已關閉每日推送');
    } else {
      // 請求權限並訂閱
      console.log('[Push] Requesting notification permission...');
      const permission = await Notification.requestPermission();
      console.log('[Push] Permission result:', permission);
      
      if(permission!=='granted'){
        showToast('請允許通知權限以接收每日語錄', 'error');
        return;
      }
    
    // VAPID 公鑰 - 用於推送通知訂閱
    const vapidPublicKey = 'BLq1lbKiZZKTyRD9hpPI-pw43n1pTS_azcTZCRYdMSzKS2S63cvMk1fx65b2W4M9xsMTHyXrfoT902sOLXo_hNs';
    
    try{
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });
      
      // 發送訂閱到伺服器
      await fetch(PUSH_API_URL, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'subscribe',
          subscription: JSON.stringify(newSubscription)
        })
      });
      
      localStorage.setItem('pushEnabled', 'true');
      updatePushButton(true);
      showToast('已開啟每日推送（早上 8 點）');
    } catch(e){
      showToast('訂閱失敗：' + e.message, 'error');
      console.error('Push subscription error:', e);
    }
    }
  } catch(err){
    console.error('[Push] togglePush error:', err);
    showToast('推送功能錯誤：' + err.message, 'error');
  }
}

function updatePushButton(enabled){
  const btn = document.getElementById('pushBtn');
  if(btn){
    btn.textContent = enabled ? '🔕' : '🔔';
  }
}

// 檢查目前訂閱狀態
async function checkPushStatus(){
  if(!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  updatePushButton(!!subscription);
}

// VAPID 公鑰解碼
function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for(let i = 0; i < rawData.length; ++i){
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if('serviceWorker' in navigator){ 
  navigator.serviceWorker.register('sw.js').then(reg => {
    console.log('[SW] Registered:', reg.scope);
  }).catch(err => {
    console.error('[SW] Registration failed:', err);
  });
  checkPushStatus();
}
window.onload=loadQuotes;
