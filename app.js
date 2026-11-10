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
 {name:'双鸟与奖杯',answer:'奖杯',choices:['花瓶','奖杯','台灯','沙漏'],
  hint:'沿两只鸟相对的身体看留白，找杯身、把手和底座。',
  explain:'两只鸟的胸口分别勾出杯身的两侧。把视线移到它们之间，鸟形退到背景，奖杯就浮现出来。',
  mirror:true,
  frame:'M395 134C370 137 366 165 354 182Q355 129 325 111C286 85 250 114 251 150Q252 167 271 186Q238 220 187 254L32 311L95 319L52 355L131 350L101 380L189 361Q221 392 280 400Q266 428 225 431L219 449H395Z',
  marks:'<circle cx="282" cy="140" r="7"/><path d="M108 319Q180 282 239 274Q213 324 153 339Q174 318 178 304Z"/><path d="M112 351Q194 332 225 302" fill="none" stroke="#f3ead4" stroke-width="4"/>'},
 {name:'翅膀里的叶片',answer:'叶片',choices:['浪花','叶片','鱼尾','月牙'],
  hint:'先把深色整体看成一只停着的鸟。留意翅膀上最长的一道浅色纹样。',
  explain:'那道浅色区域顺着鸟的翅膀延伸。把它单独当成主体，尖端和叶柄就组成一片叶子。',
  cutout:{x:333,y:268,scale:.79},
  frame:'M54 385L198 321C203 280 235 221 290 190C344 160 403 156 459 160Q474 110 511 98Q551 85 580 112Q593 123 600 142L735 161L617 190L593 210Q578 264 542 297Q507 334 452 352L424 357L428 395L458 404Q473 407 471 415H414L403 365L381 366L368 406L395 419Q405 424 397 430H345L357 366Q293 364 251 351L132 419L59 428L116 389L54 403Z',
  marks:'<circle cx="549" cy="140" r="9"/><path d="M573 170Q597 161 624 166M376 172Q428 169 477 183Q505 189 531 181M495 229Q524 230 544 217M87 403L237 344M137 398L257 341M367 406L370 416M428 395L422 407" fill="none" stroke="#f3ead4" stroke-width="6" stroke-linecap="round"/><path d="M265 213Q333 175 408 183Q343 190 291 218Z M234 269Q245 242 270 231Q249 251 253 268Z M217 310Q220 290 241 278L233 305Z M304 341Q364 322 410 285Q384 329 334 345Z M396 331Q436 306 464 275Q451 311 426 326Z M462 308Q493 284 508 256Q506 287 486 302Z"/><path d="M49 438Q284 424 492 433Q560 437 632 428" fill="none" stroke="#283f46" stroke-width="9" stroke-linecap="round"/>'},
 {name:'狐尾里的兔子',answer:'兔子',choices:['兔子','猫','松鼠','鹿'],
  hint:'先认出蜷着的大狐狸。顺着大尾巴上缘往里看，找两道细长的留白。',
  explain:'狐狸的尾巴围住自己的身体，尾尖与腹部之间的那块浅色区域也能看成一只蹲坐的兔子。',
  cutout:{x:387,y:326,scale:.69,angle:-12},
  frame:'M101 343C80 288 108 210 175 177Q222 151 267 168Q298 180 310 208Q324 185 358 168Q395 151 447 160L466 91Q469 74 479 87L526 147L572 101Q587 86 589 103L586 162Q606 178 622 201L682 233Q700 242 685 253Q648 281 596 279L548 266Q557 296 540 320Q621 310 662 359Q691 391 664 420Q629 452 550 459L324 472Q166 481 110 412Q91 388 101 343Z',
  marks:'<path d="M475 110L478 153L509 151Z M575 123L551 151L577 156Z M535 185Q550 172 567 183Q549 198 535 185Z M644 220L681 239Q657 253 638 244Z"/><path d="M110 349C132 288 191 246 251 257Q292 266 318 302Q287 296 260 308Q273 311 288 324Q250 320 220 338Q239 339 250 349Q206 350 178 380Q221 416 282 426Q346 441 412 428Q477 415 509 376Q534 347 542 319" fill="none" stroke="#f3ead4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M194 188Q226 175 253 183M146 218Q172 193 199 186M611 376Q635 387 642 403M590 383Q611 399 612 415" fill="none" stroke="#f3ead4" stroke-width="5" stroke-linecap="round"/>'},
 {name:'触手间的小鱼',answer:'小鱼',choices:['螃蟹','海马','小鱼','贝壳'],
  hint:'从章鱼的眼睛往下看，沿着几条触手的内缘找到连在一起的留白。',
  explain:'浅色轮廓的一侧是上方触手的边缘，另一侧是下方触手的边缘。视线从触手转向中间，空隙就变成一条小鱼。',
  cutout:{x:397,y:334,scale:.82,angle:-6},
  frame:'M302 205C275 143 302 75 358 58Q400 42 441 59C497 81 523 148 499 206Q509 223 536 218Q568 210 591 174Q612 143 645 143Q676 144 675 168Q674 185 656 185Q646 185 646 174Q632 179 620 202Q587 261 547 264Q579 270 611 256Q672 231 711 269Q737 295 718 312Q704 326 690 309Q678 292 655 295Q626 298 593 320Q626 332 658 326Q699 321 711 354Q720 378 703 390Q686 401 673 382Q660 367 625 379Q590 391 545 383Q573 413 611 428Q651 443 637 466Q625 482 596 475Q534 464 503 431Q488 482 454 501Q418 519 405 496Q397 479 422 466Q442 455 438 426Q408 474 355 492Q313 507 302 484Q294 461 328 454Q358 446 376 417Q324 435 263 420Q237 418 221 440Q202 465 180 450Q159 435 177 406Q205 362 259 376Q221 356 184 363Q135 376 112 348Q94 323 114 309Q134 299 147 321Q159 334 198 319Q235 305 270 317Q247 293 209 294Q149 293 122 259Q94 223 115 204Q132 192 145 211Q148 243 191 247Q231 247 256 267Q241 232 218 220Q190 207 182 175Q173 143 195 133Q214 128 218 150Q211 173 240 189Q277 203 293 234Q309 230 302 205Z',
  marks:'<path d="M336 179Q350 165 364 179M436 179Q450 165 464 179M380 197Q401 217 421 197M333 95Q357 70 385 73" stroke="#f3ead4" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M277 280Q308 255 338 265Q358 273 379 291M486 279Q515 254 549 257M208 334Q256 323 277 347M261 401Q296 406 322 393M509 397Q522 426 550 436M526 326Q561 316 590 298Q612 282 635 270M595 348Q622 339 647 343" fill="none" stroke="#f3ead4" stroke-width="6" stroke-linecap="round"/><g opacity=".8"><circle cx="276" cy="251" r="4"/><circle cx="289" cy="247" r="4"/><circle cx="306" cy="242" r="4"/><circle cx="534" cy="236" r="4"/><circle cx="548" cy="232" r="4"/><circle cx="562" cy="227" r="4"/><circle cx="249" cy="393" r="4"/><circle cx="232" cy="392" r="4"/><circle cx="569" cy="408" r="4"/><circle cx="582" cy="415" r="4"/></g>'},
 {name:'象鼻里的小鸭',answer:'小鸭',choices:['海豚','乌龟','白鹅','小鸭'],
  hint:'先顺着大象的长鼻子看它怎样卷起来，再把鼻子包住的浅色区域当成一个形象。',
  explain:'象鼻弯起包住一块留白。沿着鼻子的内侧看，那条边界也勾出了小鸭的头、扁嘴和身体。',
  cutout:{x:542,y:322,scale:.67},
  frame:'M106 256Q93 198 131 162Q163 127 225 133Q272 135 317 155Q371 106 440 120Q489 123 522 169Q543 195 553 228Q566 254 586 262Q608 271 625 255Q643 237 637 211Q631 186 642 164Q655 138 677 148Q697 158 693 188Q711 232 688 289Q654 386 552 388Q497 389 458 351L454 426Q453 447 437 447H398Q382 447 382 427L382 357Q358 364 337 359L331 428Q328 450 312 450H268Q252 450 255 428L259 349Q236 346 217 338L209 425Q205 449 187 449H148Q131 449 134 428L143 318Q121 300 111 275Q91 279 82 301Q72 325 54 322Q49 302 64 283Q79 264 106 256Z',
  marks:'<circle cx="493" cy="213" r="8"/><path d="M407 174C380 145 331 160 310 193C289 227 298 279 328 307Q356 331 384 312Q417 291 426 240" fill="none" stroke="#f3ead4" stroke-width="8" stroke-linecap="round"/><path d="M472 254Q454 290 435 301Q464 302 491 275Z M644 203Q654 212 676 211M639 226Q656 234 676 230M625 249Q640 260 662 254M147 425h39m85 0h38m87 0h33" stroke="#f3ead4" stroke-width="5" stroke-linecap="round" fill="none"/>'}
];
const shapeNames=['苹果','房屋','爱心','猫','茶杯','冰淇淋','皇冠','雨靴','吉他','兔子'];
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
const outdated=Object.entries(completed).filter(([key,entry])=>{
 const [gallery,index]=key.split('-').map(Number);
 const figure=figures[index];
 const replacedFigure=gallery===0 && figure?.cutout && entry.name!==figure.name;
 return replacedFigure || (key==='1-6' && entry.name==='挂锁');
});
if(outdated.length){
 for(const [key] of outdated)delete completed[key];
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
 if(view==='collection'){app.innerHTML=topIntro('你的发现，留在这里','每一次发现，都是你与作品共同完成的解释。')+(count()?`<div class="gallery">${Object.entries(completed).map(([key,v])=>{const [r,l]=key.split('-').map(Number);return `<article>${completedArtwork(r, l, 'collection-'+key)}<p class="eyebrow">${english[r]} / ${String(l+1).padStart(2,'0')}</p><h3>${r===0?figures[l].name:v.name}</h3><p>${v.help?'使用过提示':'独立完成'} · ${roomNames[r]}</p></article>`}).join('')}</div>`:`<div class="empty"><h2>你的第一件作品，正在等你</h2><p class="muted">在任意展厅完成一个任务，就会收藏在这里。</p><button class="primary" id="emptyPlay">开始探索</button></div>`);if($('#emptyPlay'))$('#emptyPlay').onclick=()=>{view='play';render()};return}
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
 const guidance=f.cutout?'沿着深色主体内部的浅色边缘看':'观察深色形象之间的浅色区域';
 $('#specificTools').innerHTML=`<span class="toolhint">${guidance}</span>`;
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
 const offset=shapeNames[level]==='雨靴'?1:0;
 const movable=new Set(Array.from({length:settings.pieces},(_,i)=>(Math.floor(i*segmentCount/settings.pieces)+offset)%segmentCount));
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
