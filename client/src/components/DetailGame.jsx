import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../redux/actions";
import "./DetailGame.css";


function DetailGame(props) {
  const dispatch = useDispatch();

  const gameDetail = useSelector((state) => state.gameDetail);
  const idGame = props.match.params.id;
  console.log(idGame)
  console.log(gameDetail)

  React.useEffect(() => {
    dispatch(getVideogameDetail(idGame));
  }, [dispatch]);

  return (
    <div className="gameDetailContenedor">
      <div>
        <h1>{gameDetail.name}</h1>
        <p>{gameDetail.description}</p>
      
      <img className="gameDetailImagen" src={gameDetail.background_image} alt="" />
      </div>
    </div>
  );
}

export default DetailGame;

