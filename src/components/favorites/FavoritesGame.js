import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FavoritesGame = ({ game, sortIndex }) => {
  const { favorites, removeFromFavorites } = useContext(StoreContext);

  return (
    <li className="favorite-item">
      <div className="ranking">{sortIndex + 1}</div>
      <img
        src={game.background_image}
        alt={game.background_image}
        className="cover"
      />
      <h3>{game.name}</h3>
      {favorites.length > 3 ? (
        <div
          className="cross icon-btn"
          onClick={() => removeFromFavorites(game.id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default FavoritesGame;
