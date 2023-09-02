import React from "react";
import "./navbar.css";

const Navbar = ({ setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="navbar-container">
      <div className="heart"></div>
      <input
        className="input"
        type="text"
        placeholder="What are you searching for?"
        onChange={handleSearchChange}
      ></input>
      <a href="https://www.pexels.com">Photos provided by Pexels</a>
    </div>
  );
};

export default Navbar;
