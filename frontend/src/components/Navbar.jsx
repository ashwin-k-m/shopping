import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FiPlusSquare } from "react-icons/fi"; // Using react-icons instead of Chakra

const Navbar = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-16 flex items-center justify-between flex-col sm:flex-row">
        <Link 
          to="/" 
          className="text-center uppercase font-bold text-2xl sm:text-3xl bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          Product Store 🛒
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/create">
            <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <FiPlusSquare className="text-xl" /> {/* Replaced with react-icons */}
            </button>
          </Link>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {document.documentElement.classList.contains('dark') ? (
              <LuSun className="text-xl" />
            ) : (
              <IoMoon className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;