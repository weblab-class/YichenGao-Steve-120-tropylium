import React, {useState, useRef, useEffect} from "react";
import { Pattern, Point } from "../../pages/FractalCreator";
import * as Pixi from 'pixi.js'
import {Viewport} from 'pixi-viewport'

import "./FractalRenderer.css";

type FractalRendererProps = {
    //draw_data: DrawData[]
    renderString: string
    getDrawPattern: (string) => Pattern
    getOperatorRotation: (string) => number
}

const FractalRenderer = (props: FractalRendererProps) => {
    
    const container_ref = useRef(undefined);
    let PixiAppRef = useRef<Pixi.Application>(undefined);
    let viewportRef = useRef<Viewport>(undefined);

    // run once only at the beginning
    useEffect(() => {
        const PixiApp = new Pixi.Application({
            resizeTo: container_ref.current,
            backgroundColor: 0xFFFFFF,
            antialias: false,
        })
        container_ref.current.appendChild(PixiApp.view);
        //PixiApp.renderer.options.antialias = false;
        const viewport = new Viewport({
            screenWidth: container_ref.current.clientWidth,
            screenHeight: container_ref.current.clientHeight,
            worldWidth: 1000,
            worldHeight: 1000,
            passiveWheel: false,
            interaction: PixiApp.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
        })
        viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate()
        PixiApp.stage.addChild(viewport);
        PixiAppRef.current = PixiApp;
        viewportRef.current = viewport;

        return () => {
            // kill everything to hopefully avoid memory leaks and cleanup
            PixiApp.destroy(true, true);
        };
    }, []);

    const CELL_WIDTH = 32;
    function drawShape(graphics: Pixi.Graphics, x:number, y: number):void {
        graphics.beginFill(0xABCDEF);
        graphics.drawRect(CELL_WIDTH*x, CELL_WIDTH*y, CELL_WIDTH, CELL_WIDTH);
        graphics.endFill();
    }
    // run with every data change
    useEffect(() => {
        viewportRef.current.removeChildren();

        const render_string = props.renderString;
        //const draw_data = props.draw_data;

        const graphics: Pixi.Graphics = new Pixi.Graphics();

        // const translation = initial_state.end_position.map(
        //     (value: number, index: number) => (value - initial_state.start_position[index]));
        
        let current_start_position = [0,0];
        let current_direction = 0;

        for(let instruction of render_string) {
            if("QWERTYUIOPASDFGHJKLZXCVBNM".includes(instruction)) {
                const pattern = props.getDrawPattern(instruction);
                const direction_radians = current_direction*Math.PI/180.0;
                
                pattern.points.forEach((value: Point) => {
                    const relative_x = value.x - pattern.start_position[0];
                    const relative_y = value.y - pattern.start_position[1];
    
                    const transformed_x = relative_x*Math.cos(direction_radians) - relative_y*Math.sin(direction_radians);
                    const transformed_y = relative_x*Math.sin(direction_radians) + relative_y*Math.cos(direction_radians);
    
                    const absolute_x = (current_start_position[0] + transformed_x);
                    const absolute_y = (current_start_position[1] + transformed_y);
                    drawShape(graphics, absolute_x, absolute_y);
                })

                const displacement = [pattern.end_position[0] - pattern.start_position[0], pattern.end_position[1] - pattern.start_position[1]]
                current_start_position = [
                    current_start_position[0] + displacement[0]*Math.cos(direction_radians) - displacement[1]*Math.sin(direction_radians),
                    current_start_position[1] + displacement[0]*Math.sin(direction_radians) + displacement[1]*Math.cos(direction_radians),
                ];
            } else {
                const rotation = props.getOperatorRotation(instruction);
                current_direction += rotation;
                if(current_direction > 180)
                    current_direction -= 360;
                else if (current_direction < -180)
                    current_direction += 360;
            }
        }

        viewportRef.current.addChild(graphics);
    }, [props.renderString]);

    return (<div ref = {container_ref} className="fractal-renderer_container">
        
    </div>);
}

export default FractalRenderer;