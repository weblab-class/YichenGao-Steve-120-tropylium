import React from "react";

type SegmentsProp = {
  nextStep: () => void;
};

const Segments = (props: SegmentsProp) => {
  return (
    <div>
      test segments
      <button onClick={props.nextStep}>NEXT</button>
    </div>
  );
};

export default Segments;
