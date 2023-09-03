import { useEffect, useState } from "react";
import { useFavouritePhotos } from "../context/FavouritePhotosContext";
import CardItem from "../components/cardItem/Carditem";
import "./homePage.css";

const HomePage = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const query = searchQuery === "" ? "c" : searchQuery;
  const [isFavourite, setIsFavourite] = useState(false);
  const { addToFavourites, removeFromFavourites, favourite } = useFavouritePhotos();
  

  const fetchMorePhotos = async () => {
    const perPage = 9;
    const nextPage = page;
    setLoading(true);
    setError(false);
    try {
      await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${nextPage}`,
        {
          headers: {
            Authorization:
              "HdUo4wBiS5H3uc95VQUtrCrKKMbnSrU4xaBmVgjxryMEFmQe00wSucOg",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((newPhotos) => {
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos.photos]);
          setPage(nextPage + 1);
          setLoading(false);
        });
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMorePhotos();
    setPhotos([]);
  }, [searchQuery]);

  const handleScroll = () => {
    const scrollTop = window.innerHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const scrolledToBottom = scrollTop >= scrollHeight - 1000;

    if (scrolledToBottom && !loading && !error) {
      fetchMorePhotos();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, error]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const showFavorite = () => {
    setIsFavourite((prevIsFavourite) => !prevIsFavourite);
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="heart" onClick={showFavorite}></div>
        <input
          className="input"
          type="text"
          placeholder="What are you searching for?"
          value={searchQuery}
          onChange={handleSearchChange}
        ></input>
        <a href="https://www.pexels.com">Photos provided by Pexels</a>
      </nav>
      {/* {isFavourite && (
        <div className="container">
          <div className="items">
            {favourite.map((photo) => (
              <div key={Math.random() + photo.id}>
                <CardItem {...photo} />
              </div>
            ))}
          </div>
        </div>
      )} */}
      <div className="container">
        <div className="items">
          {photos.map((photo) => (
            <div key={Math.random() + photo.id}>
              <CardItem {...photo} />
            </div>
          ))}
          {loading && <div>Loading more...</div>}
          {error && <div>Error loading photos: {error.message}</div>}
        </div>
      </div>
    </>
  );
};

export default HomePage;
