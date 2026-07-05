const fs = require("fs");
const dir = "D:/portfolio-website/";

function w(name, content) {
  fs.writeFileSync(dir + name, content, { encoding: "utf8" });
  const buf = fs.readFileSync(dir + name);
  const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  console.log(name, "bytes:", buf.length, "BOM:", hasBOM);
}

const styleCss = `:root {
  --lavender-bg: #dfdcff;
  --lavender-accent: #a69eff;
  --ink: #0e100f;
  --glass: rgba(223, 220, 255, 0.45);
  --glass-border: rgba(166, 158, 255, 0.35);
  --radius: 1.25rem;
  --header-h: 4.5rem;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --font-sans: "DM Sans", "Noto Sans SC", system-ui, sans-serif;
  --slider-card-w: 9rem;
  --slider-card-w-active: 13.5rem;
  --slider-glow: #6366f1;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--ink);
  background: var(--lavender-bg);
  line-height: 1.6;
  overflow-x: hidden;
}
body.case-open { overflow: hidden; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; margin: 0; padding: 0; }
button { font: inherit; cursor: pointer; border: none; background: none; }

.noise {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9990;
  opacity: 0.35;
  background-image: url(https://assets.codepen.io/16327/noise-e82662fe.png);
  background-repeat: repeat;
  mix-blend-mode: soft-light;
}

.page-transition {
  position: fixed;
  inset: 0;
  background: var(--lavender-accent);
  z-index: 9998;
  transform: scaleY(0);
  transform-origin: top;
  pointer-events: none;
}
.page-transition--out { transform-origin: bottom; background: var(--ink); }

.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.25rem, 4vw, 3rem);
  z-index: 100;
  transition: background 0.4s var(--ease-out), backdrop-filter 0.4s;
}
.header.scrolled {
  background: rgba(223, 220, 255, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
}
.logo { font-weight: 600; letter-spacing: -0.02em; font-size: 1.125rem; }

.nav { display: flex; gap: 2rem; align-items: center; }
.nav-link { font-size: 0.9375rem; opacity: 0.85; transition: opacity 0.25s; }
.nav-link:hover, .nav-link.active { opacity: 1; }

.nav-toggle {
  display: none;
  width: 2.5rem; height: 2.5rem;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  z-index: 110;
}
.nav-toggle span {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--ink);
  transition: transform 0.35s var(--ease-out), opacity 0.25s;
}
.nav-toggle.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.nav-toggle.active span:nth-child(2) { opacity: 0; }
.nav-toggle.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

.section {
  padding: calc(var(--header-h) + 3rem) clamp(1.25rem, 4vw, 3rem) 4rem;
  max-width: 72rem;
  margin: 0 auto;
}
.section-head { margin-bottom: 2.5rem; max-width: 36rem; }
.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  margin: 0 0 0.75rem;
}
.section-desc { margin: 0; opacity: 0.75; }
.split-text .line { overflow: hidden; display: block; }
.split-text .line-inner { display: inline-block; will-change: transform; }

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  min-height: calc(100vh - var(--header-h) - 6rem);
}
.avatar-wrap {
  aspect-ratio: 4/5;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: 0 24px 48px rgba(14, 16, 15, 0.08);
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }
.eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.75rem; opacity: 0.65; margin: 0 0 0.5rem; }
.hero__title { font-size: clamp(2.5rem, 6vw, 3.75rem); font-weight: 600; letter-spacing: -0.04em; margin: 0 0 1rem; line-height: 1.1; }
.hero__slogan { font-size: clamp(1.125rem, 2.5vw, 1.375rem); font-weight: 500; margin: 0 0 1.25rem; }
.hero__text { margin: 0 0 2rem; max-width: 32rem; opacity: 0.85; }

.btn-glass {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  border-radius: 999px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  font-weight: 500;
  transition: transform 0.3s var(--ease-out), box-shadow 0.3s, background 0.3s;
}
.btn-glass:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(166, 158, 255, 0.35);
  background: rgba(223, 220, 255, 0.65);
}


.portfolio {
  padding: 0;
  max-width: none;
}

.portfolio-pin-wrapper {
  position: relative;
  height: 400vh;
}

.portfolio-pin-stage {
  height: 100vh;
  display: flex;
  align-items: center;
  padding: calc(var(--header-h) + 1.5rem) 0 3rem;
  position: relative;
}

.case-page__chapter {
  position: absolute;
  top: calc(var(--header-h) + 1.5rem);
  left: clamp(1.25rem, 4vw, 3rem);
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  opacity: 0.55;
}

.portfolio-pin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem);
  align-items: center;
}

.portfolio-mask-stack {
  position: relative;
  width: 100%;
  height: calc(100vh - var(--header-h) - 4rem);
  aspect-ratio: 3 / 4;
  align-self: center;
}

.portfolio-mask-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--glass-border);
  background: rgba(14, 16, 15, 0.06);
  will-change: clip-path;
}

.portfolio-mask-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-text-panels {
  position: relative;
  min-height: calc(100vh - var(--header-h) - 4rem);
  text-align: right;
  align-self: center;
}

.case-text-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  max-width: 28rem;
  margin-left: auto;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s var(--ease-out);
}

.case-text-panel.is-active {
  opacity: 1;
  pointer-events: auto;
}

.case-page__index {
  font-size: 0.8125rem;
  letter-spacing: 0.2em;
  opacity: 0.5;
  margin: 0 0 1rem;
}

.case-page__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0 0 1rem;
  font-weight: 600;
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: flex-end;
  list-style: none;
}

.case-tags li {
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(166, 158, 255, 0.25);
  border: 1px solid var(--glass-border);
  list-style: none;
}

.case-link {
  font-weight: 500;
  font-size: 0.9375rem;
}


.section.toolkit { overflow: visible; }

.gradient-slider-container {
  position: relative;
  overflow: visible;
  margin: 0 calc(-1 * clamp(1.25rem, 4vw, 3rem));
  padding: 3rem 0 4rem;
  min-height: clamp(28rem, 55vw, 38rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  background:
    radial-gradient(ellipse 80% 60% at 50% 55%, color-mix(in srgb, var(--slider-glow) 28%, transparent), transparent 72%),
    linear-gradient(160deg, var(--lavender-bg) 0%, color-mix(in srgb, var(--slider-glow) 18%, var(--lavender-bg)) 100%);
  transition: background 0.55s var(--ease-out);
}

.gradient-slider-track {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  width: 100%;
  min-height: clamp(22rem, 42vw, 28rem);
  overflow-x: auto;
  overflow-y: visible;
  padding: 3rem calc(50% - var(--slider-card-w) / 2) 2.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;
}

.gradient-slider-track::-webkit-scrollbar { display: none; }
.gradient-slider-track.is-dragging { cursor: grabbing; scroll-behavior: auto; }

.slider-card {
  flex-shrink: 0;
  width: var(--slider-card-w);
  text-align: center;
  position: relative;
  overflow: visible;
}

.slider-card__glow {
  position: absolute;
  left: 50%;
  top: 42%;
  width: 140%;
  height: 130%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at center, var(--slider-glow, #6366f1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.45s var(--ease-out);
  pointer-events: none;
  z-index: 0;
  filter: blur(12px);
}

.slider-card.is-active .slider-card__glow { opacity: 0.38; }

.slider-card__img {
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 10 / 13;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: 0 16px 40px rgba(14, 16, 15, 0.14);
  background: rgba(255, 255, 255, 0.2);
}

.slider-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.slider-card__label {
  position: relative;
  z-index: 1;
  font-size: 0.8125rem;
  font-weight: 500;
  display: block;
  margin-top: 0.65rem;
}


.contact-grid {
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
}
.contact-card {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 9rem;
  padding: 1.25rem 1.35rem;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid var(--glass-border);
}
.contact-label { font-size: 0.8125rem; opacity: 0.65; }
.contact-value { font-weight: 500; word-break: break-all; }
.copy-btn {
  align-self: flex-start;
  font-size: 0.8125rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--glass-border);
  background: var(--glass);
  transition: background 0.25s;
}
.copy-btn:hover { background: rgba(166, 158, 255, 0.35); }

.site-footer {
  text-align: center;
  padding: 2rem clamp(1.25rem, 4vw, 3rem) 4rem;
  font-size: 0.875rem;
  opacity: 0.65;
}
.site-footer p { margin: 0; }

.case-view {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--lavender-bg);
  padding: calc(var(--header-h) + 1rem) clamp(1.25rem, 4vw, 3rem) 3rem;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(8%);
}
.case-view.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: none;
}
.case-back { margin-bottom: 2rem; font-weight: 500; font-size: 1rem; }
.case-detail h2 { font-size: clamp(1.75rem, 4vw, 2.25rem); margin: 0 0 0.5rem; }
.case-detail .case-meta { opacity: 0.7; margin-bottom: 2rem; }
.case-detail .case-tags {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: flex-start;
}
.case-detail .case-tags li {
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(166, 158, 255, 0.25);
  border: 1px solid var(--glass-border);
  list-style: none;
}
.case-detail h4 { margin: 2rem 0 0.75rem; font-size: 1rem; }
.case-detail p, .case-detail li { opacity: 0.88; }
.case-detail .case-body ul { padding-left: 1.25rem; list-style: disc; }

.case-detail__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}
.case-detail__main { min-width: 0; }
.case-detail__gallery { min-width: 0; }
.case-detail__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}
.case-detail__grid--34 .case-detail__photo {
  aspect-ratio: 3 / 4;
  border-radius: calc(var(--radius) - 0.35rem);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background: rgba(14, 16, 15, 0.06);
  margin: 0;
}
.case-detail__grid--34 .case-detail__photo--offset,
.case-detail__grid--34 .case-detail__photo:nth-child(even) {
  margin-top: 0.75rem;
}
.case-detail__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.draw-hover { position: relative; display: inline-block; }
.draw-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5000;
}
.draw-layer svg { position: absolute; overflow: visible; pointer-events: none; }
.draw-layer path {
  fill: none;
  stroke: var(--lavender-accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(120%);
  background: var(--ink);
  color: var(--lavender-bg);
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  z-index: 10000;
  transition: transform 0.4s var(--ease-out);
}
.toast.show { transform: translateX(-50%) translateY(0); }

@media (max-width: 900px) {
  .hero__grid { grid-template-columns: 1fr; min-height: auto; }

  .portfolio-pin-wrapper {
    height: auto;
  }

  .portfolio-pin-stage {
    height: auto;
    padding: calc(var(--header-h) + 1.5rem) 0 3rem;
  }

  .portfolio-pin-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .portfolio-mask-stack {
    position: static;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .portfolio-mask-layer {
    position: relative;
    inset: auto;
    aspect-ratio: 3 / 4;
    max-height: 70vh;
  }

  .portfolio-text-panels {
    position: relative;
    min-height: auto;
    text-align: left;
  }

  .case-text-panel {
    position: relative;
    inset: auto;
    opacity: 1;
    pointer-events: auto;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .case-text-panel:not(:last-child) {
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--glass-border);
  }

  .case-tags { justify-content: flex-start; }
  .case-detail__layout { grid-template-columns: 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  .nav-toggle { display: flex; }
  .nav {
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    background: rgba(223, 220, 255, 0.96);
    backdrop-filter: blur(16px);
    transform: translateX(100%);
    transition: transform 0.45s var(--ease-out);
    z-index: 105;
  }
  .nav.open { transform: translateX(0); }
  .nav-link { font-size: 1.5rem; }
  .contact-grid { flex-direction: column; }
}
`;

w("style.css", styleCss);