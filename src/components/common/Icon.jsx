import {
  FaSearch,
  FaTimes,
  FaSun,
  FaMoon,
  FaImages,
  FaFilm,
  FaPlay,
  FaExpandAlt,
  FaArrowUp,
  FaArrowRight,
  FaUsers,
  FaImage,
  FaVideo,
  FaExclamationTriangle,
  FaHome,
  FaBriefcase,
  FaEnvelope,
  FaBars,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

const icons = {
  search: FaSearch,
  times: FaTimes,
  sun: FaSun,
  moon: FaMoon,
  images: FaImages,
  film: FaFilm,
  play: FaPlay,
  expand: FaExpandAlt,
  arrowUp: FaArrowUp,
  arrowRight: FaArrowRight,
  users: FaUsers,
  image: FaImage,
  video: FaVideo,
  warning: FaExclamationTriangle,
  home: FaHome,
  briefcase: FaBriefcase,
  envelope: FaEnvelope,
  bars: FaBars,
  chevronDown: FaChevronDown,
  check: FaCheck,
};

export default function Icon({ name, className = "", size = 16 }) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component className={className} size={size} aria-hidden="true" />;
}
