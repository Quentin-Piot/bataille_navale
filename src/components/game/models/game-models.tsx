export interface Ship {
  label: string;
  index: string;
  selected: boolean;
  color: string;
  remainingPlacement: number;
  totalPlacement: number;
  positions: Array<PositionOnGrid>;
}

export interface PositionOnGrid {
    letter : string;
    number : string;
}

export interface Case {
    label: string;
    position : PositionOnGrid;
    color: string;
    shipIndex: string;
    highlighted: boolean;
  }