import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroTitle from "./HeroTitle";
import SocialLinks from "./SocialLinks";
import Icon from "./common/Icon";
import HeroBackground from "./HeroBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function HeroSection() {
  const [stats, setStats] = useState({ clients: 0, categories: 0, images: 0, videos: 0 });

  useEffect(() => {
    fetch("/portfolio-manifest.json")
      .then((r) => r.json())
      .then((d) =>
        setStats({
          clients: d.stats?.totalClients || 0,
          categories: d.stats?.totalCategories || 0,
          images: d.stats?.totalImages || 0,
          videos: d.stats?.totalVideos || 0,
        })
      )
      .catch(() => {});
  }, []);

  return (
    <section className="hero-section">
      <HeroBackground />

      <div className="hero-grid">
        <div className="hero-content">
          <motion.div className="hero-badge" custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <span className="hero-badge-dot" />
            Digital Marketing Agency · Dehradun
          </motion.div>

          <motion.p className="hero-greeting" custom={1} initial="hidden" animate="visible" variants={fadeUp}>
            Hello Everyone! <span className="wave">👋</span>
          </motion.p>

          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
            <HeroTitle />
          </motion.div>

          <motion.p className="hero-desc" custom={3} initial="hidden" animate="visible" variants={fadeUp}>
            We craft bold digital experiences — from SEO and social media to stunning
            creative portfolios that make brands unforgettable.
          </motion.p>

          <motion.div className="hero-stats" custom={4} initial="hidden" animate="visible" variants={fadeUp}>
            <div className="hero-stat">
              <strong>{stats.clients}</strong>
              <span>Clients</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>{stats.categories}</strong>
              <span>Categories</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>{stats.images}</strong>
              <span>Images</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>{stats.videos}</strong>
              <span>Reels</span>
            </div>
          </motion.div>

          <motion.div className="hero-cta-row" custom={5} initial="hidden" animate="visible" variants={fadeUp}>
            <a href="https://digitma.org/" target="_blank" rel="noreferrer" className="hero-btn primary">
              Hire Us Now
            </a>
            <Link to="/portfolio" className="hero-btn secondary">
              View Portfolio
            </Link>
          </motion.div>

          <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
            <SocialLinks className="hero-social" />
          </motion.div>
        </div>

        <motion.div
          className="hero-cards"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link to="/portfolio?view=client" className="hero-card hero-card-images">
            <div className="hero-card-shine" />
            <div className="hero-card-icon">
              <Icon name="images" size={28} />
            </div>
            <div className="hero-card-body">
              <h3>Client Portfolio</h3>
              <p>Browse all client work — images & reels organized by brand</p>
            </div>
            <Icon name="arrowRight" className="hero-card-arrow" size={16} />
          </Link>

          <Link to="/portfolio?view=category" className="hero-card hero-card-videos">
            <div className="hero-card-shine" />
            <div className="hero-card-icon">
              <Icon name="briefcase" size={28} />
            </div>
            <div className="hero-card-body">
              <h3>Category Portfolio</h3>
              <p>Fashion, Medical, Education & more — industry-wise showcase</p>
            </div>
            <Icon name="arrowRight" className="hero-card-arrow" size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
