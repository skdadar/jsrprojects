import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../common/Icon";
import MasonryGrid from "./MasonryGrid";
import ReelsGallery from "./ReelsGallery";
import PremiumLightbox from "./PremiumLightbox";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";

function VideoModal({ item, onClose }) {
  if (!item) return null;

  return (
    <motion.div
      className="video-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="video-modal glass-panel"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} data-cursor="button">
          <Icon name="times" size={18} />
        </button>
        <div className="video-modal-player">
          <video src={item.src} controls autoPlay playsInline className="video-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioGallery({ type, items }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoModal, setVideoModal] = useState(null);
  const { visibleItems, hasMore, sentinelRef } = useInfiniteLoad(items, 24);

  const openLightbox = (item) => {
    const idx = items.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="portfolio-gallery">
      {type === "images" ? (
        <MasonryGrid items={visibleItems} onItemClick={openLightbox} />
      ) : (
        <ReelsGallery items={visibleItems} onItemClick={setVideoModal} />
      )}

      {hasMore && (
        <div ref={sentinelRef} className="load-sentinel">
          <div className="loading-dots">
            <span /><span /><span />
          </div>
        </div>
      )}

      <PremiumLightbox
        items={items}
        open={lightboxOpen}
        index={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />

      <AnimatePresence>
        {videoModal && (
          <VideoModal item={videoModal} onClose={() => setVideoModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
