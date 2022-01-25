import { RouteComponentProps } from "@reach/router";
import React, {useState, useRef, useEffect} from "react";
import * as d3 from 'd3';
import Util from "../../../../constants/Util";
import { PatternEditorState , RectData} from "./PatternEditor";

import "./PatternEditorRenderer.css"
import { Point } from "../../../../constants/Types";

type Props = RouteComponentProps & {
    editorState: PatternEditorState
    rectData: RectData[][]
    onRectClick: (x: number, y: number) => void
    start_point: number[]
    end_point: number[]
    focus_point: Point
    selected_color: number
    selected_shape: string
}

const PatternEditorRenderer = (props: Props) => {
    // console.log("INITIAL RENDERER RERENDER");
    // console.log(props.editorState);
    //const [editorState, setEditorState] = useState[props.editorState];
    // const firstTime = useRef(true);

    const svg_container_ref = useRef(undefined);
    const WIDTH = 800, HEIGHT = WIDTH, C_X = WIDTH/2, C_Y = HEIGHT/2;
    const GRID_SIZE = 10;


    useEffect(() => {
        const svg = d3.select(svg_container_ref.current).select('svg');
        svg.select("#hover").remove();

        const hover_visual = svg.append('g').attr('id', 'hover');
        let shape;
        let color;
        switch(props.editorState) {
            case PatternEditorState.SELECT_START:
                shape = 'start';
                color = 0x00FF00;
                break;
            case PatternEditorState.SELECT_END:
                shape = 'end';
                color = 0xFF0000;
                break;
            case PatternEditorState.SELECT_REGULAR:
                shape = props.selected_shape;
                color = props.selected_color;
                break;
        }
        Util.drawGraphic_d3(hover_visual, shape, WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, color)
        hover_visual.attr('opacity', 0.0);

        const mouseover = (event: MouseEvent) => {
            hover_visual
            .attr('opacity', 0.4);
        }
        svg.on("mouseover", mouseover);

        const mouseout = (event: MouseEvent) => {
            hover_visual
            .attr('opacity', 0);
        }
        svg.on("mouseout", mouseout);

        const mousemove = (event: MouseEvent) => {
            const step_x = event.offsetX - event.offsetX % (WIDTH/GRID_SIZE), 
            step_y= event.offsetY - event.offsetY % (HEIGHT/GRID_SIZE);
            hover_visual.attr('transform', `translate(${step_x},${step_y})`);
        }
        svg.on("mousemove", mousemove);

        return () => {
            svg.on("mouseover", undefined);
            svg.on("mouseout", undefined);
            svg.on("mousemove", undefined);
        }
    }, [props.editorState, props.selected_color, props.selected_shape]);


    useEffect(() => {
        const start_graphic = d3.select(svg_container_ref.current).select('svg').select("#start");
        Util.drawGraphic_d3(start_graphic, 'start', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0x00FF00)
        
        if(props.start_point && props.start_point.length == 2) {
            start_graphic
                .attr('transform', `translate(${props.start_point[0]*WIDTH/GRID_SIZE},${props.start_point[1]*HEIGHT/GRID_SIZE})`)
                .attr('opacity', 1);
        } else {
            start_graphic.attr('opacity', 0);
        }
    }, [props.start_point]);

    useEffect(() => {
        const end_graphic = d3.select(svg_container_ref.current).select('svg').select("#end");
        Util.drawGraphic_d3(end_graphic, 'end', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0xFF0000)
        
        if(props.end_point && props.end_point.length == 2) {
            end_graphic
                .attr('transform', `translate(${props.end_point[0]*WIDTH/GRID_SIZE},${props.end_point[1]*HEIGHT/GRID_SIZE})`)
                .attr('opacity', 1);
        } else {
            end_graphic.attr('opacity', 0);
        }
    }, [props.end_point]);

    useEffect(() => {
        const focus_graphic = d3.select(svg_container_ref.current).select('svg').select("#focus");
        Util.drawGraphic_d3(focus_graphic, 'focus', WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, 0x0000FF)
        
        if(props.focus_point.x && props.focus_point.y && props.editorState === PatternEditorState.SELECT_REGULAR) {
            focus_graphic
                .transition()
                .duration(200)
                .attr('transform', `translate(${props.focus_point.x*WIDTH/GRID_SIZE},${props.focus_point.y*HEIGHT/GRID_SIZE})`)
                .attr('opacity', 1);
        } else {
            focus_graphic.attr('opacity', 0).attr('z');
        }
    }, [props.focus_point, props.editorState]);

    useEffect(() => {
        const svg = d3.select(svg_container_ref.current).select('svg');
        const g = svg.select("#grid");
        for(let i = 0; i < GRID_SIZE; i++) {
            for(let j = 0; j < GRID_SIZE; j++) {
                g.append('rect')
                    .attr('x', i*HEIGHT/GRID_SIZE)
                    .attr('y', j*HEIGHT/GRID_SIZE)
                    .attr('width', WIDTH/GRID_SIZE)
                    .attr('height', HEIGHT/GRID_SIZE)
                    .attr('fill', '#fff')
                    .attr('stroke', '#ddd')
            }
        }
    }, []);

    useEffect(() => {
        const rect_data: RectData[] = [];
        
        props.rectData.forEach(element => {
            rect_data.push(...element);
        });

        const svg = d3.select(svg_container_ref.current).select('svg');
        const g = svg.select("#rects");

        g.selectAll('g')
            // .transition()
            // .ease(d3.easeLinear)
            // .duration(200)
            // .attr('opacity',0)
            .remove();

        
        for(let data of rect_data) {
            const cell_g = g.append('g');
            if(data.is_selected) {
                Util.drawGraphic_d3(cell_g, data.point.shape, WIDTH/GRID_SIZE, HEIGHT/GRID_SIZE, data.point.color);
            cell_g
                .attr('transform', `translate(${data.point.x*WIDTH/GRID_SIZE},${data.point.y*HEIGHT/GRID_SIZE})`)
            }
                // .attr('opacity', 0)
                // .transition()
                // .ease(d3.easeLinear)
                // .duration(200)
                // .attr('opacity',1);
        }

        const click = (event: MouseEvent, data:RectData) => {
            const rect_x = Math.floor(event.offsetX/(WIDTH/GRID_SIZE)), rect_y = Math.floor(event.offsetY/(HEIGHT/GRID_SIZE));
            props.onRectClick(rect_x, rect_y);
        }
            
        svg.on("click", click);

        return () => {
            svg.on("click", undefined);
        }
    });

    return (
            <div ref={svg_container_ref} className="create-initial-svg_container">
                <svg width={WIDTH+"px"} height={HEIGHT + "px"}>
                    <g id="grid"></g>
                    <g id="rects"></g>
                    <g id="hover"></g>
                    <g id="end"></g>
                    <g id="start"></g>
                    <g id="focus"></g>
                </svg>
            </div>
        );
}

export default PatternEditorRenderer;