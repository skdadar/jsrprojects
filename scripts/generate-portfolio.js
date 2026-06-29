/**
 * Scans public/clients and public/category folders and generates portfolio-manifest.json
 * Run: npm run generate-portfolio
 *
 * Folder structure:
 *   public/clients/{ClientName}/image/*  (or images/*)
 *   public/clients/{ClientName}/video/*
 *   public/category/{CategoryName}/image/*  (or images/*)
 *   public/category/{CategoryName}/video/*
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const CLIENTS_DIR = path.join(PUBLIC, "clients");
const CATEGORY_DIR = path.join(PUBLIC, "category");
const LEGACY_DIR = path.join(PUBLIC, "uploads", "portfolio");
const MANIFEST_PATH = path.join(PUBLIC, "portfolio-manifest.json");

const CLIENT_SERIAL_ORDER = [
  "Somashrooms",
  "CarLuxxe",
  "Dr. Sourav Shukla",
  "Ground Zero",
  "IHM",
  "IHM Dehradun",
  "Servo Hospitality",
  "Chakk 109",
  "Ausskill",
  "Hindustan",
  "Dainik Jagran",
  "Dev Raha Resort",
  "Hotel Sunrise",
  "Kitchen Galleria",
  "Ekantam",
];

const CATEGORY_SERIAL_ORDER = [
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

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".jfif"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".avi", ".mkv"]);
const IMAGE_DIR_NAMES = ["image", "images"];

const CLIENT_ALIASES = {
  somashrooms: "Somashrooms",
  carluxxe: "CarLuxxe",
  "dr-sourav-shukla": "Dr. Sourav Shukla",
  "ground-zero": "Ground Zero",
  ihm: "IHM",
  "ihm-dehradun": "IHM Dehradun",
  "servo-hospitality": "Servo Hospitality",
  ausskill: "Ausskill",
  hindustan: "Hindustan",
  "dainik-jagran": "Dainik Jagran",
  "dev-raha-resort": "Dev Raha Resort",
  "hotel-sunrise": "Hotel Sunrise",
  "kitchen-galleria": "Kitchen Galleria",
  ekantam: "Ekantam",
  homestay: "Homestay",
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveClientName(folderName) {
  const key = slugify(folderName);
  if (CLIENT_ALIASES[key]) return CLIENT_ALIASES[key];
  const normalized = folderName.trim();
  const match = CLIENT_SERIAL_ORDER.find(
    (c) => slugify(c) === key || normalized.toLowerCase() === c.toLowerCase()
  );
  return match || normalized;
}

function getOrder(name, serialList) {
  const idx = serialList.indexOf(name);
  return idx >= 0 ? idx : serialList.length + 1;
}

function isMedia(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext);
}

function walkFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (isMedia(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function scanMediaFolder(basePath, publicPrefix) {
  const images = [];
  const videos = [];

  for (const filePath of walkFiles(basePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const relative = path.relative(basePath, filePath).replace(/\\/g, "/");
    const publicPath = `${publicPrefix}/${relative}`.replace(/\/+/g, "/");
    const filename = path.basename(filePath);
    const title = path.basename(filename, ext);

    const item = {
      id: slugify(`${publicPrefix}-${filename}`),
      src: publicPath.startsWith("/") ? publicPath : `/${publicPath}`,
      title,
      filename,
      addedAt: fs.statSync(filePath).mtime.toISOString(),
    };

    if (IMAGE_EXT.has(ext)) images.push(item);
    else if (VIDEO_EXT.has(ext)) videos.push(item);
  }

  images.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
  videos.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));

  return { images, videos };
}

function dedupeBySrc(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

function scanImageDirs(folderPath, entryName, publicRoot) {
  let images = [];

  for (const dirName of IMAGE_DIR_NAMES) {
    const dir = path.join(folderPath, dirName);
    if (!fs.existsSync(dir)) continue;
    const scanned = scanMediaFolder(dir, `${publicRoot}/${entryName}/${dirName}`);
    images.push(...scanned.images);
  }

  return dedupeBySrc(images);
}

function scanGroupedFolder(rootDir, publicRoot, type, serialOrder, nameResolver) {
  const groups = [];
  if (!fs.existsSync(rootDir)) return groups;

  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const folderPath = path.join(rootDir, entry.name);
    const displayName = nameResolver ? nameResolver(entry.name) : entry.name;
    const id = slugify(displayName);
    const videoDir = path.join(folderPath, "video");
    const hasImageDirs = IMAGE_DIR_NAMES.some((dirName) =>
      fs.existsSync(path.join(folderPath, dirName))
    );
    const hasVideoDir = fs.existsSync(videoDir);

    let images = [];
    let videos = [];

    if (hasImageDirs || hasVideoDir) {
      if (hasImageDirs) {
        images = scanImageDirs(folderPath, entry.name, publicRoot);
      }
      if (hasVideoDir) {
        const scanned = scanMediaFolder(videoDir, `${publicRoot}/${entry.name}/video`);
        videos = scanned.videos;
      }
    } else {
      const scanned = scanMediaFolder(folderPath, `${publicRoot}/${entry.name}`);
      images = scanned.images;
      videos = scanned.videos;
    }

    if (images.length === 0 && videos.length === 0 && type !== "category") continue;

    const lastUpdated = [...images, ...videos]
      .map((m) => m.addedAt)
      .sort()
      .pop();

    groups.push({
      id,
      name: displayName,
      folder: entry.name,
      order: getOrder(displayName, serialOrder),
      images,
      videos,
      imageCount: images.length,
      videoCount: videos.length,
      featured: images.length + videos.length > 5,
      lastUpdated: lastUpdated || new Date().toISOString(),
      type,
    });
  }

  return groups.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

function migrateLegacyToClients() {
  if (!fs.existsSync(LEGACY_DIR)) return;
  if (fs.existsSync(CLIENTS_DIR) && fs.readdirSync(CLIENTS_DIR).length > 0) return;

  fs.mkdirSync(CLIENTS_DIR, { recursive: true });

  for (const entry of fs.readdirSync(LEGACY_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const srcDir = path.join(LEGACY_DIR, entry.name);
    const clientName = resolveClientName(entry.name);
    const destSlug = slugify(clientName);
    const imageDir = path.join(CLIENTS_DIR, destSlug, "image");
    const videoDir = path.join(CLIENTS_DIR, destSlug, "video");

    for (const filePath of walkFiles(srcDir)) {
      const ext = path.extname(filePath).toLowerCase();
      const dest = IMAGE_EXT.has(ext)
        ? path.join(imageDir, path.basename(filePath))
        : path.join(videoDir, path.basename(filePath));

      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(filePath, dest);
      }
    }
  }

  console.log("Migrated legacy uploads/portfolio → public/clients/");
}

function ensureCategoryFolders() {
  fs.mkdirSync(CATEGORY_DIR, { recursive: true });
  for (const cat of CATEGORY_SERIAL_ORDER) {
    const folder = path.join(CATEGORY_DIR, cat);
    fs.mkdirSync(path.join(folder, "image"), { recursive: true });
    fs.mkdirSync(path.join(folder, "video"), { recursive: true });
  }
}

function scanCategoriesIncludingEmpty() {
  ensureCategoryFolders();
  const found = scanGroupedFolder(
    CATEGORY_DIR,
    "category",
    "category",
    CATEGORY_SERIAL_ORDER,
    (name) => name
  );

  const foundIds = new Set(found.map((c) => c.id));
  for (const cat of CATEGORY_SERIAL_ORDER) {
    const id = slugify(cat);
    if (!foundIds.has(id)) {
      found.push({
        id,
        name: cat,
        folder: cat,
        order: getOrder(cat, CATEGORY_SERIAL_ORDER),
        images: [],
        videos: [],
        imageCount: 0,
        videoCount: 0,
        featured: false,
        lastUpdated: new Date().toISOString(),
        type: "category",
      });
    }
  }

  return found.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

function generatePortfolio() {
  migrateLegacyToClients();
  fs.mkdirSync(CLIENTS_DIR, { recursive: true });

  const clients = scanGroupedFolder(
    CLIENTS_DIR,
    "clients",
    "client",
    CLIENT_SERIAL_ORDER,
    resolveClientName
  );

  const categories = scanCategoriesIncludingEmpty();

  const manifest = {
    generatedAt: new Date().toISOString(),
    version: 2,
    clients,
    categories,
    stats: {
      totalClients: clients.length,
      totalCategories: categories.length,
      totalImages:
        clients.reduce((s, c) => s + c.imageCount, 0) +
        categories.reduce((s, c) => s + c.imageCount, 0),
      totalVideos:
        clients.reduce((s, c) => s + c.videoCount, 0) +
        categories.reduce((s, c) => s + c.videoCount, 0),
    },
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`Manifest: ${MANIFEST_PATH}`);
  console.log(
    `Clients: ${manifest.stats.totalClients} | Categories: ${manifest.stats.totalCategories} | Images: ${manifest.stats.totalImages} | Videos: ${manifest.stats.totalVideos}`
  );

  return manifest;
}

module.exports = { generatePortfolio, CLIENTS_DIR, CATEGORY_DIR };

if (require.main === module) {
  generatePortfolio();
}
