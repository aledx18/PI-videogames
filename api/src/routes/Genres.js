const { Router } = require("express");
const routerGenres = Router();

const { getGenres } = require("../services/genresService.js");

routerGenres.get("/", getGenres);

module.exports = routerGenres;
