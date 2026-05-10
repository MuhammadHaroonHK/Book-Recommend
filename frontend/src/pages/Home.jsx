import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";
import SkeletonCard from "../components/SkeletonCard";

function Home() {

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {

    if (!search) return;

    try {

      setLoading(true);

      const response = await axios.get(
        `http://127.0.0.1:8000/recommend/${search}`
      )

      setBooks(response.data.recommendations)

      setLoading(false)

    } catch (error) {

      console.log(error)
      setLoading(false)

    }
  }

  useEffect(() => {

    const fetchSuggestions = async () => {

      if (search.length < 2) {
        setSuggestions([])
        return
      }

      try {

        const response = await axios.get(
          `http://127.0.0.1:8000/search/${search}`
        )

        setSuggestions(response.data.suggestions)

      } catch (error) {

        console.log(error)

      }
    }

    fetchSuggestions()
    }, [search])

  return (
    <div>

      <div className="text-center py-20 px-6">

        <h1 className="text-6xl font-bold leading-tight">
          Discover Your Next Favorite Book
        </h1>

        <p className="text-gray-500 mt-6 text-xl">
          AI Powered Book Recommendation System
        </p>

        <div className="mt-10">

          <SearchBar
            search={search}
            setSearch={setSearch}
            suggestions={suggestions}
            handleSearch={handleSearch}
          />

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">

        <h1 className="text-3xl font-bold mb-10">
          Recommended Books
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {loading
            ? [...Array(10)].map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : books.map((book, index) => (
                <BookCard
                  key={index}
                  book={book}
                  openModal={setSelectedBook}
                />
              ))}

        </div>

      </div>

      <BookModal
        selectedBook={selectedBook}
        closeModal={() => setSelectedBook(null)}
      />

    </div>
  )
}

export default Home