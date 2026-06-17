import { motion } from "framer-motion";
import Icon from "../common/Icon";

export default function RecentlyAdded({ clients, onSelect }) {
  if (!clients.length) return null;

  return (
    <section className="featured-section gsap-reveal">
      <h2 className="section-title">
        Recently <span className="title-accent">Added</span>
      </h2>
      <div className="recent-list">
        {clients.map((client, i) => (
          <motion.button
            key={client.id}
            className="recent-item glass-card"
            onClick={() => onSelect(client.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ x: 8 }}
            data-cursor="button"
          >
            <span className="recent-rank">{String(i + 1).padStart(2, "0")}</span>
            <div className="recent-info">
              <h4>{client.name}</h4>
              <p>{client.imageCount} images · {client.videoCount} reels</p>
            </div>
            <Icon name="arrowRight" className="recent-arrow" size={14} />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
