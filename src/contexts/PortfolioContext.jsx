import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterClients, sortClients } from "../utils/clientOrder";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainTab, setMainTab] = useState("images");
  const [viewMode, setViewModeState] = useState(() => searchParams.get("view") || "client");
  const [activeItem, setActiveItem] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("serial");

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "category" || view === "client") {
      setViewModeState(view);
    }
  }, [searchParams]);

  const setViewMode = useCallback(
    (mode) => {
      setViewModeState(mode);
      setActiveItem("all");
      setSearchParams({ view: mode });
    },
    [setSearchParams]
  );

  const loadManifest = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setLoading(true);
      setError(null);
    }
    try {
      const res = await fetch(`/portfolio-manifest.json?t=${Date.now()}`);
      if (!res.ok) throw new Error("Portfolio manifest not found. Run: npm run generate-portfolio");
      const data = await res.json();
      setManifest(data);
    } catch (err) {
      if (!silent) setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadManifest();
  }, [loadManifest]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return undefined;

    const pollManifest = async () => {
      try {
        const res = await fetch(`/portfolio-manifest.json?t=${Date.now()}`);
        if (!res.ok) return;
        const data = await res.json();
        setManifest((prev) => {
          if (prev?.generatedAt === data.generatedAt) return prev;
          return data;
        });
      } catch {
        // ignore transient fetch errors during polling
      }
    };

    const intervalId = setInterval(pollManifest, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const clients = useMemo(() => {
    if (!manifest?.clients) return [];
    return sortClients(filterClients(manifest.clients, searchQuery), sortBy);
  }, [manifest, searchQuery, sortBy]);

  const categories = useMemo(() => {
    if (!manifest?.categories) return [];
    return sortClients(filterClients(manifest.categories, searchQuery), sortBy);
  }, [manifest, searchQuery, sortBy]);

  const activeList = viewMode === "category" ? categories : clients;

  const featuredItems = useMemo(
    () => activeList.filter((c) => c.featured).slice(0, 6),
    [activeList]
  );

  const recentItems = useMemo(
    () =>
      [...activeList]
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .slice(0, 6),
    [activeList]
  );

  const viewStats = useMemo(() => {
    const list = viewMode === "category" ? manifest?.categories : manifest?.clients;
    if (!list?.length) {
      return { count: 0, images: 0, videos: 0 };
    }
    return {
      count: list.length,
      images: list.reduce((s, c) => s + (c.imageCount || 0), 0),
      videos: list.reduce((s, c) => s + (c.videoCount || 0), 0),
    };
  }, [viewMode, manifest]);

  const stats = manifest?.stats || {
    totalClients: 0,
    totalCategories: 0,
    totalImages: 0,
    totalVideos: 0,
  };

  const getMedia = useCallback(
    (itemId, type) => {
      const mediaType = type === "images" ? "images" : "videos";
      if (itemId === "all") {
        return activeList.flatMap((c) => c[mediaType]);
      }
      const item = activeList.find((c) => c.id === itemId);
      if (!item) return [];
      return item[mediaType];
    },
    [activeList]
  );

  const value = {
    manifest,
    loading,
    error,
    clients,
    categories,
    activeList,
    stats,
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
    reload: loadManifest,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
