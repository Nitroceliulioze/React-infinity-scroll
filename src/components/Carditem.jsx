import { useState } from "react";
import "./cardItem.css";

const Carditem = ({ id, alt, photographer, src, liked }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="card-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card">
        <img src={src.medium} alt={alt} />
      </div>
      {isHovered && (
        <div className="overlay">
          <div className="overlay-content">
            <span className="title"> {alt} </span>
            <hr />
            <span className="author"> {photographer} </span>
            <br />
            <button className="fav-btn" type="button">
              Favourite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carditem;
