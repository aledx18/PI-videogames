import React from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames, getVideogameName } from "../redux/actions";
import "./SearchBar.css";

function SearchBar({setPagina}) {
  const [gameName, setGameName] = React.useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    if (gameName.length > 0) {
      event.preventDefault();
      dispatch(getVideogameName(gameName));
      setGameName("");
      setPagina(1)
    }
    else{
      event.preventDefault();
      dispatch(getAllVideogames());
      setGameName("");
    }
   
  };
  const handleChange = (event) => {
    setGameName(event.target.value);
  };

  return (
    <div className="contenedorFormSub">
        <form onSubmit={handleSubmit}>

      <input
        className="inputVideo"
        placeholder="Search your game..."
        type="text"
        autoComplete="off"
        value={gameName}
        onChange={(event) => handleChange(event)}
      />
      <button className="butonNameGame" type="submit">
          buscar
        </button>
        </form>
    </div>
  );
}

export default SearchBar;
