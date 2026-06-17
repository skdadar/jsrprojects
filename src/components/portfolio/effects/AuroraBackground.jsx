import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <motion.div
        className="aurora-blob aurora-blob-1"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob aurora-blob-2"
        animate={{ x: [0, -100, 60, 0], y: [0, 80, -30, 0], scale: [1, 0.8, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob aurora-blob-3"
        animate={{ x: [0, 50, -80, 0], y: [0, -40, 70, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="aurora-noise" />
    </div>
  );
}
