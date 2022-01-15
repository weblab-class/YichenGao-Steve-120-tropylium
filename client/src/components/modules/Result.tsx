import React from "react";

type ResultProp = {
  prevStep: () => void;
  grid: boolean[][];
  startCoords: number[];
  endCoords: number[];
};

const Result = (props: ResultProp) => {
  console.log(props.grid);
  console.log(props.startCoords);
  console.log(props.endCoords);
  return (
    <div>
      test result
      <button onClick={props.prevStep}>BACK</button>
    </div>
  );
};

export default Result;
