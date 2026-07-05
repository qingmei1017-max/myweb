(function () {
  'use strict';

    var caseStudies = {
    1: {
      title: '品牌转型',
      subtitle: '数据驱动品牌心智重塑，定位新中式浴室美学，打通从洞察到转化的全链路闭环',
      images: [
        'brand-insight.png',
        'python-analysis.png',
        'survey-data.png',
        'packaging-design.png'
      ],
      body: '<h4>项目背景</h4><p>传统国货销量下滑，面临用户转化断层，品牌刻板印象严重。</p><h4>核心行动</h4><ul><li>问卷设计与调研，汇总并利用 Python 进行数据清洗，剔除异常数据噪声，构建透视表。</li><li>通过所获数据更新消费者画像，并结合市场分析与品牌调性，更新输出符合新中式美学的产品。</li><li>策划新型营销渠道，锁定小红书等各大社媒增加曝光，规划与新式茶饮跨界联动，推出限定礼盒与赠品，快速打破圈层壁垒。</li></ul>'
    },
    2: {
      title: '项目分析',
      subtitle: '区域城市规模预测与物流优化，为进入决策提供量化依据，构架供应链商业模型。',
      images: [
        'business-plan-pages.png',
        'presentation-deck.png',
        'table-of-contents.png',
        'sql-data.png'
      ],
      body: '<h4>项目背景</h4><p>预制菜产业高速成长期，冷链成本与损耗率直接决定商业模式可行性，项目多维分析切入逻辑。</p><h4>核心动作</h4><ul><li>通过 SWOT 分析解构宏观生态，直击 B 端商户在时效约束下的冷链高折损痛点，完成从行业趋势到商业机会的精准捕获。</li><li>依托商业模式画布，设计智慧中枢系统的核心价值主张与双渠道盈利闭环，产出系统级架构流程图。</li><li>运用 SQL 清洗高并发订单流、拦截过滤异常数据，在 Excel 中通过双变量敏感度分析，确定项目盈亏平衡点。</li></ul>'
    },
    3: {
      title: '日常审美',
      subtitle: '视觉语言是日常沉淀与积累的。',
      images: [
        'design-collage.png',
        'concert-collage.png',
        'travel-collage.png',
        'food-collage.png'
      ],
      body: '<h4>灵感数据库</h4><p>热爱生活喜欢记录，尝试与追求一切新鲜事物。</p><h4>审美训练</h4><ul><li>十年绘画功底，积累了审美与艺术表达能力。</li><li>多年社媒高速冲浪用户，国内外演出爱好者，喜欢穿搭、美食、旅行。</li></ul><h4>个人价值</h4><p>审美敏感度反哺品牌内容调性把控，缩短从概念到成稿的视觉沟通成本。</p>'
    }
  };

  var header = document.getElementById('header');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var navLinks = document.querySelectorAll('.nav-link');
  var caseView = document.getElementById('caseView');
  var caseDetail = document.getElementById('caseDetail');
  var caseBack = document.getElementById('caseBack');
  var pageTransition = document.getElementById('pageTransition');
  var pageTransitionOut = document.getElementById('pageTransitionOut');
  var toast = document.getElementById('toast');
  var drawLayer = document.getElementById('drawLayer');

  var DESKTOP_MQ = '(min-width: 901px)';
  var navScrollLockY = 0;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  function lockBodyScroll() {
    navScrollLockY = window.scrollY || window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + navScrollLockY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, navScrollLockY);
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  });

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    if (isOpen) lockBodyScroll();
    else unlockBodyScroll();
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      if (document.body.style.position === 'fixed') unlockBodyScroll();
    });
  });

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { showToast('已复制'); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast('已复制'); } catch (e) { showToast('复制失败'); }
        document.body.removeChild(ta);
      }
    });
  });

  function updateActiveNav() {
    var sections = ['home', 'portfolio', 'toolkit', 'contact'];
    var scrollPos = window.scrollY + header.offsetHeight + 40;
    var current = sections[0];
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  function randomPath(w, h) {
    var pts = [];
    var n = 4 + Math.floor(Math.random() * 3);
    for (var i = 0; i < n; i++) {
      pts.push({
        x: (w / (n - 1)) * i + (Math.random() - 0.5) * w * 0.15,
        y: h * (0.3 + Math.random() * 0.5)
      });
    }
    var d = 'M' + pts[0].x + ' ' + pts[0].y;
    for (var j = 1; j < pts.length; j++) {
      var mx = (pts[j - 1].x + pts[j].x) / 2;
      d += ' Q' + pts[j - 1].x + ' ' + (pts[j - 1].y + (Math.random() - 0.5) * 8) + ' ' + mx + ' ' + ((pts[j - 1].y + pts[j].y) / 2);
    }
    d += ' T' + pts[pts.length - 1].x + ' ' + pts[pts.length - 1].y;
    return d;
  }

  function attachDrawHover(el) {
    if (el._drawBound) return;
    el._drawBound = true;
    var svg, path;

    function clearDraw() {
      if (el._drawTween) {
        el._drawTween.kill();
        el._drawTween = null;
      }
      if (svg && svg.parentNode) svg.parentNode.removeChild(svg);
      svg = null;
      path = null;
    }

    function draw() {
      clearDraw();
      var rect = el.getBoundingClientRect();
      var pad = 4;
      var w = rect.width + pad * 2;
      var h = rect.height * 0.35;
      var left = rect.left - pad;
      var top = rect.bottom - h * 0.6;

      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', w);
      svg.setAttribute('height', h);
      svg.style.left = left + 'px';
      svg.style.top = top + 'px';

      path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', randomPath(w, h));
      svg.appendChild(path);
      drawLayer.appendChild(svg);

      var length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      el._drawTween = gsap.to(path, { strokeDashoffset: 0, duration: 0.65, ease: 'power2.out' });
    }

    el.addEventListener('mouseenter', draw);
    el.addEventListener('mouseleave', clearDraw);
    el.addEventListener('click', clearDraw);
    el.addEventListener('touchend', clearDraw, { passive: true });
    el.addEventListener('touchcancel', clearDraw, { passive: true });
  }

  document.querySelectorAll('.draw-hover, [data-draw]').forEach(attachDrawHover);

  function initSvgPathLengths() {
    document.querySelectorAll('.portfolio-svg-layer path').forEach(function (path) {
      var len = path.getTotalLength();
      path._pathLen = len;
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    });
  }

  function getPathLength(path) {
    if (!path._pathLen) path._pathLen = path.getTotalLength();
    return path._pathLen;
  }

  function resetPortfolioLayer(layer) {
    var path = layer.querySelector('path');
    layer.classList.remove('is-active');
    layer.style.clipPath = '';
    if (path) {
      gsap.killTweensOf(path);
      path.style.strokeDashoffset = String(getPathLength(path));
    }
  }

  function applyPortfolioDrawState(progress) {
    var layers = gsap.utils.toArray('.portfolio-svg-layer');
    if (!layers.length) return;
    var p = progress * layers.length;

    layers.forEach(function (layer, i) {
      var path = layer.querySelector('path');
      if (!path) return;
      var len = getPathLength(path);
      var local = p - i;

      if (local < 0 || local > 1) {
        resetPortfolioLayer(layer);
        return;
      }

      layer.classList.add('is-active');
      path.style.strokeDashoffset = String(len * (1 - local));

      if (local > 0.82) {
        var wipe = (local - 0.82) / 0.18;
        layer.style.clipPath = 'inset(' + (wipe * 100).toFixed(2) + '% 0 0 0)';
      } else {
        layer.style.clipPath = 'inset(0% 0% 0% 0%)';
      }
    });
  }

  function setActiveCaseVisual(caseId, drawProgress) {
    var id = String(caseId);
    document.querySelectorAll('.case-text-panel').forEach(function (panel) {
      panel.classList.toggle('is-active', panel.getAttribute('data-case') === id);
    });

    if (typeof drawProgress === 'number') {
      applyPortfolioDrawState(drawProgress);
      return;
    }

    document.querySelectorAll('.portfolio-svg-layer').forEach(function (layer) {
      var isCurrent = layer.getAttribute('data-case') === id;
      var path = layer.querySelector('path');
      if (!isCurrent) {
        resetPortfolioLayer(layer);
        return;
      }
      layer.classList.add('is-active');
      layer.style.clipPath = 'inset(0% 0% 0% 0%)';
      if (path) {
        var len = getPathLength(path);
        gsap.killTweensOf(path);
        gsap.fromTo(path, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' });
      }
    });
  }

  function clearPortfolioVisuals() {
    document.querySelectorAll('.portfolio-svg-layer').forEach(resetPortfolioLayer);
    document.querySelectorAll('.case-text-panel').forEach(function (panel) {
      panel.classList.remove('is-active');
    });
    var stageEl = document.querySelector('.portfolio-pin-stage');
    if (stageEl) {
      stageEl.classList.remove('is-portfolio-visible');
      stageEl.classList.add('is-hero-overlap');
    }
  }

  function showPortfolioVisuals(caseId, drawProgress) {
    var stageEl = document.querySelector('.portfolio-pin-stage');
    if (stageEl) {
      stageEl.classList.remove('is-hero-overlap');
      stageEl.classList.add('is-portfolio-visible');
    }
    setActiveCaseVisual(caseId, drawProgress);
  }

  function isHeroEnteringViewport() {
    var hero = document.getElementById('home');
    if (!hero) return false;
    var header = document.getElementById('header');
    var headerH = header ? header.offsetHeight : 72;
    var rect = hero.getBoundingClientRect();
    return rect.bottom > headerH + 4 && rect.top < window.innerHeight;
  }


  function splitBlurText(el) {
    if (el._blurSplit) return;
    el._blurSplit = true;
    var animateBy = el.getAttribute('data-blur-by') || 'letters';
    var text = el.textContent.trim();
    var parts = animateBy === 'words' ? text.split(/\s+/).filter(Boolean) : text.split('');
    el.setAttribute('aria-label', text);
    el.textContent = '';
    parts.forEach(function (part, i) {
      var span = document.createElement('span');
      span.className = 'blur-text__segment';
      span.textContent = part;
      if (animateBy === 'words' && i < parts.length - 1) span.appendChild(document.createTextNode('\u00A0'));
      el.appendChild(span);
    });
  }

  function resetBlurTextEl(el) {
    if (!el._blurSplit) return;
    var segments = el.querySelectorAll('.blur-text__segment');
    gsap.killTweensOf(segments);
    gsap.set(segments, { filter: 'blur(10px)', opacity: 0, y: -50 });
  }

  function playBlurTextEl(el, baseDelay) {
    if (!el._blurSplit) return;
    var segments = el.querySelectorAll('.blur-text__segment');
    if (!segments.length) return;
    gsap.killTweensOf(segments);
    gsap.set(segments, { filter: 'blur(10px)', opacity: 0, y: -50 });
    gsap.to(segments, {
      keyframes: [
        { filter: 'blur(5px)', opacity: 0.5, y: 5, duration: 0.35, ease: 'power2.out' },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      ],
      stagger: 0.08,
      delay: baseDelay || 0
    });
  }

  function resetBlurTextPanel(panel) {
    panel.querySelectorAll('.blur-text').forEach(resetBlurTextEl);
  }

  function playBlurTextPanel(panel) {
    var blurEls = panel.querySelectorAll('.blur-text');
    var delay = 0;
    blurEls.forEach(function (el) {
      playBlurTextEl(el, delay);
      delay += 0.12;
    });
  }

  function initBlurTextElements() {
    document.querySelectorAll('.case-text-panel .blur-text').forEach(splitBlurText);
  }

  function initPortfolioMaskReveal() {
    var wrapper = document.querySelector('.portfolio-pin-wrapper');
    var stage = document.querySelector('.portfolio-pin-stage');
    var panels = gsap.utils.toArray('.case-text-panel');
    if (!wrapper || !stage || !panels.length) return;

    initSvgPathLengths();

    var mm = gsap.matchMedia();

    mm.add(DESKTOP_MQ, function () {
      var layers = gsap.utils.toArray('.portfolio-svg-layer');
      if (!layers.length) return;

      stage.classList.remove('is-portfolio-visible');

      var lastPanelIndex = -1;

      function hidePortfolioForHero() {
        lastPanelIndex = -1;
        clearPortfolioVisuals();
      }

      function syncPortfolioFromProgress(progress) {
        if (isHeroEnteringViewport()) {
          hidePortfolioForHero();
          return;
        }

        var stageEl = document.querySelector('.portfolio-pin-stage');
        if (stageEl) {
          stageEl.classList.remove('is-hero-overlap');
          stageEl.classList.add('is-portfolio-visible');
        }

        applyPortfolioDrawState(progress);

        var index = Math.min(panels.length - 1, Math.floor(progress * panels.length));
        if (index !== lastPanelIndex) {
          if (lastPanelIndex >= 0) resetBlurTextPanel(panels[lastPanelIndex]);
          panels.forEach(function (panel, i) {
            panel.classList.toggle('is-active', i === index);
          });
          playBlurTextPanel(panels[index]);
          lastPanelIndex = index;
        }
      }

      function refreshPortfolioVisibility() {
        if (isHeroEnteringViewport()) hidePortfolioForHero();
      }

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onEnter: function () {
          if (isHeroEnteringViewport()) return;
          lastPanelIndex = -1;
          syncPortfolioFromProgress(0);
        },
        onEnterBack: function () {
          if (isHeroEnteringViewport()) {
            hidePortfolioForHero();
            return;
          }
          lastPanelIndex = -1;
          syncPortfolioFromProgress(0);
        },
        onLeaveBack: hidePortfolioForHero,
        onLeave: hidePortfolioForHero
      });

      ScrollTrigger.create({
        trigger: '#home',
        start: 'bottom top',
        onEnterBack: hidePortfolioForHero,
        invalidateOnRefresh: true
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          if (isHeroEnteringViewport() || !self.isActive) {
            hidePortfolioForHero();
            return;
          }
          syncPortfolioFromProgress(self.progress);
        }
      });

      ScrollTrigger.addEventListener('refresh', refreshPortfolioVisibility);
      window.addEventListener('scroll', refreshPortfolioVisibility, { passive: true });

      return function () {
        ScrollTrigger.removeEventListener('refresh', refreshPortfolioVisibility);
        window.removeEventListener('scroll', refreshPortfolioVisibility);
      };
    });

    mm.add('(max-width: 900px)', function () {
      stage.classList.remove('is-portfolio-visible');
      clearPortfolioVisuals();

      panels.forEach(function (panel) {
        panel.style.opacity = '';
        panel.style.pointerEvents = '';
        panel.style.position = '';
      });

      var portfolioSection = document.getElementById('portfolio');
      var sectionIo = portfolioSection ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stage.classList.add('is-portfolio-visible');
          } else {
            clearPortfolioVisuals();
          }
        });
      }, { threshold: 0.08 }) : null;

      if (sectionIo && portfolioSection) sectionIo.observe(portfolioSection);

      var caseIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var panel = entry.target;
          var caseId = panel.getAttribute('data-case');
          if (caseId) {
            stage.classList.add('is-portfolio-visible');
            setActiveCaseVisual(caseId);
          }
        });
      }, { threshold: 0.45 });

      var blurIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var panel = entry.target;
          if (panel._blurPlayed) return;
          panel._blurPlayed = true;
          playBlurTextPanel(panel);
        });
      }, { threshold: 0.35 });

      panels.forEach(function (panel) {
        caseIo.observe(panel);
        blurIo.observe(panel);
      });

      return function () {
        if (sectionIo) sectionIo.disconnect();
        caseIo.disconnect();
        blurIo.disconnect();
        panels.forEach(function (panel) {
          panel._blurPlayed = false;
        });
        clearPortfolioVisuals();
      };
    });
  }

  function initToolsGrid() {
    var grid = document.getElementById('toolsGrid');
    if (!grid) return;

    var cards = grid.querySelectorAll('.tool-card');
    var touchMq = window.matchMedia('(hover: none)');

    cards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (!touchMq.matches) return;
        e.stopPropagation();
        var wasExpanded = card.classList.contains('is-expanded');
        cards.forEach(function (c) { c.classList.remove('is-expanded'); });
        if (!wasExpanded) card.classList.add('is-expanded');
      });
    });

    document.addEventListener('click', function () {
      if (!touchMq.matches) return;
      cards.forEach(function (c) { c.classList.remove('is-expanded'); });
    });
  }

  function initSplitTextReveal() {
    if (typeof SplitText === 'undefined') return;
    gsap.utils.toArray('.split-text').forEach(function (el) {
      try {
        var split = new SplitText(el, { type: 'lines', linesClass: 'line' });
        var inners = split.lines.map(function (line) {
          var wrap = document.createElement('span');
          wrap.className = 'line-inner';
          wrap.innerHTML = line.innerHTML;
          line.innerHTML = '';
          line.appendChild(wrap);
          return wrap;
        });
        var inHero = !!el.closest('.hero');
        gsap.from(inners, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.09,
          duration: 0.85,
          ease: 'power3.out',
          delay: inHero ? 0.15 : 0,
          scrollTrigger: inHero ? undefined : {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        });
      } catch (err) { /* SplitText fallback */ }
    });
  }

  function parseCaseHash() {
    var m = (location.hash || '').match(/^#case\/(\d)$/);
    return m ? m[1] : null;
  }

  function renderCase(id) {
    var data = caseStudies[id];
    if (!data) return;
    var tagsHtml = (data.tags && data.tags.length)
      ? '<ul class="case-tags">' + data.tags.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'
      : '';
    var imgs = data.images || [];
    var galleryHtml = imgs.map(function (url, i) {
      var offset = i % 2 === 1 ? ' case-detail__photo--offset' : '';
      return '<figure class="case-detail__photo' + offset + '"><img src="' + url + '" alt="" loading="lazy"></figure>';
    }).join('');
    caseDetail.innerHTML =
      '<div class="case-detail__layout">' +
      '<div class="case-detail__main">' +
      '<div class="case-detail__intro">' +
      '<h2>' + data.title + '</h2>' +
      '<p class="case-meta">' + data.subtitle + '</p>' +
      '</div>' +
      tagsHtml +
      '<div class="case-body">' + data.body + '</div>' +
      '</div>' +
      '<div class="case-detail__gallery">' +
      '<div class="case-detail__grid case-detail__grid--34">' + galleryHtml + '</div>' +
      '</div>' +
      '</div>';
    caseDetail.querySelectorAll('.draw-hover, [data-draw], a, button').forEach(attachDrawHover);
  }

  function openCase(id) {
    renderCase(id);
    document.body.classList.add('case-open');
    caseView.setAttribute('aria-hidden', 'false');
    gsap.timeline()
      .set(pageTransition, { scaleY: 1, transformOrigin: 'bottom' })
      .to(pageTransition, { scaleY: 0, duration: 0.55, ease: 'power4.inOut' })
      .add(function () {
        caseView.classList.add('is-visible');
        gsap.fromTo(caseView, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      });
  }

  function closeCase() {
    gsap.timeline()
      .to(caseView, { opacity: 0, y: 30, duration: 0.35, ease: 'power2.in' })
      .set(pageTransitionOut, { scaleY: 1, transformOrigin: 'top' })
      .add(function () {
        caseView.classList.remove('is-visible');
        caseView.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('case-open');
        if (location.hash.match(/^#case\//)) {
          history.pushState('', document.title, location.pathname + location.search);
        }
      })
      .to(pageTransitionOut, { scaleY: 0, duration: 0.55, ease: 'power4.inOut' });
  }

  function onHashChange() {
    var id = parseCaseHash();
    if (id) openCase(id);
    else if (caseView.classList.contains('is-visible')) closeCase();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#case/"]');
    if (!a) return;
    e.preventDefault();
    var id = a.getAttribute('href').replace('#case/', '');
    history.pushState(null, '', '#case/' + id);
    openCase(id);
  });

  caseBack.addEventListener('click', function () {
    closeCase();
  });

  window.addEventListener('hashchange', onHashChange);
  window.addEventListener('popstate', onHashChange);

  window.addEventListener('load', function () {
    if (document.body.classList.contains('lanyard-active')) return;
    bootPortfolio();
  });

  window.bootPortfolio = function () {
    initBlurTextElements();
    initSplitTextReveal();
    initPortfolioMaskReveal();
    initToolsGrid();
    ScrollTrigger.refresh();
    if (parseCaseHash()) openCase(parseCaseHash());
  };

  window.addEventListener('resize', function () {
    ScrollTrigger.refresh();
    if (window.matchMedia('(max-width: 900px)').matches && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh(true);
    }
  });
})();