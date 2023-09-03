import { useState } from "react";
import "./App.css";
import { FavouritePhotosProvider } from "./context/FavouritePhotosContext";
import HomePage from "./pages/HomePage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <FavouritePhotosProvider>
      <HomePage  />
    </FavouritePhotosProvider>
  );
}

export default App;
