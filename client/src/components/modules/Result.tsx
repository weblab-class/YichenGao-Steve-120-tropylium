import React, { useEffect } from "react";
import * as d3 from "d3";
import D3Drawer from "./D3Drawer";
import { GRID_SIZE } from "../../constants/Constants";
import { post } from "../../utilities";

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
  // convert to more usable data structure
  let cellDeltas: number[][] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (props.grid[i][j]) {
        cellDeltas.push([j - props.startCoords[1], i - props.startCoords[0]]);
      }
    }
  }
  let endDelta: number[] = [
    props.endCoords[1] - props.startCoords[1],
    props.endCoords[0] - props.startCoords[0],
  ];

  const body = { cellDeltas: cellDeltas, endDelta: endDelta, numIterations: props.numIterations };
  post("/api/artwork", body);

  // D3 rendering
  const doD3Stuff = (svg) => {
    svg.attr("width", 1000).attr("height", 1000);
    const artist = new D3Drawer(cellDeltas, endDelta, props.numIterations, svg);
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
