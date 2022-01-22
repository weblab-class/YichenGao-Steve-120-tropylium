import React from "react";

import "./Pattern.css";
import ButtonGrid from "./ButtonGrid";

type PatternProp = {
  nextStep: () => void;
  grid: boolean[][];
  changeCellState: (x: number, y: number) => void;
};

const Pattern = (props: PatternProp) => {
  return (
    <div className="Pattern-container">
      <div className="Pattern-sidebar">
        <h1 className="Pattern-title">Step 1: Choose Pattern</h1>
        <p className="Pattern-body">
          Draw the initial seed pattern that will be copy-pasted over and over again to generate the
          fractal. Please select at least two cells.
        </p>
        <div className="Pattern-stepper">
          <button onClick={props.nextStep}>NEXT</button>
        </div>
      </div>
      <div className="Pattern-content">
        <ButtonGrid grid={props.grid} handleClick={props.changeCellState} />
      </div>
    </div>
  );
};

export default Pattern;
