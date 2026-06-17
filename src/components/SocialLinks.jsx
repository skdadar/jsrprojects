import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaGlobe } from "react-icons/fa";

const links = [
  { href: "https://wa.link/ubdqgt", Icon: FaWhatsapp, name: "Whatsapp" },
  { href: "https://www.instagram.com/digitma_india/", Icon: FaInstagram, name: "Instagram" },
  { href: "https://www.facebook.com/DigitmaInfologics", Icon: FaFacebook, name: "Facebook" },
  { href: "https://www.youtube.com/@digitmaedutech", Icon: FaYoutube, name: "Youtube" },
  { href: "https://digitma.org/", Icon: FaGlobe, name: "Website" },
];

const SocialLinks = ({ className = "" }) => {
  return (
    <div className={`flex justify-center lg:justify-start space-x-6 mt-6 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-orange-500 transition-colors"
          aria-label={link.name}
        >
          <link.Icon size={36} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
