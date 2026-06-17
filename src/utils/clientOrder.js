export const CLIENT_SERIAL_ORDER = [
  "Somashrooms",
  "CarLuxxe",
  "Dr. Sourav Shukla",
  "Ground Zero",
  "IHM",
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

export function sortClients(clients, sortBy = "serial") {
  const list = [...clients];

  switch (sortBy) {
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "recent":
      return list.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    case "media":
      return list.sort(
        (a, b) => b.imageCount + b.videoCount - (a.imageCount + a.videoCount)
      );
    case "serial":
    default:
      return list.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  }
}

export function filterClients(clients, query) {
  if (!query.trim()) return clients;
  const q = query.toLowerCase();
  return clients.filter((c) => c.name.toLowerCase().includes(q));
}
