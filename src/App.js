import { useEffect, useState } from 'react';
import CardItem from "./components/Carditem";
// import photos from "./data/img.json";
import "./App.css";
import { createClient } from 'pexels';

function App() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
  const client = createClient('HdUo4wBiS5H3uc95VQUtrCrKKMbnSrU4xaBmVgjxryMEFmQe00wSucOg');
  const query = 'second hand';
  client.photos.search({ query, per_page: 9 }).then(photos => {
    setPhotos(photos.photos)
  });
}, [])
  
  
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
        {photos.length === 0 && <div>Loading...</div>}
      </div>
      {photos.length === 0 && <div>Error</div>}
    </div>
  </>
  );
}

export default App;
