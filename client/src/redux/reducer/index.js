import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAMES_NAME,
  GET_VIDEOGAME_DETAIL,
  ADD_VIDEOGAME,
  GET_GENRES,
  GET_PLATFORMS,
  ORDER_GAME,
} from "../actions/index";

const initialState = {
  videogamesLoaded: [],
  Aux: [],
  videogamesLoadedName: [],
  gameDetail: [],
  genres: [],
  platforms: [],
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
        videogamesLoaded: [action.payload, ...state.videogamesLoaded],
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case ORDER_GAME:
      var ordern;
      switch (action.payload) {
        case "A-Z":
          console.log("culo");
          ordern = function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          };
          break;
        case "Z-A":
          ordern = function (a, b) {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          };
          break;
        case "rating asc":
          ordern = function (a, b) {
            if (a.rating < b.rating) {
              return 1;
            }
            if (a.rating > b.rating) {
              return -1;
            }
            return 0;
          };
          break;
        case "rating desc":
          ordern = function (a, b) {
            if (a.rating < b.rating) {
              return -1;
            }
            if (a.rating > b.rating) {
              return 1;
            }
            return 0;
          };
          break;
        default:
          break;
      }
      return {
        ...state,
        videogamesLoaded: [...state.videogamesLoaded.sort(ordern)],
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
