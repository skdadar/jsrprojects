/**
 * Migrates old public/{Category} folders into public/category/{Category}/image|video
 * Then removes legacy folders from public root.
 * Run: node scripts/migrate-categories.js
 */
const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");
const CATEGORY_DIR = path.join(PUBLIC, "category");

const CATEGORIES = [
  "Apparel",
  "Astroglogy",
  "Ayurveda",
  "Cosmetics",
  "Education",
  "Fashion",
  "Home Decor",
  "Jewellery",
  "Medical",
  "Men's Fashion",
  "Restaurant",
  "Solar Energy",
  "Travel & Tourism",
  "Vehicle",
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".avi", ".mkv"]);

const REMOVE_DIRS = [
  ...CATEGORIES,
  ...CATEGORIES.map((c) => `${c}-20241129T174429Z-001`),
  ...CATEGORIES.map((c) => {
    const variants = {
      Astroglogy: "Astroglogy-20241129T174429Z-001",
      Ayurveda: "Ayurveda-20241129T174531Z-001",
      Cosmetics: "Cosmetics-20241129T174529Z-001",
      Education: "Education-20241129T174433Z-001",
      Fashion: "Fashion-20241129T174529Z-001",
      "Home Decor": "Home Decor-20241129T174435Z-001",
      Jewellery: "Jewellery-20241129T174429Z-001",
      Medical: "Medical-20241129T174430Z-001",
      Restaurant: "Restaurant-20241129T174432Z-001",
      "Solar Energy": "Solar Energy-20241129T174436Z-001",
      "Travel & Tourism": "Travel & Tourism-20241129T174532Z-001",
      Vehicle: "Vehicle-20241129T174429Z-001",
    };
    return variants[c] || null;
  }).filter(Boolean),
  path.join("uploads"),
];

function walkFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function uniqueDest(destDir, filename) {
  let dest = path.join(destDir, filename);
  if (!fs.existsSync(dest)) return dest;
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  let i = 1;
  while (fs.existsSync(dest)) {
    dest = path.join(destDir, `${base}-${i}${ext}`);
    i++;
  }
  return dest;
}

function copyMedia(srcPath, destDir) {
  const ext = path.extname(srcPath).toLowerCase();
  const filename = path.basename(srcPath);
  const dest = uniqueDest(destDir, filename);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(srcPath, dest);
  return dest;
}

function migrateCategory(name) {
  const srcDir = path.join(PUBLIC, name);
  if (!fs.existsSync(srcDir)) {
    console.log(`  Skip (not found): ${name}`);
    return { images: 0, videos: 0 };
  }

  const imageDir = path.join(CATEGORY_DIR, name, "image");
  const videoDir = path.join(CATEGORY_DIR, name, "video");
  let images = 0;
  let videos = 0;

  for (const filePath of walkFiles(srcDir)) {
    const ext = path.extname(filePath).toLowerCase();
    if (IMAGE_EXT.has(ext)) {
      copyMedia(filePath, imageDir);
      images++;
    } else if (VIDEO_EXT.has(ext)) {
      copyMedia(filePath, videoDir);
      videos++;
    }
  }

  console.log(`  ${name}: ${images} images, ${videos} videos`);
  return { images, videos };
}

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`  Removed: ${path.relative(PUBLIC, dir)}`);
  }
}

function main() {
  console.log("Migrating categories to public/category/...\n");

  let totalImages = 0;
  let totalVideos = 0;

  for (const cat of CATEGORIES) {
    const { images, videos } = migrateCategory(cat);
    totalImages += images;
    totalVideos += videos;
  }

  console.log(`\nTotal migrated: ${totalImages} images, ${totalVideos} videos`);
  console.log("\nCleaning up legacy folders...\n");

  const toRemove = new Set();
  for (const item of REMOVE_DIRS) {
    toRemove.add(path.join(PUBLIC, item));
  }

  for (const entry of fs.readdirSync(PUBLIC, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.match(/-\d{8}T\d{6}Z-\d{3}$/)) {
      toRemove.add(path.join(PUBLIC, name));
    }
  }

  for (const dir of toRemove) {
    rmDir(dir);
  }

  const zipPath = path.join(PUBLIC, "OneDrive_2026-06-17.zip");
  if (fs.existsSync(zipPath)) {
    fs.rmSync(zipPath, { force: true });
    console.log("  Removed: OneDrive_2026-06-17.zip");
  }

  console.log("\nDone! Run: npm run generate-portfolio");
}

main();
