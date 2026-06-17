import { motion } from "framer-motion";

const MODES = [
  { id: "client", label: "Client-wise" },
  { id: "category", label: "Category-wise" },
];

export default function ViewModeTabs({ active, onChange }) {
  return (
    <div className="view-mode-tabs glass-panel">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          className={`view-mode-tab ${active === mode.id ? "active" : ""}`}
          onClick={() => onChange(mode.id)}
          data-cursor="button"
        >
          {active === mode.id && (
            <motion.span
              className="view-mode-indicator"
              layoutId="viewModeIndicator"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
