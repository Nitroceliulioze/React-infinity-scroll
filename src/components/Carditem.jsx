const Carditem = ({ id, alt, photographer, src, liked }) => {
  return (
    <div className="card">
      <div>
        <img src={src.medium} />
      </div>
      <div className="overlay">
        {alt}
        <hr />
        {photographer}
        <br />
        <button>Favourite</button>
      </div>
    </div>
  );
};

export default Carditem;
