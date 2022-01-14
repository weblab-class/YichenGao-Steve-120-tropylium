import React from "react";

type StartProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const Start = (props: StartProp) => {
  return (
    <div>
      test start point
      <button onClick={props.prevStep}>BACK</button>
      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default Start;
