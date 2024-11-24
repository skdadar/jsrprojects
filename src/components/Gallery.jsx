import React, { useState } from "react";

const categories = ["All", "Travel & Tourism", "Fashion", "Cosmetics", "Ayurveda", "Men's Fashion"];

const images = {
  All: [
    { src: "/Ayurveda/a1.jpeg", title: "1" },
    { src: "/Ayurveda/a2.jpeg", title: "1" },
    { src: "/Ayurveda/a3.jpeg", title: "1" },
    { src: "/Ayurveda/a4.jpeg", title: "1" },
    { src: "/Ayurveda/a5.jpeg", title: "1" },
    { src: "/Ayurveda/a6.jpeg", title: "1" },
    { src: "/Ayurveda/a7.jpeg", title: "1" },
    { src: "/Cosmetics/c1.jpeg", title: "1" },
    { src: "/Cosmetics/c2.jpeg", title: "1" },
    { src: "/Cosmetics/c3.jpeg", title: "1" },
    { src: "/Cosmetics/c4.jpeg", title: "1" },
    { src: "/Cosmetics/c5.jpeg", title: "1" },
    { src: "/Cosmetics/c6.jpeg", title: "1" },
    { src: "/Cosmetics/c7.jpeg", title: "1" },
    { src: "/Cosmetics/c8.jpeg", title: "1" },
    { src: "/Cosmetics/c9.jpeg", title: "1" },
    { src: "/Cosmetics/c10.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f1.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f2.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f3.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f4.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f5.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f6.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f7.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f8.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f9.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f10.jpeg", title: "1" },
    { src: "/Travel & Tourism/t1.jpeg", title: "1" },
    { src: "/Travel & Tourism/t2.jpeg", title: "1" },
    { src: "/Travel & Tourism/t3.jpeg", title: "1" },
    { src: "/Travel & Tourism/t4.jpeg", title: "1" },
    { src: "/Travel & Tourism/t6.jpeg", title: "1" },
    { src: "/Travel & Tourism/t7.jpeg", title: "1" },
    { src: "/Travel & Tourism/t8.jpeg", title: "1" },
    { src: "/Travel & Tourism/t9.jpeg", title: "1" },
    { src: "/Men's Fashion/s1.jpeg", title: "1" },
    { src: "/Men's Fashion/s2.jpeg", title: "1" },
    { src: "/Men's Fashion/s3.jpeg", title: "1" },
    { src: "/Men's Fashion/s4.jpeg", title: "1" },
    { src: "/Men's Fashion/s5.jpeg", title: "1" },
    { src: "/Men's Fashion/s6.jpeg", title: "1" },
    { src: "/Men's Fashion/s7.jpeg", title: "1" },
    { src: "/Men's Fashion/s8.jpeg", title: "1" },
    { src: "/Men's Fashion/s9.jpeg", title: "1" },
    { src: "/Men's Fashion/s10.jpeg", title: "1" },

  ],
  "Travel & Tourism": [
    { src: "/Travel & Tourism/t1.jpeg", title: "1" },
    { src: "/Travel & Tourism/t2.jpeg", title: "1" },
    { src: "/Travel & Tourism/t3.jpeg", title: "1" },
    { src: "/Travel & Tourism/t4.jpeg", title: "1" },
    { src: "/Travel & Tourism/t6.jpeg", title: "1" },
    { src: "/Travel & Tourism/t7.jpeg", title: "1" },
    { src: "/Travel & Tourism/t8.jpeg", title: "1" },
    { src: "/Travel & Tourism/t9.jpeg", title: "1" },
  ],
  Fashion: [
    { src: "/Fashion/Artwork/f1.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f2.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f3.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f4.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f5.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f6.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f7.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f8.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f9.jpeg", title: "1" },
    { src: "/Fashion/Artwork/f10.jpeg", title: "1" },
  ],
  Cosmetics: [
    { src: "/Cosmetics/c1.jpeg", title: "1" },
    { src: "/Cosmetics/c2.jpeg", title: "1" },
    { src: "/Cosmetics/c3.jpeg", title: "1" },
    { src: "/Cosmetics/c4.jpeg", title: "1" },
    { src: "/Cosmetics/c5.jpeg", title: "1" },
    { src: "/Cosmetics/c6.jpeg", title: "1" },
    { src: "/Cosmetics/c7.jpeg", title: "1" },
    { src: "/Cosmetics/c8.jpeg", title: "1" },
    { src: "/Cosmetics/c9.jpeg", title: "1" },
    { src: "/Cosmetics/c10.jpeg", title: "1" },
  ],
  Ayurveda: [
    { src: "/Ayurveda/a1.jpeg", title: "1" },
    { src: "/Ayurveda/a2.jpeg", title: "1" },
    { src: "/Ayurveda/a3.jpeg", title: "1" },
    { src: "/Ayurveda/a4.jpeg", title: "1" },
    { src: "/Ayurveda/a5.jpeg", title: "1" },
    { src: "/Ayurveda/a6.jpeg", title: "1" },
    { src: "/Ayurveda/a7.jpeg", title: "1" },
  ],
  "Men's Fashion": [
    { src: "/Men's Fashion/s1.jpeg", title: "1" },
    { src: "/Men's Fashion/s2.jpeg", title: "1" },
    { src: "/Men's Fashion/s3.jpeg", title: "1" },
    { src: "/Men's Fashion/s4.jpeg", title: "1" },
    { src: "/Men's Fashion/s5.jpeg", title: "1" },
    { src: "/Men's Fashion/s6.jpeg", title: "1" },
    { src: "/Men's Fashion/s7.jpeg", title: "1" },
    { src: "/Men's Fashion/s8.jpeg", title: "1" },
    { src: "/Men's Fashion/s9.jpeg", title: "1" },
    { src: "/Men's Fashion/s10.jpeg", title: "1" },
  ],
};



function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open the modal and set the current image index
  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to the next image
  const handleNext = () => {
    const categoryImages = images[activeCategory];
    setCurrentIndex((currentIndex + 1) % categoryImages.length);
  };

  // Navigate to the previous image
  const handlePrev = () => {
    const categoryImages = images[activeCategory];
    setCurrentIndex((currentIndex - 1 + categoryImages.length) % categoryImages.length);
  };

  return (
    <div className="flex flex-col px-10 py-2">
      {/* Top - Categories as a horizontal bar */}
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

      {/* Right Side - Image Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images[activeCategory].map((image, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md p-2 hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-58 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Modal JSX */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-full max-h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image
          >
            <img
              src={images[activeCategory][currentIndex].src}
              alt={images[activeCategory][currentIndex].title}
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

export default Gallery;
