import { motion } from "framer-motion";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";
import Icon from "../common/Icon";

function StatCard({ label, value, icon, delay }) {
  const count = useAnimatedCounter(value);

  return (
    <motion.div
      className="stat-card neu-card"
      key={`${label}-${value}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(249, 115, 22, 0.15)" }}
    >
      <div className="stat-icon">
        <Icon name={icon} size={22} />
      </div>
      <motion.div
        className="stat-value"
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {count.toLocaleString()}
      </motion.div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

export default function StatsDashboard({ viewStats, viewMode }) {
  return (
    <div className="stats-dashboard" key={viewMode}>
      <StatCard
        label={viewMode === "category" ? "Categories" : "Clients"}
        value={viewStats.count}
        icon="users"
        delay={0}
      />
      <StatCard label="Images" value={viewStats.images} icon="image" delay={0.1} />
      <StatCard label="Reels" value={viewStats.videos} icon="video" delay={0.2} />
    </div>
  );
}
