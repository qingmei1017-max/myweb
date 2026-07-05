const fs = require("fs");
const p = "d:/portfolio-website/";
const w = (name, c) => { fs.writeFileSync(p + name, c, "utf8"); console.log(name, Buffer.byteLength(c, "utf8")); };
w("style.css", [
":root {",
"  --lavender-bg: #dfdcff;",
"  --lavender-accent: #a69eff;",
"  --ink: #0e100f;",
"  --glass: rgba(223, 220, 255, 0.45);",
"  --glass-border: rgba(166, 158, 255, 0.35);",
"  --radius: 1.25rem;",
"  --header-h: 4.5rem;",
"  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);",
"  --font-sans: \"DM Sans\", \"Noto Sans SC\", system-ui, sans-serif;",
"}",
"",
"*, *::before, *::after { box-sizing: border-box; }",
"html { scroll-behavior: smooth; }",
"body {",
"  margin: 0;",
"  font-family: var(--font-sans);",
"  color: var(--ink);",
"  background: var(--lavender-bg);",
"  line-height: 1.6;",
"  overflow-x: hidden;",
"}",
"body.case-open { overflow: hidden; }",
"img { max-width: 100%; display: block; }",
"a { color: inherit; text-decoration: none; }",
"ul { list-style: none; margin: 0; padding: 0; }",
"button { font: inherit; cursor: pointer; border: none; background: none; }",
""
].join("\\n"));
