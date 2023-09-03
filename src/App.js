import HomePage from "./pages/HomePage";
import { FavouritePhotosProvider } from "./context/FavouritePhotosContext";
import "./App.css";

function App() {
  return (
    <FavouritePhotosProvider>
      <HomePage  />
    </FavouritePhotosProvider>
  );
}

export default App;
