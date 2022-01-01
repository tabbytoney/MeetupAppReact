import { useContext } from "react";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import FavoritesContext from "../../store/favorites-context";

function MeetupItem(props) {
  // useContext connects this component with the FavoritesContext
  const favoritesCtx = useContext(FavoritesContext);

  // check is the item already favorited?
  // itemIsFavorite is a key in the favies overall context object. Calling
  // it this way gives us access to the ItemIsFavoriteHandler function
  // props.id gives us the meetup id from the MeetupList(props) > MeetupItem object
  // returns true or false
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoritesStatusHandler() {
    // if it's a favorite, unfavie. If it isn't, add it - create a
    // new object with meetup details and pass it to AddFavorite and the handler.
    // changes the state, which refigures all the values and displays an updated version
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address
      });
    }
  }

  // Change button text depending on if already a favorite or not
  // If a favie, Remove.., if not To Favorites
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoritesStatusHandler}>
            {itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
