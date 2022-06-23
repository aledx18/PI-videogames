const { Videogame, Genres } = require("../db");

require("dotenv").config();
const { API_KEY } = process.env;

const axios = require("axios");

// const getVideogames = async (req, res) => {
//   try {
//     const respuesta = await fetch(
//       `https://api.rawg.io/api/games?key=${API_KEY}`
//     )
//       .then((r) => r.json())
//       .then((recurso) => {
//         if (recurso.main !== undefined) {
//         } else {
//           alert("error");
//         }
//       });
//   } catch (error) {
//     next(error);
//   }

// };

/**
 * Obtiene todos los videojuegos de la base de datos y de la API, y luego los devuelve
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @param next - Esta es una función a la que llama cuando su middleware está completo.
 * @returns Una matriz de videojuegos de la base de datos y la API.
 */
const getVideogames = async (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    try {
      // api
      const res1 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=33`
      );
      const res2 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=33`
      );
      const res3 = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=34`
      );
      const respuesta = res1;
      const pepe = res1.data.results.concat(
        res2.data.results,
        res3.data.results
      );
      // base de datos
      const DbVideogames = await Videogame.findAll({
        include: {
          model: Genres,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });
      if (respuesta) {
        let apiResp = pepe?.map((game) => {
          return {
            name: game.name,
            parent_platforms: game.parent_platforms,
            released: game.released,
            rating: game.rating,
            genres: game.genres,
            image: game.background_image,
          };
        });
        let resultFinal = [...DbVideogames, ...apiResp];
        return res.json(resultFinal);
      } else {
        res.json({ message: "Error en respuesta(api)" });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
};

/**
 * Obtiene el nombre del videojuego de la base de datos y la API, y devuelve los primeros 16 resultados
 * @returns Los videojuegos que coincidan con el nombre que busca el usuario.
 */
const getVideogamesName = async (req, res, next) => {
  const { nombre } = req.query;
  try {
    const respuestaAPi = await axios.get(
      `https://api.rawg.io/api/games?search=${nombre}&key=${API_KEY}`
    );
    const prueba = respuestaAPi.data.results;
    // base de datos
    const resDbVideogames = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      where: { name: nombre },
    });
    let resultadoFinal = [...resDbVideogames, ...prueba];
    return res.json(resultadoFinal.slice(0, 16));
  } catch (error) {
    next(error);
  }
};

/**
 * Toma un objeto de videojuego del cuerpo de la solicitud, crea un nuevo videojuego en la base de
 * datos y luego agrega el género al videojuego.
 */
const postVideogame = async (req, res, next) => {
  const { game } = req.body;

  if (game) {
    try {
      let nuevo = await Videogame.create(game);

      let generotypo = await Genres.findAll({ where: { name: game.genero } });

      await nuevo.addGenres(generotypo);

      if (nuevo) res.json({ message: "creado", data: nuevo });
      else res.json({ message: "Error, no se pudo crear" });
    } catch (error) {
      res.send(error, "nop");
    }
  } else {
    res.json({ message: "Error no viene el game en el body" });
  }
};

/**
 * Es una función que recibe el id de un videojuego, y si es un id válido, devolverá la información del
 * videojuego.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 * @param next - Esta es una función a la que llama cuando su middleware está completo.
 * @returns El videojuego con el id que se está pasando como parámetro.
 */
const getVideogamesId = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      if (id.length !== 36) {
        let idEntero = parseInt(id);
        const respAPi = await axios.get(
          `https://api.rawg.io/api/games/${idEntero}?key=${API_KEY}`
        );
        return res.json(respAPi.data);
      }
      const resDbVideogames = await Videogame.findAll({
        where: { id: id },
        include: {
          model: Genres,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });
      return res.json(resDbVideogames);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  getVideogames,
  getVideogamesName,
  postVideogame,
  getVideogamesId,
};
