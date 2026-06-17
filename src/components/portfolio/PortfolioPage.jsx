import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../../contexts/PortfolioContext";
import { useLenis } from "../../hooks/useLenis";
import { useGsapReveal, useMouseParallax } from "../../hooks/useGsapAnimations";
import Icon from "../common/Icon";
import AuroraBackground from "./effects/AuroraBackground";
import FloatingParticles from "./effects/FloatingParticles";
import LoadingScreen from "./effects/LoadingScreen";
import ScrollProgress from "./effects/ScrollProgress";
import BackToTop from "./effects/BackToTop";
import ViewModeTabs from "./ViewModeTabs";
import MainTabs from "./MainTabs";
import ClientTabs from "./ClientTabs";
import SearchFilter from "./SearchFilter";
import StatsDashboard from "./StatsDashboard";
import FeaturedSection from "./FeaturedSection";
import RecentlyAdded from "./RecentlyAdded";
import PortfolioGallery from "./PortfolioGallery";

export default function PortfolioPage() {
  const {
    loading,
    error,
    activeList,
    viewStats,
    mainTab,
    setMainTab,
    viewMode,
    setViewMode,
    activeItem,
    setActiveItem,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    featuredItems,
    recentItems,
    getMedia,
    reload,
  } = usePortfolio();

  const galleryRef = useRef(null);

  useLenis(!loading);
  useMouseParallax();
  const containerRef = useGsapReveal(".gsap-reveal");

  const scrollToGallery = useCallback((id) => {
    setActiveItem(id);
    requestAnimationFrame(() => {
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    });
  }, [setActiveItem]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "1") setMainTab("images");
      if (e.key === "2") setMainTab("reels");
      if (e.key === "/" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        document.querySelector(".search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setMainTab]);

  const mediaType = mainTab === "images" ? "images" : "videos";
  const currentMedia = getMedia(activeItem, mediaType);

  return (
    <div className="portfolio-page" ref={containerRef}>
      <AuroraBackground />
      <FloatingParticles count={25} />
      <ScrollProgress />
      <AnimatePresence>{loading && <LoadingScreen loading />}</AnimatePresence>

      <div className="portfolio-container">
        <motion.header
          className="portfolio-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="portfolio-title">
            Our <span className="title-accent">Portfolio</span>
          </h1>
          <p className="portfolio-subtitle">
            Where creativity meets strategy — explore stunning visuals and reels
            crafted for brands across every industry.
          </p>
        </motion.header>

        {error ? (
          <div className="error-state glass-panel">
            <Icon name="warning" size={32} />
            <p>{error}</p>
            <button className="glass-btn" onClick={reload} data-cursor="button">
              Retry
            </button>
          </div>
        ) : (
          <>
            <StatsDashboard viewStats={viewStats} viewMode={viewMode} />

            <ViewModeTabs active={viewMode} onChange={setViewMode} />

            <FeaturedSection
              clients={featuredItems}
              onSelect={scrollToGallery}
              label={viewMode === "category" ? "Featured Categories" : "Featured Projects"}
            />

            <RecentlyAdded clients={recentItems} onSelect={scrollToGallery} />

            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
            />

            <div className="portfolio-gallery-section" ref={galleryRef}>
              <MainTabs active={mainTab} onChange={setMainTab} />

              <ClientTabs
                clients={activeList}
                active={activeItem}
                onChange={setActiveItem}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${mainTab}-${activeItem}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <PortfolioGallery type={mainTab} items={currentMedia} />
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <BackToTop />
    </div>
  );
}
