/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./Paginacion.css"

function Paginacion({ pagina, setPagina, maximo }) {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    if (pagina < Math.ceil(maximo)) {
      
      setInput(parseInt(input) + 1);
      setPagina(parseInt(pagina) + 1);
    }
  };
  const previousPage = () => {
    if (pagina > 1) {
      
      setInput(parseInt(input) - 1);
      setPagina(parseInt(pagina) - 1);
    }
  };

  const onChange = e =>{
    setInput (e.target.value)
  }

  return (
    <div className="paginacionContenedor">
      {/* <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
        PREV
      </button> */}
      <img  onClick={previousPage} src="https://img.icons8.com/stickers/100/000000/left.png"/>
      <input disabled name="page" className="inputPaginacion" autoComplete="off" value={input} onChange={e=> onChange(e)} />
      <p>De {Math.ceil(maximo)}</p>
      <img onClick={nextPage} src="https://img.icons8.com/stickers/100/000000/right.png"/>
      {/* <div className="button_paginacion">

      <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage}>
      <img src="https://img.icons8.com/stickers/500/000000/right.png"/>
      </button>
      </div> */}
    </div>
  );
}

export default Paginacion;
