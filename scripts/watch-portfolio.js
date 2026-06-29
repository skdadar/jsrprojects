const fs = require("fs");
const { generatePortfolio, CLIENTS_DIR, CATEGORY_DIR } = require("./generate-portfolio");

let timer = null;

function scheduleRegenerate() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      generatePortfolio();
    } catch (err) {
      console.error("[portfolio-watch] Failed to regenerate manifest:", err.message);
    }
  }, 400);
}

function watchDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.watch(dir, { recursive: true }, (_event, filename) => {
    if (filename && filename.endsWith("portfolio-manifest.json")) return;
    scheduleRegenerate();
  });
}

function startPortfolioWatcher() {
  watchDir(CLIENTS_DIR);
  watchDir(CATEGORY_DIR);
  console.log("[portfolio-watch] Auto-updating manifest when clients/ or category/ changes");
}

module.exports = { startPortfolioWatcher };
