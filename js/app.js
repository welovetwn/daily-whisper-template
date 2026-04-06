
let quotes=[], currentIndex=0;
const images = [
  // Mountains & Lakes
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg",
  "https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg",
  "https://images.pexels.com/photos/349758/pexels-photo-349758.jpeg",
  "https://images.pexels.com/photos/548463/pexels-photo-548463.jpeg",

  // Forest & Trees
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df",
  "https://images.pexels.com/photos/4827/nature-forest-industry-rails.jpg",
  "https://images.pexels.com/photos/164008/pexels-photo-164008.jpeg",
  "https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg",
  "https://images.pexels.com/photos/115634/pexels-photo-115634.jpeg",
  "https://images.pexels.com/photos/104827/cathedral-forest-path-nature-104827.jpeg",
  "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",

  // Ocean & Beach
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
  "https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg",
  "https://images.pexels.com/photos/1450357/pexels-photo-1450357.jpeg",
  "https://images.pexels.com/photos/187962/pexels-photo-187962.jpeg",
  "https://images.pexels.com/photos/918774/pexels-photo-918774.jpeg",
  "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",

  // Sunset & Sunrise
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
  "https://images.unsplash.com/photo-1529034940185-bb0f3f1f78e0",
  "https://images.pexels.com/photos/462353/pexels-photo-462353.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/287158/pexels-photo-287158.jpeg",
  "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg",
  "https://images.pexels.com/photos/417629/pexels-photo-417629.jpeg",
  "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",

  // Scenery & Nature
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  "https://images.pexels.com/photos/349758/pexels-photo-349758.jpeg",
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/672142/pexels-photo-672142.jpeg",
  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
  "https://images.pexels.com/photos/417413/pexels-photo-417413.jpeg",

  // Clouds & Skies
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1448375240586-882707db888b",
  "https://images.pexels.com/photos/349758/pexels-photo-349758.jpeg",
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
  "https://images.pexels.com/photos/1549277/pexels-photo-1549277.jpeg",
  "https://images.pexels.com/photos/946632/pexels-photo-946632.jpeg",
  "https://images.pexels.com/photos/1287147/pexels-photo-1287147.jpeg",

  // Mountains Extended
  "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
  "https://images.pexels.com/photos/1252892/pexels-photo-1252892.jpeg",
  "https://images.pexels.com/photos/215687/pexels-photo-215687.jpeg",
  "https://images.pexels.com/photos/552581/pexels-photo-552581.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/422088/pexels-photo-422088.jpeg",
  "https://images.pexels.com/photos/3015995/pexels-photo-3015995.jpeg",
  "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg",

  // More scenic variety
  "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
  "https://images.pexels.com/photos/1410232/pexels-photo-1410232.jpeg",
  "https://images.pexels.com/photos/158607/cairn-fog-sky-rocks-158607.jpeg",
  "https://images.pexels.com/photos/1888908/pexels-photo-1888908.jpeg",
  "https://images.pexels.com/photos/2360478/pexels-photo-2360478.jpeg",
  "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
  "https://images.pexels.com/photos/347140/pexels-photo-347140.jpeg",
  "https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg",

  // Even more landscapes
  "https://images.pexels.com/photos/3015995/pexels-photo-3015995.jpeg",
  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
  "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",
  "https://images.pexels.com/photos/1722211/pexels-photo-1722211.jpeg",
  "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
  "https://images.pexels.com/photos/263503/pexels-photo-263503.jpeg",
  "https://images.pexels.com/photos/391679/pexels-photo-391679.jpeg",
  "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg"
];
function randomImg(){ return images[Math.floor(Math.random()*images.length)]; }

async function loadQuotes(){
  // Google Sheets JSON URL 替換成你的 Web App
  const res = await fetch('https://script.google.com/macros/s/AKfycbxL0Lzb7unYrGsHqlKmXh4k0sR_odoRDL6PolfEGbVnW1ZHaQLeATkrLQNcPhS7sBMa/exec');
  quotes = await res.json();
  createSlides(quotes);
}

function createSlides(data){
  const container=document.getElementById('container'); container.innerHTML='';
  data.forEach(q=>{
    const slide=document.createElement('div'); slide.className='slide';
    const bg=document.createElement('div'); bg.className='bg'; bg.style.backgroundImage='url('+randomImg()+')';
    const overlay=document.createElement('div'); overlay.className='overlay';
    const content=document.createElement('div');
    const quote=document.createElement('div'); quote.className='quote'; quote.innerText=q.text;
    const author=document.createElement('div'); author.className='author'; author.innerText='― '+q.author;
    const tags=document.createElement('div'); q.tags.forEach(t=>{const span=document.createElement('span'); span.className='tag'; span.innerText='#'+t; span.onclick=()=>filterTag(t); tags.appendChild(span);});
    content.appendChild(quote); content.appendChild(author); content.appendChild(tags);
    slide.appendChild(bg); slide.appendChild(overlay); slide.appendChild(content);
    container.appendChild(slide);
  });
  observe();
}

function observe(){
  const slides=document.querySelectorAll('.slide');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('active'); currentIndex=[...slides].indexOf(e.target);}
    });
  },{threshold:0.6});
  slides.forEach(s=>io.observe(s));
}

function filterTag(tag){ createSlides(quotes.filter(q=>q.tags.includes(tag))); }

function toggleFavorite(){
  const q=quotes[currentIndex]; let favs=JSON.parse(localStorage.getItem('fav')||'[]');
  if(favs.find(f=>f.text===q.text)){ favs=favs.filter(f=>f.text!==q.text);} else {favs.push(q);}
  localStorage.setItem('fav',JSON.stringify(favs));
}

function nextSlide(){ document.querySelector('.container').scrollBy({top:window.innerHeight,behavior:'smooth'});}

// IG Story 分享
function shareImage(){
  const q = quotes[currentIndex];
  const canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = randomImg();
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
  const words = text.split(' '); let line = ''; let lines=[];
  for(let n=0;n<words.length;n++){
    const testLine=line+words[n]+' '; const metrics=ctx.measureText(testLine); const testWidth=metrics.width;
    if(testWidth>maxWidth&&n>0){ lines.push(line); line=words[n]+' '; } else { line=testLine; }
  }
  lines.push(line);
  for(let i=0;i<lines.length;i++){ ctx.fillText(lines[i],x,y+i*lineHeight); }
}

if('serviceWorker' in navigator){ navigator.serviceWorker.register('/sw.js'); }
window.onload=loadQuotes;
