import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="px-4 py-4 sm:px-8 sm:py-6">
    <header className="flex flex-wrap justify-between items-center px-4 py-2 bg-white rounded-full animate-fade-in shadow-md">
        {/* Logo Section */}
        <div className="text-xl sm:text-3xl font-bold text-gray-800">
        <Link to={'/'}> <span className="text-orange-500">DIGITMA</span></Link>
        </div>

        {/* Button Section */}
        <button className=" sm:mt-0 bg-orange-500 px-6 py-2 sm:px-12 sm:py-4 rounded-full text-sm sm:text-md text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-600">
          Let's Talk!
        </button>
      </header>
    </div>
  );
}

export default Header;
