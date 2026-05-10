import { motion } from "framer-motion";

function BookCard({ book, openModal }) {

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
      onClick={() => openModal(book)}
    >

      <img
        src={book.image}
        alt={book.title}
        className="w-full h-[320px] object-cover"
      />

      <div className="p-4">

        <h2 className="font-bold text-lg line-clamp-2">
          {book.title}
        </h2>

        <p className="text-gray-500 mt-2">
          {book.author}
        </p>

      </div>

    </motion.div>
  )
}

export default BookCard