import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../redux/actions";
import VideoGame from "./VideoGame";
import "./Home.css";
import { useState } from "react";
import Paginacion from "./Paginacion";


function Home() {
  const dispatch = useDispatch();

  const videoGames = useSelector((state) => state.videogamesLoaded);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(15);

  const maximo = videoGames.length / porPagina; 

 
  React.useEffect(() => {
    dispatch(getAllVideogames());
    
  }, [dispatch]);

  return (
    <div className="conted">
      <div className="HomeCard">
        <div className="contenedorPrincipalGames">
          {videoGames &&
            videoGames
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((game) => (
                <VideoGame
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  img={game.image || game.background_image}
                  genero={game.genres.map((g) => g.name)}
                />
              ))}
        </div>
      </div>
      <Paginacion setPagina={setPagina} maximo={maximo} pagina={pagina} />
    </div>
  );
}

export default Home;
