import React from "react";
import "./Landing.css";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="landingContenedor">
      <div className="pepe">
        <h1 className="tituloPrincipal">VideoGame PI</h1>
        <NavLink className="linkh" to="/home">
          Home
        </NavLink>
      </div>
    </div>
  );
}

export default Landing;
