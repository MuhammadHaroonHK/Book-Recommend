function BookModal({ selectedBook, closeModal }) {

  if (!selectedBook) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">

      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full p-6 relative">

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6">

          <img
            src={selectedBook.image}
            alt={selectedBook.title}
            className="w-full rounded-xl"
          />

          <div>

            <h1 className="text-3xl font-bold">
              {selectedBook.title}
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              {selectedBook.author}
            </p>

            <p className="mt-6 leading-7 text-gray-600 dark:text-gray-300">
              This book is recommended by our AI recommendation engine based on user similarity and collaborative filtering.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default BookModal