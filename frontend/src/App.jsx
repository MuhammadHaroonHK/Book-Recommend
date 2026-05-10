import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import TopRated from "./pages/TopRated";
import { useState } from "react";

function App() {

  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>

      <div className="bg-white dark:bg-black min-h-screen text-black dark:text-white transition duration-300">

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/top-rated" element={<TopRated />} />

        </Routes>

        <Footer />

      </div>

    </div>
  )
}

export default App