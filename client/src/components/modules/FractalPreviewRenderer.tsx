import React, {useState, useRef, useEffect} from "react";
import { InitialState } from "../pages/FractalCreator";
import * as d3 from 'd3'

import "./FractalPreviewRenderer.css";

type FractalPreviewRendererProps = {
    initialState: InitialState;
}

const FractalPreviewRenderer = (props: FractalPreviewRendererProps) => {
    const PREVIEW_WIDTH = 100, PREVIEW_HEIGHT = 100, GRID_SIZE = 10;
    const svg_container = useRef(undefined);

    useEffect(() => {
        d3.select(svg_container.current).select('svg').select('g')
        .selectAll('rect')
        .data(props.initialState.selected_points)
        .join(
            function(enter) {
                return enter
                .append('rect')
                .attr('x', (data_value) => {console.log(data_value); return data_value[0]*PREVIEW_WIDTH/GRID_SIZE})
                .attr('y', (data_value) => data_value[1]*PREVIEW_HEIGHT/GRID_SIZE)
                .attr('width', PREVIEW_WIDTH/GRID_SIZE)
                .attr('height', PREVIEW_HEIGHT/GRID_SIZE)
                .attr('fill', (data_value: number[]) => {
                    if(data_value[0] === props.initialState.start_points[0]
                        && data_value[1] === props.initialState.start_points[1])
                        return '#0f0';
                    if(data_value[0] === props.initialState.end_points[0]
                        && data_value[1] === props.initialState.end_points[1])
                        return '#f00';
                    return '#000'
                });
            },
            function(update) {
                return update
                .attr('x', (data_value) => {console.log(data_value); return data_value[0]*PREVIEW_WIDTH/GRID_SIZE})
                .attr('y', (data_value) => data_value[1]*PREVIEW_HEIGHT/GRID_SIZE)
                .attr('width', PREVIEW_WIDTH/GRID_SIZE)
                .attr('height', PREVIEW_HEIGHT/GRID_SIZE)
                .attr('fill', (data_value: number[]) => {
                    if(data_value[0] === props.initialState.start_points[0]
                        && data_value[1] === props.initialState.start_points[1])
                        return '#0f0';
                    if(data_value[0] === props.initialState.end_points[0]
                        && data_value[1] === props.initialState.end_points[1])
                        return '#f00';
                    return '#000'
                });
            },
            function(exit) {
                return exit;
            }
        );
    });

    return (<div ref = {svg_container} className="fractal-preview-svg_container">
        <svg width = {`${PREVIEW_WIDTH}px`} height = {`${PREVIEW_HEIGHT}px`}>
            <g>

            </g>
        </svg>
    </div>);
}

export default FractalPreviewRenderer;