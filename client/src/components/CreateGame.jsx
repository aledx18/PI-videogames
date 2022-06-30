import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getGenres } from "../redux/actions";
import "./CreateGame.css";

function validate(input) {
  let errors = {};
  

  if (!input.name) {
    errors.name = "Se requiere un Nombre";
  } else if (!input.description) {
    errors.description = "Se requiere una Descripción";
  } else if (!input.rating) {
    errors.rating = "Se requiere un rating";
  }
  else if (input.rating > 5 || input.rating <= 0) {
    errors.rating = "Se requiere un valor entre 0 y 5";
  }
  else if (!input.released) {
    errors.released = "Se requiere una fecha";
  }
  else if(!/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(input.released)){
    errors.released = "Se requiere una fecha formato valido";
  }
  
  else if (input.parent_platforms.length === 0) {
    errors.parent_platforms = "Se requiere al menos una Plataforma";
  }
  else if (input.genero.length === 0) {
    errors.genero = "Se requiere al menos un genero";
  } 
  return errors;
}

function CreateGame() {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);
  
  const platforms = [
    { name: "PC" },
    { name: "PlayStation" },
    { name: "Xbox" },
    { name: "iOS" },
    { name: "Android" },
    { name: "Apple Macintosh" },
    { name: "Linux" },
    { name: "Nintendo" },
    { name: "Atari" },
    { name: "Commodore / Amiga" },
    { name: "SEGA" },
    { name: "3DO" },
    { name: "Neo Geo" },
    { name: "Web" },
  ];
  
  const [errors, setErrors] = useState({});
  
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    genero: [],
    rating: 0,
    parent_platforms: [],
  });
  
  function handdleSelect(e) {
    setInput({
      ...input,
      genero: [...input.genero, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handdleSelectDos(e) {
    setInput({
      ...input,
      parent_platforms: [...input.parent_platforms, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  
  

  function handleSubmit(e) {
    e.preventDefault();
    
    if (Object.values(errors).length > 0) {
      alert("Por favor complete la información requerida");
    } else if (input.name === "" || input.name.length > 20) {
      alert(
        "El nombre es obligatorio, solo puede llevar letras y su largo debe ser menor a 20"
      );
    }
    else if (!input.genero.length) {
      alert("Se requiere al menos un Genero");
    } else if (!input.parent_platforms.length) {
      alert("Se requiere al menos una Plataforma");
    } else {
      dispatch(createVideogame({ game: input }));
      alert("Game creado");
      setInput({
        name: "",
        description: "",
        image: "",
        released: 0,
        genero: [],
        rating: 0,
        parent_platforms: [],
      });
    }
  }
  
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  

  return (
    <div className="createFormCont">
      <div className="formDivCont">
        <form className="pure-form" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="tituloForm_">Create VideoGame</h2>
          <div>
            <fieldset className="pure-group">
              
            
              <input
                type="text"
                className="pure-input-1"
                onChange={handleChange}
                value={input.name}
                placeholder="Name videoGame..."
                name="name"
              />
              
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={input.description}
                className="pure-input-1"
                placeholder="Description"
              />

              <input
                name="rating"
                type="number"
                onChange={handleChange}
                value={input.rating}
                className="pure-input-1"
                id="quantity"
                min="0" max="5"
                placeholder="Rating"
              />
              <input
                type="text"
                name="released"
                placeholder="released mm dd yyyy "
                onChange={handleChange}
                value={input.released}
                className="pure-input-1"
                id="birthday"
              />
              <input
                type="text"
                name="image"
                onChange={handleChange}
                value={input.image}
                className="pure-input-1"
                placeholder="Image"
              />
              <select
                placeholder="plat"
                name="parent_platforms"
                onChange={handdleSelectDos}
              >
                <option disabled selected defaultValue>
                  Platforms
                </option>
                {platforms?.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>

              <select
                placeholder="Genres"
                name="genero"
                onChange={handdleSelect}
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

              <div>
                <ul>
                  <li className="ul_li_form">
                    {input.genero.map((e) => e + ", ")}
                  </li>
                </ul>
              </div>
            </fieldset>
          </div>

          <button type="submit" className="pure-button">
            Crear Game
          </button>
        </form>
        <div className="erroresForm">
          <div className="contenedorE">
          <h2>{errors.name}</h2>
          <h2>{errors.description}</h2>
          <h2>{errors.rating}</h2>
          <h2>{errors.released}</h2>
          <h2>{errors.parent_platforms}</h2>
          <h2>{errors.genero}</h2>
          </div>
          
        </div>
      </div>
      <div className="imageFormcon"></div>
    </div>
  );
}

export default CreateGame;
