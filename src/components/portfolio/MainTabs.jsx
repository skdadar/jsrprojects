import { motion } from "framer-motion";
import Icon from "../common/Icon";

const TABS = [
  { id: "images", label: "Images", icon: "images" },
  { id: "reels", label: "Reels", icon: "film" },
];

export default function MainTabs({ active, onChange }) {
  return (
    <div className="main-tabs glass-panel">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`main-tab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
          data-cursor="button"
        >
          {active === tab.id && (
            <motion.span
              className="tab-indicator"
              layoutId="mainTabIndicator"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Icon name={tab.icon} size={15} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
