import { useEffect, useState } from 'react';
import CardItem from "./components/Carditem";
import "./App.css";
import { createClient } from 'pexels';

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Add an error state


  const fetchMorePhotos = () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    const client = createClient('HdUo4wBiS5H3uc95VQUtrCrKKMbnSrU4xaBmVgjxryMEFmQe00wSucOg');
    const query = 'sustainable';
    const perPage = 9;
    const nextPage = page + 1;

    client.photos.search({ query, per_page: perPage, page: nextPage }).then(newPhotos => {
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos.photos]);
      setPage(nextPage);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchMorePhotos(); // Fetch initial photos
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    const scrollTop = window.innerHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const scrolledToBottom = scrollTop >= scrollHeight - 1000; // Threshold for fetching more data

    if (scrolledToBottom && !loading && !error) {
      fetchMorePhotos(); // Fetch more data when scrolled to the bottom
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]); // Add 'loading' as a dependency to prevent event listener duplicates

  return (
    <>
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
    </>
  );
}

export default App;
