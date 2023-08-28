import "./cardItem.css";

const Carditem = ({ id, alt, photographer, src, liked }) => {
  return (
    <div>
      <div className="card">

          <img src={src.medium} alt={alt}/>

      </div>
      <div className="overlay">
        <div className="overlay-content">
          <span className="title"> {alt} </span>
          <hr />
          <span className="author"> {photographer} </span>
          <br />
          <button className="fav-btn" type="button">Favourite</button>
        </div>
      </div>
    </div>
  );
};

export default Carditem;
