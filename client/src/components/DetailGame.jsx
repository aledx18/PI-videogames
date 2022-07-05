/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../redux/actions";
import "./DetailGame.css";

function DetailGame(props) {
  const dispatch = useDispatch();

  const gameDetail = useSelector((state) => state.gameDetail);
  const idGame = props.match.params.id;
  React.useEffect(() => {
    dispatch(getVideogameDetail(idGame));
  }, [dispatch]);

  

  return (
    <div className="gameDetailContenedor">
      {!Object.values(gameDetail).length > 0 ? (
        <div className="detailLoader">
          <div className="loaderDetail__">
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
        <div className="descrip__">
          <div>
            <div className="titulo_rating">
              <div className="rating_content"><img  src="https://img.icons8.com/stickers/500/000000/star.png"/>{gameDetail.rating}</div>
              <div>
                <h1 className="titulo_descrip">{gameDetail.name}</h1>
              </div>

              <div className="released_content_"> <img src="https://img.icons8.com/stickers/500/000000/calendar.png"/> {gameDetail.released}</div>
            </div>
            <p className="descrip_detail">
              {gameDetail.description?.replace(/<[^>]*>?/gm, "")}
            </p>
          </div>
          <div className="box_descrip">
            <div className="platf_cont_">
              {gameDetail.genres.map((g, i) => (
                <h4 className="titulo_genres" key={i}>{g.name}</h4>
              ))}
            </div>
            <div className="gameDetailImagen_contente">
            <img
              className="gameDetailImagen"
              src={gameDetail.background_image || gameDetail.image}
              alt=""
            />
            </div>
            
            <div className="platf_cont_">
              {gameDetail.parent_platforms.map((e, d) => (
                <h4 className="titulo_platforms" key={d}>{e}</h4>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailGame;
