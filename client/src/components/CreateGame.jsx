/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createVideogame } from "../redux/actions";
import "./CreateGame.css";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Se requiere un Nombre";
  } else if (!input.description) {
    errors.description = "Se requiere una Descripción";
  } else if (!input.rating) {
    errors.rating = "Se requiere un rating";
  } else if (input.rating > 5 || input.rating <= 0) {
    errors.rating = "Se requiere un valor entre 0 y 5";
  } else if (!input.released) {
    errors.released = "Se requiere una fecha";
  } else if (
    !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)
  ) {
    errors.released = "Se requiere una fecha formato valido";
  } else if (input.parent_platforms.length === 0) {
    errors.parent_platforms = "Se requiere al menos una Plataforma";
  } else if (input.genero.length === 0) {
    errors.genero = "Se requiere al menos un genero";
  }
  return errors;
}

function CreateGame() {
  const dispatch = useDispatch();
  const history = useHistory()
  const genres = useSelector((state) => state.genres);

  const platforms = [
    { name: "PC", id: 0 },
    { name: "PlayStation", id: 1 },
    { name: "Xbox", id: 2 },
    { name: "iOS", id: 3 },
    { name: "Android", id: 4 },
    { name: "Apple Macintosh", id: 5 },
    { name: "Linux", id: 6 },
    { name: "Nintendo", id: 7 },
    { name: "Atari", id: 8 },
    { name: "Commodore / Amiga", id: 9 },
    { name: "SEGA", id: 10 },
    { name: "3DO", id: 11 },
    { name: "Neo Geo", id: 12 },
    { name: "Web", id: 13 },
  ];

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: 0,
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
async function handleSubmit(e) {
    e.preventDefault();
    input.parent_platforms = input.parent_platforms.filter((item, index) => {
      return input.parent_platforms.indexOf(item) === index;
    });
    input.genero = input.genero.filter((item, index) => {
      return input.genero.indexOf(item) === index;
    });

    if (Object.values(errors).length > 0) {
      alert("Por favor complete la información requerida");
    } else if (!/^[A-Z][a-z_-]{3,19}$/.test(input.name)) {
      alert(
        "Nombre tiene que tener la primera letra en mayus y ser una cadena"
      );
    } else if (input.parent_platforms.length === 0) {
      alert("Necesita al menos una plataforma");
    } else if (input.genero.length === 0) {
      alert("Necesita al menos un genero");
    } else if (input.genero.length > 3) {
      alert("No puede tener mas de 3 generos");
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
      setErrors({});
      history.push("/home")
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

  const handleDelete = (e) => {
    setInput({
      ...input,
      parent_platforms: input.parent_platforms.filter((pla) => pla !== e),
    });
  };
  const handleDeletegenres = (e) => {
    setInput({
      ...input,
      genero: input.genero.filter((gen) => gen !== e),
    });
  };

  return (
    <div className="createFormCont">
      <div className="formDivCont">
        <div className="link_create_game">
          <Link to={"/home"}>
            <div className="imagen_create_game">
              <img src="https://img.icons8.com/stickers/100/000000/controller.png" />
            </div>
          </Link>
        </div>
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
                min="0"
                max="5"
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
                defaultValue={"plat"}
              >
                <option value="plat" disabled>
                  Platforms
                </option>
                {platforms?.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>

              <div>
                {input.parent_platforms
                  .filter((item, index) => {
                    return input.parent_platforms.indexOf(item) === index;
                  })
                  .map((e, g) => (
                    <div key={g} onClick={() => handleDelete(e)}>
                      <label className="label_select"> {`${e}`} </label>
                    </div>
                  ))}
              </div>

              <select
                placeholder="Genres"
                name="genero"
                onChange={handdleSelect}
                defaultValue={"gen"}
              >
                <option value="gen" disabled>
                  Genres
                </option>

                {genres?.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>

              <div>
                {input.genero
                  .filter((it, inde) => {
                    return input.genero.indexOf(it) === inde;
                  })
                  .map((p, g) => (
                    <div key={g} onClick={() => handleDeletegenres(p)}>
                      <label className="label_select"> {`${p}`} </label>
                    </div>
                  ))}
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
