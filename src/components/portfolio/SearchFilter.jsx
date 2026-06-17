import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import Icon from "../common/Icon";
import SortDropdown from "./SortDropdown";

export default function SearchFilter({ searchQuery, setSearchQuery, sortBy, setSortBy, viewMode }) {
  const { theme, toggleTheme } = useTheme();
  const placeholder = viewMode === "category" ? "Search categories..." : "Search clients...";

  return (
    <div className="search-filter glass-panel">
      <div className="search-input-wrapper">
        <Icon name="search" className="search-icon" size={14} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          data-cursor="text"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => setSearchQuery("")}
            data-cursor="button"
            aria-label="Clear search"
          >
            <Icon name="times" size={14} />
          </button>
        )}
      </div>

      <SortDropdown value={sortBy} onChange={setSortBy} />

      <motion.button
        className="theme-toggle glass-btn"
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="button"
        aria-label="Toggle theme"
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
      </motion.button>
    </div>
  );
}
