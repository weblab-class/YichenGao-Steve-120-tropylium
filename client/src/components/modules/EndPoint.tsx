import React from "react";

type EndPointProp = {
  nextStep: () => void;
  prevStep: () => void;
};

const EndPoint = (props: EndPointProp) => {
  return (
    <div>
      test end point
      <button onClick={props.prevStep}>BACK</button>
      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default EndPoint;
