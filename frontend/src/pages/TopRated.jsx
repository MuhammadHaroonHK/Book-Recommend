import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

function TopRated() {

  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const response = await axios.get(
          `http://127.0.0.1:8000/top-rated`
        )

        setBooks(response.data.books)

      } catch (error) {

        console.log(error)

      }
    }

    fetchBooks()

  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-4xl font-bold mb-10">
        Top Rated Books
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

      <BookModal
        selectedBook={selectedBook}
        closeModal={() => setSelectedBook(null)}
      />

    </div>
  )
}

export default TopRated