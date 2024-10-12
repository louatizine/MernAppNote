import PropTypes from 'prop-types'; // Import PropTypes
import { FaSearch } from 'react-icons/fa'; // Correct import for magnifying glass
import { IoMdClose } from 'react-icons/io'; // Ensure to import IoMdClose from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />
      )}
      <FaSearch className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch} />
    </div>
  );
};

// Define prop types
SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;
