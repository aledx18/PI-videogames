/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGenres, orderGame } from "../redux/actions";
import "./Nav.css";
import SearchBar from "./SearchBar";

function Nav() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const [order,setOrder] = useState("");

  const handleOrderBy =(e) =>{
    e.preventDefault();
    console.log(e.target.value)
    
    dispatch(orderGame(e.target.value))
  }

  React.useEffect(() => {
    dispatch(getGenres());
    
  }, [dispatch]);

  return (
    <div className="nav">
      <div className="nav-header">
        <Link className="nav-title-link" to={"/home"}>
          <div className="nav-title">
            <img src="https://img.icons8.com/stickers/100/000000/controller.png" />
          </div>
        </Link>
        <div>
        <select
                placeholder="Genres"
                name="genero"
                // onChange={handdleSelect}
              >
                <option disabled selected defaultValue>
                  Genres
                </option>

                {genres?.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
        </div>
        <div>
          <select name="order" onChange={handleOrderBy}>
            <option disabled selected defaultValue > rating</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="rating asc">Rating Asc</option>
            <option value="rating desc">Rating Desc</option>
          </select>
        </div>
        <Link className="nav-title-link" to={"/create"}>
          <h5>Crear Game</h5>
        </Link>
        <SearchBar />
      </div>
    </div>
  );
}

export default Nav;
