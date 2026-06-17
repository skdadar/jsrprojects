export const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
export const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".avi", ".mkv"];

export function getMediaType(filename) {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  return null;
}

export function isImageFile(filename) {
  return getMediaType(filename) === "image";
}

export function isVideoFile(filename) {
  return getMediaType(filename) === "video";
}
