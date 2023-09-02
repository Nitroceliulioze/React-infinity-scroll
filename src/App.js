import { useState } from "react";
import "./App.css";
import { FavouritePhotosProvider } from "./context/FavouritePhotosContext";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <FavouritePhotosProvider>
      <Navbar setSearchQuery={setSearchQuery} />
      <HomePage searchQuery={searchQuery} />
    </FavouritePhotosProvider>
  );
}

export default App;
