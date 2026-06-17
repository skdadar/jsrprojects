import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ClientTabs({ clients, active, onChange }) {
  const scrollRef = useRef(null);

  const tabs = [{ id: "all", name: "All" }, ...clients];

  useEffect(() => {
    if (!scrollRef.current || active === "all") return;
    const btn = scrollRef.current.querySelector(`[data-tab-id="${active}"]`);
    btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <div className="client-tabs-wrapper">
      <div className="client-tabs-scroll" ref={scrollRef}>
        {tabs.map((client) => (
          <button
            key={client.id}
            data-tab-id={client.id}
            className={`client-tab ${active === client.id ? "active" : ""}`}
            onClick={() => onChange(client.id)}
            data-cursor="button"
          >
            {active === client.id && (
              <motion.span
                className="client-tab-indicator"
                layoutId="clientTabIndicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span>{client.name}</span>
            {client.id !== "all" && (
              <span className="client-tab-count">
                {(client.imageCount || 0) + (client.videoCount || 0)}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="client-tabs-line">
        <motion.div
          className="client-tabs-line-fill"
          animate={{ width: active === "all" ? "15%" : "60%" }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
