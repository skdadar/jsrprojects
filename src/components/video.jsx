import React, { useState } from "react";

const categories = ["All", "Travel & Tourism", "Fashion", "Cosmetics", "Ayurveda", "Men's Fashion"];

const videos = {
  All: [
    { src: "/Videos/travel1.mp4", title: "Travel Adventure" },
    { src: "/Videos/fashion1.mp4", title: "Fashion Show" },
    { src: "/Videos/tutorial1.mp4", title: "React Tutorial" },
    { src: "/Videos/event1.mp4", title: "Event Highlights" },
  ],
  "Travel & Tourism": [
    { src: "/Videos/travel1.mp4", title: "Travel Adventure" },
    { src: "/Videos/travel2.mp4", title: "Mountain Expedition" },
  ],
  Fashion: [
    { src: "/Videos/fashion1.mp4", title: "Fashion Show" },
    { src: "/Videos/fashion2.mp4", title: "Summer Collection" },
  ],
  Cosmetics: [
    { src: "/Videos/tutorial1.mp4", title: "React Tutorial" },
    { src: "/Videos/tutorial2.mp4", title: "CSS Basics" },
  ],
  Ayurveda: [
    { src: "/Videos/event1.mp4", title: "Event Highlights" },
    { src: "/Videos/event2.mp4", title: "Concert Night" },
  ],
  "Men's Fashion" : [
    { src: "/Videos/event1.mp4", title: "Event Highlights" },
    { src: "/Videos/event2.mp4", title: "Concert Night" },
  ],
};

function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    const categoryVideos = videos[activeCategory];
    setCurrentIndex((currentIndex + 1) % categoryVideos.length);
  };

  const handlePrev = () => {
    const categoryVideos = videos[activeCategory];
    setCurrentIndex((currentIndex - 1 + categoryVideos.length) % categoryVideos.length);
  };

  return (
    <div className="flex flex-col px-10 py-2">
      {/* Categories Bar */}
      <div className="flex overflow-x-auto space-x-4 mb-6 md:mb-8 lg:mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className={`text-base md:text-lg font-semibold px-4 py-2 rounded-full ${
              activeCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-black"
            } hover:bg-orange-400 transition duration-300 whitespace-nowrap`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos[activeCategory].map((video, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-2 hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <video
              src={video.src}
              className="w-full h-58 object-cover rounded-md"
              controls={false}
              muted
            />
            <div className="mt-2 text-center font-semibold">{video.title}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-full max-h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videos[activeCategory][currentIndex].src}
              controls
              autoPlay
              className="max-w-full max-h-[80vh] object-contain rounded-md"
            />
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-orange-600 text-white rounded-full px-3 py-1"
              onClick={handlePrev}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-orange-600 text-white rounded-full px-3 py-1"
              onClick={handleNext}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <button
              className="absolute top-1 right-1 bg-orange-600 text-white rounded-full px-3 py-1.5"
              onClick={closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoGallery;
