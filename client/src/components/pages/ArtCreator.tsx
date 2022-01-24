import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";

import { GRID_SIZE } from "../../constants/Constants";
import Pattern from "../modules/Pattern";
import StartPoint from "../modules/StartPoint";
import EndPoint from "../modules/EndPoint";
import Parameters from "../modules/Parameters";
import Result from "../modules/Result";
import "./ArtCreator.css";

type ArtCreatorProps = RouteComponentProps & {
  userId: String;
};

const ArtCreator = (props: ArtCreatorProps): JSX.Element => {
  // info to get from inputs (grid pattern, start, end)
  const [grid, setGrid] = useState(
    new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(false))
  );
  const changeCellState = (x: number, y: number): void => {
    let newGrid = grid.map((a) => {
      return [...a];
    });
    newGrid[x][y] = !newGrid[x][y];
    setGrid(newGrid);
  };
  const [startCoords, setStartCoords] = useState([-1, -1]);
  const [endCoords, setEndCoords] = useState([-1, -1]);
  const [numIterations, setNumIterations] = useState(undefined);

  // keeping track of steps
  const [stepNumber, setStepNumber] = useState(0);
  const nextStep = (): void => {
    setStepNumber(stepNumber + 1);
  };
  const prevStep = (): void => {
    setStepNumber(stepNumber - 1);
  };

  const renderFromStepNumber = (stepNumber: number): JSX.Element => {
    switch (stepNumber) {
      case 0:
        return (
          <Pattern
            stepNumber={stepNumber}
            nextStep={nextStep}
            grid={grid}
            changeCellState={changeCellState}
          />
        );
      case 1:
        return (
          <StartPoint
            nextStep={nextStep}
            prevStep={prevStep}
            grid={grid}
            startCoords={startCoords}
            setStartCoords={setStartCoords}
          />
        );
      case 2:
        return (
          <EndPoint
            nextStep={nextStep}
            prevStep={prevStep}
            grid={grid}
            startCoords={startCoords}
            endCoords={endCoords}
            setEndCoords={setEndCoords}
          />
        );
      case 3:
        return (
          <Parameters
            nextStep={nextStep}
            prevStep={prevStep}
            numIterations={numIterations}
            setNumIterations={setNumIterations}
          />
        );
      case 4:
        return (
          <Result
            prevStep={prevStep}
            grid={grid}
            startCoords={startCoords}
            endCoords={endCoords}
            numIterations={numIterations}
          />
        );
    }
  };

  const renderLoginWarning = (): JSX.Element => {
    return <div className="ArtCreator-loginWarning">You must be logged in to continue!</div>;
  };

  return (
    <div className="ArtCreator-background">
      {props.userId ? renderFromStepNumber(stepNumber) : renderLoginWarning()}
    </div>
  );
};

export default ArtCreator;
