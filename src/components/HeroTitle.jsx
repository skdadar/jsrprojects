import { motion } from "framer-motion";

export default function HeroTitle() {
  return (
    <h1 className="hero-title">
      <motion.span
        className="hero-title-line"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        METASOFT
      </motion.span>
      <motion.span
        className="hero-title-line hero-title-accent"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        INNOTECH
        <motion.span
          className="hero-type-cursor"
          aria-hidden="true"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        />
      </motion.span>
    </h1>
  );
}
