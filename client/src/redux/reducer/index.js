import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAMES_NAME,
  GET_VIDEOGAME_DETAIL,
  ADD_VIDEOGAME,
  GET_GENRES,
} from "../actions/index";

const initialState = {
  videogamesLoaded: [],
  Aux: [],
  videogamesLoadedName: [],
  gameDetail: [],
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogamesLoaded: action.payload,
        Aux: action.payload,
      };
    case GET_VIDEOGAMES_NAME:
      return {
        ...state,
        videogamesLoaded: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
    case ADD_VIDEOGAME:
      return {
        ...state,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
