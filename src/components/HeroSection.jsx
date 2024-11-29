import React, { useEffect, useState } from "react";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";
import Typewriter from 'typewriter-effect';



function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`flex flex-col lg:flex-row items-center justify-between  px-10 py-20 space-y-10 lg:space-y-0 ${isVisible ? 'fade-in' : 'hidden'}`}>
      {/* Left Side */}
      <div className="space-y-6 text-center lg:text-left">
        <p className="text-xl lg:text-2xl">Hello Everyone! 👋</p>
        <h1 className="text-5xl lg:text-8xl max-w-xl font-extrabold">
          <Typewriter
            options={{
              strings: ['DIGITMA <span style="color: #F97316;">SHOWCASE</span>'],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }}
          />
        </h1>
        <p className="text-gray-300 max-w-3xl text-lg lg:text-xl">
        Digitma Infologics, a premier digital marketing agency in Dehradun, specializes in tailored SEO, innovative social media marketing, and comprehensive web development solutions. Our unwavering commitment is to elevate online visibility and drive transformative growth for our valued clients.
        </p>
        <a href="https://digitma.org/" target="_blank"  >
        <button className="bg-orange-500 text-white mt-5 px-8 py-2 rounded-full text-lg hover:bg-orange-600 transition duration-300 ease-in-out">
          Hire Us Now!
        </button></a>

        {/* Social Links */}
        <SocialLinks className="flex justify-center" />
      </div>

      {/* Right Side */}
      <div>
        <Link to="/gallery" >
        <div className="border p-2 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <img src="/image.png" alt="Gallery" className="w-full h-auto" style={{ width: '370px', height: '200px' }} /></div>
          <h3 className="text-xl mt-2 font-bold text-center mb-6">Artwork</h3>
        </Link>
        <Link to="/videos" >
        <div className="border p-2 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <img src="/video.png" alt="Videos" className="w-full h-auto" style={{ width: '370px', height: '200px' }} /> </div>
          <h3 className="text-xl mt-2 font-bold text-center">Video Reels</h3>
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
