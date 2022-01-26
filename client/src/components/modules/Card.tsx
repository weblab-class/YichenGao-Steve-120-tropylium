import React, { useState, useEffect } from "react";

import "./Card.css";
import * as d3 from "d3";
import D3Drawer from "./D3Drawer";

type CardProps = {
  cellDeltas: [number, number][];
  endDelta: [number, number];
  position: number;
};

const useD3 = (renderD3) => {
  const ref = React.useRef();
  useEffect(() => {
    renderD3(d3.select(ref.current));
    return () => {};
  }, []);
  return ref;
};

const Card = (props: CardProps) => {
  // D3 rendering of preview
  const doD3Stuff = (svg) => {
    // svg.attr("preserveAspectRatio", "xMinYMin meet").classed("Result-svgResponsive", true);
    const artist = new D3Drawer(props.cellDeltas, props.endDelta, 5, svg);
    artist.render();
  };
  const ref = useD3(doD3Stuff);

  return (
    <div className="Card-container Card-svgRenderer">
      <svg id="svgContainer" ref={ref}></svg>
    </div>
  );
};

export default Card;