import React, { useEffect } from "react";
import { Link } from "@reach/router";

import "./Card.css";
import * as d3 from "d3";
import D3Drawer from "./D3Drawer";

type CardProps = {
  artworkId: string;
  cellDeltas: [number, number][];
  endDelta: [number, number];
  numIterations: number;
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
    svg.attr("width", "100%");
    svg.attr("height", "100%");
    // svg.attr("preserveAspectRatio", "xMinYMin meet").classed("Result-svgResponsive", true);
    const artist = new D3Drawer(
      props.cellDeltas,
      props.endDelta,
      Math.min(5, props.numIterations),
      svg
    );
    artist.render();
  };
  const ref = useD3(doD3Stuff);

  return (
    <div className="Card-container">
      <div className="Card-svgRenderer">
        <svg id="svgContainer" ref={ref}></svg>
      </div>

      <Link to={`/fractal_creator/${props.artworkId}`} className="Card-link">
        <div className="Card-caption">Project {props.position}</div>
      </Link>
    </div>
  );
};

export default Card;
