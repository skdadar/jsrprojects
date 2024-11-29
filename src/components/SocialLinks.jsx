import React from "react";

const SocialLinks = () => {
  const links = [
  
    { href: "https://wa.link/ubdqgt", icon: "fab fa-whatsapp", name: "Whatsapp" },
    { href: "https://www.instagram.com/digitma_india/", icon: "fab fa-instagram", name: "Instagram" },
    { href: "https://www.facebook.com/DigitmaInfologics", icon: "fab fa-facebook", name: "Facebook" },
    { href: "https://www.youtube.com/@digitmaedutech", icon: "fab fa-youtube", name: "Youtube" },
    { href: "https://digitma.org/", icon: "fa fa-globe", name: "Website" },


  ];

  return (
    <div className="flex justify-center lg:justify-start space-x-6 mt-6">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 text-xl hover:text-orange-500 transition-colors"
          aria-label={link.name}
        >
          <i className={`${link.icon} text-4xl`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
