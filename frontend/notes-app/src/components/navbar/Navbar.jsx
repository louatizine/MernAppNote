import { useState } from "react";
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "../Search/SearchBar";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate(); // Call useNavigate

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery(""); 
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-6 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={searchQuery} 
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch} 
      />

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
}

export default Navbar;