const fs = require("fs");
const dir = "D:/portfolio-website/";

function w(name, content) {
  fs.writeFileSync(dir + name, content, { encoding: "utf8" });
  const buf = fs.readFileSync(dir + name);
  const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  console.log(name, "bytes:", buf.length, "BOM:", hasBOM);
}

const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="个人作品集 — 市场营销 · 数据分析 · 跨界协作">
  <title>孙雅娴 · 内容运营作品集</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Noto+Sans+SC:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="noise" aria-hidden="true"></div>
  <div class="page-transition" id="pageTransition" aria-hidden="true"></div>
  <div class="page-transition page-transition--out" id="pageTransitionOut" aria-hidden="true"></div>
  <header class="header" id="header">
    <a href="#home" class="logo draw-hover" data-draw>孙雅娴.</a>
    <button class="nav-toggle" id="navToggle" type="button" aria-label="打开菜单" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="nav" id="navMenu" aria-label="主导航">
      <a href="#home" class="nav-link draw-hover" data-draw>关于我</a>
      <a href="#portfolio" class="nav-link draw-hover" data-draw>案例复盘</a>
      <a href="#toolkit" class="nav-link draw-hover" data-draw>工具箱</a>
      <a href="#contact" class="nav-link draw-hover" data-draw>联系我</a>
    </nav>
  </header>
  <main id="mainView">
    <section class="section hero" id="home">
      <div class="hero__grid">
        <div class="hero__media">
          <!-- 【替换个人照片】 -->
          <div class="avatar-wrap"><img class="avatar-img" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&q=80" alt="孙雅娴" width="600" height="750" loading="eager"></div>
        </div>
        <div class="hero__content">
          <p class="eyebrow">Hello · 你好</p>
          <h1 class="hero__title">孙雅娴</h1>
          <p class="hero__slogan split-text">互联网重度「受害者」，追求新鲜感与生命力。</p>
          <p class="hero__text">市场营销专业背景，具备 Python 数据分析与数学建模的底层能力，拥有丰富的跨部门协调与项目推进经验。</p>
          <div class="hero__actions"><a href="#" class="btn-glass draw-hover" data-draw id="resumeBtn" download>下载简历</a></div>
        </div>
      </div>
    </section>
    <section class="section portfolio" id="portfolio">
      <div class="portfolio-pin-wrapper">
        <div class="portfolio-pin-stage">
          <p class="case-page__chapter">案例复盘</p>
          <div class="portfolio-pin-grid">
            <div class="portfolio-mask-stack">
              <figure class="portfolio-mask-layer" data-case="1">
                <!-- 【替换案例1主图】 -->
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80" alt="品牌转型" loading="lazy">
              </figure>
              <figure class="portfolio-mask-layer" data-case="2">
                <!-- 【替换案例2主图】 -->
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80" alt="项目分析" loading="lazy">
              </figure>
              <figure class="portfolio-mask-layer" data-case="3">
                <!-- 【替换案例3主图】 -->
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80" alt="热点拆解" loading="lazy">
              </figure>
              <figure class="portfolio-mask-layer" data-case="4">
                <!-- 【替换案例4主图】 -->
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80" alt="日常审美与灵感库" loading="lazy">
              </figure>
            </div>
            <div class="portfolio-text-panels">
              <article class="case-text-panel is-active" data-case="1">
                <p class="case-page__index">01</p>
                <h3 class="case-page__title">品牌转型</h3>
                <ul class="case-tags"><li>内容种草</li><li>消费者画像</li><li>策略输出</li></ul>
                <a href="#case/1" class="case-link draw-hover" data-draw>了解更多</a>
              </article>
              <article class="case-text-panel" data-case="2">
                <p class="case-page__index">02</p>
                <h3 class="case-page__title">项目分析</h3>
                <ul class="case-tags"><li>PEST-SWOT</li><li>竞品调研</li><li>商业模式设计</li></ul>
                <a href="#case/2" class="case-link draw-hover" data-draw>了解更多</a>
              </article>
              <article class="case-text-panel" data-case="3">
                <p class="case-page__index">03</p>
                <h3 class="case-page__title">热点拆解</h3>
                <ul class="case-tags"><li>差异化选题</li><li>流程可视化</li><li>方法论提炼</li></ul>
                <a href="#case/3" class="case-link draw-hover" data-draw>了解更多</a>
              </article>
              <article class="case-text-panel" data-case="4">
                <p class="case-page__index">04</p>
                <h3 class="case-page__title">日常审美与灵感库</h3>
                <ul class="case-tags"><li>摄影</li><li>审美表达</li></ul>
                <a href="#case/4" class="case-link draw-hover" data-draw>了解更多</a>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section toolkit" id="toolkit">
      <div class="section-head">
        <h2 class="section-title split-text draw-hover" data-draw>工具箱</h2>
        <p class="section-desc">高频使用工具</p>
      </div>
      <div class="gradient-slider-container">
        <div class="gradient-slider-track" id="gradientSliderTrack">
          <article class="slider-card" data-index="0">
            <div class="slider-card__glow"></div>
            <div class="slider-card__img">
              <!-- 【替换工具图 Python】 -->
              <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=650&fit=crop&q=80" alt="Python" loading="lazy">
            </div>
            <span class="slider-card__label">Python</span>
          </article>
          <article class="slider-card" data-index="1">
            <div class="slider-card__glow"></div>
            <div class="slider-card__img">
              <!-- 【替换工具图 数据分析】 -->
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=650&fit=crop&q=80" alt="数据分析" loading="lazy">
            </div>
            <span class="slider-card__label">数据分析</span>
          </article>
          <article class="slider-card" data-index="2">
            <div class="slider-card__glow"></div>
            <div class="slider-card__img">
              <!-- 【替换工具图 Figma】 -->
              <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=650&fit=crop&q=80" alt="Figma" loading="lazy">
            </div>
            <span class="slider-card__label">Figma</span>
          </article>
          <article class="slider-card" data-index="3">
            <div class="slider-card__glow"></div>
            <div class="slider-card__img">
              <!-- 【替换工具图 内容策划】 -->
              <img src="https://images.unsplash.com/photo-1456324504439-367ceeef855a?w=500&h=650&fit=crop&q=80" alt="内容策划" loading="lazy">
            </div>
            <span class="slider-card__label">内容策划</span>
          </article>
          <article class="slider-card" data-index="4">
            <div class="slider-card__glow"></div>
            <div class="slider-card__img">
              <!-- 【替换工具图 Tableau】 -->
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=650&fit=crop&q=80" alt="Tableau" loading="lazy">
            </div>
            <span class="slider-card__label">Tableau</span>
          </article>
        </div>
      </div>
    </section>
    <section class="section contact" id="contact">
      <div class="section-head">
        <h2 class="section-title split-text draw-hover" data-draw>联系我</h2>
        <p class="section-desc">欢迎合作与交流。</p>
      </div>
      <div class="contact-grid">
        <div class="contact-card">
          <span class="contact-label">电话</span>
          <span class="contact-value" id="phoneValue">138-0000-0000</span>
          <button type="button" class="copy-btn draw-hover" data-draw data-copy="138-0000-0000">复制</button>
        </div>
        <div class="contact-card">
          <span class="contact-label">邮箱</span>
          <a class="contact-value draw-hover" data-draw href="mailto:yaxiansun@outlook.com">yaxiansun@outlook.com</a>
          <button type="button" class="copy-btn draw-hover" data-draw data-copy="yaxiansun@outlook.com">复制</button>
        </div>
        <div class="contact-card">
          <span class="contact-label">微信</span>
          <span class="contact-value" id="wechatValue">Yaxian_Sun</span>
          <button type="button" class="copy-btn draw-hover" data-draw data-copy="Yaxian_Sun">复制</button>
        </div>
      </div>
    </section>
    <footer class="site-footer"><p>© 2026 孙雅娴 · 内容运营作品集</p></footer>
  </main>
  <aside class="case-view" id="caseView" aria-hidden="true">
    <button type="button" class="case-back draw-hover" data-draw id="caseBack">← 返回</button>
    <article class="case-detail" id="caseDetail"></article>
  </aside>
  <div class="draw-layer" id="drawLayer" aria-hidden="true"></div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
`;

w("index.html", indexHtml);