import { useState } from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import Icon from "../common/Icon";

function ImageCard({ item, index, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  return (
    <motion.div
      ref={ref}
      className="masonry-item"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 12) * 0.05, duration: 0.5 }}
    >
      <button
        className="media-card image-card"
        onClick={() => onClick(item)}
        data-cursor="image"
      >
        {!loaded && <div className="skeleton-loader" />}
        {inView && (
          <img
            src={item.src}
            alt=""
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`media-img ${loaded ? "loaded" : ""}`}
          />
        )}
        <div className="media-overlay">
          <Icon name="expand" size={14} />
        </div>
        <div className="card-glow" />
      </button>
    </motion.div>
  );
}

export default function MasonryGrid({ items, onItemClick }) {
  const breakpoints = {
    default: 5,
    1536: 4,
    1280: 3,
    768: 2,
    480: 2,
  };

  if (!items.length) {
    return (
      <div className="empty-state glass-panel">
        <Icon name="image" className="empty-icon" size={40} />
        <p>No images found for this selection.</p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="masonry-grid"
      columnClassName="masonry-column"
    >
      {items.map((item, index) => (
        <ImageCard key={item.id} item={item} index={index} onClick={onItemClick} />
      ))}
    </Masonry>
  );
}
