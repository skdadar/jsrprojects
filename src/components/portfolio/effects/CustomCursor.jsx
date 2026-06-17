import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const location = useLocation();
  const isPortfolio = location.pathname === "/portfolio";
  const [enabled, setEnabled] = useState(false);
  const [hoverMode, setHoverMode] = useState("default");
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 28, stiffness: 350, mass: 0.4 });
  const y = useSpring(rawY, { damping: 28, stiffness: 350, mass: 0.4 });
  const trailX = useSpring(rawX, { damping: 22, stiffness: 180, mass: 0.6 });
  const trailY = useSpring(rawY, { damping: 22, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const shouldEnable = isPortfolio && !isTouch;
    setEnabled(shouldEnable);

    if (!shouldEnable) {
      document.body.classList.remove("custom-cursor-on");
      return;
    }

    document.body.classList.add("custom-cursor-on");

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      setHoverMode(target ? target.getAttribute("data-cursor") || "default" : "default");
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("custom-cursor-on");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isPortfolio, rawX, rawY]);

  if (!enabled) return null;

  const scale = clicking ? 0.85 : hoverMode !== "default" ? 1.6 : 1;

  return (
    <>
      <motion.div
        className={`custom-cursor-trail cursor-${hoverMode}`}
        style={{ x: trailX, y: trailY, scale }}
        animate={{ opacity: visible ? 0.35 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={`custom-cursor cursor-${hoverMode}`}
        style={{ x, y, scale }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
