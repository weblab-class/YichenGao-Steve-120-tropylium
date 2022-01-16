import React, { SetStateAction, useEffect, useState } from "react";
import ButtonGrid from "./ButtonGrid";

type StartProp = {
  nextStep: () => void;
  prevStep: () => void;
  grid: boolean[][];
  startCoords: number[];
  setStartCoords: React.Dispatch<SetStateAction<number[]>>;
};

const Start = (props: StartProp) => {
  const [outOfPattern, setOutOfPattern] = useState(false);

  const setNewStartPoint = (x: number, y: number) => {
    if (props.grid[x][y]) {
      props.setStartCoords([x, y]);
      setOutOfPattern(false);
    } else {
      setOutOfPattern(true);
    }
  };

  useEffect(() => {
    let [x1, y1] = props.startCoords;
    if (x1 >= 0 && !props.grid[x1][y1]) {
      props.setStartCoords([-1, -1]);
    }
  }, []);

  return (
    <div>
      <h1>Step 2: Choose Start Point</h1>
      <p>
        Select the starting point. New copies of the pattern are attached to the original at their
        starting point.
      </p>

      {outOfPattern ? <p>ERROR: Starting point has to be part of the pattern!</p> : <></>}

      <ButtonGrid
        grid={props.grid}
        startCoords={props.startCoords}
        handleClick={setNewStartPoint}
      />

      <button onClick={props.prevStep}>BACK</button>
      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default Start;
