import { createContext, useContext } from 'react';

const FavouritePhotosContext = createContext({})


export function useFavouritePhotos() {
    return useContext(FavouritePhotosContext)
}

export function FavouritePhotosProvider( { children }) {
    return (
        <FavouritePhotosContext.Provider value={{}}>
            {children} 
        </FavouritePhotosContext.Provider>
    )
}