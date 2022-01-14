import React from "react";

type ParametersProp = {
  nextStep: () => void;
};

const Parameters = (props: ParametersProp) => {
  return (
    <div>
      test parameters
      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default Parameters;
