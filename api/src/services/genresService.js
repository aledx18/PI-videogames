const { Videogame, Genres } = require("../db");

require("dotenv").config();
const { API_KEY } = process.env;

const axios = require("axios");
//https://api.rawg.io/api/genres?key=914982c38be948199378f6cd3d11684d

/**
 * Comprueba si la base de datos tiene algún género, si no lo tiene, hace una llamada a la API para
 * obtener los géneros, luego los guarda en la base de datos y luego devuelve los géneros.
 */
const getGenres = async (req, res, next) => {
  try {
    const generos = await Genres.findAll();
    if (generos.length === 0) {
      let apiGenres = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );

      let apiGenerosResult = apiGenres.data.results.map((r) => {
        return r.name;
      });

      for (let i = 0; i < apiGenerosResult.length; i++) {
        var newGenre = await Genres.create({
          name: apiGenerosResult[i],
        });
      }
      const generos = await Genres.findAll();
      res.json(generos);
    } else {
      res.json(generos);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getGenres };
