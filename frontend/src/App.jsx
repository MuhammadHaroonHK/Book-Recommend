function App() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-yellow-400">
          BookAI
        </h1>

        <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-20 px-5">

        <h1 className="text-6xl font-bold leading-tight">
          Discover Your <br />
          Next Favorite Book
        </h1>

        <p className="text-gray-400 mt-6 text-lg">
          AI-powered book recommendations using Machine Learning
        </p>

        {/* Search */}
        <div className="mt-10 flex justify-center">

          <input
            type="text"
            placeholder="Search books..."
            className="w-[500px] px-5 py-4 rounded-l-lg outline-none text-black text-lg"
          />

          <button className="bg-yellow-400 text-black px-8 rounded-r-lg font-semibold hover:bg-yellow-300 transition">
            Search
          </button>

        </div>

      </div>

      {/* Top Books */}
      <div className="px-10 pb-20">

        <h2 className="text-3xl font-bold mb-10">
          Trending Books
        </h2>

        <div className="grid grid-cols-5 gap-6">

          {[1,2,3,4,5,6,7,8,9,10].map((book) => (

            <div
              key={book}
              className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition duration-300"
            >

              <img
                src="https://via.placeholder.com/200x300"
                alt="book"
                className="w-full h-[300px] object-cover"
              />

              <div className="p-4">

                <h3 className="font-bold text-lg">
                  Book Title
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Author Name
                </p>

                <div className="flex items-center justify-between mt-4">

                  <span className="text-yellow-400">
                    ⭐ 4.8
                  </span>

                  <button className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-300">
                    View
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default App