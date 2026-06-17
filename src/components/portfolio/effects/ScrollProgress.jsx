import { motion } from "framer-motion";
import { useScrollProgress } from "../../../hooks/useScrollProgress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress }}
      initial={{ scaleX: 0 }}
    />
  );
}
