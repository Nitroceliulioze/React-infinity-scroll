import { useEffect, useState } from "react";
import CardItem from "../components/cardItem/Carditem";
import { createClient } from "pexels";

const HomePage = ({ searchQuery }) => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Add an error state
  const query = searchQuery === "" ? "sustainable" : searchQuery;
  console.log(searchQuery);

  const fetchMorePhotos = () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    const client = createClient(
      "HdUo4wBiS5H3uc95VQUtrCrKKMbnSrU4xaBmVgjxryMEFmQe00wSucOg"
    );
    const perPage = 9;
    const nextPage = page + 1;

    client.photos
      .search({ query, per_page: perPage, page: nextPage })
      .then((newPhotos) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos.photos]);
        setPage(nextPage);
        setLoading(false);
      });
  };

  useEffect(() => {
    setPage(1);
    fetchMorePhotos(); // Fetch initial photos
  }, [searchQuery]);

  const handleScroll = () => {
    const scrollTop = window.innerHeight + window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const scrolledToBottom = scrollTop >= scrollHeight - 1000; // Threshold for fetching more data

    if (scrolledToBottom && !loading && !error) {
      fetchMorePhotos(); // Fetch more data when scrolled to the bottom
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, error]); // Add 'loading' as a dependency to prevent event listener duplicates

  return (
    <div>
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
    </div>
  );
};

export default HomePage;
