const menu=[
['food','Сэндвич с креветкой-васаби','Креветки, моцарелла, каперсы, вяленые томаты, сливочный васаби','e08a12888fa98d53'],
['food','Сэндвич с индейкой и яйцом','Бриошь, индейка, яйцо, огурцы, чесночный соус','c8723aaf49a256d4'],
['food','Сэндвич с говядиной и тоннато','Говядина, сыр, печёные овощи, соус с тунцом','28b81bdf2a60df33'],
['food','Сэндвич с индейкой и сыром','Индейка, маасдам, пармезан, томаты, крем-чиз','8cce5115707de957'],
['food','Сэндвич с говядиной и овощами','Бриошь, запечённые овощи, сыр, лук фри','c555788e2e5e7bc1'],
['food','Тосканский салат с тунцом','Тунец, айсберг, оливки, каперсы, перец, пармезан','b34a9bf6f57f61b8'],
['coffee','Карамельный фильтр','Холодный фильтр, карамельные сливки · 400 мл','592ca58af78e165d'],
['coffee','Латте «Кокосовый йогурт»','Кокосовый йогурт, перетёртая смородина · 400 мл','33b1e72114168929'],
['other','Клубничная матча','Кокосовое молоко, клубничное пюре · 400 мл','8a6daf88c842daed'],
['other','Йогуртовый лимонад','Манго-маракуйя, шапочка из сливок · 400 мл','5ac7ce27d2dd5657'],
['other','Лавандовый лимонад','Голубая матча, лаванда · 400 мл','3a741a81bff9bbe6'],
['other','Манго-маракуйя-клубника','Лимонад с клубничным пюре · 400 мл','e000fb6ddaab6951'],
['other','Лимонад на квасе','Квас, домашняя смородина · 400 мл','628d6962dbda7b6f']];
const rail=document.querySelector('#foodRail'),list=document.querySelector('#menuList');
const featured=[['Сэндвич с индейкой и яйцом','tg-1142-1','crop-turkey'],['Сэндвич с говядиной и тоннато','tg-1137-2','crop-beef'],['Десерты на витрине','tg-1145-3','']];
if(rail){rail.innerHTML=featured.map(m=>'<article class="food-card"><div class="food-image '+m[2]+'"><img src="assets/'+m[1]+'.jpg" alt="'+m[0]+' — фото 2046" loading="lazy"></div><div class="card-line"><h3>'+m[0]+'</h3></div></article>').join('');if(list)list.innerHTML=menu.map(m=>'<article class="menu-row" data-kind="'+m[0]+'"><div><h3>'+m[1]+'</h3><p>'+m[2]+'</p></div></article>').join('')}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.menu-row').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.kind!==b.dataset.filter)}));
document.querySelector('#openMenu')?.addEventListener('click',()=>document.querySelector('#fullMenu').open=true);
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const pixelTextSelector='.intro h2,.menu-heading h2,.art h2,.merch-copy h2,.gallery-title,.faq>h2,.hero-bottom p,.space-footer p';
const pixelizeText=el=>{
  if(!el.hasAttribute('aria-label'))el.setAttribute('aria-label',el.innerText.replace(/\s+/g,' ').trim());
  const characters=[];
  [...el.childNodes].forEach(node=>{
    if(node.nodeType!==Node.TEXT_NODE||!node.textContent.trim())return;
    const fragment=document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(part=>{
      if(!part.trim()){fragment.append(part);return}
      const word=document.createElement('span');word.className='pixel-word';word.setAttribute('aria-hidden','true');
      [...part].forEach(character=>{const cell=document.createElement('span');cell.className='pixel-char';cell.textContent=character;characters.push(cell);word.append(cell)});
      fragment.append(word);
    });
    node.replaceWith(fragment);
  });
  characters.forEach((cell,index)=>cell.style.setProperty('--pixel-delay',`${Math.round(index*820/Math.max(1,characters.length-1))}ms`));
  el.classList.add('pixel-text');
};
if(!reduced)document.querySelectorAll(pixelTextSelector).forEach(pixelizeText);
document.querySelectorAll('[data-rail]').forEach(b=>b.addEventListener('click',()=>{const r=document.getElementById(b.dataset.rail);r.scrollBy({left:Number(b.dataset.step)*(r.firstElementChild.getBoundingClientRect().width+20),behavior:reduced?'instant':'smooth'})}));
const gallery=document.querySelector('#galleryRail');const moments=[['tg-1145-5','За любимым столиком','Гости / 2046'],['tg-1155-1','Искусство и встречи на blazar','За пределами кофейни / blazar'],['tg-1120-2','Работы Ивана Кудо в пространстве 2046','Выставка / РЭД 2.0'],['tg-1145-4','Моменты жизни внутри 2046','Без постановки / 2046'],['tg-1145-6','Живопись рядом с кофейным баром','Искусство / каждый день'],['tg-1145-1','Авторская керамика в кофейне','Объекты / детали'],['tg-1145-2','Искусство на футболке 2046','Concept store / 2046']];if(gallery)gallery.innerHTML=moments.map(([src,alt,label])=>'<button class="gallery-card" aria-label="Увеличить: '+alt+'"><img src="assets/'+src+'.jpg" alt="'+alt+'" loading="lazy"><span class="gallery-caption">'+label+'</span></button>').join('');
const dialog=document.querySelector('.lightbox');document.querySelectorAll('.gallery-card').forEach(b=>b.addEventListener('click',()=>{dialog.querySelector('img').src=b.querySelector('img').src;dialog.querySelector('img').alt=b.querySelector('img').alt;dialog.showModal()}));dialog?.querySelector('button').addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
if(!reduced&&'IntersectionObserver'in window){
  document.documentElement.classList.add('motion');
  document.querySelectorAll('.space-image,.food-card,.gallery-card,.merch-teaser>img,.product-image,.contact h2').forEach((el)=>el.classList.add('visual-reveal'));
  document.addEventListener('animationend',event=>{if(event.animationName==='pixel-text-in'&&event.target.classList?.contains('pixel-char'))event.target.classList.add('pixel-done')});
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');if(e.target.classList.contains('pixel-text'))setTimeout(()=>e.target.classList.add('pixel-complete'),1050);obs.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll('.reveal,.visual-reveal,.pixel-text').forEach(e=>obs.observe(e));
  document.addEventListener('focusin',e=>e.target.closest('.visual-reveal')?.classList.add('seen'));
}
function createMatrixRain(canvas,fps){
  const ctx=canvas?.getContext('2d');
  if(!ctx)return {start(){},stop(){},destroy(){}};
  const glyphs='01246';
  const pitch=24;
  let width=0,height=0,streams=[],pixels=[],frame=0,last=0,running=false;
  function resize(){
    const bounds=canvas.getBoundingClientRect();
    width=Math.max(1,Math.ceil(bounds.width*.72));
    height=Math.max(1,Math.ceil(bounds.height*.72));
    canvas.width=width;canvas.height=height;
    ctx.font='700 12px "Courier New",monospace';
    ctx.textBaseline='top';
    streams=Array.from({length:Math.ceil(width/pitch)},()=>({y:Math.random()*height,speed:.055+Math.random()*.095,length:4+Math.floor(Math.random()*7)}));
    pixels=Array.from({length:Math.min(320,Math.ceil(width*height/2400))},()=>({
      x:Math.floor(Math.random()*width/8)*8,
      y:Math.floor(Math.random()*height/8)*8,
      size:5+Math.floor(Math.random()*3)*3,
      shape:Math.floor(Math.random()*4),
      phase:Math.random()*Math.PI*2,
      speed:.001+Math.random()*.002,
      bright:Math.random()>.6
    }));
  }
  function draw(now){
    if(!running)return;
    frame=requestAnimationFrame(draw);
    if(now-last<1000/fps)return;
    const elapsed=last?Math.min(now-last,80):16;last=now;
    ctx.clearRect(0,0,width,height);
    streams.forEach((stream,index)=>{
      const x=index*pitch+3;
      for(let segment=stream.length-1;segment>=0;segment--){
        const y=Math.round(stream.y-segment*pitch);
        if(y<0||y>height)continue;
        const strength=1-segment/stream.length;
        ctx.fillStyle=segment===0?'rgba(142,204,79,.43)':`rgba(142,204,79,${(.08+strength*strength*.31).toFixed(2)})`;
        ctx.fillText(glyphs[Math.floor(Math.random()*glyphs.length)],x,y);
      }
      stream.y+=elapsed*stream.speed;
      if(stream.y-stream.length*pitch>height){stream.y=-Math.random()*height*.35;stream.speed=.055+Math.random()*.095}
    });
    pixels.forEach(pixel=>{
      const pulse=.45+.55*Math.sin(now*pixel.speed+pixel.phase);
      ctx.fillStyle=pixel.bright?`rgba(142,204,79,${(.20+pulse*.28).toFixed(2)})`:`rgba(83,147,67,${(.25+pulse*.23).toFixed(2)})`;
      if(pixel.shape===3){
        ctx.beginPath();
        ctx.moveTo(pixel.x,pixel.y);
        ctx.lineTo(pixel.x+pixel.size*1.5,pixel.y+1);
        ctx.lineTo(pixel.x+pixel.size*1.25,pixel.y+pixel.size);
        ctx.lineTo(pixel.x+2,pixel.y+pixel.size*.7);
        ctx.closePath();
        ctx.fill();
      }else{
        const w=pixel.shape===1?pixel.size*2:pixel.size;
        const h=pixel.shape===2?pixel.size*2:pixel.size;
        ctx.fillRect(pixel.x,pixel.y,w,h);
      }
    });
  }
  const onResize=()=>resize();
  addEventListener('resize',onResize,{passive:true});
  resize();
  return {
    start(){if(running)return;running=true;last=0;frame=requestAnimationFrame(draw)},
    stop(){running=false;cancelAnimationFrame(frame)},
    destroy(){this.stop();removeEventListener('resize',onResize)}
  };
}
const heroMatrix=document.querySelector('.hero-matrix');
const heroRain=heroMatrix&&!reduced?createMatrixRain(heroMatrix,18):null;
function showHeroMatrix(){
  if(!heroRain)return;
  const hero=heroMatrix.closest('.hero');
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting&&!document.hidden)heroRain.start();else heroRain.stop();
    });
    observer.observe(hero);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)heroRain.stop();else if(hero.getBoundingClientRect().bottom>0)heroRain.start()});
  }else heroRain.start();
}
const intro=document.querySelector('.loader');
if(intro&&reduced){intro.remove();showHeroMatrix()}
else if(intro){
  const rain=createMatrixRain(intro.querySelector('.loader-matrix'),26);
  const count=intro.querySelector('.loader-count');
  const message=intro.querySelector('.loader-status span');
  const started=performance.now();
  let done=false,timer=0;
  rain.start();
  function updateCount(){
    if(done)return;
    const value=Math.min(94,Math.floor((performance.now()-started)/1500*94));
    count.textContent=String(value).padStart(2,'0')+'%';
    timer=setTimeout(updateCount,55);
  }
  updateCount();
  function finish(){
    if(done)return;done=true;clearTimeout(timer);
    count.textContent='100%';message.textContent='СИГНАЛ ПОЛУЧЕН';
    intro.classList.add('is-complete');
    showHeroMatrix();
    setTimeout(()=>{rain.destroy();intro.remove()},550);
  }
  const heroImage=document.querySelector('.hero-bg');
  const imageReady=!heroImage?Promise.resolve():typeof heroImage.decode==='function'
    ?heroImage.decode().catch(()=>{})
    :new Promise(resolve=>{
      if(heroImage.complete)return resolve();
      heroImage.addEventListener('load',resolve,{once:true});
      heroImage.addEventListener('error',resolve,{once:true});
    });
  Promise.all([new Promise(resolve=>setTimeout(resolve,1500)),imageReady]).then(finish);
}else showHeroMatrix();
const heroVideo=document.querySelector('.hero-video');
if(heroVideo&&!reduced){
  const revealVideo=()=>heroVideo.classList.add('ready');
  heroVideo.addEventListener('loadeddata',revealVideo,{once:true});
  if(heroVideo.readyState>=2)revealVideo();
  const playVideo=()=>heroVideo.play().catch(()=>{});
  playVideo();
  if('IntersectionObserver'in window){
    const videoObserver=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting&&!document.hidden)playVideo();else heroVideo.pause();
    });
    videoObserver.observe(heroVideo.closest('.hero'));
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden)heroVideo.pause();
      else if(heroVideo.closest('.hero').getBoundingClientRect().bottom>0)playVideo();
    });
  }
}
document.querySelectorAll('.wear-visual').forEach(rail=>{
  rail.addEventListener('keydown',event=>{
    if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return;
    event.preventDefault();rail.scrollBy({left:(event.key==='ArrowRight'?1:-1)*rail.clientWidth,behavior:reduced?'instant':'smooth'});
  });
  let startX=0,startScroll=0,dragging=false;
  rail.addEventListener('pointerdown',event=>{
    if(event.pointerType==='touch')return;
    dragging=true;startX=event.clientX;startScroll=rail.scrollLeft;rail.classList.add('dragging');rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener('pointermove',event=>{if(dragging)rail.scrollLeft=startScroll-(event.clientX-startX)});
  const stop=()=>{dragging=false;rail.classList.remove('dragging')};
  rail.addEventListener('pointerup',stop);rail.addEventListener('pointercancel',stop);
});
const ledCanvas=document.querySelector('.led-canvas');
if(ledCanvas){
  const glyphs={
    ' ':[0,0,0,0,0,0,0],C:[14,17,16,16,16,17,14],O:[14,17,17,17,17,17,14],
    F:[31,16,16,30,16,16,16],E:[31,16,16,30,16,16,31],N:[17,25,21,21,19,17,17],
    P:[30,17,17,30,16,16,16],T:[31,4,4,4,4,4,4],S:[15,16,16,14,1,1,30],
    R:[30,17,17,30,20,18,17],U:[17,17,17,17,17,17,14],D:[30,17,17,17,17,17,30],
    I:[31,4,4,4,4,4,31]
  };
  const pitch=5, rows=9, message='  COFFEE  CONCEPT STORE  STUDIO  ';
  let columns=[],shift=0,last=0,frame=0;
  const blank=()=>Array(rows).fill(false);
  function buildPattern(logo){
    columns=[];
    if(logo){
      const off=document.createElement('canvas');off.width=54;off.height=9;
      const sample=off.getContext('2d',{willReadFrequently:true});sample.drawImage(logo,0,0,54,9);
      const data=sample.getImageData(0,0,54,9).data;
      for(let x=0;x<54;x++)columns.push(Array.from({length:rows},(_,y)=>data[(y*54+x)*4+3]>100));
    }
    for(let i=0;i<5;i++)columns.push(blank());
    for(const char of message){
      const bitmap=glyphs[char]||glyphs[' '];
      for(let x=0;x<5;x++)columns.push(Array.from({length:rows},(_,y)=>y>0&&y<8&&Boolean(bitmap[y-1]&(1<<(4-x)))));
      columns.push(blank());
    }
  }
  function resizeLed(){
    const dpr=Math.min(devicePixelRatio||1,2),width=ledCanvas.clientWidth,height=ledCanvas.clientHeight;
    ledCanvas.width=Math.round(width*dpr);ledCanvas.height=Math.round(height*dpr);
    ledCanvas.getContext('2d').setTransform(dpr,0,0,dpr,0,0);
    drawLed();
  }
  function drawLed(){
    if(!columns.length)return;
    const ctx=ledCanvas.getContext('2d'),width=ledCanvas.clientWidth,height=ledCanvas.clientHeight;
    ctx.clearRect(0,0,width,height);
    const top=Math.floor((height-rows*pitch)/2), count=Math.ceil(width/pitch)+2, total=columns.length;
    for(let i=0;i<count;i++){
      const pos=i*pitch-(shift%pitch), column=columns[(Math.floor(shift/pitch)+i)%total];
      for(let y=0;y<rows;y++){
        ctx.fillStyle=column[y]?'#adff6e':'#18321a';
        ctx.fillRect(Math.round(pos),top+y*pitch,3,3);
      }
    }
  }
  function animateLed(now){
    if(last)shift=(shift+Math.min((now-last)/1000,.1)*34)%(columns.length*pitch);
    last=now;drawLed();frame=requestAnimationFrame(animateLed);
  }
  const logo=new Image();logo.src='assets/logo.svg';
  logo.addEventListener('load',()=>{buildPattern(logo);resizeLed();if(!reduced)frame=requestAnimationFrame(animateLed)});
  logo.addEventListener('error',()=>{buildPattern(null);resizeLed();if(!reduced)frame=requestAnimationFrame(animateLed)});
  addEventListener('resize',resizeLed,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);last=0}else if(!reduced)frame=requestAnimationFrame(animateLed)});
}
