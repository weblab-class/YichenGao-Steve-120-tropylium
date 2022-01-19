import React, {useState, useRef, useEffect} from "react";
import { InitialState } from "../pages/FractalCreator";
import * as d3 from 'd3'

import "./FractalRenderer.css";

type FractalRendererProps = {
    initialState: InitialState
    numIterations: number
}

type DrawData = {
    start_point: number[]
    start_direction: number
    drawType: string
}

const FractalRenderer = (props: FractalRendererProps) => {
    
    const svg_container = useRef(undefined);
    
    // input is guaranteed to be a single character
    function isLetter(testLetter: string): boolean {
        return "QWERTYUIOPASDFGHJKLZXCVBNM".includes(testLetter);
    }

    useEffect(() => {
        //console.log('rerender');
        let initialState = props.initialState;
        //console.log(initialState)
        const selection = d3.select(svg_container.current);
        const svg = selection.select('svg');
        const g = selection.select('g');
        let zoomHandler = d3.zoom().scaleExtent([0.01,2]).on("zoom", function (event) {
            g.attr("transform", event.transform)
        });
        zoomHandler.translateTo(svg, 0,0);
        
        svg.call(zoomHandler);

        if(initialState.start_points.length === 2 && initialState.end_points.length === 2) {
        let renderString = "A";
        const rules = {
            "A": "A+B",
            "B": "A-B",
            "+": "+",
            "-": "-",
        }
        for(let i = 0; i < props.numIterations; i++) {
            let newRenderString = "";
            for(let char of renderString) {
                newRenderString += rules[char];
            }
            renderString = newRenderString;
        }
        
        const translation = initialState.end_points.map(
            (value: number, index: number) => (value - initialState.start_points[index]));
        
        let current_start = [0,0];
        let current_direction = 0.0;

        // console.log(renderString);
        // console.log("translation" + translation[0] + "," + translation[1]);
        const drawData: DrawData[] = [];
        for(let char of renderString) {
            if(isLetter(char)) {
                //console.log(`Current start (${Math.round(current_start[0])},${Math.round(current_start[1])})`);
                //console.log(`Current Direction ${current_direction}`)
                const direction_radians = current_direction*Math.PI/180.0;
                drawData.push({
                    start_point: current_start,
                    start_direction: current_direction,
                    drawType: char,
                } as DrawData);
                const x = translation[0], y = translation[1];
                current_start = [
                    current_start[0] + x*Math.cos(direction_radians) - y*Math.sin(direction_radians),
                    current_start[1] + x*Math.sin(direction_radians) + y*Math.cos(direction_radians),
                ];
                //console.log(`New Current start (${Math.round(current_start[0])},${Math.round(current_start[1])})`);
            } else {
                switch(char) {
                    case '+':
                        current_direction += 270;
                        break;
                    case '-':
                        current_direction += 90;
                        break;
                }
                if(current_direction > 360)
                    current_direction -= 360;
            }
        }
        // console.log(renderString);
        // g.selectAll('g')
        // .remove();
        g.selectAll('g')
        .data(drawData)
        .join(
            function(enter) {
                return enter
                .append('g')
                .attr('transform', (data: DrawData) => 
                    {return `translate(${data.start_point[0]*32},${data.start_point[1]*32}) rotate(${data.start_direction})`})
                .selectAll('rect')
                .data((initialState.selected_points))
                .join(function(enter) {
                    return enter
                        .append('rect')
                        .attr('x', (d) => (d[0]-initialState.start_points[0]-0.5)*32)
                        .attr('y', (d) => (d[1]-initialState.start_points[1]-0.5)*32)
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
                        return exit;
                    }
                );
            },
            function(update) {
                return update
                .attr('transform', (data: DrawData) => 
                    {return `translate(${data.start_point[0]*32},${data.start_point[1]*32}) rotate(${data.start_direction})`})
                .selectAll('rect')
                .data((initialState.selected_points))
                .join(function(enter) {
                    return enter
                        .append('rect')
                        .attr('x', (d) => (d[0]-initialState.start_points[0]-0.5)*32)
                        .attr('y', (d) => (d[1]-initialState.start_points[1]-0.5)*32)
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
        
        }
    
    });
    return (<div ref = {svg_container} className="fractal-renderer_container">
        <svg width='100%' height = '100%'>
            <g>

            </g>
        </svg>
    </div>);
}

export default FractalRenderer;