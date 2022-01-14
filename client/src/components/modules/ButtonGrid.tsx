import React from "react";
import "./ButtonGrid.css";

type ButtonGridProps = {
  grid: boolean[][];
  changeCellState: (x: number, y: number) => void;
};

const ButtonGrid = (props: ButtonGridProps) => {
  return (
    <div>
      {props.grid.map((row, ridx) => {
        return (
          <>
            {row.map((cell, cidx) => {
              return (
                <button
                  onClick={() => props.changeCellState(ridx, cidx)}
                  className={`button ${props.grid[ridx][cidx] ? "clicked" : "unclicked"}`}
                >
                  {ridx} {cidx}
                </button>
              );
            })}
            <br />
          </>
        );
      })}
    </div>
  );
};

export default ButtonGrid;
