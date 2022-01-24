import { RouteComponentProps } from "@reach/router";
import React, {useState, useRef, useEffect} from "react";
import * as d3 from 'd3';
//import {Pattern, onPatternUpdate} from "../pages/FractalCreator"
import { PatternEditorState , RectData} from "./PatternEditor";

import "./PatternEditorRenderer.css"

type Props = RouteComponentProps & {
    rectData: RectData[][];
    onRectClick: (x: number, y: number) => void;
    editorState: PatternEditorState;
}

const PatternEditorRenderer = (props: Props) => {
    // console.log("INITIAL RENDERER RERENDER");
    // console.log(props.editorState);
    //const [editorState, setEditorState] = useState[props.editorState];
    const firstTime = useRef(true);

    const svg_container_ref = useRef(undefined);
    const WIDTH = 800, HEIGHT = 800, C_X = WIDTH/2, C_Y = HEIGHT/2;
    const GRID_SIZE = 10;

    function getFill(data:RectData): string {
        if(data.is_startpoint)
            return '#0f0'
        if(data.is_endpoint)
            return '#f00'
        if(data.is_selected)
            return '#000'
        return '#fff';
    }
    function getHoverFill(data:RectData): string {
        switch(props.editorState) {
            case PatternEditorState.SELECT_START:
                return '#0d0'
            case PatternEditorState.SELECT_END:
                return '#d00'
            case PatternEditorState.SELECT_REGULAR:
                return '#444'
        }
    }
    function getStroke(data:RectData): string {
        if(data.is_startpoint)
            return '#0d0'
        if(data.is_endpoint)
            return '#d00'
        if(data.is_selected)
            return '#444'
        return '#ddd';
    }

    useEffect(() => {
        function init(selection, rectData: RectData[][]) {
            // i don't want to deal with d3 and 2d data right now, but it is possible:
            // https://codepen.io/bungholio/pen/KrEOLj
            // getting the index would be slightly annoying because v6 d3 doesn't pass in index anymore...
    
            const new_rect_data: RectData[] = [];
            rectData.forEach(element => {
                new_rect_data.push(...element);
            });
                
            const rects = selection
                .selectAll('rect')
                .data(new_rect_data)
                .join(
                    function(enter) {
                        return enter.append('rect')
                            .attr('x', (data_value) => data_value.x*HEIGHT/GRID_SIZE)
                            .attr('y', (data_value) => data_value.y*HEIGHT/GRID_SIZE)
                            .attr('width', WIDTH/GRID_SIZE)
                            .attr('height', HEIGHT/GRID_SIZE)
                            .attr('fill', (data_value: RectData) => {
                                return getFill(data_value);
                            })
                            .attr('stroke', (data_value: RectData) => {
                                return getStroke(data_value);
                            })
                    },
                    function(update) {
                        return update
                        .transition()
                        .duration(200)
                        .attr('x', (data_value) => data_value.x*HEIGHT/GRID_SIZE)
                        .attr('y', (data_value) => data_value.y*HEIGHT/GRID_SIZE)
                        .attr('width', WIDTH/GRID_SIZE)
                        .attr('height', HEIGHT/GRID_SIZE)
                        .attr('fill', (data_value: RectData) => {
                            return getFill(data_value);
                        })
                        .attr('stroke', (data_value: RectData) => {
                            return getStroke(data_value);
                        });
                    },
                    function(exit) {
                        return exit;
                    },
                )
            ;
    
            rects.on("mouseover", function(event: MouseEvent, data: RectData) {
                d3.select(this)
                .attr('fill', getHoverFill(data));
                
            });
            rects.on("mouseout", function(event: MouseEvent, data: RectData) {
                d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', getFill(data));
            });
            rects.on("click", function(event: MouseEvent, data:RectData) {
                props.onRectClick(data.x, data.y);
            });
        }
    
        // useEffect(() => {
        //     const selection = d3.select(svg_container_ref.current);
    
        //     const svg = selection.append('svg')
        //         .attr('width', WIDTH)
        //         .attr('height', HEIGHT);
            
        //     const g = svg.append('g');
        //     init(g, props.rectData);
    
        // }, []);
        init(d3.select(svg_container_ref.current).select('svg').select('g'), props.rectData);
        // if(!firstTime.current)
            
        // else
        //     firstTime.current = false;
    });

    return (
            <div ref={svg_container_ref} className="create-initial-svg_container">
                <svg width={WIDTH+"px"} height={HEIGHT + "px"}>
                    <g>

                    </g>
                </svg>
            </div>
        );
}

export default PatternEditorRenderer;