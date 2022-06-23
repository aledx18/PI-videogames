import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getAllVideogames } from "./redux/actions";

function App() {
  const [videogame, setVideogame] = useState("");

  const dispatch = useDispatch();
  // dispatch(getAllVideogames(videogame));

  const videoGames = useSelector((state) => state.videogamesLoaded);

  React.useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      {videoGames[0] && videoGames[0].map((p) => <h6>{p.name}</h6>)}
      {/* {videoGames && videoGames.map((p) => <h6>{p.name}</h6>)} */}
    </div>
  );
}

export default App;
