import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

function Explore() {

  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const response = await axios.get(
          `http://127.0.0.1:8000/books?page=${page}`
        )

        setBooks(response.data.books)

      } catch (error) {

        console.log(error)

      }
    }

    fetchBooks()

  }, [page])

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-10">
        Explore Books
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {books.map((book, index) => (

          <BookCard
            key={index}
            book={book}
            openModal={setSelectedBook}
          />

        ))}

      </div>

      <div className="flex justify-center gap-4 mt-16">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-yellow-500 px-6 py-3 rounded-xl font-bold text-black disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          className="bg-yellow-500 px-6 py-3 rounded-xl font-bold text-black"
        >
          Next
        </button>

      </div>

      <BookModal
        selectedBook={selectedBook}
        closeModal={() => setSelectedBook(null)}
      />

    </div>
  )
}
export default Explore