import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to="/" className="text-3xl font-bold text-yellow-500">
          BookAI
        </Link>

        <div className="flex items-center gap-6 text-lg font-medium">

          <Link to="/" className="hover:text-yellow-500 transition">
            Home
          </Link>

          <Link to="/explore" className="hover:text-yellow-500 transition">
            Explore Books
          </Link>

          <Link to="/top-rated" className="hover:text-yellow-500 transition">
            Top Rated
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl hover:text-yellow-500"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

        </div>

      </div>

    </nav>
  )
}

export default Navbar