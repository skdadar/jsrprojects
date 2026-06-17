import { motion } from "framer-motion";
import Icon from "../common/Icon";

export default function FeaturedSection({ clients, onSelect, label = "Featured Projects" }) {
  if (!clients.length) return null;

  const words = label.split(" ");
  const accent = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <section className="featured-section">
      <h2 className="section-title">
        <span className="title-accent">{accent}</span> {rest}
      </h2>
      <div className="featured-grid">
        {clients.map((client, i) => (
          <motion.button
            key={client.id}
            className="featured-card glass-card"
            onClick={() => onSelect(client.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            data-cursor="image"
          >
            <div className="featured-card-glow" />
            {client.images[0] ? (
              <img
                src={client.images[0].src}
                alt={client.name}
                loading="lazy"
                className="featured-thumb"
              />
            ) : client.videos[0] ? (
              <div className="featured-thumb featured-thumb-video">
                <Icon name="film" size={28} />
              </div>
            ) : (
              <div className="featured-thumb featured-thumb-empty">
                <Icon name="image" size={28} />
              </div>
            )}
            <div className="featured-info">
              <h3>{client.name}</h3>
              <p>{client.imageCount} images · {client.videoCount} reels</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
