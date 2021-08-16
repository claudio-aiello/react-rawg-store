import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import LibraryGame from "./LibraryGame";
import { Link } from "react-router-dom";
import ScrollArrow from "../layout/ScrollArrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStore,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Library = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { libraryGames } = useContext(StoreContext);
  console.log(showFavorites);

  const handleCancel = () => {
    setShowDelete(false);
    setShowFavorites(false);
  };

  return (
    <section className="library">
      <h2 className="section-title black">My Library</h2>
      {showDelete || showFavorites ? (
        <button className="btn" onClick={handleCancel}>
          Cancel
        </button>
      ) : (
        <div className="button-container">
          <button className="btn">
            <Link className="link" to="/">
              <FontAwesomeIcon icon={faStore} className="nav-icon" />
              Back to Store
            </Link>
          </button>
          <button className="btn" onClick={() => setShowFavorites(true)}>
            <FontAwesomeIcon icon={faHeart} className="nav-icon" />
            <span>Add to favorites</span>
          </button>
          <button
            className="btn remove-btn"
            onClick={() => setShowDelete(true)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="nav-icon" />
            <span>Remove Games</span>
          </button>
        </div>
      )}
      <div className="library-section">
        {libraryGames.length > 0 ? (
          <>
            <ul className="games-list">
              {libraryGames.map((game) => (
                <LibraryGame
                  game={game}
                  key={game.id}
                  showDelete={showDelete}
                  showFavorites={showFavorites}
                />
              ))}
            </ul>
            <h3>
              {libraryGames.length === 1
                ? `You have ${libraryGames.length} game in your library`
                : `You have ${libraryGames.length} games in your library`}
            </h3>
          </>
        ) : (
          <div className="empty-list">
            <h3 className=".empty-list-title">No Games.</h3>
            <p>
              Go to the <Link to="/">store</Link> and select the games you want
              to add to your library.
            </p>
          </div>
        )}
      </div>
      <ScrollArrow />
    </section>
  );
};

export default Library;
