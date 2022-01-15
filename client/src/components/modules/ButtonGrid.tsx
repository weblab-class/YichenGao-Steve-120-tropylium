import React, { useEffect } from "react";
import "./ButtonGrid.css";

type ButtonGridProps = {
  grid: boolean[][];
  startCoords?: number[];
  endCoords?: number[];
  handleClick: (x: number, y: number) => void;
};

const ButtonGrid = (props: ButtonGridProps) => {
  const buttonClassifier = (ridx: number, cidx: number) => {
    if (
      props.hasOwnProperty("endCoords") &&
      props.endCoords[0] === ridx &&
      props.endCoords[1] === cidx
    ) {
      return "ButtonGrid-endPoint";
    } else if (
      props.hasOwnProperty("startCoords") &&
      props.startCoords[0] === ridx &&
      props.startCoords[1] === cidx
    ) {
      return "ButtonGrid-startPoint";
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
          onClick={() => props.handleClick(ridx, cidx)}
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
