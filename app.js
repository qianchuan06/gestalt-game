const $=s=>document.querySelector(s), app=$('#app');
const COLORS=['#398d87','#c57954','#7b86a4','#b29754'];
const roomNames=['图底之间','残片成形','相似之中'];
const english=['FIGURE & GROUND','CLOSURE','SIMILARITY'];
const principles=['同一条边界，可以同时属于两个形象。注意力转向留白，背景也会成为主体。','当断续的线索在方向和位置上呼应，我们会将缺失的轮廓补成整体。','相近的颜色会促使元素被看作一组。这里全部圆点先均匀铺设，再按图案分配颜色，空间密度保持一致。'];
const figures=[
 {name:'双脸与花瓶',image:0,answer:'花瓶',choices:['花瓶','蝴蝶','钥匙','飞鸟'],hint:'试着把中央的浅色区域看作主体。',explain:'两张侧脸的额头、鼻尖和下颌，同时构成中央花瓶的外缘。'},
 {name:'双鸟与花苞',image:1,answer:'花苞',choices:['花苞','帆船','月牙','鱼'],hint:'从两只鸟胸口之间的留白开始，向下寻找花茎。',explain:'两只鸟的内侧边界，同时勾勒出中央的花苞和花茎。'},
 {name:'林隙藏狐',image:2,answer:'狐狸',choices:['狐狸','兔子','猫头鹰','松鼠'],hint:'忽略深色树干，在中央留白中寻找尖耳朵和朝右的鼻尖。',explain:'树干和枝杈围出的留白，使狐狸的侧影成为另一种观看方式。'},
 {name:'浪隙藏鲸',image:3,answer:'鲸鱼',choices:['海龟','鲸鱼','帆船','海星'],hint:'把波浪暂时当作背景，沿着中央浅色区域看头部与尾鳍。',explain:'鲸鱼的轮廓与波浪边界重合，水面与动物共用同一片画面。'},
 {name:'浪间海豚',image:4,answer:'海豚',choices:['海豚','海豹','章鱼','飞鸟'],hint:'看画面上半部的浅色区域，寻找朝右的长吻。',explain:'一段浪花也可以被解释为跃起的海豚，主体与背景随注意力转换。'},
 {name:'双鸟与奖杯',answer:'奖杯',choices:['花瓶','奖杯','台灯','沙漏'],hint:'看浅色区域两边的环形把手，再沿中央往下找底座。',explain:'两侧鸟形相对，鸟身的边缘同时勾出奖杯的杯身和双耳。',
  frame:'M0 330Q59 259 140 240Q165 202 224 194Q220 147 259 118Q294 95 337 118Q367 91 400 121Q433 91 463 118Q506 95 541 118Q580 147 576 194Q635 202 660 240Q741 259 800 330V430Q701 459 581 427Q506 467 400 460Q294 467 219 427Q99 459 0 430Z',
  marks:'<circle cx="252" cy="140" r="7"/><circle cx="548" cy="140" r="7"/><path d="M52 368Q137 278 224 267Q213 331 158 359Q171 333 171 316Q130 345 52 368Z M748 368Q663 278 576 267Q587 331 642 359Q629 333 629 316Q670 345 748 368Z"/><path d="M74 416Q162 397 217 376M726 416Q638 397 583 376" fill="none" stroke="#f3ead4" stroke-width="4"/>'},
 {name:'楼影里的钥匙',answer:'钥匙',choices:['耳机','剪刀','钥匙','路灯'],hint:'从留白的大圆环往下看，右边伸出的两个直角像什么？',explain:'深色楼群之间的一圈留白、长杆和齿形，可以合在一起看成钥匙。',
  frame:'M0 263H41V205H104V245H147V152H199V187H242V102H322V76H377V102H427V73H477V124H521V162H579V104H647V213H680V168H739V241H800V464H0Z',
  marks:'<path d="M74 235v68m26-39v68m77-149v139m31-108v131m62-208v128m31-105v60m190-86v160m53-93v172m61-220v172m29-164v128m76-87v101m30-38v78" fill="none" stroke="#f3ead4" stroke-width="9" stroke-dasharray="11 18"/><path d="M52 422H169M90 444H206M596 419H741M623 441H685" fill="none" stroke="#f3ead4" stroke-width="4"/>'},
 {name:'峡谷里的火箭',answer:'火箭',choices:['箭头','风筝','铅笔','火箭'],hint:'从中央的尖头往下看，找两片朝外张开的尾翼。',explain:'山石间的留白形成火箭的尖头和尾翼。视线切换时，原先的背景成了主体。',
  frame:'M0 188L114 85L201 130L280 69L344 139L393 102L431 123L509 53L584 130L660 100L800 210V560H0Z',
  marks:'<path d="M0 250L115 124L192 161L282 109L307 145L280 129L191 181L119 143L0 276Z M501 103L511 83L586 156L660 127L800 228V252L659 152L582 183Z M0 382L119 286L169 321L223 279L248 300L171 351L121 312L0 409Z M800 404L682 306L622 345L572 310L552 329L621 369L681 333L800 431Z M363 431L380 488L370 537L399 495L418 560H386L350 534L354 488L343 448Z M437 431L426 484L451 522L464 505L449 480L457 449Z"/>'},
 {name:'窗边的小猫',answer:'小猫',choices:['小猫','松鼠','兔子','小狗'],hint:'先看留白上方的两只尖耳朵，再找右边向上卷起的尾巴。',explain:'窗帘和窗台围出一块留白。尖耳朵和卷尾巴会让你把同一片区域看成一只猫。',
  frame:'M30 62H770V495H30Z',
  marks:'<path d="M64 100H161Q172 200 128 275Q101 328 64 347Z M65 373Q135 333 169 264Q199 208 208 120H228Q223 239 184 304Q139 367 65 393Z M736 100H636Q626 206 672 281Q704 335 736 348Z M735 377Q673 336 634 270Q602 216 594 120H573Q583 238 616 303Q659 369 735 398Z M64 458H736V475H64Z"/><path d="M244 116H554M260 126V198M536 126V189" stroke="#f3ead4" stroke-width="5" fill="none"/>'},
 {name:'海岸上的灯塔',answer:'灯塔',choices:['城堡','灯塔','烟囱','火车'],hint:'沿两束浅色光线向中间看，留意塔顶和下方变宽的塔身。',explain:'海岸和夜空围出塔身，塔顶向两侧伸出的光线也属于同一片留白。',
  frame:'M0 134Q74 96 173 121Q231 89 294 118Q341 99 401 106Q469 86 540 117Q639 77 800 125V560H0Z',
  marks:'<path d="M0 177L339 210V228L0 258Z M461 210L800 161V247L461 228Z M0 435L91 392L160 406L205 369L270 397L310 385L301 410L269 424L204 396L168 430L93 419L0 459Z M800 450L698 395L641 413L595 383L524 417L502 405L494 423L526 442L593 409L635 438L694 421L800 480Z"/><path d="M78 492q42-10 84 0t84 0m318 3q39-10 78 0t78 0M263 522q38-9 76 0t76 0t76 0" stroke="#f3ead4" stroke-width="5" fill="none"/>'}
];
const shapeNames=['苹果','房屋','爱心','猫','茶杯','冰淇淋','挂锁','雨靴','吉他','兔子'];
const simNames=['鱼','爱心','月牙','叶片','星星','闪电','音符','眼镜','飞机','船锚'];
const questionCounts=[figures.length, shapeNames.length, simNames.length];
const originalQuestionCount=5;
const similarityScale=1.36;
const totalQuestions=questionCounts.reduce((total, length)=>total+length, 0);
let saved;try{saved=JSON.parse(localStorage.getItem('between-perceptions-v1')||'{}')}catch{saved={}}
let completed=saved.completed||{}, settings={pieces:6,noise:8,...saved.settings};
if(!saved.revision||saved.revision<2)settings.noise=8;
if((saved.revision||0)<3){
 completed=Object.fromEntries(Object.entries(completed).filter(([key])=>Number(key.split('-')[1])<originalQuestionCount));
 persist();
}
let artIndex=0;
let room=0, level=0, view='play', won=false, hinted=false, mode=null, selected=-1, pieces=[], points=[], filter=-1, seed=1, drag=null;
function persist(){try{localStorage.setItem('between-perceptions-v1',JSON.stringify({completed,settings,revision:3}))}catch{}}
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),2600)}
function count(){return Object.keys(completed).length}
function topIntro(title,desc){return `<div class="intro"><div><p class="eyebrow">AN INTERACTIVE GESTALT GALLERY</p><h1>${title}</h1><p>${desc}</p></div><div class="visit"><strong data-progress-count data-pad>${String(count()).padStart(2,'0')}</strong> / ${totalQuestions} 件作品<br>三个展厅 · ${totalQuestions} 次发现</div></div>`}
function render(){
 $('#collectionCount').textContent=count();document.querySelectorAll('.nav').forEach(b=>b.classList.remove('active'));$('#'+({play:'navPlay',collection:'navCollection',about:'navAbout'}[view])).classList.add('active');
 if(view==='about'){renderArt();return}
 if(view==='collection'){app.innerHTML=topIntro('你的发现，留在这里','每一次发现，都是你与作品共同完成的解释。')+(count()?`<div class="gallery">${Object.entries(completed).map(([key,v])=>{const [r,l]=key.split('-').map(Number);return `<article>${completedArtwork(r, l, 'collection-'+key)}<p class="eyebrow">${english[r]} / ${String(l+1).padStart(2,'0')}</p><h3>${v.name}</h3><p>${v.help?'使用过提示':'独立完成'} · ${roomNames[r]}</p></article>`}).join('')}</div>`:`<div class="empty"><h2>你的第一件作品，正在等你</h2><p class="muted">在任意展厅完成一个任务，就会收藏在这里。</p><button class="primary" id="emptyPlay">开始探索</button></div>`);if($('#emptyPlay'))$('#emptyPlay').onclick=()=>{view='play';render()};return}
 won=false;hinted=false;selected=-1;filter=-1;drag=null;
 app.innerHTML=topIntro('看见之外，还有另一种可能','在图形与留白之间，亲手完成一次知觉的转变。')+`<div class="layout"><aside class="sidebar"><p class="side-label">CHOOSE A GALLERY</p><div class="rooms">${roomNames.map((n,i)=>`<button class="room ${room===i?'selected':''}" data-room="${i}"><span class="num">0${i+1}</span><span><strong>${n}</strong><small>${english[i]}</small></span><span class="arrow">↗</span></button>`).join('')}</div><div class="side-note">${['试着换一种看法。<br>你眼中的背景，也许正是另一幅作品。','让线条彼此呼应。<br>不必补齐全部轮廓，也能看见一个整体。','位置不变，关系改变。<br>让相近的颜色带你发现隐藏的形象。'][room]}<div class="progress-line"><i style="width:${count()/totalQuestions*100}%"></i></div><p><span data-progress-count>${count()}</span> / ${totalQuestions} 已收藏</p></div></aside><section class="workspace"><div class="worktop"><div><strong>作品 ${String(level+1).padStart(2,'0')}</strong><small>${english[room]}</small></div><div class="dots">${Array.from({length:questionCounts[room]},(_,i)=>`<button class="level-dot ${i===level?'current':''} ${completed[room+'-'+i]?'done':''}" data-level="${i}" aria-label="第${i+1}题">${i+1}</button>`).join('')}</div></div><div class="stage" id="stage"></div><div class="tools"><div class="toolset" id="specificTools"></div><div class="toolset"><button class="subtle" id="hintBtn">一点提示</button><button class="subtle" id="resetBtn">重新开始 ↺</button></div></div><p class="hinttext" id="hintText" hidden></p><div class="workbottom" id="workbottom"></div></section></div>`;
 document.querySelectorAll('[data-room]').forEach(b=>b.onclick=()=>{room=+b.dataset.room;level=0;render()});document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=+b.dataset.level;render()});$('#resetBtn').onclick=()=>{seed++;render()};$('#hintBtn').onclick=showHint;
 if(room===0)mountFigure();if(room===1)mountClosure();if(room===2)mountSimilarity();
}
function choices(names,answer,prompt){$('#workbottom').innerHTML=`<p class="taskline">${prompt}</p><div class="choices">${names.map(n=>`<button class="choice">${n}</button>`).join('')}</div>`;document.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{if(b.textContent===answer)win(answer);else{b.animate([{background:'#ecd4c7'},{background:'transparent'}],{duration:600});toast('再换一种看法，试试看。')}})}
function mountFigure(){
 mode='figure';
 const f=figures[level];
 const original=f.image!==undefined;
 const image=original
   ? `<img class="figimage" src="assets/figure-${f.image}.webp" alt="双义视觉图，请观察形状之间的留白">`
   : figurePuzzleMarkup(f);
 $('#stage').innerHTML=`<span class="stage-label">LOOK AT THE SPACE BETWEEN</span>${image}<span class="art-badge">${original?'AI 生成 · 设计者筛选':'留白构成 · 观察边界'}</span>`;
 $('#specificTools').innerHTML='<span class="toolhint">观察深色形象之间的浅色区域</span>';
 choices(f.choices,f.answer,'除了第一眼看到的形象，你还能在留白中发现什么？');
}

function completedArtwork(r, l, id, inStage=false){
 const name=r===0?figures[l].answer:r===1?shapeNames[l]:simNames[l];
 if(r!==1){
   const scale=r===2 && l>=originalQuestionCount?similarityScale:1;
   return artworkMarkup(name,{id,scale});
 }
 const outline=shapeOutline(l).map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')+'Z';
 return artworkMarkup(name,{id,outline,...(inStage?{y:235,height:640}:{})});
}

function win(name){
 if(won)return;
 won=true;
 completed[room+'-'+level]={name:room===0?figures[level].name:name,help:hinted};
 persist();
 $('#collectionCount').textContent=count();
 document.querySelectorAll('[data-progress-count]').forEach(label=>{
   label.textContent=label.hasAttribute('data-pad')?String(count()).padStart(2,'0'):count();
 });
 $('.progress-line i').style.width=count()/totalQuestions*100+'%';
 $('#hintText').hidden=true;
 if(room===1){
   $('#rotateLeft').disabled=true;
   $('#rotateRight').disabled=true;
 }
 if(room===2){
   filter=targetGroup;
   drawDots();
   updateSwatches();
   document.querySelectorAll('[data-filter]').forEach(button=>button.disabled=true);
 }
 $('#stage').insertAdjacentHTML('beforeend',`<div class="reveal">${completedArtwork(room,level,'reveal',true)}<span class="reveal-label">完整图像 · ${name}</span></div>`);
 const extra=room===0?figures[level].explain:room===1?'你把关键线索连了起来。轮廓还有缺口时，已经能看出完整的形象。':'相近的颜色把散点组织成了一个形象。每个圆点的位置和间距都没有改变。';
 const hasNext=level+1<questionCounts[room];
 $('#workbottom').innerHTML=`<div class="success" role="status"><div><p class="eyebrow">A NEW WAY OF SEEING</p><h3>你发现了${name} · 已收藏</h3><p>${extra}</p><button class="art-jump" id="artJump">在经典作品里找找这个原理 ↗</button></div><button class="primary" id="nextBtn">${hasNext?'下一件作品 →':room<2?'进入下一展厅 →':'查看我的收藏 →'}</button></div>`;
 $('#artJump').onclick=()=>{artIndex=room;view='about';render()};
 $('#nextBtn').onclick=()=>{
   if(hasNext)level++;
   else if(room<2){room++;level=0}
   else view='collection';
   render();
 };
 $('#hintBtn').disabled=true;
 $('.level-dot.current')?.classList.add('done');
}

function showHint(){if(won)return;hinted=true;$('#hintText').hidden=false;if(room===0)$('#hintText').textContent=figures[level].hint;if(room===1){if(selected<0||pieces[selected].snapped){selected=pieces.findIndex(p=>!p.fixed&&!p.snapped);paintPieces()}$('#hintText').textContent='虚线标出选中碎片的目标位置。拖到附近，再用旋转按钮调整方向。';const p=pieces[selected];if(p){$('#targetHint').innerHTML=`<path d="${p.d}" transform="translate(${p.tx} ${p.ty})" fill="none" stroke="#94a38b" stroke-width="4" stroke-dasharray="7 8"/>`}}if(room===2){$('#hintText').textContent='已为你强调目标颜色。退后一点看整体：提示形象是“'+simNames[level]+'”。图案内外的点间距完全相同。';filter=targetGroup;drawDots();updateSwatches()}}
function lerp(a,b,t){return a+(b-a)*t}
function polyline(vertices,n=120){let lens=[],total=0;for(let i=1;i<vertices.length;i++){total+=Math.hypot(vertices[i][0]-vertices[i-1][0],vertices[i][1]-vertices[i-1][1]);lens.push(total)}return Array.from({length:n+1},(_,j)=>{let dist=total*j/n,k=lens.findIndex(l=>l>=dist);if(k<0)k=lens.length-1;let prev=k?lens[k-1]:0,t=(dist-prev)/(lens[k]-prev||1);return[lerp(vertices[k][0],vertices[k+1][0],t),lerp(vertices[k][1],vertices[k+1][1],t)]})}
const sampledOutlines=new Map();
function sampledOutline(name){
 if(!sampledOutlines.has(name)){
   const path=document.createElementNS('http://www.w3.org/2000/svg','path');
   path.setAttribute('d',artwork[name].outline);
   const length=path.getTotalLength();
   const points=Array.from({length:161},(_,i)=>{
     const {x,y}=path.getPointAtLength(length*i/160);
     return [x,y];
   });
   sampledOutlines.set(name,points);
 }
 return sampledOutlines.get(name);
}
function shapeOutline(l){if(l>=originalQuestionCount)return sampledOutline(shapeNames[l]);if(l===0){const curves=[[[0,-92],[55,-128],[123,-105],[126,-40]],[[126,-40],[145,35],[91,129],[40,119]],[[40,119],[13,108],[-10,111],[-40,121]],[[-40,121],[-96,132],[-147,32],[-126,-40]],[[-126,-40],[-124,-108],[-56,-129],[0,-92]]];let out=[];for(const [p0,p1,p2,p3] of curves)for(let k=0;k<32;k++){let t=k/32,u=1-t;out.push([u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]])}return out;}if(l===1)return polyline([[-120,100],[-120,-35],[-150,-35],[0,-155],[150,-35],[120,-35],[120,100],[34,100],[34,30],[-25,30],[-25,100],[-120,100]]);if(l===2)return Array.from({length:161},(_,i)=>{let t=i/160*Math.PI*2;return[8*16*Math.sin(t)**3,-8*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))]});if(l===3)return polyline([[-90,110],[-100,60],[-80,5],[-80,-95],[-50,-145],[-5,-100],[35,-100],[85,-145],[105,-65],[95,-5],[65,25],[70,90],[115,100],[145,75],[160,40],[170,65],[167,110],[120,135],[-90,135]]);return polyline([[-105,-85],[90,-85],[90,-60],[145,-70],[170,-35],[165,10],[130,30],[90,20],[75,80],[45,105],[-65,105],[-95,65],[-105,-85]])}
function buildPieces(){
 const outline=shapeOutline(level);
 const segmentCount=14;
 const isNew=level>=originalQuestionCount;
 const segmentCoverage=isNew?.85:.68;
 const random=rng(200+level*39+seed);
 const movable=new Set(Array.from({length:settings.pieces},(_,i)=>Math.floor(i*segmentCount/settings.pieces)));
 let traySlot=0;
 pieces=Array.from({length:segmentCount},(_,i)=>{
   const start=Math.floor(i*outline.length/segmentCount);
   const end=Math.floor((i+segmentCoverage)*outline.length/segmentCount);
   const segment=outline.slice(start,end+1);
   const cx=segment.reduce((sum,[x])=>sum+x,0)/segment.length;
   const cy=segment.reduce((sum,[,y])=>sum+y,0)/segment.length;
   const d=segment.map(([x,y],j)=>`${j?'L':'M'}${(x-cx).toFixed(2)} ${(y-cy).toFixed(2)}`).join(' ');
   const tx=400+cx, ty=235+cy;
   if(!movable.has(i))return {d,tx,ty,x:tx,y:ty,fixed:true,snapped:true,a:0};
   const x=(isNew?96:75)+(traySlot%4)*(isNew?202:210);
   const y=480+Math.floor(traySlot/4)*73;
   const a=isNew?[0,30,330][Math.floor(random()*3)]:(Math.floor(random()*6)+1)*45;
   traySlot++;
   return {d,tx,ty,x,y,a,fixed:false,snapped:false};
 });
 return pieces;
}
function closureCue(l){
 if(l===0)return '<path d="M400 137 Q396 111 411 99 M405 122 Q423 97 448 106 Q434 128 405 122" fill="none" stroke="#203b4d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';
 const cue=artwork[shapeNames[l]].cue;
 return cue?`<path d="${cue}" transform="translate(400 235)" fill="none" stroke="#506b71" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`:'';
}
function mountClosure(){mode='closure';buildPieces();$('#stage').innerHTML=`<span class="stage-label">DRAG · ROTATE · DISCOVER</span><svg id="puzzleSvg" viewBox="0 0 800 640" aria-label="封闭性拼图，可拖动橙色线条"><line x1="35" y1="420" x2="765" y2="420" stroke="#e0e2d7" stroke-dasharray="4 7"/><text x="35" y="447" fill="#879080" font-size="11" letter-spacing="2">可移动碎片</text>${closureCue(level)}<g id="targetHint"></g><g id="pieces"></g></svg>`;$('#specificTools').innerHTML='<button class="subtle" id="rotateLeft" aria-label="逆时针旋转15度">↶ 15°</button><button class="subtle" id="rotateRight" aria-label="顺时针旋转15度">↷ 15°</button><span class="toolhint" id="pieceProgress"></span>';$('#workbottom').innerHTML='<p class="taskline">将橙色碎片拖入上方画布，调整方向，让一个熟悉的形象出现。</p><p class="muted">点击选中碎片后可旋转。方向与位置接近目标时会自动吸附。碎片归位后，完整图像会逐渐显现。</p>';$('#rotateLeft').onclick=()=>rotate(-15);$('#rotateRight').onclick=()=>rotate(15);paintPieces();const svg=$('#puzzleSvg');svg.addEventListener('pointermove',movePiece);svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag)}
function paintPieces(){if(!$('#pieces'))return;$('#pieces').innerHTML=pieces.map((p,i)=>`<g class="piece ${i===selected?'selected':''} ${p.snapped?'snapped':''}" data-piece="${i}" transform="translate(${p.x} ${p.y}) rotate(${p.a})" ${p.snapped?'':`tabindex="0" role="button" aria-label="碎片 ${i+1}，方向${p.a}度"`}><path class="hit" d="${p.d}" fill="none" stroke="transparent" stroke-width="29"/><path class="visible" d="${p.d}" fill="none" stroke="${p.fixed?'#203b4d':p.snapped?'#39867b':'#c36a43'}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>`).join('');document.querySelectorAll('[data-piece]').forEach(g=>{g.onpointerdown=e=>{const i=+g.dataset.piece,p=pieces[i];if(p.snapped||won)return;e.preventDefault();selected=i;const pt=svgPoint(e);drag={i,dx:pt.x-p.x,dy:pt.y-p.y};$('#puzzleSvg').setPointerCapture(e.pointerId);paintPieces()};g.onkeydown=e=>{selected=+g.dataset.piece;if(e.key==='Enter'||e.key===' '){e.preventDefault();paintPieces()}else if(e.key==='r'||e.key==='R')rotate(15);else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const p=pieces[selected];p.x+=e.key==='ArrowLeft'?-10:e.key==='ArrowRight'?10:0;p.y+=e.key==='ArrowUp'?-10:e.key==='ArrowDown'?10:0;trySnap(p);paintPieces();document.querySelector(`[data-piece="${selected}"]`)?.focus();checkClosure()}}});$('#pieceProgress').textContent=pieces.filter(p=>!p.fixed&&p.snapped).length+' / '+pieces.filter(p=>!p.fixed).length+' 已归位'}
function svgPoint(e){const pt=$('#puzzleSvg').createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform($('#puzzleSvg').getScreenCTM().inverse())}
function movePiece(e){if(!drag)return;const pt=svgPoint(e),p=pieces[drag.i];p.x=Math.max(20,Math.min(780,pt.x-drag.dx));p.y=Math.max(35,Math.min(615,pt.y-drag.dy));const g=document.querySelector(`[data-piece="${drag.i}"]`);g?.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.a})`)}
function endDrag(){if(!drag)return;trySnap(pieces[drag.i]);drag=null;paintPieces();checkClosure()}
function trySnap(p){const a=((p.a%360)+360)%360;if(Math.hypot(p.x-p.tx,p.y-p.ty)<35&&Math.min(a,360-a)<20){p.x=p.tx;p.y=p.ty;p.a=0;p.snapped=true;$('#targetHint').innerHTML='';toast('线索连接起来了。')}}
function rotate(deg){if(selected<0||pieces[selected]?.snapped){toast('先点击一块橙色碎片。');return}const p=pieces[selected];p.a=(p.a+deg+360)%360;trySnap(p);paintPieces();checkClosure()}
function checkClosure(){if(pieces.every(p=>p.snapped))win(shapeNames[level])}
let targetGroup=0;
function insidePoly(x,y,poly){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!=(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)hit=!hit}return hit}
const dotPaths=new Map();
let maskContext;
function targetMask(l,x,y){if(l>=originalQuestionCount){
  if(!dotPaths.has(l))dotPaths.set(l,new Path2D(artwork[simNames[l]].outline));
  maskContext ??= document.createElement('canvas').getContext('2d');
  return maskContext.isPointInPath(dotPaths.get(l),x*345/similarityScale,y*260/similarityScale,'evenodd');
}if(l===0)return((x+.1)**2/.65**2+y*y/.33**2<1)||insidePoly(x,y,[[-.55,0],[-.91,-.37],[-.91,.37]]);if(l===1){let xx=x/0.8,yy=-y/0.8;return (xx*xx+yy*yy-0.7)**3-xx*xx*yy**3<0;}if(l===2)return x*x+y*y<.66**2&&(x-.3)**2+(y+.11)**2>.56**2;if(l===3){const u=(x+y)*.707,v=(y-x)*.707;return (Math.abs(u)<.75&&Math.abs(v)<.34*(1-(u/.75)**2))||(u>-.93&&u<-.65&&Math.abs(v)<.025)}let poly=Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,r=i%2?.32:.8;return[Math.cos(a)*r,Math.sin(a)*r]});return insidePoly(x,y,poly)}
function makePoints(l,noise=settings.noise,s=seed){const R=rng(8100+s*11),C=rng(9700+l*79+s*11);const pts=[];const step=22;targetGroup=(l+1)%4;for(let row=0;row<22;row++)for(let col=0;col<32;col++){const x=52+col*step+(R()-.5)*step*.48,y=45+row*step+(R()-.5)*step*.48;const inside=targetMask(l,(x-400)/345,(y-280)/260);let g;if(C()<(inside?(l>=originalQuestionCount?1:.97):noise/100))g=targetGroup;else{g=Math.floor(C()*3);if(g>=targetGroup)g++}pts.push({x,y,g,inside})}return pts}
function mountSimilarity(){mode='similarity';points=makePoints(level);$('#stage').innerHTML='<span class="stage-label">SAME POSITIONS · DIFFERENT RELATIONS</span><canvas id="dotsCanvas" width="1600" height="1120" aria-label="密度均匀的彩色散点图"></canvas><span class="art-badge">全画面 704 点 · 同一间距规则</span>';$('#specificTools').innerHTML='<span class="toolhint" style="width:auto">强调颜色</span><button class="swatch all on" data-filter="-1" aria-label="显示全部颜色">全部</button>'+COLORS.map((c,i)=>`<button class="swatch" data-filter="${i}" style="background:${c}" aria-label="强调第${i+1}种颜色"></button>`).join('');document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=+b.dataset.filter;drawDots();updateSwatches()});const answer=simNames[level];const others=simNames.filter(n=>n!==answer);const names=others.slice(level%6,level%6+3);names.splice(level%4,0,answer);choices(names,answer,'先点击下方颜色圆钮，再观察哪些圆点组成了整体。你发现了什么？');drawDots()}
function updateSwatches(){document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('on',+b.dataset.filter===filter))}
function drawDots(){const c=$('#dotsCanvas');if(!c)return;const ctx=c.getContext('2d');ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#f4f0e6';ctx.fillRect(0,0,800,560);for(const p of points){ctx.beginPath();ctx.arc(p.x,p.y,level>=originalQuestionCount?6.4:5.2,0,Math.PI*2);ctx.fillStyle=filter<0?COLORS[p.g]:p.g===filter?'#155e59':'#e7e6de';ctx.fill()}}
const artWorks=[
{title:'神奈川冲浪里',artist:'葛饰北斋',date:'约1830—1832年',museum:'大都会艺术博物馆',tag:'图底关系',en:'FIGURE & GROUND',image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/45434/134438/main-image',url:'https://www.metmuseum.org/art/collection/search/45434',intro:'巨浪与天空的边界，也在组织你的观看。',question:'把目光从深蓝色的海浪移向浪尖围出的浅色空间，哪种说法更符合你的观察？',options:['留白也参与构成画面的形状','背景空白不会影响观看','只能把最深的颜色当作主体'],answer:0,explain:'从图底关系的角度看，浅色天空不是被动的空白。浪尖与天空的共同边界塑造了画面的张力。远处富士山又与巨浪形成大小、远近的对照。此处讨论图底组织，不要求原作具有双义图。',caption:'原作图像：The Metropolitan Museum of Art，公共领域。',effect:'gray',effectText:'去色观察图底'},
{title:'舞蹈（I）',artist:'亨利·马蒂斯',date:'1909年',museum:'纽约现代艺术博物馆',tag:'封闭趋势与连续性',en:'CLOSURE & CONTINUITY',image:'https://www.moma.org/media/W1siZiIsIjYxOTkzOCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=91b33eed638d00aa',url:'https://www.moma.org/collection/works/79124',intro:'人物之间有间隙，舞蹈的环形关系仍然成立。',question:'沿着人物伸展的手臂观察，即使局部连接留有间隙，你仍更容易感受到什么？',options:['彼此无关的独立色块','一圈持续的舞蹈运动','只能看到完整的几何圆'],answer:1,explain:'我们可以沿着人物姿态和手臂方向，补足环形运动的联系。这可用封闭趋势与良好连续性共同解读。它不同于补全单个物体轮廓，也不意味着画家有意演示某一条心理学法则。',caption:'原作图像：MoMA。© Succession H. Matisse / Artists Rights Society (ARS), New York。',effect:'guide',effectText:'显示环形观察线'},
{title:'百老汇爵士乐',artist:'皮特·蒙德里安',date:'1942—1943年',museum:'纽约现代艺术博物馆',tag:'相似性与视觉节奏',en:'SIMILARITY',image:'https://www.moma.org/media/W1siZiIsIjY0NDI3OSJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=93289f7c758e80ef',url:'https://www.moma.org/collection/works/78682',intro:'反复出现的颜色，让分散色块产生联系。',question:'寻找画面里重复出现的红色或蓝色色块。去色后再比较，哪种视觉线索减弱了？',options:['所有线条的位置','画面的物理尺寸','同色元素之间的联系'],answer:2,explain:'同色方块分布在不同位置，仍会形成视觉上的呼应。去色后，颜色相似性提供的联系减弱，线条方向、邻近关系和明暗仍在组织画面。这是对作品的格式塔观察解读。',caption:'原作图像：MoMA。作品与馆藏信息见馆方来源。',effect:'gray',effectText:'去色比较'}
];
function renderArt(){const a=artWorks[artIndex];app.innerHTML=topIntro('艺术中的格式塔','把游戏里的发现，带回经典作品。')+`<div class="art-tabs">${artWorks.map((x,i)=>`<button class="subtle ${i===artIndex?'chosen':''}" data-art="${i}">0${i+1} · ${x.tag}</button>`).join('')}</div><section class="art-layout"><div class="art-visual"><div class="art-imagebox" id="artImageBox"><img id="classicImage" src="${a.image}" alt="${a.artist}《${a.title}》原作"><svg class="art-guide" id="artGuide" hidden viewBox="0 0 100 70" aria-label="环形运动观察引导，非原作"><ellipse cx="51" cy="34" rx="39" ry="25" fill="none" stroke="#f6e8a7" stroke-width=".7" stroke-dasharray="2 2"/></svg><div id="artFallback" hidden><h2>《${a.title}》</h2><p>馆方图像暂时未能载入。</p><a href="${a.url}" target="_blank" rel="noopener">打开馆方原作 ↗</a></div></div><p class="art-credit">${a.caption}</p><div class="art-actions"><button class="subtle" id="artEffect">${a.effectText}</button><a class="source-link" href="${a.url}" target="_blank" rel="noopener">馆方原作与资料 ↗</a></div></div><div class="art-text"><p class="eyebrow">${a.en}</p><h2>《${a.title}》</h2><p class="art-meta">${a.artist} · ${a.date}<br>${a.museum}</p><p class="art-intro">${a.intro}</p><div class="art-question"><p class="eyebrow">LOOK · THINK · DISCOVER</p><p>${a.question}</p><div class="art-options">${a.options.map((v,i)=>`<button class="choice" data-art-answer="${i}">${v}</button>`).join('')}</div><div id="artFeedback" role="status"></div></div><p class="art-disclaimer">观察解读：借助格式塔原理分析观看效果，并非艺术家创作意图的定论。</p><button class="primary" id="artToGame">回到${roomNames[artIndex]} →</button></div></section>`;document.querySelectorAll('[data-art]').forEach(b=>b.onclick=()=>{artIndex=+b.dataset.art;renderArt()});const img=$('#classicImage');img.onerror=()=>{img.hidden=true;$('#artFallback').hidden=false;$('#artEffect').disabled=true};let effect=false;$('#artEffect').onclick=()=>{effect=!effect;if(a.effect==='gray')img.classList.toggle('desaturated',effect);else{$('#artGuide').hidden=!effect;$('#artImageBox').classList.toggle('guided',effect)}$('#artEffect').textContent=effect?'还原作品':a.effectText};document.querySelectorAll('[data-art-answer]').forEach(b=>b.onclick=()=>{let correct=+b.dataset.artAnswer===a.answer;$('#artFeedback').innerHTML=correct?`<h3>你发现了作品中的联系。</h3><p>${a.explain}</p>`:'<p>再观察一下颜色、边界与人物之间的联系，也可以先试试左侧观察工具。</p>';b.classList.toggle('art-correct',correct)});$('#artToGame').onclick=()=>{room=artIndex;level=0;view='play';render()}}

$('.brand').onclick=e=>{e.preventDefault();view='play';render()};$('#navPlay').onclick=()=>{view='play';render()};$('#navCollection').onclick=()=>{view='collection';render()};$('#navAbout').onclick=()=>{view='about';render()};$('#settingsBtn').onclick=()=>{$('#pieceSetting').value=settings.pieces;$('#noiseSetting').value=settings.noise;$('#pieceOut').textContent=settings.pieces;$('#noiseOut').textContent=settings.noise+'%';$('#settings').showModal()};$('#pieceSetting').oninput=e=>$('#pieceOut').textContent=e.target.value;$('#noiseSetting').oninput=e=>$('#noiseOut').textContent=e.target.value+'%';$('#settings').addEventListener('close',()=>{settings.pieces=+$('#pieceSetting').value;settings.noise=+$('#noiseSetting').value;persist();toast('设置已保存，重新开始当前题即可应用。')});

render();
