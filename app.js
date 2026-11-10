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
 {name:'花径藏蝶',answer:'蝴蝶',choices:['飞鸟','蝴蝶','花苞','蝙蝠'],hint:'把深色花叶当作背景，看看中央留白是否有左右对称的翅膀。',explain:'两侧花叶的边缘，也围出了蝴蝶展开的双翼。',frame:'M0 0H800V157Q667 104 573 161Q543 182 473 173Q439 166 398 192Q358 147 315 164Q190 199 132 118L0 182ZM0 200Q125 157 225 223L340 231L458 207Q649 139 800 214V560H0Z'},
 {name:'港湾藏帆',answer:'帆船',choices:['雨伞','灯塔','帆船','海鸥'],hint:'找找浅色区域里高高的三角形，再沿水平线看向船身。',explain:'港湾的深色边沿与船帆、船身的浅色边沿共享轮廓。',frame:'M0 0H270L411 151L614 16H800V560H0Z M0 222Q72 182 157 217L198 228Q113 212 0 280Z M800 354Q695 292 615 355Q694 350 800 411Z'},
 {name:'山谷之鸟',answer:'飞鸟',choices:['蝴蝶','风筝','鲸鱼','飞鸟'],hint:'留意留白向两边展开的部分，以及朝右的小尖角。',explain:'两片山石之间的空隙，转过来可以看成展翅的鸟。',frame:'M0 0H800V189L673 150L574 157L552 127L458 173L388 164L301 181L214 170L128 217L0 158ZM0 182L139 243L211 188L319 207L427 181L559 153L646 184L800 146V560H0Z'},
 {name:'云隙见月',answer:'月牙',choices:['月牙','叶片','鱼','花瓶'],hint:'沿着画面左侧那一圈浅色弧线看，比较内外两条边缘的弯曲方向。',explain:'一边看是云层的边界，另一边看是月牙的两条弧线。',frame:'M0 0H800V560H0Z M0 178Q100 113 207 139Q255 159 305 129Q287 171 209 169Q110 159 0 227Z M800 383Q692 320 551 355Q638 356 800 429Z M800 225Q692 189 600 236Q698 218 800 271Z'},
 {name:'雨幕藏伞',answer:'雨伞',choices:['蘑菇','雨伞','铃铛','花苞'],hint:'先找浅色的大弧面，再向下找一条细细的弯钩。',explain:'雨幕切出的空隙既勾勒深色街景，也围出一把伞。',frame:'M0 0H800V560H0Z M0 101L201 168L184 174L0 130Z M800 88L611 173L602 157L800 55Z M0 420L218 350L225 366L0 450Z M800 474L560 389L571 376L800 442Z'}
];
const shapeNames=['苹果','房屋','爱心','猫','茶杯','蘑菇','雨伞','风筝','蝴蝶','企鹅'];
const simNames=['鱼','爱心','月牙','叶片','星星','风筝','雨伞','蝴蝶','铃铛','雪人'];
const questionCounts=[figures.length, shapeNames.length, simNames.length];
const totalQuestions=questionCounts.reduce((total, length)=>total+length, 0);
let saved;try{saved=JSON.parse(localStorage.getItem('between-perceptions-v1')||'{}')}catch{saved={}}
let completed=saved.completed||{}, settings={pieces:6,noise:8,...saved.settings};
if(!saved.revision||saved.revision<2)settings.noise=8;
let artIndex=0;
let room=0, level=0, view='play', won=false, hinted=false, mode=null, selected=-1, pieces=[], points=[], filter=-1, seed=1, drag=null;
function persist(){try{localStorage.setItem('between-perceptions-v1',JSON.stringify({completed,settings,revision:2}))}catch{}}
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
 if(r!==1)return artworkMarkup(name,{id});
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
function shapeOutline(l){if(l>=5)return sampledOutline(shapeNames[l]);if(l===0){const curves=[[[0,-92],[55,-128],[123,-105],[126,-40]],[[126,-40],[145,35],[91,129],[40,119]],[[40,119],[13,108],[-10,111],[-40,121]],[[-40,121],[-96,132],[-147,32],[-126,-40]],[[-126,-40],[-124,-108],[-56,-129],[0,-92]]];let out=[];for(const [p0,p1,p2,p3] of curves)for(let k=0;k<32;k++){let t=k/32,u=1-t;out.push([u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0],u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]])}return out;}if(l===1)return polyline([[-120,100],[-120,-35],[-150,-35],[0,-155],[150,-35],[120,-35],[120,100],[34,100],[34,30],[-25,30],[-25,100],[-120,100]]);if(l===2)return Array.from({length:161},(_,i)=>{let t=i/160*Math.PI*2;return[8*16*Math.sin(t)**3,-8*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))]});if(l===3)return polyline([[-90,110],[-100,60],[-80,5],[-80,-95],[-50,-145],[-5,-100],[35,-100],[85,-145],[105,-65],[95,-5],[65,25],[70,90],[115,100],[145,75],[160,40],[170,65],[167,110],[120,135],[-90,135]]);return polyline([[-105,-85],[90,-85],[90,-60],[145,-70],[170,-35],[165,10],[130,30],[90,20],[75,80],[45,105],[-65,105],[-95,65],[-105,-85]])}
function buildPieces(){const arr=shapeOutline(level),N=14,R=rng(200+level*39+seed);const movable=new Set(Array.from({length:settings.pieces},(_,i)=>Math.floor(i*N/settings.pieces)));let m=0;pieces=[];for(let i=0;i<N;i++){const start=Math.floor(i*arr.length/N),end=Math.floor((i+.68)*arr.length/N),seg=arr.slice(start,end+1);if(!seg.length)continue;const cx=seg.reduce((s,p)=>s+p[0],0)/seg.length,cy=seg.reduce((s,p)=>s+p[1],0)/seg.length;const fixed=!movable.has(i);let p={d:seg.map((p,j)=>(j?'L':'M')+(p[0]-cx).toFixed(2)+' '+(p[1]-cy).toFixed(2)).join(' '),tx:400+cx,ty:235+cy,fixed,snapped:fixed,a:0};p.x=fixed?p.tx:75+(m%4)*210;p.y=fixed?p.ty:480+Math.floor(m/4)*73;p.a=fixed?0:(Math.floor(R()*6)+1)*45;if(!fixed)m++;pieces.push(p)}return pieces}
function mountClosure(){mode='closure';buildPieces();$('#stage').innerHTML=`<span class="stage-label">DRAG · ROTATE · DISCOVER</span><svg id="puzzleSvg" viewBox="0 0 800 640" aria-label="封闭性拼图，可拖动橙色线条"><line x1="35" y1="420" x2="765" y2="420" stroke="#e0e2d7" stroke-dasharray="4 7"/><text x="35" y="447" fill="#879080" font-size="11" letter-spacing="2">可移动碎片</text>${level===0?'<path d="M400 137 Q396 111 411 99 M405 122 Q423 97 448 106 Q434 128 405 122" fill="none" stroke="#203b4d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>':''}<g id="targetHint"></g><g id="pieces"></g></svg>`;$('#specificTools').innerHTML='<button class="subtle" id="rotateLeft" aria-label="逆时针旋转15度">↶ 15°</button><button class="subtle" id="rotateRight" aria-label="顺时针旋转15度">↷ 15°</button><span class="toolhint" id="pieceProgress"></span>';$('#workbottom').innerHTML='<p class="taskline">将橙色碎片拖入上方画布，调整方向，让一个熟悉的形象出现。</p><p class="muted">点击选中碎片后可旋转。方向与位置接近目标时会自动吸附。碎片归位后，完整图像会逐渐显现。</p>';$('#rotateLeft').onclick=()=>rotate(-15);$('#rotateRight').onclick=()=>rotate(15);paintPieces();const svg=$('#puzzleSvg');svg.addEventListener('pointermove',movePiece);svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag)}
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
function targetMask(l,x,y){if(l>=5){
  if(!dotPaths.has(l))dotPaths.set(l,new Path2D(artwork[simNames[l]].outline));
  maskContext ??= document.createElement('canvas').getContext('2d');
  return maskContext.isPointInPath(dotPaths.get(l),x*345,y*260);
}if(l===0)return((x+.1)**2/.65**2+y*y/.33**2<1)||insidePoly(x,y,[[-.55,0],[-.91,-.37],[-.91,.37]]);if(l===1){let xx=x/0.8,yy=-y/0.8;return (xx*xx+yy*yy-0.7)**3-xx*xx*yy**3<0;}if(l===2)return x*x+y*y<.66**2&&(x-.3)**2+(y+.11)**2>.56**2;if(l===3){const u=(x+y)*.707,v=(y-x)*.707;return (Math.abs(u)<.75&&Math.abs(v)<.34*(1-(u/.75)**2))||(u>-.93&&u<-.65&&Math.abs(v)<.025)}let poly=Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,r=i%2?.32:.8;return[Math.cos(a)*r,Math.sin(a)*r]});return insidePoly(x,y,poly)}
function makePoints(l,noise=settings.noise,s=seed){const R=rng(8100+s*11),C=rng(9700+l*79+s*11);const pts=[];const step=22;targetGroup=(l+1)%4;for(let row=0;row<22;row++)for(let col=0;col<32;col++){const x=52+col*step+(R()-.5)*step*.48,y=45+row*step+(R()-.5)*step*.48;const inside=targetMask(l,(x-400)/345,(y-280)/260);let g;if(C()<(inside?.97:noise/100))g=targetGroup;else{g=Math.floor(C()*3);if(g>=targetGroup)g++}pts.push({x,y,g,inside})}return pts}
function mountSimilarity(){mode='similarity';points=makePoints(level);$('#stage').innerHTML='<span class="stage-label">SAME POSITIONS · DIFFERENT RELATIONS</span><canvas id="dotsCanvas" width="1600" height="1120" aria-label="密度均匀的彩色散点图"></canvas><span class="art-badge">全画面 704 点 · 同一间距规则</span>';$('#specificTools').innerHTML='<span class="toolhint" style="width:auto">强调颜色</span><button class="swatch all on" data-filter="-1" aria-label="显示全部颜色">全部</button>'+COLORS.map((c,i)=>`<button class="swatch" data-filter="${i}" style="background:${c}" aria-label="强调第${i+1}种颜色"></button>`).join('');document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=+b.dataset.filter;drawDots();updateSwatches()});const answer=simNames[level];const others=simNames.filter(n=>n!==answer);const names=others.slice(level%6,level%6+3);names.splice(level%4,0,answer);choices(names,answer,'先点击下方颜色圆钮，再观察哪些圆点组成了整体。你发现了什么？');drawDots()}
function updateSwatches(){document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('on',+b.dataset.filter===filter))}
function drawDots(){const c=$('#dotsCanvas');if(!c)return;const ctx=c.getContext('2d');ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle='#f4f0e6';ctx.fillRect(0,0,800,560);for(const p of points){ctx.beginPath();ctx.arc(p.x,p.y,5.2,0,Math.PI*2);ctx.fillStyle=filter<0?COLORS[p.g]:p.g===filter?'#155e59':'#e7e6de';ctx.fill()}}
const artWorks=[
{title:'神奈川冲浪里',artist:'葛饰北斋',date:'约1830—1832年',museum:'大都会艺术博物馆',tag:'图底关系',en:'FIGURE & GROUND',image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/45434/134438/main-image',url:'https://www.metmuseum.org/art/collection/search/45434',intro:'巨浪与天空的边界，也在组织你的观看。',question:'把目光从深蓝色的海浪移向浪尖围出的浅色空间，哪种说法更符合你的观察？',options:['留白也参与构成画面的形状','背景空白不会影响观看','只能把最深的颜色当作主体'],answer:0,explain:'从图底关系的角度看，浅色天空不是被动的空白。浪尖与天空的共同边界塑造了画面的张力。远处富士山又与巨浪形成大小、远近的对照。此处讨论图底组织，不要求原作具有双义图。',caption:'原作图像：The Metropolitan Museum of Art，公共领域。',effect:'gray',effectText:'去色观察图底'},
{title:'舞蹈（I）',artist:'亨利·马蒂斯',date:'1909年',museum:'纽约现代艺术博物馆',tag:'封闭趋势与连续性',en:'CLOSURE & CONTINUITY',image:'https://www.moma.org/media/W1siZiIsIjYxOTkzOCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=91b33eed638d00aa',url:'https://www.moma.org/collection/works/79124',intro:'人物之间有间隙，舞蹈的环形关系仍然成立。',question:'沿着人物伸展的手臂观察，即使局部连接留有间隙，你仍更容易感受到什么？',options:['彼此无关的独立色块','一圈持续的舞蹈运动','只能看到完整的几何圆'],answer:1,explain:'我们可以沿着人物姿态和手臂方向，补足环形运动的联系。这可用封闭趋势与良好连续性共同解读。它不同于补全单个物体轮廓，也不意味着画家有意演示某一条心理学法则。',caption:'原作图像：MoMA。© Succession H. Matisse / Artists Rights Society (ARS), New York。',effect:'guide',effectText:'显示环形观察线'},
{title:'百老汇爵士乐',artist:'皮特·蒙德里安',date:'1942—1943年',museum:'纽约现代艺术博物馆',tag:'相似性与视觉节奏',en:'SIMILARITY',image:'https://www.moma.org/media/W1siZiIsIjY0NDI3OSJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=93289f7c758e80ef',url:'https://www.moma.org/collection/works/78682',intro:'反复出现的颜色，让分散色块产生联系。',question:'寻找画面里重复出现的红色或蓝色色块。去色后再比较，哪种视觉线索减弱了？',options:['所有线条的位置','画面的物理尺寸','同色元素之间的联系'],answer:2,explain:'同色方块分布在不同位置，仍会形成视觉上的呼应。去色后，颜色相似性提供的联系减弱，线条方向、邻近关系和明暗仍在组织画面。这是对作品的格式塔观察解读。',caption:'原作图像：MoMA。作品与馆藏信息见馆方来源。',effect:'gray',effectText:'去色比较'}
];
function renderArt(){const a=artWorks[artIndex];app.innerHTML=topIntro('艺术中的格式塔','把游戏里的发现，带回经典作品。')+`<div class="art-tabs">${artWorks.map((x,i)=>`<button class="subtle ${i===artIndex?'chosen':''}" data-art="${i}">0${i+1} · ${x.tag}</button>`).join('')}</div><section class="art-layout"><div class="art-visual"><div class="art-imagebox" id="artImageBox"><img id="classicImage" src="${a.image}" alt="${a.artist}《${a.title}》原作"><svg class="art-guide" id="artGuide" hidden viewBox="0 0 100 70" aria-label="环形运动观察引导，非原作"><ellipse cx="51" cy="34" rx="39" ry="25" fill="none" stroke="#f6e8a7" stroke-width=".7" stroke-dasharray="2 2"/></svg><div id="artFallback" hidden><h2>《${a.title}》</h2><p>馆方图像暂时未能载入。</p><a href="${a.url}" target="_blank" rel="noopener">打开馆方原作 ↗</a></div></div><p class="art-credit">${a.caption}</p><div class="art-actions"><button class="subtle" id="artEffect">${a.effectText}</button><a class="source-link" href="${a.url}" target="_blank" rel="noopener">馆方原作与资料 ↗</a></div></div><div class="art-text"><p class="eyebrow">${a.en}</p><h2>《${a.title}》</h2><p class="art-meta">${a.artist} · ${a.date}<br>${a.museum}</p><p class="art-intro">${a.intro}</p><div class="art-question"><p class="eyebrow">LOOK · THINK · DISCOVER</p><p>${a.question}</p><div class="art-options">${a.options.map((v,i)=>`<button class="choice" data-art-answer="${i}">${v}</button>`).join('')}</div><div id="artFeedback" role="status"></div></div><p class="art-disclaimer">观察解读：借助格式塔原理分析观看效果，并非艺术家创作意图的定论。</p><button class="primary" id="artToGame">回到${roomNames[artIndex]} →</button></div></section>`;document.querySelectorAll('[data-art]').forEach(b=>b.onclick=()=>{artIndex=+b.dataset.art;renderArt()});const img=$('#classicImage');img.onerror=()=>{img.hidden=true;$('#artFallback').hidden=false;$('#artEffect').disabled=true};let effect=false;$('#artEffect').onclick=()=>{effect=!effect;if(a.effect==='gray')img.classList.toggle('desaturated',effect);else{$('#artGuide').hidden=!effect;$('#artImageBox').classList.toggle('guided',effect)}$('#artEffect').textContent=effect?'还原作品':a.effectText};document.querySelectorAll('[data-art-answer]').forEach(b=>b.onclick=()=>{let correct=+b.dataset.artAnswer===a.answer;$('#artFeedback').innerHTML=correct?`<h3>你发现了作品中的联系。</h3><p>${a.explain}</p>`:'<p>再观察一下颜色、边界与人物之间的联系，也可以先试试左侧观察工具。</p>';b.classList.toggle('art-correct',correct)});$('#artToGame').onclick=()=>{room=artIndex;level=0;view='play';render()}}

$('.brand').onclick=e=>{e.preventDefault();view='play';render()};$('#navPlay').onclick=()=>{view='play';render()};$('#navCollection').onclick=()=>{view='collection';render()};$('#navAbout').onclick=()=>{view='about';render()};$('#settingsBtn').onclick=()=>{$('#pieceSetting').value=settings.pieces;$('#noiseSetting').value=settings.noise;$('#pieceOut').textContent=settings.pieces;$('#noiseOut').textContent=settings.noise+'%';$('#settings').showModal()};$('#pieceSetting').oninput=e=>$('#pieceOut').textContent=e.target.value;$('#noiseSetting').oninput=e=>$('#noiseOut').textContent=e.target.value+'%';$('#settings').addEventListener('close',()=>{settings.pieces=+$('#pieceSetting').value;settings.noise=+$('#noiseSetting').value;persist();toast('设置已保存，重新开始当前题即可应用。')});

render();
