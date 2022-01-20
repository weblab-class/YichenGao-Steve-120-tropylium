import React, {useState, useRef, useEffect} from "react";
import { InitialState, DrawData } from "../../pages/FractalCreator";
import * as d3 from 'd3'

import "./FractalRenderer.css";

type FractalRendererProps = {
    draw_data: DrawData[]
    num_iterations: number
    getInitialStateFromDrawType: (string) => InitialState
}

const FractalRenderer = (props: FractalRendererProps) => {
    
    const svg_container = useRef(undefined);
    
    // input is guaranteed to be a single character
    function isLetter(testLetter: string): boolean {
        return "QWERTYUIOPASDFGHJKLZXCVBNM".includes(testLetter);
    }

    useEffect(() => {
        //console.log('rerender');
        //let initialState = props.initialState;
        //console.log(initialState)
        const selection = d3.select(svg_container.current);
        const svg = selection.select('svg');
        const g = selection.select('g');
        let zoomHandler = d3.zoom().scaleExtent([0.01,2]).on("zoom", function (event) {
            g.attr("transform", event.transform)
        });
        zoomHandler.translateTo(svg, 0,0);
        
        svg.call(zoomHandler);

        // console.log(renderString);
        // g.selectAll('g')
        // .remove();
        g.selectAll('g')
        .data(props.draw_data)
        .join(
            function(enter) {
                return enter
                .append('g')
                .attr('transform', (data: DrawData) => 
                    {
                     const x = props.getInitialStateFromDrawType(data.drawType).start_point[0];
                     const y = props.getInitialStateFromDrawType(data.drawType).start_point[1];
                    const rotated_x =x*Math.cos(data.start_direction*Math.PI/180) - y*Math.sin(data.start_direction*Math.PI/180)
                    const rotated_y =y*Math.cos(data.start_direction*Math.PI/180) + x*Math.sin(data.start_direction*Math.PI/180)
                        return `translate(${(data.start_point[0]-rotated_x)*32}, ${(data.start_point[1]-rotated_y)*32}) rotate(${data.start_direction})`
                })
                .selectAll('rect')
                .data((data: DrawData) => {
                    return props.getInitialStateFromDrawType(data.drawType).selected_points
                })
                .join(function(enter) {
                    return enter
                        .append('rect')
                        .attr('x', (d) => (d[0]-0.5)*32)
                        .attr('y', (d) => (d[1]-0.5)*32)
                        .attr('width', 32)
                        .attr('height', 32)
                        .attr('fill', '#000');
                    
                    },
                    function(update) {
                        return update
                        // .attr('x', (d) => (d[0]-initialState.start_points[0]-0.5)*32)
                        // .attr('y', (d) => (d[1]-initialState.start_points[1]-0.5)*32)
                        // .attr('width', 32)
                        // .attr('height', 32)
                        // .attr('fill', '#000');
                        // ;
                    },
                    function(exit) {
                        return exit.remove();
                    }
                );
            },
            function(update) {
                return update
                .attr('transform', (data: DrawData) => 
                    {
                     const x = props.getInitialStateFromDrawType(data.drawType).start_point[0];
                     const y = props.getInitialStateFromDrawType(data.drawType).start_point[1];
                    const rotated_x =x*Math.cos(data.start_direction*Math.PI/180) - y*Math.sin(data.start_direction*Math.PI/180)
                    const rotated_y =y*Math.cos(data.start_direction*Math.PI/180) + x*Math.sin(data.start_direction*Math.PI/180)
                    //console.log((data.start_point[0]-rotated_x)*32);
                    return `translate(${(data.start_point[0]-rotated_x)*32}, ${(data.start_point[1]-rotated_y)*32}) rotate(${data.start_direction})`
                })
                .selectAll('rect')
                .data((data: DrawData) => {
                    return props.getInitialStateFromDrawType(data.drawType).selected_points
                })
                .join(function(enter) {
                    return enter
                        .append('rect')
                        .attr('x', (d) => (d[0]-0.5)*32)
                        .attr('y', (d) => (d[1]-0.5)*32)
                        .attr('width', 32)
                        .attr('height', 32)
                        .attr('fill', '#000');
                    
                    },
                    function(update) {
                        return update
                        // .attr('x', (d) => (d[0]-initialState.start_points[0]-0.5)*32)
                        // .attr('y', (d) => (d[1]-initialState.start_points[1]-0.5)*32)
                        // .attr('width', 32)
                        // .attr('height', 32)
                        // .attr('fill', '#000');
                        // ;
                    },
                    function(exit) {
                        return exit.remove();
                    }
                );
            },
            function(exit){
                return exit.remove();
            },
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