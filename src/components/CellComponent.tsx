import { FC, useCallback } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  const handleClick = useCallback(() => {
    if (click) return click(cell);
  }, [cell, click]);

  return (
    <div
      onClick={handleClick}
      className={[
        "cell",
        cell.color,
        selected ? "selected" : "",
        cell.available && cell?.figure ? "atack" : "",
      ].join(" ")}
    >
      {cell.available && !cell?.figure && <div className="available" />}
      {cell.figure?.logo && (
        <img src={cell.figure?.logo} alt={cell.figure.name} />
      )}
    </div>
  );
};

export default CellComponent;
