import { useState, useRef} from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Icon from "../common/Icon";

export default function VideoCard({ item, index, onClick }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
      setProgress(0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = videoRef.current.currentTime / videoRef.current.duration;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="reel-item"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 8) * 0.06, duration: 0.5 }}
    >
      <button
        className="media-card video-card"
        onClick={() => onClick(item)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor="video"
      >
        <div className="video-frame">
          {inView && (
            <video
              ref={videoRef}
              src={item.src}
              muted
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              className="video-preview"
            />
          )}
        </div>
        <div className="video-overlay">
          <motion.div
            className="play-btn"
            animate={{ scale: playing ? 0 : 1, opacity: playing ? 0 : 1 }}
          >
            <Icon name="play" size={18} />
          </motion.div>
        </div>
        <div className="video-progress">
          <div className="video-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="card-glow" />
      </button>
    </motion.div>
  );
}
