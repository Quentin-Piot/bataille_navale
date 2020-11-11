import React from "react";
import "./Game.scss";
import Grid from "./grille/Grid";
import BoatSelection from "./boatSelection/BoatSelection";
import { PositionOnGrid, Ship } from "./models/game-models";

interface IState {
  shipsList: Array<Ship>;
  selectedShip?: Ship;
  newShipSelected:boolean;
}
class Game extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    const shipsList = this.generateShipListe();
    this.state = {
      shipsList: shipsList,
      selectedShip: shipsList[0],
      newShipSelected: true
    };

    this.handleShipSelection = this.handleShipSelection.bind(this);
    this.handleGridClick = this.handleGridClick.bind(this);
  }

  private handleShipSelection(index: number) {
    const { shipsList } = this.state;
    
    const precendentShipIndex = shipsList.findIndex(
      (ship: Ship) => ship.selected
    );
    if (precendentShipIndex >= 0)
      shipsList[precendentShipIndex].selected = false;
    shipsList[index].selected = true;

    this.setState({ shipsList: shipsList, selectedShip: shipsList[index] });
  }

  private handleGridClick(position : PositionOnGrid) {
    const { shipsList } = this.state;

    const selectedShipIndex = shipsList.findIndex(
      (ship: Ship) => ship.selected
    );
    if (selectedShipIndex >= 0) {
      shipsList[selectedShipIndex].remainingPlacement--;
      shipsList[selectedShipIndex].positions.push(position);
      shipsList[selectedShipIndex].positions.sort();
      this.setState({ shipsList: shipsList, selectedShip: shipsList[selectedShipIndex] });
    }
  }
  render() {
    const { shipsList, selectedShip } = this.state;
    return (
      <div className="Bataille">
        <div className="phase">Current phase : Preparation</div>
        <div className="Game">
          <BoatSelection
            shipsList={shipsList}
            selectedShip={selectedShip}
            shipSelection={this.handleShipSelection}
          />
          <Grid selectedShip={selectedShip} gridClick={this.handleGridClick} />
        </div>
      </div>
    );
  }

  private generateShipListe(): Array<Ship> {
    const shipsList: Array<Ship> = [];
    shipsList.push({
      label: "Aircraft Carrier",
      index: "aircraftCarrier",
      selected: true,
      color: "blue",
      remainingPlacement: 5,
      totalPlacement:5,
      positions: [],
    });
    shipsList.push({
      label: "Battleship",
      index: "battleship",
      selected: false,
      color: "red",
      remainingPlacement: 4,
      totalPlacement:4,
      positions: [],
    });
    shipsList.push({
      label: "Cruiser",
      index: "cruiser",
      selected: false,
      color: "green",
      remainingPlacement: 3,
      totalPlacement:3,
      positions: [],
    });
    shipsList.push({
      label: "Submarine",
      index: "submarine",
      selected: false,
      color: "black",
      remainingPlacement: 2,
      totalPlacement:2,
      positions: [],
    });
    shipsList.push({
      label: "Destroyer",
      index: "destroyer",
      selected: false,
      color: "brown",
      remainingPlacement: 2,
      totalPlacement:2,
      positions: [],
    });
    return shipsList;
  }
}

export default Game;
