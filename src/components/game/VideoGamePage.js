import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../layout/Spinner";
import Slider from "react-slick";
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
import { faHeart, faGamepad, faStore } from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://api.rawg.io/api/games/";
const apiKey = `${process.env.REACT_APP_API_KEY}`

const VideoGamePage = (props) => {
  const { findGame, libraryGames, favorites } = useContext(StoreContext);
  const [game, setGame] = useState("");
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    axios
      .get(
        `${API_URL}${props.match.params.id}?key=${apiKey}`
      )
      .then((res) => {
        setGame(res.data);
      })
      .catch((err) => console.log(err));

    console.log(game);

    axios
      .get(
        `${API_URL}${props.match.params.id}/screenshots?key=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
  };

  if (
    (game === undefined && images === undefined) ||
    Object.keys(game).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <div
        className="game-page"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.7),
        rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8),
        rgba(21, 21, 21, 0.5)), url(${game.background_image})`,
          zIndex: "1",
        }}
      >
        <h2 className="game-title">{game.name}</h2>
        <span style={{ fontSize: "14px", padding: "10px" }}>
          {game.alternative_names.join(", ")}
        </span>

        {game.background_image_additional !== null && images !== undefined ? (
          <div className="caroussel">
            <Slider {...settings}>
              <div>
                <img
                  src={game.background_image}
                  alt="screnshot"
                  className="screenshot"
                />
              </div>
              {images === undefined ? (
                <img
                  src={game.background_image}
                  alt={game.background_image}
                  className="cover"
                />
              ) : (
                images.results.map((ss) => (
                  <div>
                    <img
                      className="screenshot"
                      key={ss.id}
                      alt={ss.id}
                      src={ss.image}
                    />
                  </div>
                ))
              )}
            </Slider>
          </div>
        ) : (
          // ))
          <img
            src={game.background_image}
            alt={game.background_image}
            className="cover"
          />
        )}

        <div className="game-details">
          <div className="game-information">
            <p className="rating">
              <strong>Rating: </strong>
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
              <span
                className={`meta`}
                style={{
                  color: `${setMetacriticColor(game.metacritic)}`,
                  marginLeft: 10,
                }}
              >
                {!!game.metacritic ? game.metacritic : 0}
              </span>
            </p>
            {game.genres[0] !== undefined ? (
              <p className="genre">
                <strong>Genre: </strong>
                {game.genres.map((genre, index) => (
                  <span>
                    {index !== 0 && ", "}
                    {genre.name}
                  </span>
                ))}
              </p>
            ) : (
              ""
            )}
            <p className="platforms">
              <strong>Platforms: </strong>{" "}
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
            </p>
            <p className="released">
              <strong>Released Date: </strong> {game.released}
            </p>
            <p className="description">
              <strong>Description: </strong> {game.description_raw}
            </p>
            {game.website !== "" ? (
              <p className="website">
                <strong>More info: </strong>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={game.website}
                >
                  {game.website}
                </a>
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="actions">
            <button className="btn">
              <Link className="link" to="/">
                <FontAwesomeIcon icon={faStore} className="nav-icon" />
                Back to Store
              </Link>
            </button>
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
              <button
                className="btn"
                onClick={() => findGame(game.id, "library")}
              >
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
                  <span>In your favorites</span>
                </Link>
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => findGame(game.id, "favorites")}
              >
                <Link className="link" to={"/favorites"}>
                  <FontAwesomeIcon icon={faHeart} className="nav-icon" />
                  <span>Add to favorites</span>
                </Link>
              </button>
            )}
          </div>

          {game.clip !== null ? (
            <div className="clip">
              <h2>Game Video Clip</h2>
              <video controls>
                <source src={game.clip.clip} type="video/mp4" />
              </video>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
};

export default VideoGamePage;
