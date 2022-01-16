import React, { useEffect } from "react";
import * as d3 from "d3";
import D3Drawer from "./D3Drawer";

type ResultProp = {
  prevStep: () => void;
  grid: boolean[][];
  startCoords: number[];
  endCoords: number[];
  numIterations: number;
};

const useD3 = (renderD3) => {
  const ref = React.useRef();
  useEffect(() => {
    renderD3(d3.select(ref.current));
    return () => {};
  }, []);
  return ref;
};

const Result = (props: ResultProp) => {
  const doD3Stuff = (svg) => {
    svg.attr("width", 1000).attr("height", 1000);
    const artist = new D3Drawer(
      props.grid,
      props.startCoords,
      props.endCoords,
      props.numIterations,
      svg
    );
    artist.render();
  };

  const ref = useD3(doD3Stuff);

  return (
    <div>
      test result
      <div>
        <svg id="svgContainer" ref={ref}></svg>
      </div>
      <button onClick={props.prevStep}>BACK</button>
    </div>
  );
};

export default Result;
