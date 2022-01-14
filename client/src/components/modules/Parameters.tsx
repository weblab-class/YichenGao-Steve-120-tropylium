import React from "react";

type ParametersProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const Parameters = (props: ParametersProp) => {
  return (
    <div>
      test parameters
      <button onClick={props.prevStep}>BACK</button>
      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default Parameters;
