/* Personal creations stay in this browser; no image is sent to a server. */
const userWorkPrinciples = ['图底关系', '封闭性', '相似性'];
const userWorkOrigins = ['自己拍摄', '自己绘画或设计', 'AI 生成', '其他来源'];
let userWorkDatabase;
let releaseUserWorks = () => {};

function workEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function openUserWorks() {
  if (!window.indexedDB) return Promise.reject(new Error('这个浏览器无法保存作品，请换用普通浏览器打开。'));
  if (!userWorkDatabase) userWorkDatabase = new Promise((resolve, reject) => {
    const request = indexedDB.open('between-perceptions-user-works', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('works', {keyPath: 'id'});
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => { db.close(); userWorkDatabase = null; };
      resolve(db);
    };
    request.onerror = () => reject(new Error('无法打开作品存储，请检查浏览器的存储设置。'));
    request.onblocked = () => reject(new Error('请关闭其他游戏标签页，再重新打开“我的作品”。'));
  }).catch(error => { userWorkDatabase = null; throw error; });
  return userWorkDatabase;
}
async function userWorkStore(action, value) {
  const db = await openUserWorks();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('works', action === 'list' ? 'readonly' : 'readwrite');
    const store = tx.objectStore('works');
    const request = action === 'list' ? store.getAll() : action === 'save' ? store.put(value) : store.delete(value);
    let result;
    request.onsuccess = () => { result = request.result; };
    tx.oncomplete = () => resolve(result);
    tx.onerror = tx.onabort = () => reject(new Error(tx.error?.name === 'QuotaExceededError'
      ? '浏览器存储空间不足，请先下载并删除一些旧作品，再保存。'
      : '作品未能保存，请检查浏览器存储设置后重试。'));
  });
}
function loadWorkImage(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob), image = new Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('无法读取这张图片，请选择有效的 JPG、PNG 或 WebP 图片。')); };
    image.src = url;
  });
}
function workCanvasBlob(canvas, type = 'image/png', quality) {
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('图片处理失败，请换一张图片重试。')), type, quality));
}
async function prepareUserWorkImage(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('请选择 JPG、PNG 或 WebP 图片，不支持其他文件格式。');
  if (file.size > 10 * 1024 * 1024) throw new Error('图片不能超过 10 MB，请压缩后再试。');
  const image = await loadWorkImage(file);
  if (!image.naturalWidth || !image.naturalHeight) throw new Error('这张图片没有有效尺寸，请换一张图片。');
  const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f7f5ee'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return {image: await workCanvasBlob(canvas, 'image/jpeg', .88), width: canvas.width, height: canvas.height};
}
function workTextLines(ctx, text, width) {
  const lines = [];
  for (const paragraph of String(text).split('\n')) {
    let line = '';
    for (const character of paragraph) {
      if (line && ctx.measureText(line + character).width > width) { lines.push(line); line = character; }
      else line += character;
    }
    lines.push(line);
  }
  return lines;
}
function drawWorkMarks(ctx, marks, x, y, width, height, radius) {
  marks.forEach((mark, i) => {
    const mx = x + mark.x * width, my = y + mark.y * height;
    ctx.beginPath(); ctx.arc(mx, my, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#b04e30'; ctx.fill(); ctx.lineWidth = Math.max(2, radius / 8);
    ctx.strokeStyle = '#ffffff'; ctx.stroke();
    ctx.font = `bold ${Math.round(radius * 1.1)}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff'; ctx.fillText(String(i + 1), mx, my);
  });
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
}
async function downloadUserWork(work) {
  const image = await loadWorkImage(work.image);
  const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
  canvas.width = 1200;
  ctx.font = '28px "Microsoft YaHei", sans-serif';
  const reasonLines = workTextLines(ctx, work.explanation, 1072);
  const sourceLines = workTextLines(ctx, `图片来源：${work.origin}${work.source ? ' · ' + work.source : ''}`, 1072);
  ctx.font = 'bold 42px "Microsoft YaHei", sans-serif';
  const titleLines = workTextLines(ctx, work.title, 1072);
  const scale = Math.min(1072 / work.width, 900 / work.height);
  const iw = work.width * scale, ih = work.height * scale;
  const imageY = 174 + (titleLines.length - 1) * 54;
  const reasonY = imageY + ih + 68;
  canvas.height = Math.ceil(reasonY + reasonLines.length * 43 + sourceLines.length * 40 + 148);
  ctx.fillStyle = '#f7f5ee'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#66766c'; ctx.font = '23px "Microsoft YaHei", sans-serif'; ctx.fillText('知觉之间 · 我的格式塔作品', 64, 48);
  ctx.fillStyle = '#203b3b'; ctx.font = 'bold 42px "Microsoft YaHei", sans-serif';
  titleLines.forEach((line, i) => ctx.fillText(line, 64, 108 + i * 54));
  ctx.font = '25px "Microsoft YaHei", sans-serif';
  ctx.fillText(work.principles.join(' / '), 64, imageY - 27);
  const imageX = (1200 - iw) / 2;
  ctx.drawImage(image, imageX, imageY, iw, ih);
  drawWorkMarks(ctx, work.marks || [], imageX, imageY, iw, ih, 20);
  ctx.fillStyle = '#203b3b'; ctx.font = '28px "Microsoft YaHei", sans-serif';
  reasonLines.forEach((line, i) => ctx.fillText(line, 64, reasonY + i * 43));
  const sourceY = reasonY + reasonLines.length * 43 + 42;
  ctx.fillStyle = '#66766c'; ctx.font = '25px "Microsoft YaHei", sans-serif';
  sourceLines.forEach((line, i) => ctx.fillText(line, 64, sourceY + i * 40));
  const blob = await workCanvasBlob(canvas), url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = `${work.title.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '').slice(0, 60) || '我的格式塔作品'}.png`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function renderUserWorks() {
  releaseUserWorks();
  document.querySelector('#app').innerHTML = `<section class="user-works" id="userWorksRoot">
    <div class="works-intro"><div><p class="eyebrow">YOUR GESTALT GALLERY</p><h1>把你的发现，也留在这里</h1><p>上传自己的图片，标出关键位置，说说你看见的格式塔原理。</p></div></div>
    <p class="works-local-note">图片与说明仅保存在这台设备的当前浏览器，不会公开或上传到服务器。清理浏览器数据会移除作品，建议下载留存。</p>
    <div class="works-layout"><section class="works-editor" aria-labelledby="worksEditorTitle"><h2 id="worksEditorTitle">上传一件作品</h2>
      <form id="userWorkForm"><label class="works-upload" for="workFile"><strong>选择图片</strong><span>JPG、PNG、WebP，每张不超过 10 MB</span><input id="workFile" type="file" accept="image/jpeg,image/png,image/webp"></label>
      <p id="workImageStatus" class="works-feedback" role="status" aria-live="polite">可以使用自己拍摄、绘画、设计或 AI 生成的图片。</p>
      <label for="workTitle">作品名称<input id="workTitle" type="text" maxlength="80" placeholder="例如：树影中的一张侧脸" required></label>
      <fieldset><legend>你发现了什么原理？<span>可多选</span></legend><div class="works-principles">${userWorkPrinciples.map((p, i) => `<label><input name="workPrinciple" type="checkbox" value="${p}"><span>${p}</span></label>`).join('')}</div><p class="works-principle-help">图底：主体与留白的转换。封闭：缺口中的完整形象。相似：同色或同形元素的归组。</p></fieldset>
      <label for="workExplanation">它怎样体现这个原理？<textarea id="workExplanation" rows="4" maxlength="600" placeholder="描述图片里的具体位置，以及哪些线条、颜色或留白形成了整体。" required></textarea></label>
      <div class="works-source-row"><label for="workOrigin">图片来源<select id="workOrigin">${userWorkOrigins.map(p => `<option>${p}</option>`).join('')}</select></label><label for="workSource">来源说明 <span id="workSourceOptional">（选填）</span><input id="workSource" type="text" maxlength="240" placeholder="作者、拍摄地点、作品名或来源网址"></label></div>
      <p id="workFormStatus" class="works-feedback" role="status" aria-live="polite"></p><div class="works-actions"><button type="submit" class="primary" id="workSave" disabled>保存到我的作品</button><button type="button" class="subtle" id="workNew">新建作品</button></div>
      </form></section>
      <section class="works-preview" aria-labelledby="workPreviewTitle"><h2 id="workPreviewTitle">观察与标注</h2><p>点击图片，标出体现原理的位置（选填，最多 8 处）。</p><div id="workPreview"><div class="works-placeholder"><span>◐</span><p>上传后，在这里观察你的图片</p></div></div><div class="works-mark-actions"><span id="workMarkCount">尚未标注</span><button type="button" id="workUndo" class="subtle" disabled>撤销标注</button><button type="button" id="workClear" class="subtle" disabled>清除标注</button></div><p class="works-preview-note">用编号对应说明中的位置，例如“标记 1 附近的留白构成一只鸟”。</p></section></div>
    <section class="works-saved" aria-labelledby="workSavedTitle"><div class="works-saved-heading"><h2 id="workSavedTitle">我的作品 <span id="workSavedCount">0</span></h2><label for="workFilter">按原理查看<select id="workFilter"><option value="">全部作品</option>${userWorkPrinciples.map(p => `<option>${p}</option>`).join('')}</select></label></div><p id="workListStatus" class="works-feedback" role="status">正在读取作品…</p><div class="works-grid" id="workGrid"></div></section>
    <dialog class="works-delete-dialog" id="workDeleteDialog"><h2>删除这件作品？</h2><p>删除前可以先下载作品卡片。其他作品和游戏进度不会受影响。</p><div class="works-actions"><button type="button" id="workDeleteCancel" class="subtle">保留作品</button><button type="button" id="workDeleteConfirm" class="primary">删除作品</button></div></dialog>
    </section>`;
  const root = document.querySelector('#userWorksRoot'), find = s => root.querySelector(s);
  let allWorks = [], currentImage = null, marks = [], editingId = null, createdAt = null, editorUrl = null, galleryUrls = [], busy = false, pendingDelete = null;
  const active = () => root.isConnected;
  const status = (selector, message, error = false) => { if (!active()) return; const el = find(selector); el.textContent = message; el.classList.toggle('is-error', error); };
  releaseUserWorks = () => { if (editorUrl) URL.revokeObjectURL(editorUrl); galleryUrls.forEach(url => URL.revokeObjectURL(url)); };
  function updateMarks() {
    const layer = find('.works-mark-layer');
    if (layer) layer.innerHTML = marks.map((m, i) => `<span class="works-mark" style="left:${m.x * 100}%;top:${m.y * 100}%">${i + 1}</span>`).join('');
    find('#workMarkCount').textContent = marks.length ? `已标注 ${marks.length} 处` : '尚未标注';
    find('#workUndo').disabled = find('#workClear').disabled = !marks.length;
  }
  function showPreview() {
    if (editorUrl) URL.revokeObjectURL(editorUrl);
    editorUrl = URL.createObjectURL(currentImage.image);
    find('#workPreview').innerHTML = `<button type="button" class="works-mark-board" aria-label="在图片上标记关键位置，键盘回车在中心标记" style="max-width:${Math.round(580 * currentImage.width / currentImage.height)}px"><img src="${editorUrl}" alt="待标注的作品"><span class="works-mark-layer" aria-hidden="true"></span></button>`;
    find('.works-mark-board').onclick = event => {
      if (marks.length >= 8) { status('#workImageStatus', '最多标注 8 处，可以先撤销或清除标注。'); return; }
      const box = event.currentTarget.getBoundingClientRect();
      marks.push({x: event.detail ? Math.min(.98, Math.max(.02, (event.clientX - box.left) / box.width)) : .5, y: event.detail ? Math.min(.98, Math.max(.02, (event.clientY - box.top) / box.height)) : .5});
      updateMarks();
    };
    updateMarks();
  }
  function originChanged() {
    const other = find('#workOrigin').value === '其他来源';
    find('#workSource').required = other;
    find('#workSourceOptional').textContent = other ? '（请注明）' : '（选填）';
  }
  find('#workOrigin').onchange = originChanged;
  find('#workFile').onchange = async event => {
    const file = event.target.files[0]; if (!file || busy) return;
    busy = true; find('#workSave').disabled = true; find('#workFile').disabled = true;
    status('#workImageStatus', '正在准备图片…');
    try {
      const prepared = await prepareUserWorkImage(file); if (!active()) return;
      currentImage = prepared; marks = []; showPreview();
      if (!find('#workTitle').value.trim()) find('#workTitle').value = file.name.replace(/\.[^.]+$/, '').slice(0, 80);
      status('#workImageStatus', '图片已就绪。可以在右侧标注关键位置，再填写说明。');
    } catch (error) { status('#workImageStatus', error.message, true); }
    finally { busy = false; if (active()) { find('#workSave').disabled = !currentImage; find('#workFile').disabled = false; event.target.value = ''; } }
  };
  find('#workUndo').onclick = () => { marks.pop(); updateMarks(); };
  find('#workClear').onclick = () => { marks = []; updateMarks(); };
  function newWork() {
    editingId = null; createdAt = null; currentImage = null; marks = [];
    if (editorUrl) { URL.revokeObjectURL(editorUrl); editorUrl = null; }
    find('#userWorkForm').reset(); originChanged();
    find('#worksEditorTitle').textContent = '上传一件作品';
    find('#workSave').textContent = '保存到我的作品'; find('#workSave').disabled = true;
    find('#workPreview').innerHTML = '<div class="works-placeholder"><span>◐</span><p>上传后，在这里观察你的图片</p></div>';
    updateMarks(); status('#workFormStatus', ''); status('#workImageStatus', '可以使用自己拍摄、绘画、设计或 AI 生成的图片。');
  }
  find('#workNew').onclick = () => { if (!busy) newWork(); };
  find('#userWorkForm').onsubmit = async event => {
    event.preventDefault(); if (busy || !currentImage) return;
    const principles = [...root.querySelectorAll('[name="workPrinciple"]:checked')].map(input => input.value);
    const title = find('#workTitle').value.trim(), explanation = find('#workExplanation').value.trim();
    if (!principles.length) { status('#workFormStatus', '请至少选择一种格式塔原理。', true); root.querySelector('[name="workPrinciple"]').focus(); return; }
    if (!title || !explanation) { status('#workFormStatus', '请填写作品名称和你对原理的说明。', true); return; }
    const source = find('#workSource').value.trim(), origin = find('#workOrigin').value;
    if (origin === '其他来源' && !source) { status('#workFormStatus', '请填写图片作者、作品名或来源网址。', true); return; }
    const work = {...currentImage, id: editingId || crypto.randomUUID(), title, explanation, principles, source, origin, marks: marks.map(m => ({...m})), createdAt: createdAt || Date.now(), updatedAt: Date.now()};
    busy = true; find('#workSave').disabled = true; status('#workFormStatus', '正在保存…');
    try {
      await userWorkStore('save', work); if (!active()) return;
      allWorks = allWorks.filter(w => w.id !== work.id); allWorks.push(work); editingId = work.id; createdAt = work.createdAt;
      find('#worksEditorTitle').textContent = '编辑这件作品'; find('#workSave').textContent = '保存修改';
      status('#workFormStatus', '已保存到下方“我的作品”，可以下载作品卡片。'); renderGallery();
    } catch (error) { status('#workFormStatus', error.message, true); }
    finally { busy = false; if (active()) find('#workSave').disabled = !currentImage; }
  };
  function renderGallery() {
    galleryUrls.forEach(url => URL.revokeObjectURL(url)); galleryUrls = [];
    find('#workSavedCount').textContent = String(allWorks.length);
    const selected = find('#workFilter').value;
    const items = allWorks.filter(w => !selected || w.principles.includes(selected)).sort((a, b) => b.updatedAt - a.updatedAt);
    status('#workListStatus', !allWorks.length ? '还没有作品。上传一张图片，记录你的第一个发现。' : !items.length ? '这个原理下还没有作品，试试其他分类。' : `正在展示 ${items.length} 件作品。选择“编辑”可修改图片、说明和标注。`);
    find('#workGrid').innerHTML = items.map(w => {
      const url = URL.createObjectURL(w.image); galleryUrls.push(url);
      return `<article class="works-card"><div class="works-card-image"><img src="${url}" alt="${workEscape(w.title)}" loading="lazy"><span class="works-mark-layer" aria-hidden="true">${(w.marks || []).map((m, i) => `<span class="works-mark" style="left:${m.x * 100}%;top:${m.y * 100}%">${i + 1}</span>`).join('')}</span></div><div class="works-card-body"><p class="works-card-principles">${w.principles.map(workEscape).join(' / ')}</p><h3>${workEscape(w.title)}</h3><p class="works-card-reason">${workEscape(w.explanation)}</p><p class="works-card-source">${workEscape(w.origin)}${w.source ? ' · ' + workEscape(w.source) : ''}</p><div class="works-actions"><button type="button" class="subtle" data-work-edit="${w.id}">编辑</button><button type="button" class="subtle" data-work-download="${w.id}">下载作品卡</button><button type="button" class="works-delete" data-work-delete="${w.id}">删除</button></div></div></article>`;
    }).join('');
    root.querySelectorAll('[data-work-edit]').forEach(button => { button.onclick = () => {
      if (busy) return; const work = allWorks.find(w => w.id === button.dataset.workEdit); if (!work) return;
      editingId = work.id; createdAt = work.createdAt; currentImage = {image: work.image, width: work.width, height: work.height}; marks = (work.marks || []).map(m => ({...m}));
      find('#workTitle').value = work.title; find('#workExplanation').value = work.explanation; find('#workOrigin').value = work.origin; find('#workSource').value = work.source;
      root.querySelectorAll('[name="workPrinciple"]').forEach(input => { input.checked = work.principles.includes(input.value); });
      originChanged(); showPreview(); find('#workSave').disabled = false; find('#workSave').textContent = '保存修改'; find('#worksEditorTitle').textContent = '编辑这件作品';
      status('#workFormStatus', '正在编辑，修改后请点击“保存修改”。'); status('#workImageStatus', '可以继续标注，也可以重新选择图片。');
      find('#worksEditorTitle').scrollIntoView({behavior: 'smooth', block: 'start'});
    }; });
    root.querySelectorAll('[data-work-download]').forEach(button => { button.onclick = async () => {
      const work = allWorks.find(w => w.id === button.dataset.workDownload); if (!work) return;
      button.disabled = true;
      try { await downloadUserWork(work); status('#workListStatus', '作品卡片已生成，若手机浏览器显示图片预览，可长按保存。'); }
      catch (error) { status('#workListStatus', '下载失败：' + error.message, true); }
      finally { if (button.isConnected) button.disabled = false; }
    }; });
    root.querySelectorAll('[data-work-delete]').forEach(button => { button.onclick = () => { if (busy) return; pendingDelete = button.dataset.workDelete; find('#workDeleteDialog').showModal(); }; });
  }
  find('#workFilter').onchange = renderGallery;
  find('#workDeleteCancel').onclick = () => { pendingDelete = null; find('#workDeleteDialog').close(); };
  find('#workDeleteConfirm').onclick = async () => {
    const id = pendingDelete; if (!id || busy) return;
    busy = true; find('#workDeleteConfirm').disabled = true;
    try {
      await userWorkStore('delete', id); if (!active()) return;
      allWorks = allWorks.filter(w => w.id !== id); if (editingId === id) newWork();
      find('#workDeleteDialog').close(); pendingDelete = null; renderGallery(); status('#workListStatus', '这件作品已删除。');
    } catch (error) { find('#workDeleteDialog').close(); status('#workListStatus', error.message, true); }
    finally { busy = false; if (active()) find('#workDeleteConfirm').disabled = false; }
  };
  userWorkStore('list').then(items => { if (!active()) return; allWorks = items; renderGallery(); }).catch(error => status('#workListStatus', error.message, true));
}
