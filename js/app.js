
let quotes=[], currentIndex=0;
const images=[
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
  'https://images.unsplash.com/photo-1493244040629-496f6d136cc3'
];
function randomImg(){ return images[Math.floor(Math.random()*images.length)]; }

async function loadQuotes(){
  // Google Sheets JSON URL 替換成你的 Web App
  const res = await fetch('https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec');
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
