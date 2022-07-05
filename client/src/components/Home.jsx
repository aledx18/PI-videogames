import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../redux/actions";
import VideoGame from "./VideoGame";
import "./Home.css";
import { useState } from "react";
import Paginacion from "./Paginacion";
import Nav from "./Nav";

function Home() {
  const dispatch = useDispatch();

  const {videogamesLoaded} = useSelector((state) => state);


  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(15);

  const maximo = videogamesLoaded.length / porPagina;

  React.useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  return (
    <div className="conted">
      <Nav setPagina={setPagina}/>
      <div className="HomeCard">
        <div className="contenedorPrincipalGames">
          {!videogamesLoaded.length > 0 ? (
            <div className="cagando">
              <div className="loader">
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
              </div>
            </div>
          ) : (
            videogamesLoaded &&
            videogamesLoaded
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              ?.map((game) => (
                <VideoGame
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  img={game.image || game.background_image}
                  genero={game.genres?.map((g) => g.name)}
                />
              ))
          )}
        </div>
      </div>
      <Paginacion setPagina={setPagina} maximo={maximo} pagina={pagina} />
    </div>
  );
}

export default Home;
