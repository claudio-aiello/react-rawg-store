import React, { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";

const apiKey = `${process.env.REACT_APP_API_KEY}`
const API_URL = `https://api.rawg.io/api/games?page_size=30&key=${apiKey}`;

const leaderboardGames = [
  {
    name: "The Last of Us",
    id: 3990,
    score: "200",
    cover: (
      <img
        className="leaderboard cover"
        src="https://media.rawg.io/media/games/a26/a26df52a846d2f5b3e6d5f7bbe58ed28.jpg"
        alt="img"
      />
    ),
    background_image:
      "https://media.rawg.io/media/games/a26/a26df52a846d2f5b3e6d5f7bbe58ed28.jpg"
  },
  {
    name: "Tomb Raider",
    id: 5286,
    score: "100",
    cover: (
      <img
        className="leaderboard cover"
        src="https://media.rawg.io/media/games/81b/81b138691f027ed1f8720758daa0d895.jpg"
        alt="img"
      />
    ),
    background_image:
      "https://media.rawg.io/media/games/81b/81b138691f027ed1f8720758daa0d895.jpg"
  },
  {
    name: "GTA V",
    id: 3498,
    score: "150",
    cover: (
      <img
        className="leaderboard cover"
        src="https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg"
        alt="img"
      />
    ),
    background_image:
      "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg"
  }
];

const initialState = {
  storeGames: [],
  selectedGames: [],
  libraryGames: JSON.parse(localStorage.getItem("libraryGames")) || [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || leaderboardGames,
  heading: "Popular Games",
  showNav: false
};

export const StoreContext = createContext(initialState);

const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const randomNumber = () => Math.floor(Math.random() * (60 - 10 + 1) + 10);

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then(res => {
        const newGames = res.data.results.map(game => ({
          ...{ price: randomNumber() },
          ...game
        }));
        showGames(newGames);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    localStorage.setItem("libraryGames", JSON.stringify(state.libraryGames));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  });

  function toggleNav(boolean) {
    dispatch({
      type: "TOGGLE_NAV",
      payload: boolean
    });
  }

  function showGames(games) {
    dispatch({
      type: "SHOW_GAMES",
      payload: games
    });
  }

  function updateHeading(text) {
    dispatch({
      type: "UPDATE_HEADING",
      payload: text
    });
  }

  function addToLibrary(game) {
    dispatch({
      type: "ADD_TO_LIBRARY",
      payload: game
    });
  }

  function removeFromLibrary(id) {
    dispatch({
      type: "REMOVE_FROM_LIBRARY",
      payload: id
    });
  }

  function clearLibrary() {
    dispatch({
      type: "CLEAR_LIBRARY",
      payload: []
    });
  }

  function addToFavorites(game) {
    dispatch({
      type: "ADD_TO_FAVORITES",
      payload: game
    });
  }

  function removeFromFavorites(id) {
    dispatch({
      type: "REMOVE_FROM_FAVORITES",
      payload: id
    });
  }

  function updateFavorites(games) {
    dispatch({
      type: "UPDATE_FAVORITES",
      payload: games
    });
  }

  function addToSelectedGames(game) {
    dispatch({
      type: "ADD_TO_SELECTED_GAMES",
      payload: game
    });
  }

  function clearSelectedGames() {
    dispatch({
      type: "CLEAR_SELECTED_GAMES",
      payload: []
    });
  }

  function findGame(id, page) {
    const game = state.storeGames.find(storeGame => storeGame.id === id);
    if (page === "library") {
      addToLibrary(game);
    } else if (page === "favorites") {
      addToFavorites(game);
    } else if (page === "selectedGames") {
      addToSelectedGames(game);
    }
  }

  function updateOrderGames(games, id) {
    dispatch({
      type: "UPDATE_ORDER_GAMES",
      payload: { games, id }
    });
  }

  return (
    <StoreContext.Provider
      value={{
        showNav: state.showNav,
        storeGames: state.storeGames,
        favorites: state.favorites,
        selectedGames: state.selectedGames,
        libraryGames: state.libraryGames,
        heading: state.heading,

        toggleNav,
        findGame,
        removeFromLibrary,
        clearLibrary,
        showGames,
        updateHeading,
        updateOrderGames,

        addToFavorites,
        removeFromFavorites,
        updateFavorites,

        addToSelectedGames,
        clearSelectedGames,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
