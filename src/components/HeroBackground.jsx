import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">
      <div className="hero-gradient-mesh" />
      <div className="hero-grid-lines" />

      <motion.div
        className="hero-orb hero-orb-1"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-orb hero-orb-2"
        animate={{ x: [0, -50, 40, 0], y: [0, 50, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-orb hero-orb-3"
        animate={{ x: [0, 30, -60, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="hero-spark"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="hero-shine" />
    </div>
  );
}
