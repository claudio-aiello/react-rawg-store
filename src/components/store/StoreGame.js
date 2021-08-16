import React, { useContext, useRef } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faPlaystation,
  faXbox,
  faApple,
  faAndroid,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faGamepad } from "@fortawesome/free-solid-svg-icons";

const platforms = new Map([
  ["pc", faWindows],
  ["playstation", faPlaystation],
  ["xbox", faXbox],
  ["ios", faApple],
  ["android", faAndroid],
  ["linux", faLinux],
]);

function platformIcon(slug) {
  console.log(slug);
  return platforms.get(slug);
}

function setMetacriticColor(num) {
  if (num < 0) return "";

  let color = "white";
  if (num >= 75) {
    color = "#6dc849";
  } else if (num >= 50) {
    color = "#fddb3a";
  } else if (num >= 25) {
    color = "#00909e";
  } else {
    color = "rgb(236, 22, 22)";
  }

  return color;
}

const StoreGame = ({ game }) => {
  const { findGame, libraryGames, favorites } = useContext(StoreContext);

  let listBtnRef = useRef();
  let favoriteBtnRef = useRef();

  const onLibraryBtnClick = (e) => {
    if (listBtnRef.current) {
      listBtnRef.current.setAttribute("disabled", "disabled");
    }
    findGame(game.id, "library");
  };

  const onFavoriteBtnClick = (e) => {
    if (favoriteBtnRef.current) {
      favoriteBtnRef.current.setAttribute("disabled", "disabled");
    }
    findGame(game.id, "favorites");
  };

  console.log(game);

  return (
    <li className="game-card">
      <Link to={`game/${game.id}`}>
        <div
          className="background"
          style={{ backgroundImage: `url(${game.background_image})` }}
        ></div>
        <div className="info">
          <div className="infoTop">
            <div className="platforms">
              {game.parent_platforms !== undefined &&
                game.parent_platforms.map(({ platform }) => {
                  const icon = platformIcon(platform.slug);
                  return icon ? (
                    <FontAwesomeIcon
                      icon={icon}
                      key={platform.id}
                      style={{
                        marginRight: "0.6rem",
                        width: "1.7rem",
                        height: "1.7rem",
                      }}
                    />
                  ) : null;
                })}
            </div>
            <div className="rating-price">
              <span className="rating">
                {game.rating === 0 ? (
                  "N/A"
                ) : (
                  <Rating
                    name="half-rating-read"
                    defaultValue={game.rating}
                    precision={0.2}
                    readOnly
                  />
                )}
              </span>
            </div>
            <span
              className={`meta ${setMetacriticColor(game.metacritic)}`}
              style={{ color: `${setMetacriticColor(game.metacritic)}` }}
            >
              {!!game.metacritic ? game.metacritic : 0}
            </span>
          </div>
          <div className="infoBottom">
            <h3 className="title">{game.name}</h3>
          </div>
        </div>
      </Link>
      <div className="actions">
        {libraryGames.some((listGame) => listGame.id === game.id) ? (
          <button className="btn">
            <Link className="link" to={"/library"}>
              <FontAwesomeIcon
                icon={faGamepad}
                className="nav-icon"
                color="#590735"
              />
              In your library
            </Link>
          </button>
        ) : (
          <button className="btn" ref={listBtnRef} onClick={onLibraryBtnClick}>
            <Link className="link" to={"/library"}>
              <FontAwesomeIcon icon={faGamepad} className="nav-icon" />
              <span>Add to library</span>
            </Link>
          </button>
        )}
        {favorites.some((listGame) => listGame.id === game.id) ? (
          <button className="btn">
            <Link className="link" to={"/favorites"}>
              <FontAwesomeIcon
                icon={faHeart}
                className="nav-icon"
                color="#590735"
              />
              <span>In your Favorites</span>
            </Link>
          </button>
        ) : (
          <button
            className="btn"
            ref={favoriteBtnRef}
            onClick={onFavoriteBtnClick}
          >
            <Link className="link" to={"/favorites"}>
              <FontAwesomeIcon icon={faHeart} className="nav-icon" />
              <span>Add to favorites</span>
            </Link>
          </button>
        )}
      </div>
    </li>
  );
};

export default StoreGame;
