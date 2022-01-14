import React from "react";
import "./ButtonGrid.css";

type ButtonGridProps = {
  grid: boolean[][];
  startPoint?: number[];
  endPoint?: number[];
  changeCellState: (x: number, y: number) => void;
};

const ButtonGrid = (props: ButtonGridProps) => {
  const buttonClassifier = (ridx: number, cidx: number) => {
    if (
      props.hasOwnProperty("endPoint") &&
      props.endPoint[0] === ridx &&
      props.endPoint[1] === cidx
    ) {
      return "ButtonGrid-endpoint";
    } else if (
      props.hasOwnProperty("startPoint") &&
      props.startPoint[0] === ridx &&
      props.endPoint[1] === cidx
    ) {
      return "ButtonGrid-startpoint";
    } else if (props.grid[ridx][cidx]) {
      return "ButtonGrid-clicked";
    } else {
      return "ButtonGrid-unclicked";
    }
  };

  const rowMapper = (row: boolean[], ridx: number) => {
    return row.map((cell, cidx) => {
      return (
        <button
          onClick={() => props.changeCellState(ridx, cidx)}
          className={`ButtonGrid-button ${buttonClassifier(ridx, cidx)}`}
        >
          {ridx} {cidx}
        </button>
      );
    });
  };

  return (
    <div>
      {props.grid.map((row, ridx) => {
        return (
          <>
            {rowMapper(row, ridx)}
            <br />
          </>
        );
      })}
    </div>
  );
};

export default ButtonGrid;
