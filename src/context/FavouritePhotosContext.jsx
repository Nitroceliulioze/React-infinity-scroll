import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FavouritePhotosContext = createContext({})

export function useFavouritePhotos() {
    return useContext(FavouritePhotosContext)
}

export function FavouritePhotosProvider( { children }) {
    const [favourite, setFavourite] = useLocalStorage("favourite-photo", [])

    function addToFavourites(id) {
        setFavourite(currFav => {
            if(currFav.find(photo => photo.id === id) == null) {
                return [...currFav, { id }]
            } else {
                return [...currFav]
            }
        })
    }

    function removeFromFavourites(id) {
        setFavourite(currFav => {
           return currFav.filter(photo => photo.id !== id)
        })
    }

    return (
        <FavouritePhotosContext.Provider value={{ addToFavourites, removeFromFavourites }}>
            {children} 
        </FavouritePhotosContext.Provider>
    )
}