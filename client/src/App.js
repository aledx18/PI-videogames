import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import DetailGame from "./components/DetailGame";
import CreateGame from "./components/CreateGame";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      {/* <Route exact path="/home" component={Nav} /> */}
      <Route exact path="/game/:id" component={Nav} />
      <Route exact path="/game/:id" component={DetailGame} />
      <Route exact path="/create" component={CreateGame} />
      <Route exact path="/home" component={Home} />
    </div>
  );
}

export default App;
