const { Router } = require("express");
const videogamesRouter = Router();

const {
  getVideogames,
  getVideogamesName,
  postVideogame,
  getVideogamesId,
} = require("../services/videogamesService.js");

//obtenemos los primeros 15 juegos
videogamesRouter.get("/", getVideogames);
//Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
videogamesRouter.get("/", getVideogamesName);
//id
videogamesRouter.get("/:id", getVideogamesId);
//post
videogamesRouter.post("/", postVideogame);

module.exports = videogamesRouter;
