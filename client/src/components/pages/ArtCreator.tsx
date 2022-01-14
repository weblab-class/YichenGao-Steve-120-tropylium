import React, { useState } from "react";
import Pattern from "../modules/Pattern";
import StartPoint from "../modules/StartPoint";
import EndPoint from "../modules/EndPoint";
import Parameters from "../modules/Parameters";
import Result from "../modules/Result";
import { RouteComponentProps } from "@reach/router";

type ArtCreatorProps = RouteComponentProps & {
  //TODO
};

const GRID_SIZE = 10;

const ArtCreator = (props: ArtCreatorProps) => {
  // info to get from inputs (grid pattern, start, end)
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
  const [startPoint, setStartPoint] = useState([-1, -1]);
  const [endPoint, setEndPoint] = useState([-1, -1]);

  // keeping track of steps
  const [stepNumber, setStepNumber] = useState(0);
  const nextStep = () => {
    setStepNumber(stepNumber + 1);
  };
  const prevStep = () => {
    setStepNumber(stepNumber - 1);
  };

  const renderFromStepNumber = (stepNumber: number) => {
    switch (stepNumber) {
      case 0:
        return <Pattern nextStep={nextStep} grid={grid} changeCellState={changeCellState} />;
      case 1:
        return (
          <StartPoint
            nextStep={nextStep}
            prevStep={prevStep}
            grid={grid}
            startPoint={startPoint}
            setStartPoint={setStartPoint}
          />
        );
      case 2:
        return <EndPoint nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Parameters nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Result prevStep={prevStep} />;
    }
  };

  return <div>{renderFromStepNumber(stepNumber)}</div>;
};

export default ArtCreator;
