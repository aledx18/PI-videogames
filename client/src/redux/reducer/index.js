import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAMES_NAME,
  GET_VIDEOGAME_DETAIL,
  ADD_VIDEOGAME,
  GET_GENRES,
  FILTER_GENRE,
  ORDER_GAME,
  FILTER_CREATED,
  RESET_DETAIL,
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
    case FILTER_GENRE:
      let newArrFilter = state.videogamesLoaded.filter((p) => {
        var flag = false;
        p.genres.forEach((element) => {
          if (element.name === action.payload) {
            flag = true;
          }
        });
        return flag;
      });

      return {
        ...state,
        videogamesLoaded: [...newArrFilter],
      };
    case FILTER_CREATED:
      state.videogamesLoaded = state.Aux;
      var newArrFilterCreate = [];
      if (action.payload === "false") {
        newArrFilterCreate = state.videogamesLoaded.filter(
          (p) => p.created === false
        );
      } else {
        newArrFilterCreate = state.videogamesLoaded.filter(
          (p) => p.created !== false
        );
      }
      return {
        ...state,
        videogamesLoaded: newArrFilterCreate,
      };
    case RESET_DETAIL:
      return {
        ...state,
        gameDetail: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
