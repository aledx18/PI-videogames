import React from "react";
import "./VideoGame.css";
import { Link } from "react-router-dom";

function VideoGame({id, img, name, genero }) {

  return (
    
    <div className="contenedorJuego">
      <div className="imagepepe">
        <img src={img} alt="" /> 
      </div>
      <div className="infoGame">
      <Link className="textDecoration" to={`/game/${id}`}><h4>{name}</h4></Link>
        <h6>{genero.join(" ")}</h6>
      </div>
    </div>
  );
}

export default VideoGame;
