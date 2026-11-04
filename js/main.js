/* =========================================================
   INAIA — interactions
   1. Home canvas follows the mouse (drag on touch screens)
   2. Hovered plate spins smoothly
   3. Click a plate → product panel (plate flies into place)
   4. "see collection" → full-screen collection page
   ========================================================= */
(() => {
  const $ = id => document.getElementById(id);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const byKey = Object.fromEntries(COLLECTIONS.map((c, i) => [c.key, i]));
  const src = name => `${IMG}${name}.webp`;
  const imgTag = (name, alt = '') => `<img src="${src(name)}" alt="${alt}" decoding="async" draggable="false">`;

  /* ---------------- Home canvas ---------------- */
  const stage = $('stage'), canvas = $('canvas');

  const plates = PLATES.map(([key, x, y, s, d, photo], i) => {
    const c = COLLECTIONS[byKey[key]];
    const image = c.photos[photo] || c.photos[0];
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'plate';
    el.style.cssText = `--x:${x}%;--y:${y}%;--s:${s}`;
    el.setAttribute('aria-label', `${c.name}, view product`);
    el.innerHTML = `
      <span class="lift"><span class="shadow"></span><span class="disc">${imgTag(image)}</span></span>
      <span class="name">${c.name}</span>`;
    canvas.appendChild(el);

    const p = { el, key, image, d, disc: el.querySelector('.disc'), angle: 0, speed: 0, hover: false };
    el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') p.hover = true; });
    el.addEventListener('pointerleave', () => { p.hover = false; });
    el.addEventListener('focus', () => { if (el.matches(':focus-visible')) p.hover = true; });
    el.addEventListener('blur', () => { p.hover = false; });
    el.addEventListener('click', () => { if (!dragMoved) openProduct(p); });
    return p;
  });

  let vw, vh, maxX, maxY;
  const cur = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function measure() {
    vw = innerWidth; vh = innerHeight;
    maxX = Math.max(0, canvas.offsetWidth - vw);
    maxY = Math.max(0, canvas.offsetHeight - vh);
  }
  measure();
  cur.x = target.x = -maxX / 2;
  cur.y = target.y = -maxY / 2;

  addEventListener('resize', () => {
    const fx = maxX ? cur.x / maxX : -.5, fy = maxY ? cur.y / maxY : -.5;
    measure();
    cur.x = target.x = fx * maxX;
    cur.y = target.y = fy * maxY;
  });

  let state = 'intro', drift = false, dragMoved = false, drag = null;

  stage.addEventListener('pointermove', e => {
    if (state !== 'home' || drift) return;
    if (e.pointerType === 'mouse') {
      const nx = clamp((e.clientX / vw - .5) * 1.15 + .5, 0, 1);
      const ny = clamp((e.clientY / vh - .5) * 1.15 + .5, 0, 1);
      target.x = -nx * maxX;
      target.y = -ny * maxY;
    } else if (drag) {
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.hypot(dx, dy) > 8) dragMoved = true;
      target.x = clamp(drag.tx + dx * 1.2, -maxX, 0);
      target.y = clamp(drag.ty + dy * 1.2, -maxY, 0);
    }
  });
  stage.addEventListener('pointerdown', e => {
    dragMoved = false;
    if (e.pointerType !== 'mouse') drag = { x: e.clientX, y: e.clientY, tx: target.x, ty: target.y };
  });
  addEventListener('pointerup', () => { drag = null; setTimeout(() => (dragMoved = false), 0); });

  const expBtn = $('experience');
  expBtn.addEventListener('click', () => { drift = !drift; expBtn.setAttribute('aria-pressed', drift); });

  let last = performance.now();
  const t0 = last;
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000);
    last = now;

    if (drift && state === 'home') {
      const t = (now - t0) / 1000 * .08;
      target.x = -maxX * (.5 + .42 * Math.sin(t));
      target.y = -maxY * (.5 + .4 * Math.sin(t * 1.7));
    }

    const k = reduce ? 1 : 1 - Math.pow(.0018, dt);
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    canvas.style.transform = `translate3d(${cur.x.toFixed(2)}px,${cur.y.toFixed(2)}px,0)`;

    const ox = cur.x + maxX / 2, oy = cur.y + maxY / 2;
    for (const p of plates) {
      const par = (p.d - 1) * .55;
      p.el.style.transform = `translate3d(${(ox * par).toFixed(2)}px,${(oy * par).toFixed(2)}px,0)`;
      if (!reduce && (p.hover || p.speed)) {
        const want = p.hover && state === 'home' ? 32 : 0;          // degrees per second — hovered plate only
        p.speed += (want - p.speed) * (1 - Math.pow(p.hover ? .1 : .001, dt)); // ease in, settle quickly
        if (Math.abs(p.speed) < .05 && !p.hover) p.speed = 0;
        p.angle = (p.angle + p.speed * dt) % 360;
      }
      p.disc.style.transform = `rotate(${p.angle.toFixed(2)}deg)`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------------- Intro header ---------------- */
  // Three icons (cups · plates · vases), one product each.
  // Hovering an icon turns its product slowly; nothing moves otherwise.
  const intro = $('intro');
  let introTimer = null, introEnded = false;

  const slots = [...intro.querySelectorAll('.intro-slot')].map(el => {
    const type = el.dataset.type;
    const [key, photo] = INTRO[type];
    const c = COLLECTIONS[byKey[key]];
    const image = c.photos[photo] || c.photos[0];
    el.querySelector('.icon-item').innerHTML = iconShellHTML(type);
    const photos = el.querySelector('.icon-photos');
    photos.innerHTML = iconPhotoHTML(type, src(image), c.name);
    el.querySelector('.intro-name').textContent = c.name;
    const s = { el, photos, angle: 0, speed: 0, hover: false };
    // only round pieces (plates) turn on hover; cups and vases stay still
    el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { s.hover = ICONS[type].spin; pauseIntro(); } });
    el.addEventListener('pointerleave', () => { s.hover = false; resumeIntro(); });
    return s;
  });

  let lastI = performance.now();
  function spinIntro(now) {
    const dt = Math.min(.05, (now - lastI) / 1000); lastI = now;
    for (const s of slots) {
      if (!s.hover && !s.speed) continue;
      const want = s.hover ? 32 : 0;                                         // degrees per second
      s.speed += (want - s.speed) * (1 - Math.pow(s.hover ? .1 : .001, dt)); // ease in, settle quickly
      if (!s.hover && Math.abs(s.speed) < .05) s.speed = 0;
      s.angle = (s.angle + s.speed * dt) % 360;
      s.photos.style.transform = `rotate(${s.angle.toFixed(2)}deg)`;
    }
    if (!introEnded) requestAnimationFrame(spinIntro);
  }
  if (!reduce) requestAnimationFrame(spinIntro);

  function pauseIntro() { clearTimeout(introTimer); }
  function resumeIntro() { if (!introEnded) { clearTimeout(introTimer); introTimer = setTimeout(endIntro, 3000); } }
  function endIntro() {
    if (introEnded) return;
    introEnded = true;
    clearTimeout(introTimer);
    intro.classList.add('done');
    document.body.classList.remove('is-intro');
    setTimeout(() => { state = 'home'; intro.setAttribute('aria-hidden', 'true'); }, reduce ? 0 : 900);
  }
  $('introSkip').addEventListener('click', endIntro);
  intro.addEventListener('click', e => { if (e.target === intro) endIntro(); });

  introTimer = setTimeout(endIntro, INTRO_TIME);

  /* ---------------- Product panel ---------------- */
  const product = $('product'), pView = $('pView'), pThumbs = $('pThumbs');
  const pTitle = $('pTitle'), pSize = $('pSize'), pClose = $('pClose');
  let active = null, colIndex = 0, viewIndex = 0, views = [];

  // Views for a collection: every photo + a glaze close-up + a profile angle
  function buildViews(c, firstImage) {
    const list = [firstImage, ...c.photos.filter(p => p !== firstImage)];
    const out = list.map(img => ({ kind: 'top', img, label: c.size }));
    out.push({ kind: 'detail', img: firstImage, label: 'Glaze detail' });
    if (out.length < 4) out.push({ kind: 'profile', img: firstImage, label: 'Profile' });
    return out.slice(0, 4);
  }
  function viewHTML(v, alt) {
    if (v.kind === 'detail') return `<div class="v v-detail"><span class="disc">${imgTag(v.img, alt)}</span></div>`;
    return `<div class="v v-${v.kind}"><span class="shadow"></span><span class="disc">${imgTag(v.img, alt)}</span></div>`;
  }
  function setView(i, animate) {
    viewIndex = i;
    [...pThumbs.children].forEach((b, n) => b.setAttribute('aria-selected', n === i));
    const c = COLLECTIONS[colIndex], v = views[i];
    const apply = () => { pView.innerHTML = viewHTML(v, c.name); pSize.textContent = v.label; };
    if (!animate) return apply();
    pView.classList.add('fade');
    setTimeout(() => { apply(); pView.classList.remove('fade'); }, 260);
  }
  function fillProduct(firstImage) {
    const c = COLLECTIONS[colIndex];
    views = buildViews(c, firstImage || c.photos[0]);
    pTitle.textContent = c.name;
    pThumbs.innerHTML = views.map((v, i) =>
      `<button class="thumb" type="button" role="tab" aria-label="${v.label}">${viewHTML(v, '')}</button>`).join('');
    [...pThumbs.children].forEach((b, i) => b.addEventListener('click', () => { if (i !== viewIndex) setView(i, true); }));
    setView(0, false);
  }

  // Animate a plate image from one rectangle to another
  function fly(fromRect, toRect, image, fromAngle, toAngle, dur) {
    const f = document.createElement('div');
    f.className = 'flyer';
    f.style.cssText = `left:${toRect.left}px;top:${toRect.top}px;width:${toRect.width}px;height:${toRect.height}px`;
    f.innerHTML = imgTag(image);
    document.body.appendChild(f);
    const s = fromRect.width / toRect.width;
    const dx = fromRect.left - toRect.left, dy = fromRect.top - toRect.top;
    const opts = { duration: reduce ? 1 : dur, easing: 'cubic-bezier(.22,.8,.2,1)', fill: 'forwards' };
    f.animate([{ transform: `translate(${dx}px,${dy}px) scale(${s})` }, { transform: 'none' }], opts);
    const a = f.firstChild.animate([{ transform: `rotate(${fromAngle}deg)` }, { transform: `rotate(${toAngle}deg)` }], opts);
    return a.finished.then(() => f.remove());
  }

  function openProduct(p) {
    if (state !== 'home') return;
    state = 'product';
    active = p;
    colIndex = byKey[p.key];
    p.hover = false;
    fillProduct(p.image);

    document.body.classList.add('product-open');
    product.classList.add('open');
    product.setAttribute('aria-hidden', 'false');

    const from = p.disc.getBoundingClientRect();
    const to = pView.querySelector('.disc').getBoundingClientRect();
    p.el.classList.add('is-away');
    pView.style.opacity = 0;
    fly(from, to, p.image, p.angle, p.angle > 180 ? 360 : 0, 950).then(() => { pView.style.opacity = ''; });

    pClose.tabIndex = 0;
    setTimeout(() => pClose.focus({ preventScroll: true }), 50);
  }

  function closeProduct() {
    if (state !== 'product') return;
    state = 'closing';
    pClose.tabIndex = -1;
    const p = active;
    const disc = pView.querySelector('.v-top .disc');
    const canFlyBack = disc && viewIndex === 0 && COLLECTIONS[colIndex].key === p.key;

    product.classList.add('closing');
    product.classList.remove('open');
    product.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('product-open');

    if (canFlyBack) {
      const from = disc.getBoundingClientRect();
      pView.style.opacity = 0;
      p.angle = 0;
      fly(from, p.disc.getBoundingClientRect(), p.image, 0, 0, 800).then(() => { pView.style.opacity = ''; });
    }
    setTimeout(() => {
      p.el.classList.remove('is-away');
      product.classList.remove('closing');
      state = 'home';
      p.el.focus({ preventScroll: true });
    }, reduce ? 0 : 800);
  }
  pClose.addEventListener('click', closeProduct);

  /* ---------------- Collection page ---------------- */
  const col = $('collection');

  // Random lifestyle photo, never the same one twice in a row
  let lastLifestyle = null;
  function randomLifestyle() {
    const pool = LIFESTYLE_PHOTOS.filter(p => p !== lastLifestyle);
    lastLifestyle = pool[Math.floor(Math.random() * pool.length)];
    return lastLifestyle;
  }

  function fillCollection() {
    const c = COLLECTIONS[colIndex];
    const a = c.photos[0], b = c.photos[1] || c.photos[0];
    $('cTitle').textContent = c.name;
    $('cTag').textContent = c.tag;
    $('cDesc').textContent = c.desc;
    $('cSpecs').innerHTML = c.specs.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    // Left: lifestyle photo of the collection
    $('cScene').innerHTML = `<img class="lifestyle" src="${LIFESTYLE}${c.lifestyle || randomLifestyle()}.webp" alt="${c.name} set on a table" decoding="async">`;
    // Right: the product itself, close up
    $('cDetail').innerHTML = `<span class="shadow"></span><img src="${src(a)}" alt="${c.name}" decoding="async">`;
  }

  function openCollection() {
    fillCollection();
    state = 'collection';
    col.classList.add('open');
    col.setAttribute('aria-hidden', 'false');
    setTimeout(() => $('cBack').focus({ preventScroll: true }), 50);
  }

  function closeCollection() {
    col.classList.add('closing');
    col.classList.remove('open');
    col.setAttribute('aria-hidden', 'true');
    state = 'product';
    if (COLLECTIONS[colIndex].key !== active.key) fillProduct();   // user browsed to another collection
    setTimeout(() => col.classList.remove('closing'), reduce ? 0 : 900);
    $('seeCollection').focus({ preventScroll: true });
  }


  $('seeCollection').addEventListener('click', openCollection);
  $('cBack').addEventListener('click', closeCollection);

  addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (state === 'intro') endIntro();
      else if (state === 'collection') closeCollection();
      else if (state === 'product') closeProduct();
    }
  });
})();
