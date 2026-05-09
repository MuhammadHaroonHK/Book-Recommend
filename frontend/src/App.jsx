import { useState } from "react";
import axios from "axios";

function App() {

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {

    if (!search) return;

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/recommend/${search}`
      );

      setBooks(response.data.recommendations);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-800">

        <h1 className="text-3xl font-bold text-yellow-400">
          BookAI
        </h1>

      </nav>

      {/* Hero */}
      <div className="text-center py-20">

        <h1 className="text-6xl font-bold">
          AI Book Recommendation
        </h1>

        <p className="text-gray-400 mt-5">
          Discover similar books using Machine Learning
        </p>

        {/* Search */}
        <div className="flex justify-center mt-10">

          <input
            type="text"
            placeholder="Enter Book Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[500px] px-5 py-4 rounded-l-lg outline-none text-black"
          />

          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-black px-8 rounded-r-lg font-bold"
          >
            Search
          </button>

        </div>

      </div>

      {/* Recommendations */}
      <div className="px-10 pb-20">

        <h2 className="text-3xl font-bold mb-10">
          Recommended Books
        </h2>

        <div className="grid grid-cols-5 gap-6">

          {books.map((book, index) => (

            <div
              key={index}
              className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition"
            >

              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[300px] object-cover"
              />

              <div className="p-4">

                <h3 className="font-bold">
                  {book.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  {book.author}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default App;