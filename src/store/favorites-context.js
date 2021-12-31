import { createContext, useState } from "react";

// the initial values are set here (starts at zero bc we dont have any Favies when creating the page)
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0
});

function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  // a context objext that holds the latest values
  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length
  };
  // value={context} is where/how we pass the current context value
  return <FavoritesContext.Provider value={context}>{props.children}</FavoritesContext.Provider>;
}
