import React, { SetStateAction, useEffect, useState } from "react";
import ButtonGrid from "./ButtonGrid";
import { isEqual } from "../../constants/Constants";

type EndPointProp = {
  nextStep: () => void;
  prevStep: () => void;
  grid: boolean[][];
  startCoords: number[];
  endCoords: number[];
  setEndCoords: React.Dispatch<SetStateAction<number[]>>;
};

const EndPoint = (props: EndPointProp) => {
  const [outOfPattern, setOutOfPattern] = useState(false);
  const [sameAsStart, setSameAsStart] = useState(false);

  const setNewEndPoint = (x: number, y: number) => {
    if (props.grid[x][y] && !isEqual([x, y], props.startCoords)) {
      props.setEndCoords([x, y]);
      setOutOfPattern(false);
      setSameAsStart(false);
    } else if (isEqual([x, y], props.startCoords)) {
      setOutOfPattern(false);
      setSameAsStart(true);
    } else {
      setSameAsStart(false);
      setOutOfPattern(true);
    }
  };

  useEffect(() => {
    let [x2, y2] = props.endCoords;
    if (isEqual([x2, y2], props.startCoords)) {
      props.setEndCoords([-1, -1]);
    } else if (x2 >= 0 && !props.grid[x2][y2]) {
      props.setEndCoords([-1, -1]);
    }
  }, []);

  return (
    <div>
      <h1>Step 3: Choose End Point</h1>
      <p>Select the ending point. New copies are attached to the original's ending point.</p>

      {outOfPattern ? (
        <p>ERROR: Ending point has to be part of the pattern!</p>
      ) : sameAsStart ? (
        <p>ERROR: Ending point cannot be the same as the starting point!</p>
      ) : (
        <></>
      )}

      <ButtonGrid
        grid={props.grid}
        startCoords={props.startCoords}
        endCoords={props.endCoords}
        handleClick={setNewEndPoint}
      />

      <button onClick={props.prevStep}>BACK</button>
      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default EndPoint;
