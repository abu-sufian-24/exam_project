import { useState, useMemo, useContext, useEffect } from "react";
import { debounce } from "lodash";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import { GetImages } from "../helpreFunction/GetImages";
import { BookData } from "../data/BookData";
import { BookContext } from "../context";

export function SearchPopup() {
  const { setSearchPopup, handleOpenImgPopup } = useContext(BookContext);
  const bookData = BookData(); // Assuming BookData is a function that provides the books data.
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced version of setSearchTerm to delay the state update
  const debouncedSetSearchTerm = useMemo(() => debounce(setSearchTerm, 300), []);

  useEffect(() => {
    // Cleanup the debounce function when the component is unmounted or searchTerm changes
    return () => debouncedSetSearchTerm.cancel();
  }, [debouncedSetSearchTerm]);

  const handleSearchChange = (e) => {
    debouncedSetSearchTerm(e.target.value);
  };

  // Filter books based on the search term
  const filteredBooks = searchTerm
    ? bookData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg mx-auto relative p-4">
      {/* Search Bar */}
      <div className="flex items-center mb-4 mt-8 ml-2 sm:ml-4">
        <span className="text-gray-300">
          <CiSearch size={24} />
        </span>
        <input
          type="text"
          placeholder="Search for a book..."
          className="ml-2 p-2 w-full sm:w-80 border rounded-lg focus:outline-none focus:placeholder-transparent text-sm sm:text-base"
          onChange={handleSearchChange}
        />
        <div onClick={() => setSearchPopup(false)} className="absolute top-2 right-2 cursor-pointer">
          <RxCross2 className="text-2xl text-gray-400" />
        </div>
      </div>

      {/* Display Filtered Books or No Data Found */}
      {!searchTerm ? (
        <div className="text-center text-red-500 py-8 font-bold text-xl sm:text-3xl">
          No Data Found
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center text-red-500 py-8 font-bold text-xl sm:text-3xl">
          No Data Found
        </div>
      ) : (
        <div className="mt-4 sm:mt-8 space-y-4">
          {filteredBooks.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                handleOpenImgPopup(item);
                setSearchPopup(false);
              }}
              className="flex items-center space-x-4 hover:bg-divineGreen hover:text-gray-800 p-3 sm:p-4 transition-colors duration-200 cursor-pointer"
            >
              <img
                src={GetImages(`../assets/images/${item.image}`)}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded"
              />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-200">{item.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-4">Author: {item.author}</p>
                <p className="text-gray-200 text-sm">Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPopup;
