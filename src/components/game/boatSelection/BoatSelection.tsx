import React from "react";
import "./BoatSelection.scss";
import { Ship } from "../models/game-models";

interface BoatSelectionProps {
  shipsList: Array<Ship>;
  selectedShip?: Ship;
  shipSelection(index: number): any;
}

class BoatSelection extends React.Component<BoatSelectionProps, {}> {
  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(index: number) {
    if(this.props.selectedShip && (this.props.selectedShip.remainingPlacement < 1 || (this.props.selectedShip?.remainingPlacement === this.props.selectedShip?.totalPlacement)))
    this.props.shipSelection(index);
  }

  render() {
    const { shipsList, selectedShip } = this.props;
    return (
      <div className="boat-selection-container">
        <div className="boat-title">Boat selection</div>

        <div className="boat-selection">
          {shipsList.map((ship: Ship, index) => {
            return (
              <button
                className={
                  selectedShip?.index === ship.index &&
                  ship.remainingPlacement > 0
                    ? selectedShip.color
                    : "default"
                }
                key={ship.label}
                onClick={() => this.handleClick(index)}
                disabled={ship.remainingPlacement <= 0}
              >
                {ship.label}
              </button>
            );
          })}
        </div>
        <br/>
        <span>Cases remaining : {selectedShip?.remainingPlacement}</span>
      </div>
    );
  }
}

export default BoatSelection;
