import { useCallback, useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function PremiumLightbox({ items, open, index, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  const slides = items.map((item) => ({
    src: item.src,
    alt: "",
  }));

  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={currentIndex}
      slides={slides}
      plugins={[Zoom, Fullscreen, Thumbnails]}
      zoom={{ maxZoomPixelRatio: 3 }}
      carousel={{ finite: false }}
      animation={{ fade: 400, swipe: 500 }}
      on={{ view: ({ index: i }) => setCurrentIndex(i) }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
      }}
    />
  );
}
