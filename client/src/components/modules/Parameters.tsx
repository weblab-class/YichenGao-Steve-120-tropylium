import React, { SetStateAction } from "react";

type ParametersProp = {
  nextStep: () => void;
  prevStep: () => void;
  numIterations: number;
  setNumIterations: React.Dispatch<SetStateAction<number>>;
};

const Parameters = (props: ParametersProp) => {
  const handleInputChange = (event) => {
    props.setNumIterations(event.target.value);
  };

  return (
    <div>
      <h1>Step 4: Choose Parameters</h1>
      <div>
        Number of iterations:
        <input type="text" value={props.numIterations} onChange={handleInputChange} />
      </div>
      <button onClick={props.prevStep}>BACK</button>
      <button onClick={props.nextStep}>GENERATE MY FRACTAL!</button>
    </div>
  );
};

export default Parameters;
