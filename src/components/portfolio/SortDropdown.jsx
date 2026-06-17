import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";

const OPTIONS = [
  { value: "serial", label: "Serial Order" },
  { value: "name", label: "Name A-Z" },
  { value: "recent", label: "Recently Added" },
  { value: "media", label: "Most Media" },
];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = OPTIONS.find((o) => o.value === value) || OPTIONS[0];

  return (
    <div className="sort-dropdown" ref={ref}>
      <button
        type="button"
        className="sort-dropdown-trigger"
        onClick={() => setOpen(!open)}
        data-cursor="button"
        aria-expanded={open}
      >
        <span>{selected.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <Icon name="chevronDown" size={12} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="sort-dropdown-menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className={`sort-dropdown-item ${value === opt.value ? "active" : ""}`}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  {value === opt.value && <Icon name="check" size={12} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
