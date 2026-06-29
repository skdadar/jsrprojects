const { spawn } = require("child_process");
const path = require("path");
const { generatePortfolio } = require("./generate-portfolio");
const { startPortfolioWatcher } = require("./watch-portfolio");

const root = path.join(__dirname, "..");

generatePortfolio();
startPortfolioWatcher();

const child = spawn("npx", ["react-scripts", "start"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

function shutdown(code = 0) {
  if (!child.killed) child.kill();
  process.exit(code);
}

child.on("exit", (code) => shutdown(code ?? 0));
process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
