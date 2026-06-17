import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import CustomCursor from "./components/portfolio/effects/CustomCursor";
import "./index.css";
import "./styles/home.css";
import "./styles/portfolio.css";

const PortfolioPage = lazy(() => import("./components/portfolio/PortfolioPage"));

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 text-white app-shell">
          <CustomCursor />
          <Header />
          <Suspense fallback={<div className="loading-screen"><div className="loading-logo" /></div>}>
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/gallery" element={<Navigate to="/portfolio" replace />} />
              <Route path="/videos" element={<Navigate to="/portfolio" replace />} />
            </Routes>
          </Suspense>
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
