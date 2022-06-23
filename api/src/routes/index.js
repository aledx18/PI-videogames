const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("./Videogames.js");
const genres = require("./Genres.js");

const router = Router();

// Configurar los routers
router.get("/", (req, res) => {
  const obj = {
    msg: "Hola",
    rutas: {
      videogames: "http://localhost:3001/videogames",
      genres: "http://localhost:3001/genres",
    },
  };
  res.json(obj);
});
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/genres", genres);

module.exports = router;
