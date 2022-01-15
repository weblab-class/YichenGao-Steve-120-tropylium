import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import { RouteComponentProps } from "@reach/router";

import './Dtest.css';

type d3testProp = RouteComponentProps & {

}

const Dtest = (props: d3testProp) => {
    const graph_container = useRef(null);
    const [graph, setGraph] = useState(null);
    let zoom;

    useEffect(() => {
        drawCanvas();
    });

    function drawCanvas(): void {
        zoom = d3.zoom();
        const graph = d3
            .select(graph_container.current)
            .append("svg")
            .attr("width", 800)
            .attr("height", 800)
            .call(zoom.on("zoom", function (event) {
                graph.attr("transform", event.transform)
             }))
            .append("g")
            ;
        
        // function handleZoom(event): void {
        //     graph.attr('transform', event.transform);
        // }
        // let zoom = d3.zoom().on("zoom", handleZoom);
        // graph.call(zoom);

        const center_x = 400;
        const center_y = 400;

        // background
        graph.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "white");
        
        graph.append('circle')
        .attr('cx', center_x)
        .attr('cy', center_y)
        .attr('r', 50)
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2');
    }

    const resetGraph= (event) => {
        d3.select('svg')
		.transition()
		// .call(zoom.scaleTo, 1);
        .call(zoom.transform, d3.zoomIdentity.translate(0,0).scale(1))
    }

    return (
    <div className="dtest-container">
        <div ref = {graph_container} className="dtest-graph-container"></div>
        <div className="reset-button" onClick={resetGraph}>Reset</div>
    </div>);
}

export default Dtest;