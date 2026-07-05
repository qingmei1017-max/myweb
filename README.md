# 孙雅娴 · 个人网站

静态个人作品集网站，展示个人介绍、案例复盘、工具箱与联系方式。

## 技术栈

- HTML5 + CSS3 + 原生 JavaScript
- [GSAP](https://greensock.com/gsap/)（ScrollTrigger、SplitText）
- [OGL](https://github.com/oframe/ogl)（WebGL 磁流体背景）
- Google Fonts（Fraunces、Syne、Noto Sans SC）

## 项目结构

```
portfolio-website/
├── index.html          # 网站入口
├── style.css           # 全站样式
├── script.js           # 主交互逻辑
├── lanyard.js          # 工牌入场动画
├── ferrofluid.js       # 背景磁流体效果
├── assets/
│   └── 孙雅娴简历.pdf   # 可下载简历
└── images/
    ├── avatar.png
    ├── case-1/         # 案例一图片
    ├── case-2/         # 案例二图片
    └── case-4/         # 案例三（日常审美）图片
```

## 本地预览

无需构建步骤，直接用浏览器打开 `index.html`，或使用本地静态服务器：

```bash
# Python 3
python -m http.server 8080

# Node.js（需安装 npx）
npx serve .
```

然后访问 `http://localhost:8080`。

## 部署到 Vercel

1. 将项目推送到 GitHub / GitLab / Bitbucket
2. 在 [Vercel](https://vercel.com) 导入该仓库
3. 框架预设选择 **Other**（静态站点）
4. **Build Command** 留空
5. **Output Directory** 留空（根目录即发布目录）
6. 点击 Deploy

部署完成后，Vercel 会自动将 `index.html` 作为首页提供访问。

## 注意事项

- 部署前请确认 `images/` 与 `assets/` 目录已一并提交到 Git
- 图片路径使用站点根路径（如 `/images/avatar.png`），与 Linux 服务器大小写严格匹配
- 若线上图片仍无法显示，请在 Vercel 部署日志中确认 `images/` 文件夹是否被上传
- 案例详情页通过 `#case/1`、`#case/2`、`#case/3` 路由，无需额外服务端配置
- 字体与 GSAP 依赖 CDN，需保持网络可访问

## 作者

孙雅娴 · 2026
