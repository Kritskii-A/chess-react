import React, { FC, useCallback, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const click = useCallback(
    (cell: Cell) => {
      if (
        selectedCell &&
        selectedCell !== cell &&
        selectedCell.figure?.canMove(cell)
      ) {
        selectedCell.moveFigure(cell);
        setSelectedCell(null);
        swapPlayer();
      } else {
        if (cell.figure?.color === currentPlayer?.color) {
          setSelectedCell(cell);
        }
      }
    },
    [selectedCell, setSelectedCell, board, currentPlayer]
  );

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  return (
    <div className="board">
      {board.cells.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((cell) => (
            <CellComponent
              click={click}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
              cell={cell}
              key={cell.id}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
