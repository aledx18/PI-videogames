/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterGameCreated,
  filterGameGenre,
  getAllVideogames,
  getGenres,
  orderGame,
} from "../redux/actions";
import "./Nav.css";
import SearchBar from "./SearchBar";

function Nav({setPagina}) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const handleOrderBy = (e) => {
    e.preventDefault();
    setPagina(1)
    dispatch(orderGame(e.target.value));
  };
  const handdleSelect = (e) => {
    e.preventDefault();
    setPagina(1)
    dispatch(filterGameGenre(e.target.value));
  };
  const handdleSelectCreated = (e) => {
    e.preventDefault();
    setPagina(1)
    dispatch(filterGameCreated(e.target.value));
  };
  const allSelect = (p) => {
    p.preventDefault();
    setPagina(1)
    dispatch(dispatch(getAllVideogames));
  };

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
            onChange={handdleSelect}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
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
          <button onClick={allSelect}> All </button>
        </div>
        <div>
          <select
            name="order"
            onChange={handdleSelectCreated}
            defaultValue={"e"}
          >
            <option value="e" disabled>
              Filter By
            </option>
            <option value={false}>created</option>
            <option value="existing">existing</option>
          </select>
        </div>
        <div>
          <select
            name="order"
            onChange={handleOrderBy}
            defaultValue={"Default"}
          >
            <option value="Default" disabled>
              rating
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="rating asc">Rating Asc</option>
            <option value="rating desc">Rating Desc</option>
          </select>
        </div>
        <Link className="nav-title-link" to={"/create"}>
          <h5>Crear Game</h5>
        </Link>
        <SearchBar setPagina={setPagina}/>
      </div>
    </div>
  );
}

export default Nav;
