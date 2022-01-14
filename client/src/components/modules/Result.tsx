import React from "react";

type ResultProp = {
  prevStep: () => void;
};

const Result = (props: ResultProp) => {
  return (
    <div>
      test result
      <button onClick={props.prevStep}>BACK</button>
    </div>
  );
};

export default Result;
