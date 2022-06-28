import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"
import SearchBar from "./SearchBar"

function Nav() {
  return (
    <div className="nav">
        <div className="nav-header">
          <Link className="nav-title-link" to={"/home"}>
            <div className="nav-title">Video Game</div>
            </Link>
            <Link className="nav-title-link" to={"/create"}>
            <h5>Crear Game</h5>
            </Link>
          <SearchBar/>
        </div>
      </div>
  )
}

export default Nav