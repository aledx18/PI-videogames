import React, { useState } from "react";

function Paginacion({ pagina, setPagina, maximo }) {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };
  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };

  return (
    <div className="paginacionContenedor">
      <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
        PREV
      </button>
      <button onClick={nextPage}>NEXT</button>
    </div>
  );
}

export default Paginacion;
