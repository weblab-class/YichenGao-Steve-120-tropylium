import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import { RouteComponentProps } from "@reach/router";

import './Dtest.css';

type d3testProp = RouteComponentProps & {

}

const Dtest = (props: d3testProp) => {
    const graph_container = useRef(null);
    const width: number = 800;
    const height: number = 800;
    const center_x: number = width/2;
    const center_y: number = height/2;
    let zoom;

    useEffect(() => {
        //zoom = d3.zoom();
        // const graph = d3
        //     .select(graph_container.current)
        //     .append("svg")
        //     .attr("width", 800)
        //     .attr("height", 800)
        //     .call(zoom.on("zoom", function (event) {
        //         graph.attr("transform", event.transform)
        //      }))
        //      .append("g")
        //     ;
        const selection = d3.select(graph_container.current);

        const svg = selection.append("svg")
            .attr("width", width)
            .attr("height", height);
        
        const g = svg.append("g");

        zoom = d3.zoom().on("zoom", function (event) {
            g.attr("transform", event.transform)
        });

        selection.call(zoom);


        // background
        g.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "white");
        
        g.append('circle')
        .attr('cx', center_x)
        .attr('cy', center_y)
        .attr('r', 50)
        .attr('stroke', 'black')
        .attr('fill', '#69a3b2');
    });

    const resetGraph= (event) => {
        d3.select(graph_container.current)
		.transition()
        .call(zoom.transform, d3.zoomIdentity);
    }

    const zoomOut = (event) => {
        d3.select(graph_container.current)
		.transition()
        .call(zoom.scaleBy, 0.5, [center_x,center_y]);
    }

    const zoomIn = (event) => {
        d3.select(graph_container.current)
		.transition()
        .call(zoom.scaleBy, 2, [center_x,center_y]);
    }

    return (
    <div className="dtest-container">
        <div ref = {graph_container} className="dtest-graph-container"></div>
        <div className="dtest-button-container">
            <div className="dtest-button" onClick={resetGraph}>Reset</div>
            <div className="dtest-button" onClick={zoomOut}>Zoom Out</div>
            <div className="dtest-button" onClick={zoomIn}>Zoom In</div>
        </div>
    </div>);
}

export default Dtest;