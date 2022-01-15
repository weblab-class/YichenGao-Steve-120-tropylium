import React from "react";

type ParametersProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const Parameters = (props: ParametersProp) => {
  return (
    <div>
      <h1>Step 4: Choose Parameters</h1>
      <p>Only 90 degree clockwise rotation is currently supported.</p>
      <button onClick={props.prevStep}>BACK</button>
      <button onClick={props.nextStep}>GENERATE MY FRACTAL!</button>
    </div>
  );
};

export default Parameters;
