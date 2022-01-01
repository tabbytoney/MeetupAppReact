import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import FavoritesContext from "../store/favorites-context";

function FavoritesPage() {
  // This gives us the current snapshot of state of favorites
  const favoritesCtx = useContext(FavoritesContext);

  let content;
  // Show this message if there aren't any favies on the favies page
  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You dont have any favorites yet!</p>;
  } else {
    content = <MeetupList meetups={favoritesCtx.favorites} />;
  }
  // the value returned depends on the if block - if we have favies or not
  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
