import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  GET_VIDEOGAMES_NAME,
} from "../actions/index";

const initialState = {
  videogamesLoaded: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogamesLoaded: [...state.videogamesLoaded, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
