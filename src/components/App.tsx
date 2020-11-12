import React from "react";
import "./App.scss";
import NavigationBar from "./menu/nav-bar/NavigationBar";
import Game from "./game/Game";
function App() {
  return (
    <div className="Battleship">
      <div className="animation-wrapper">{""}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      <NavigationBar />
      <Game />
    </div>
  );
}

export default App;
