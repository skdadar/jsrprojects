import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./common/Icon";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home", icon: "home" },
    { to: "/portfolio?view=client", label: "Clients", icon: "users" },
    { to: "/portfolio?view=category", label: "Categories", icon: "briefcase" },
  ];

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-meta">METASOFT</span>
          <span className="logo-innotech">INNOTECH</span>
        </Link>

        <nav className="header-nav desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`header-nav-link ${location.pathname + location.search === link.to || (link.to === "/" && location.pathname === "/") ? "active" : ""}`}
            >
              <Icon name={link.icon} size={14} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href="https://digitma.org/"
            target="_blank"
            rel="noreferrer"
            className="header-cta"
          >
            <Icon name="envelope" size={14} />
            <span>Let's Talk</span>
          </a>

          <button
            className="header-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name="bars" size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="mobile-nav-link">
                <Icon name={link.icon} size={16} />
                <span>{link.label}</span>
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
