import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Gallery from "./components/Gallery"; // Import the Gallery page
import VideoGallery from "./components/video";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<VideoGallery/>}/>
      </Routes>
    </div>
  );
}

export default App;
