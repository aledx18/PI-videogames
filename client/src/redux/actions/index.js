import axios from "axios";
//*llamados al back* :

// PAGINA PRINCIPAL
//traer todos los videogames localhost:3001/videogames
//traer video gamas por nombre localhost:3001/videogames/?nombre=batman

//PAGINA DEL DETALLE
//traer videogame por ID  localhost:3001/videogames/{id}

//PAGINA DE CREACION DE VIDEOGAME
//hacer un post localhost:3001/videogames

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAMES_NAME = "GET_VIDEOGAMES_NAME";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const ADD_VIDEOGAME = "ADD_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";

export function addVideogame(payload) {
  return { type: ADD_VIDEOGAME, payload };
}

export function getAllVideogames() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames`)
      .then((response) => response.json())
      .then((json) => {
        if (json !== undefined) {
          dispatch({ type: GET_ALL_VIDEOGAMES, payload: json });
        } else {
          alert("Error");
        }
      });
  };
}

export function getVideogameName(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames/?nombre=${name}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_VIDEOGAMES_NAME, payload: json });
      });
  };
}
export function getVideogameDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/videogames/${id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_VIDEOGAME_DETAIL, payload: json });
      });
  };
}
export function createVideogame(payload) {
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/videogames", payload);
    return json;
  };
}
export function getGenres() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload: json.data,
    });
  };
}
