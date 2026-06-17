import Masonry from "react-masonry-css";
import Icon from "../common/Icon";
import VideoCard from "./VideoCard";

export default function ReelsGallery({ items, onItemClick }) {
  const breakpoints = {
    default: 4,
    1280: 3,
    768: 2,
    480: 1,
  };

  if (!items.length) {
    return (
      <div className="empty-state glass-panel">
        <Icon name="film" className="empty-icon" size={40} />
        <p>No reels found for this selection.</p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="reels-grid"
      columnClassName="masonry-column"
    >
      {items.map((item, index) => (
        <VideoCard key={item.id} item={item} index={index} onClick={onItemClick} />
      ))}
    </Masonry>
  );
}
