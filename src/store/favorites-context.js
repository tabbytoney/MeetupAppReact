import { createContext, useState } from "react";

// the initial values are set here (starts at zero bc we dont have any Favies when creating the page)
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {}
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoritesHandler(favoriteMeetup) {
    // this makes sure we always get the latest state snapshot
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }

  function removeFavoritesHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      // returns true if the meetup.id is not equal to the meetupId we get as a parameter\
      // if it is equal, return false and we drop the meetupId that matches (deletes it)
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  // helper function will determine if some item in the array of all meetups are a favorite or not
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  // a context objext that holds the latest values
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoritesHandler,
    removeFavorite: removeFavoritesHandler,
    itemIsFavorite: itemIsFavoriteHandler
  };
  // value={context} is where/how we pass the current context value
  return <FavoritesContext.Provider value={context}>{props.children}</FavoritesContext.Provider>;
}

export default FavoritesContext;
