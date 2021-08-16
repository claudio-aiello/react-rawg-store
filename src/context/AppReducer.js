export const AppReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_NAV":
      return {
        ...state,
        showNav: action.payload,
      };
    case "SHOW_GAMES":
      return {
        ...state,
        storeGames: [...action.payload],
      };
    case "UPDATE_HEADING":
      return {
        ...state,
        heading: `Search Results for: "${action.payload}"`,
      };
    case "ADD_TO_LIBRARY":
      return {
        ...state,
        libraryGames: [...state.libraryGames, { ...action.payload }],
      };
    case "REMOVE_FROM_LIBRARY":
      return {
        ...state,
        libraryGames: state.libraryGames.filter(
          (game) => game.id !== action.payload
        ),
      };
    case "CLEAR_LIBRARY":
      return { ...state, libraryGames: action.payload };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites:
          action.payload.length > 0
            ? [...state.favorites, ...action.payload]
            : [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((game) => game.id !== action.payload),
      };
    case "UPDATE_FAVORITES":
      return {
        ...state,
        favorites: [...action.payload],
      };
    case "ADD_TO_SELECTED_GAMES":
      return {
        ...state,
        selectedGames: [...state.selectedGames, { ...action.payload }],
      };
    case "CLEAR_SELECTED_GAMES":
      return { ...state, selectedGames: action.payload };
    case "ADD_TO_CUSTOM_LIST":
      return {
        ...state,
        customLists: state.customLists.map((list) =>
          list.id === action.payload.listId
            ? list.games && list.games.length > 0
              ? { ...list, games: [...list.games, ...action.payload.game] }
              : { ...list, games: action.payload.game }
            : list
        ),
      };
    case "UPDATE_ORDER_GAMES":
      return {
        ...state,
        customLists: state.customLists.map((list) =>
          list.id === action.payload.id
            ? { ...list, games: action.payload.games }
            : list
        ),
      };
    case "REMOVE_FROM_CUSTOM_LIST":
      return {
        ...state,
        customLists: state.customLists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                games: list.games.filter(
                  (game) => game.id !== action.payload.id
                ),
              }
            : list
        ),
      };
    case "CLEAR_STATE":
      return {
        ...state,
        storeGames: [...state.storeGames],
      };
    default:
      return state;
  }
};
