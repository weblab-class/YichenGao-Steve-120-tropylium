import React, { useEffect, useState } from "react";
import ButtonGrid from "./ButtonGrid";

type PatternProp = {
  nextStep: () => void;
};

const GRID_SIZE = 10;

const Pattern = (props: PatternProp) => {
  const [grid, setGrid] = useState(
    new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(false))
  );

  const changeCellState = (x: number, y: number) => {
    let newGrid = grid.map((a) => {
      return [...a];
    });
    newGrid[x][y] = !newGrid[x][y];
    setGrid(newGrid);
  };

  return (
    <div>
      <h1>Step 1: Choose Pattern</h1>
      <p>
        Draw the initial seed pattern that will be copy-pasted over and over again to generate the
        fractal.
      </p>

      <ButtonGrid grid={grid} changeCellState={changeCellState} />

      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default Pattern;
