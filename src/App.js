import { useEffect, useState } from "react";
import CardItem from "./components/Carditem";
import "./App.css";
import { createClient } from "pexels";
import { FavouritePhotosProvider } from "./context/FavouritePhotosContext";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); 

  const fetchMorePhotos = () => {
    setLoading(true);
    setError(false);
    const client = createClient(
      "HdUo4wBiS5H3uc95VQUtrCrKKMbnSrU4xaBmVgjxryMEFmQe00wSucOg"
    );
    const query = "sustainable";
    const perPage = 9;
    const nextPage = page + 1;
    try {
      client.photos
        .search({ query, per_page: perPage, page: page })
        .then((newPhotos) => {
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos.photos]);
          setPage(nextPage);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchMorePhotos();
    setPhotos([]);
  }, []);

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

  return (
    <FavouritePhotosProvider>
      <a href="https://www.pexels.com">Photos provided by Pexels</a>
      <div className="container">
        <div className="items">
          {photos.map((photo) => (
            <div key={photo.id}>
              <CardItem {...photo} />
            </div>
          ))}
          {loading && <div>Loading more...</div>}
          {error && <div>Error loading photos: {error.message}</div>}
        </div>
      </div>
    </FavouritePhotosProvider>
  );
}

export default App;
