(function () {
  'use strict';

  var gate = document.getElementById('lanyardGate');
  var rig = document.getElementById('lanyardRig');
  var card = document.getElementById('lanyardCard');
  var ropeCanvas = document.getElementById('lanyardRope');
  if (!gate || !rig || !card || !ropeCanvas) return;

  var ctx = ropeCanvas.getContext('2d');
  var pageTransition = document.getElementById('pageTransition');

  var NUM_SEGMENTS = 5;
  var GRAVITY = 1400;
  var FRICTION = 0.985;
  var CONSTRAINT_ITERS = 10;

  // Render state — physics writes here; render() reads only this object.
  var state = {
    anchor: { x: 0, y: 0 },
    points: [],
    segmentLen: 0,
    card: { w: 0, h: 0, angle: 0 },
    drag: null,
    dragMoved: false,
    dragStart: { x: 0, y: 0 },
    entering: false,
    lastTime: 0,
    viewport: { w: 0, h: 0 }
  };

  function isMobile() {
    return window.innerWidth < 768;
  }

  function makePoint(x, y) {
    return { x: x, y: y, px: x, py: y };
  }

  function measureCard() {
    state.card.w = card.offsetWidth;
    state.card.h = card.offsetHeight;
  }

  function getViewportSize() {
    var vv = window.visualViewport;
    return {
      w: vv ? Math.round(vv.width) : window.innerWidth,
      h: vv ? Math.round(vv.height) : window.innerHeight
    };
  }

  function initState() {
    var size = getViewportSize();
    var w = size.w;
    var h = size.h;
    state.viewport.w = w;
    state.viewport.h = h;

    measureCard();

    var clipOffset = 8;
    var targetX = w * 0.5;
    var targetY = h * 0.5 - state.card.h * 0.5 + clipOffset;
    var anchorY = isMobile() ? -24 : -36;

    state.anchor.x = targetX;
    state.anchor.y = anchorY;

    var totalLen = targetY - anchorY;
    state.segmentLen = totalLen / NUM_SEGMENTS;

    state.points = [];
    for (var i = 0; i <= NUM_SEGMENTS; i++) {
      var t = i / NUM_SEGMENTS;
      state.points.push(makePoint(targetX, anchorY + totalLen * t));
    }
    var tail = lastPoint();
    tail.x += 3;
    tail.px = tail.x - 4;
    state.card.angle = 0;
    state.drag = null;
  }

  function lastPoint() {
    return state.points[state.points.length - 1];
  }

  function stepPhysics(dt) {
    if (state.entering) return;

    var dtScale = Math.min(dt, 0.033);
    var drag = state.drag;
    var pts = state.points;
    var last = pts.length - 1;

    for (var i = 1; i <= last; i++) {
      if (drag && i === last) continue;

      var p = pts[i];
      var vx = (p.x - p.px) * FRICTION;
      var vy = (p.y - p.py) * FRICTION;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + GRAVITY * dtScale * dtScale;
    }

    if (drag) {
      var lp = pts[last];
      var targetX = drag.x - drag.ox;
      var targetY = drag.y - drag.oy;
      lp.px = lp.x;
      lp.py = lp.y;
      lp.x += (targetX - lp.x) * Math.min(1, dtScale * 28);
      lp.y += (targetY - lp.y) * Math.min(1, dtScale * 28);
    }

    for (var iter = 0; iter < CONSTRAINT_ITERS; iter++) {
      pts[0].x = state.anchor.x;
      pts[0].y = state.anchor.y;

      for (var j = 0; j < last; j++) {
        var a = pts[j];
        var b = pts[j + 1];
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        var dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
        var diff = (dist - state.segmentLen) / dist;
        var ox = dx * diff;
        var oy = dy * diff;
        var aFixed = j === 0;
        var bFixed = drag && j + 1 === last;

        if (!aFixed && !bFixed) {
          a.x += ox * 0.5;
          a.y += oy * 0.5;
          b.x -= ox * 0.5;
          b.y -= oy * 0.5;
        } else if (aFixed && !bFixed) {
          b.x -= ox;
          b.y -= oy;
        } else if (!aFixed && bFixed) {
          a.x += ox;
          a.y += oy;
        }
      }
    }

    var tail = pts[last];
    var prev = pts[last - 1];
    var targetAngle = Math.atan2(tail.x - prev.x, tail.y - prev.y);
    var av = (targetAngle - state.card.angle) * Math.min(1, dtScale * 16);
    state.card.angle += av;
  }

  function catmullRom(points, t) {
    var n = points.length - 1;
    var i = Math.min(Math.floor(t * n), n - 1);
    var f = t * n - i;
    var p0 = points[Math.max(i - 1, 0)];
    var p1 = points[i];
    var p2 = points[i + 1];
    var p3 = points[Math.min(i + 2, points.length - 1)];
    var f2 = f * f;
    var f3 = f2 * f;

    return {
      x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * f + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * f2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * f3),
      y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * f + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * f2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * f3)
    };
  }

  function renderFrame() {
    var pts = state.points;
    var attach = lastPoint();
    var angleDeg = state.card.angle * 57.2958;

    rig.style.transform =
      'translate3d(' + (attach.x - state.card.w * 0.5) + 'px,' + attach.y + 'px,0) ' +
      'rotate(' + angleDeg + 'deg)';

    var w = state.viewport.w;
    var h = state.viewport.h;
    if (ropeCanvas.width !== w || ropeCanvas.height !== h) {
      ropeCanvas.width = w;
      ropeCanvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);

    var samples = isMobile() ? 24 : 36;
    var curve = [];
    for (var s = 0; s <= samples; s++) {
      curve.push(catmullRom(pts, s / samples));
    }

    var grad = ctx.createLinearGradient(state.anchor.x, state.anchor.y, attach.x, attach.y);
    grad.addColorStop(0, '#a69eff');
    grad.addColorStop(0.5, '#8b7cf7');
    grad.addColorStop(1, '#6366f1');

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = grad;
    ctx.lineWidth = isMobile() ? 7 : 9;
    ctx.beginPath();
    ctx.moveTo(curve[0].x, curve[0].y);
    for (var c = 1; c < curve.length; c++) {
      ctx.lineTo(curve[c].x, curve[c].y);
    }
    ctx.stroke();

    ctx.lineWidth = isMobile() ? 3 : 4;
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    ctx.moveTo(curve[0].x, curve[0].y);
    for (var d = 1; d < curve.length; d++) {
      ctx.lineTo(curve[d].x, curve[d].y);
    }
    ctx.stroke();
  }

  function frame(time) {
    if (!state.lastTime) state.lastTime = time;
    var dt = (time - state.lastTime) / 1000;
    state.lastTime = time;

    stepPhysics(dt);
    renderFrame();
    requestAnimationFrame(frame);
  }

  function safeCapture(el, pointerId) {
    try {
      if (el.setPointerCapture) el.setPointerCapture(pointerId);
    } catch (err) { /* mobile browsers may reject capture */ }
  }

  function safeRelease(el, pointerId) {
    try {
      if (el.hasPointerCapture && el.hasPointerCapture(pointerId)) {
        el.releasePointerCapture(pointerId);
      }
    } catch (err) { /* ignore */ }
  }

  function finishInteraction(e) {
    if (!state.drag || state.entering) return;
    safeRelease(card, e.pointerId);
    card.classList.remove('is-dragging');
    document.body.style.cursor = '';
    var pullDist = Math.hypot(e.clientX - state.dragStart.x, e.clientY - state.dragStart.y);
    var shouldEnter = !state.dragMoved || pullDist > 48;
    state.drag = null;
    if (shouldEnter) enterSite();
  }

  function onPointerDown(e) {
    if (state.entering) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    var lp = lastPoint();
    state.drag = {
      x: e.clientX,
      y: e.clientY,
      ox: e.clientX - lp.x,
      oy: e.clientY - lp.y,
      id: e.pointerId
    };
    state.dragMoved = false;
    state.dragStart.x = e.clientX;
    state.dragStart.y = e.clientY;
    safeCapture(card, e.pointerId);
    card.classList.add('is-dragging');
    document.body.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!state.drag || state.entering || e.pointerId !== state.drag.id) return;
    state.drag.x = e.clientX;
    state.drag.y = e.clientY;
    if (Math.hypot(e.clientX - state.dragStart.x, e.clientY - state.dragStart.y) > 6) {
      state.dragMoved = true;
    }
  }

  function onPointerUp(e) {
    if (!state.drag || e.pointerId !== state.drag.id) return;
    finishInteraction(e);
  }

  function onTapEnter(e) {
    if (state.entering) return;
    if (state.dragMoved) return;
    e.preventDefault();
    enterSite();
  }

  function enterSite() {
    if (state.entering) return;
    state.entering = true;
    state.drag = null;

    function completeEntry() {
      gate.remove();
      document.body.classList.remove('lanyard-active');
      if (window.bootPortfolio) window.bootPortfolio();
    }

    if (typeof gsap === 'undefined') {
      completeEntry();
      return;
    }

    var tl = gsap.timeline({ onComplete: completeEntry });

    tl.to('.lanyard-gate__hint', { opacity: 0, y: 10, duration: 0.25, ease: 'power2.in' }, 0)
      .to(card, { scale: 1.08, duration: 0.35, ease: 'power2.out' }, 0)
      .to(gate, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 0.15);

    if (pageTransition) {
      tl.set(pageTransition, { scaleY: 1, transformOrigin: 'bottom' }, 0.2)
        .to(pageTransition, { scaleY: 0, duration: 0.65, ease: 'power4.inOut' }, 0.2);
    }
  }

  card.addEventListener('pointerdown', onPointerDown);
  card.addEventListener('pointermove', onPointerMove);
  card.addEventListener('pointerup', onPointerUp);
  card.addEventListener('pointercancel', onPointerUp);
  card.addEventListener('click', onTapEnter);

  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  window.addEventListener('resize', function () {
    initState();
    renderFrame();
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', function () {
      initState();
      renderFrame();
    });
  }

  initState();
  renderFrame();
  requestAnimationFrame(frame);

  gsap.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 });
  gsap.fromTo('.lanyard-gate__hint', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.45 });
})();
