import React from "react";
import { Case, Ship, PositionOnGrid } from "../models/game-models";
import "./Grid.scss";

interface GridProps {
  selectedShip?: Ship;
  gridClick(position: PositionOnGrid): any;
}
interface IState {
  cases: Array<Case>;
}
class Grid extends React.Component<GridProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { cases: this.generateGrid() };
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(index: number) {
    const { cases } = this.state;
    const { selectedShip } = this.props;

    if (cases[index].shipIndex.length <= 1 && cases[index].highlighted) {
      if (selectedShip && selectedShip.remainingPlacement > 0) {
        cases[index].color = selectedShip.color;
        cases[index].shipIndex = selectedShip.index;
        cases.map((val: Case) => {
          return val.highlighted ? (val.highlighted = false) : val;
        });
        const newGrid = this.highlightCases(index, cases);
        this.props.gridClick(cases[index].position);
        this.setState({ cases: newGrid });
      }
    }
  }

  private getShipDirection(index: number, cases: Array<Case>) {
    let canHorizontal = true;
    let canVertical = true;

    if (
      this.props.selectedShip &&
      this.props.selectedShip?.remainingPlacement > 1
    ) {
      if (this.props.selectedShip.positions.length >= 1) {
        if (
          this.props.selectedShip.positions[0].letter ===
          cases[index].position.letter
        ) {
          canVertical = false;
        } else if (
          this.props.selectedShip.positions[0].number ===
          cases[index].position.number
        ) {
          canHorizontal = false;
        }
      } else {
        canVertical = this.checkIfEnoughSpace("vertical", index, cases);
        canHorizontal = this.checkIfEnoughSpace("horizontal", index, cases);
      }
    }

    return { canVertical, canHorizontal };
  }

  private checkIfEnoughSpace(
    position: string,
    index: number,
    cases: Array<Case>
  ): boolean {
    if (position === "horizontal") {
      let indexHorizontal = 0;
      let horizontalRemaining = 0;
      let stopSearchingLeft = false;
      let stopSearchingRight = false;
      while (!stopSearchingLeft || !stopSearchingRight) {
        indexHorizontal++;
        if (
          cases[index - indexHorizontal] &&
          cases[index - indexHorizontal].position.letter ===
            cases[index].position.letter &&
          cases[index - indexHorizontal].shipIndex.length < 1
        ) {
          horizontalRemaining++;
        } else {
          stopSearchingLeft = true;
        }

        if (
          cases[index + indexHorizontal] &&
          cases[index + indexHorizontal].position.letter ===
            cases[index].position.letter &&
          cases[index + indexHorizontal].shipIndex.length < 1
        ) {
          horizontalRemaining++;
        } else {
          stopSearchingRight = true;
        }
      }
      if (horizontalRemaining < this.props.selectedShip!!.remainingPlacement) {
        return false;
      }
    } else {
      let indexVertical = 0;
      let verticalRemaining = 0;
      let stopSearchingUp = false;
      let stopSearchingDown = false;
      while (!stopSearchingUp || !stopSearchingDown) {
        indexVertical += 10;
        if (
          cases[index - indexVertical] &&
          cases[index - indexVertical].position.number ===
            cases[index].position.number &&
          cases[index - indexVertical].shipIndex.length < 1
        ) {
          verticalRemaining++;
        } else {
          stopSearchingUp = true;
        }

        if (
          cases[index + indexVertical] &&
          cases[index + indexVertical].position.number ===
            cases[index].position.number &&
          cases[index + indexVertical].shipIndex.length < 1
        ) {
          verticalRemaining++;
        } else {
          stopSearchingDown = true;
        }
      }
      if (verticalRemaining < this.props.selectedShip!!.remainingPlacement) {
        return false;
      }
    }

    return true;
  }
  private generateGrid() {
    const cases: Array<Case> = [];
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    letters.forEach((letter) => {
      numbers.forEach((number) => {
        cases.push({
          label: letter + number,
          position: { letter: letter, number: number },
          color: "white",
          shipIndex: "",
          highlighted: true,
        });
      });
    });
    return cases;
  }

  componentDidUpdate(prevProps: GridProps) {
    if (prevProps.selectedShip !== this.props.selectedShip) {
      const { cases } = this.state;
      cases.map((val: Case) => {
        return val.shipIndex.length < 1 ? (val.highlighted = true) : val;
      });
      this.setState({ cases: cases });
    }
  }
  render() {
    const { cases } = this.state;
    return (
      <div className="grid-container">
        {cases.map((value, index) => {
          return (
            <div
              className={`case ${
                value.highlighted ? "highlight" : value.color
              }`}
              key={index}
              onClick={(e) => this.handleClick(index)}
            >
              {value.label}
            </div>
          );
        })}
      </div>
    );
  }

  private highlightCases(index: number, cases: Array<Case>) {
    if (
      this.props.selectedShip &&
      this.props.selectedShip?.remainingPlacement > 1
    ) {
      const { canHorizontal, canVertical } = this.getShipDirection(
        index,
        cases
      );

      if (canHorizontal) {
        const shipsPosition = this.props.selectedShip?.positions.sort((a, b) =>
          a.number.localeCompare(b.number)
        );
        //left
        if (
          cases[index - 1] &&
          cases[index - 1].shipIndex.length < 1 &&
          cases[index - 1].position.letter === cases[index].position.letter
        ) {
          cases[index - 1].highlighted = true;
        }
        const mostLeftCase: number = cases.findIndex(
          (value) => value.position === shipsPosition[0]
        );

        if (
          mostLeftCase >= 0 &&
          cases[mostLeftCase - 1] &&
          cases[mostLeftCase - 1].shipIndex.length < 1 &&
          cases[mostLeftCase - 1].position.letter ===
            cases[mostLeftCase].position.letter
        ) {
          cases[mostLeftCase - 1].highlighted = true;
        }

        //right
        const mostRightCase: number = cases.findIndex(
          (value) =>
            value.position ===
            shipsPosition[this.props.selectedShip?.positions.length!! - 1]
        );
        if (
          cases[index + 1] &&
          cases[index + 1].shipIndex.length < 1 &&
          cases[index + 1].position.letter === cases[index].position.letter
        ) {
          cases[index + 1].highlighted = true;
        }
        if (
          mostRightCase >= 0 &&
          cases[mostRightCase + 1] &&
          cases[mostRightCase + 1].shipIndex.length < 1 &&
          cases[mostRightCase + 1].position.letter ===
            cases[mostRightCase].position.letter
        ) {
          cases[mostRightCase + 1].highlighted = true;
        }
      }

      if (canVertical) {
        const shipsPositionV = this.props.selectedShip?.positions.sort((a, b) =>
          a.letter.localeCompare(b.letter)
        );
        //up
        if (
          cases[index - 10] &&
          cases[index - 10].shipIndex.length < 1 &&
          cases[index - 10].position.number === cases[index].position.number
        ) {
          cases[index - 10].highlighted = true;
        }
        const mostUpCase: number = cases.findIndex(
          (value) => value.position === shipsPositionV[0]
        );

        if (
          mostUpCase >= 0 &&
          cases[mostUpCase - 10] &&
          cases[mostUpCase - 10].shipIndex.length < 1 &&
          cases[mostUpCase - 10].position.number ===
            cases[mostUpCase].position.number
        ) {
          console.log(cases[mostUpCase - 10]);
          cases[mostUpCase - 10].highlighted = true;
        }
        const mostDownCase: number = cases.findIndex(
          (value) =>
            value.position ===
            shipsPositionV[this.props.selectedShip?.positions.length!! - 1]
        );
        if (
          cases[index + 10] &&
          cases[index + 10].shipIndex.length < 1 &&
          cases[index + 10].position.number === cases[index].position.number
        ) {
          cases[index + 10].highlighted = true;
        }
        if (
          mostDownCase >= 0 &&
          cases[mostDownCase + 10] &&
          cases[mostDownCase + 10].shipIndex.length < 1 &&
          cases[mostDownCase + 10].position.number ===
            cases[mostDownCase].position.number
        ) {
          cases[mostDownCase + 10].highlighted = true;
        }
      }
    }
    return cases;
  }
}

export default Grid;
