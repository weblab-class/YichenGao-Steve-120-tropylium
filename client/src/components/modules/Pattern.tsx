import React, { useEffect, useState } from "react";
import ButtonGrid from "./ButtonGrid";

type PatternProp = {
  nextStep: () => void;
  grid: boolean[][];
  changeCellState: (x: number, y: number) => void;
};

const GRID_SIZE = 10;

const Pattern = (props: PatternProp) => {
  return (
    <div>
      <h1>Step 1: Choose Pattern</h1>
      <p>
        Draw the initial seed pattern that will be copy-pasted over and over again to generate the
        fractal.
      </p>

      <ButtonGrid grid={props.grid} changeCellState={props.changeCellState} />

      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default Pattern;