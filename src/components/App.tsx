import React from "react";
import "./App.scss"
import NavigationBar from "./menu/nav-bar/NavigationBar";
import Game from "./game/Game"
function App() {
  return (
    <div className="Battleship">
      <NavigationBar />
      <Game />
    </div>
  );
}

export default App;
