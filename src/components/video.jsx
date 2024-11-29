import React, { useState } from "react";

const categories = [
  "All",
  "Apparel",
  "Ayurveda",
  "Cosmetics",
  "Education",
  "Fashion",
  "Home Decor",
  "Jewellery",
   "Vehicle",
  "Medical",
  "Men's Fashion",
  "Solar Energy",
  "Travel & Tourism",
 "Astroglogy",  
 "Restaurant",
].sort();

const videos = {
  All: [
    { src: "/Fashion/Video/1.mp4", title: "1" },
    { src: "/Fashion/Video/2.mp4", title: "1" },
    { src: "/Fashion/Video/3.mp4", title: "1" },
    { src: "/Fashion/Video/4.mp4", title: "1" },
    { src: "/Fashion/Video/5.mp4", title: "1" },
    { src: "/Fashion/Video/6.mp4", title: "1" },
    { src: "/Fashion/Video/7.mp4", title: "1" },
    { src: "/Fashion/Video/8.mp4", title: "1" },
    { src: "/Fashion/Video/9.mp4", title: "1" },
    { src: "/Home Decor/Video/2.mp4", title: "1" },
    { src: "/Jewellery/Video/1.mp4", title: "1" },

    { src: "/Cosmetics/Video/11.mp4", title: "1" },
    { src: "/Vehicle/Video/4.mp4", title: "1" },

    { src: "/Cosmetics/Video/12.mp4", title: "1" },
    { src: "/Cosmetics/Video/13.mp4", title: "1" },
    { src: "/Education/Video/11.mp4", title: "1" },
    { src: "/Education/Video/13.mp4", title: "1" },
    { src: "/Education/Video/14.mp4", title: "1" },
    { src: "/Restaurant/Video/8.mp4", title: "1" },
    { src: "/Astroglogy/Video/Astropandit V (1).mp4", title: "1" },
    { src: "/Ayurveda/Video/233.mp4", title: "1" },
    { src: "/Restaurant/Video/7.mp4", title: "1" },

    { src: "/Restaurant/Video/1.mp4", title: "1" },
    { src: "/Restaurant/Video/2.mp4", title: "1" },
    { src: "/Restaurant/Video/3.mp4", title: "1" },
    { src: "/Restaurant/Video/4.mp4", title: "1" },
    { src: "/Restaurant/Video/5.mp4", title: "1" },
    { src: "/Restaurant/Video/6.mp4", title: "1" },
    { src: "/Home Decor/Video/1.mp4", title: "1" },

    { src: "/Education/Video/12.mp4", title: "1" },
    { src: "/Medical/Video/1.mp4", title: "1" },
    { src: "/Medical/Video/2.mp4", title: "1" },
    { src: "/Medical/Video/3.mp4", title: "1" },
    { src: "/Medical/Video/4.mp4", title: "1" },
    { src: "/Ayurveda/Video/234.mp4", title: "1" },
    { src: "/Ayurveda/Video/232.mp4", title: "1" },
    { src: "/Solar Energy/Video/1.mp4", title: "1" },
    { src: "/Solar Energy/Video/2.mp4", title: "1" },

  ],
  "Home Decor":[
    { src: "/Home Decor/Video/2.mp4", title: "1" },
    { src: "/Home Decor/Video/1.mp4", title: "1" },



  ],
  "Solar Energy":[
    { src: "/Solar Energy/Video/1.mp4", title: "1" },
    { src: "/Solar Energy/Video/2.mp4", title: "1" },


  ],
  Vehicle:[
    { src: "/Vehicle/Video/4.mp4", title: "1" },
    { src: "/Vehicle/Video/5.mp4", title: "1" },

    { src: "/Vehicle/Video/6.mp4", title: "1" },
    { src: "/Vehicle/Video/3.mp4", title: "1" },

    { src: "/Vehicle/Video/1.mp4", title: "1" },
    { src: "/Vehicle/Video/2.mp4", title: "1" },



  ],
  Restaurant:[
    { src: "/Restaurant/Video/8.mp4", title: "1" },
    { src: "/Restaurant/Video/7.mp4", title: "1" },
    { src: "/Restaurant/Video/1.mp4", title: "1" },
    { src: "/Restaurant/Video/2.mp4", title: "1" },
    { src: "/Restaurant/Video/3.mp4", title: "1" },
    { src: "/Restaurant/Video/4.mp4", title: "1" },
    { src: "/Restaurant/Video/5.mp4", title: "1" },
    { src: "/Restaurant/Video/6.mp4", title: "1" },


  ],
  Jewellery:[
    { src: "/Jewellery/Video/1.mp4", title: "1" },
  ],
  Fashion:[
    { src: "/Fashion/Video/1.mp4", title: "1" },
    { src: "/Fashion/Video/2.mp4", title: "1" },
    { src: "/Fashion/Video/3.mp4", title: "1" },
    { src: "/Fashion/Video/4.mp4", title: "1" },
    { src: "/Fashion/Video/5.mp4", title: "1" },
    { src: "/Fashion/Video/6.mp4", title: "1" },
    { src: "/Fashion/Video/7.mp4", title: "1" },
    { src: "/Fashion/Video/8.mp4", title: "1" },
    { src: "/Fashion/Video/9.mp4", title: "1" },


  ],
  Medical:[
    { src: "/Medical/Video/1.mp4", title: "1" },
    { src: "/Medical/Video/2.mp4", title: "1" },
    { src: "/Medical/Video/3.mp4", title: "1" },
    { src: "/Medical/Video/4.mp4", title: "1" },


  ],
  Education:[
    { src: "/Education/Video/11.mp4", title: "1" },
    { src: "/Education/Video/13.mp4", title: "1" },
    { src: "/Education/Video/14.mp4", title: "1" },
    { src: "/Education/Video/12.mp4", title: "1" },


  ],
  Astroglogy: [
    { src: "/Astroglogy/Video/Astropandit V (1).mp4", title: "1" },
  ],
  Cosmetics: [
    { src: "/Cosmetics/Video/11.mp4", title: "1" },
    { src: "/Cosmetics/Video/12.mp4", title: "1" },
    { src: "/Cosmetics/Video/13.mp4", title: "1" },

  ],
  Ayurveda: [
    { src: "/Ayurveda/Video/233.mp4", title: "1" },
    { src: "/Ayurveda/Video/234.mp4", title: "1" },
    { src: "/Ayurveda/Video/232.mp4", title: "1" },
   

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {videos[activeCategory] && videos[activeCategory].length > 0 ? (
          videos[activeCategory].map((video, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-2 hover:scale-105 transform transition duration-300 cursor-pointer aspect-video"
              onClick={() => openModal(index)}
            >
              <video
                src={video.src}
                controls={false}
                muted
                className="w-full h-object object-cover"
              />
              {/* <div className="mt-2 text-center font-semibold">{video.title}</div> */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-gray-500">
            Videos for this category are not available at this moment.
          </div>
        )}
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
