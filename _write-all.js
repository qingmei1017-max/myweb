const fs = require("fs");
const dir = "D:/portfolio-website/";
function w(name, content) {
  fs.writeFileSync(dir + name, content, { encoding: "utf8" });
  const buf = fs.readFileSync(dir + name);
  const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  console.log(name, "bytes:", buf.length, "BOM:", hasBOM);
}