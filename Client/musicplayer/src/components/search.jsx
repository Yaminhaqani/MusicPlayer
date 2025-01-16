import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";

const SearchBar = ({ searchWidth, setSearchWidth }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchWidth = () => {
    setSearchWidth(!searchWidth);
  };

  return (
    <div className="flex items-center border-none rounded-full bg-[rgb(42,42,42)] px-4 py-2 w-full">
      <FiSearch className="sm:text-gray-300 sm:h-6 sm:w-5 sm:mr-3 sm:flex hidden" />
      <IoIosArrowRoundBack
        className="text-gray-300 w-8 h-7 transition-all duration-1000 ease-in-out sm:hidden"
        onClick={handleSearchWidth}
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="What do you want to play?"
        className="bg-transparent text-white outline-none sm:w-[30vw]"
      />
    </div>
  );
};

export default SearchBar;
