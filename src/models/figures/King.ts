import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";
import { Cell } from "../Cell";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (
      (this.cell.x - target.x === 1 || this.cell.x - target.x === -1) &&
      this.cell.y === target.y
    )
      return true;
    if (
      (this.cell.y - target.y === 1 || this.cell.y - target.y === -1) &&
      this.cell.x === target.x
    )
      return true;

    if (
      (this.cell.x - target.x === 1 || this.cell.x - target.x === -1) &&
      (this.cell.y - target.y === 1 || this.cell.y - target.y === -1)
    )
      return true;
    if (
      (this.cell.y - target.y === 1 || this.cell.y - target.y === -1) &&
      (this.cell.x - target.x === 1 || this.cell.x - target.x === -1)
    )
      return true;

    return false;
  }
}
