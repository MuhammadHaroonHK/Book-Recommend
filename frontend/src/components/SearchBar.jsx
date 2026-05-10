import { useState } from "react";

function SearchBar({
  search,
  setSearch,
  suggestions,
  handleSearch
}) {

  const [showSuggestions, setShowSuggestions] = useState(false);

  // =========================
  // SEARCH BUTTON
  // =========================

  const onSearch = () => {

    handleSearch();

    // Hide suggestions
    setShowSuggestions(false);
  };

  // =========================
  // ENTER KEY SEARCH
  // =========================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleSearch();

      // Hide suggestions
      setShowSuggestions(false);
    }
  };

  return (

    <div className="relative max-w-2xl mx-auto">

      {/* Search Input */}
      <div className="flex">

        <input
          type="text"
          value={search}
          onChange={(e) => {

            setSearch(e.target.value);

            setShowSuggestions(true);
          }}

          onKeyDown={handleKeyDown}

          placeholder="Search books..."
          className="w-full px-5 py-4 rounded-l-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none"
        />

        <button
          onClick={onSearch}
          className="bg-yellow-500 px-8 rounded-r-xl font-bold text-black"
        >
          Search
        </button>

      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (

        <div className="absolute w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl mt-2 max-h-60 overflow-y-auto z-50 shadow-lg">

          {suggestions.map((item, index) => (

            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"

              onClick={() => {

                setSearch(item);

                setShowSuggestions(false);

                handleSearch();
              }}
            >
              {item}
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default SearchBar;