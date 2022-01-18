import React, {useState, useRef, useEffect} from "react";
import { InitialState } from "../pages/FractalCreator";
import * as d3 from 'd3'

import "./FractalRenderer.css";

type FractalRendererProps = {
    initialState: InitialState
    numIterations: number
}

const FractalRenderer = (props: FractalRendererProps) => {
    
    const svg_container = useRef(undefined);

    useEffect(() => {
        const selection = d3.select(svg_container.current);
        const svg = selection.select('svg');
        const g = selection.select('g');
        let zoomHandler = d3.zoom().scaleExtent([0.01,5]).on("zoom", function (event) {
            g.attr("transform", event.transform)
        });
        
        svg.call(zoomHandler);

        let current_start = [0,0];
        let current_direction = 0.0;

        g
        .selectAll('rect')
        .data(props.initialState.selected_points)
        .join(function(enter) {
            return enter
                .append('rect')
                .attr('x', (d) => d[0]*100)
                .attr('y', (d) => d[1]*100)
                .attr('width', 100)
                .attr('height', 100)
                .attr('fill', '#fe4');
            
            },
            function(update) {
                return update
                .attr('x', (d) => d[0]*100)
                .attr('y', (d) => d[1]*100)
                .attr('width', 100)
                .attr('height', 100)
                .attr('fill', '#fe4');
                ;
            },
            function(exit) {
                return exit;
            }
        );
    
    });
    return (<div ref = {svg_container} className="fractal-renderer_container">
        <svg width='100%' height = '100%'>
            <g>

            </g>
        </svg>
    </div>);
}

export default FractalRenderer;