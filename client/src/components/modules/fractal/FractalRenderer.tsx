import React, {useState, useRef, useEffect} from "react";
import { Project, Symbol, Operator, Pattern, Point } from "../../../constants/Types";
import * as Pixi from 'pixi.js'
import {Viewport} from 'pixi-viewport'

import "./FractalRenderer.css";

type FractalRendererProps = {
    initial: string
    num_iterations: number
    patterns: Pattern[]
    operators: Operator[]
    symbols: Symbol[]
    background_color: number
    //antialias: boolean
}

type TextureContainer = {
    symbol_names: string[]
    texture: Pixi.RenderTexture
}

const FractalRenderer = (props: FractalRendererProps) => {
    
    const container_ref = useRef(undefined);
    const PixiAppRef = useRef<Pixi.Application>(undefined);
    const viewportRef = useRef<Viewport>(undefined);
    //const graphicsRef = useRef<Pixi.Graphics>(undefined);

    // run once only at the beginning
    useEffect(() => {
        const PixiApp = new Pixi.Application({
            resizeTo: container_ref.current,
            backgroundColor: props.background_color,
            antialias: true,
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

        // const graphics = new Pixi.Graphics();
        // viewport.addChild(graphics);

        PixiApp.stage.addChild(viewport);
        PixiAppRef.current = PixiApp;
        viewportRef.current = viewport;
        //graphicsRef.current = graphics;

        return () => {
            // kill everything to hopefully avoid memory leaks and cleanup properly
            //graphicsRef.current.destroy();
            viewportRef.current.destroy();
            PixiAppRef.current.destroy(true, true);
            //graphicsRef.current = undefined;
            viewportRef.current = undefined;
            PixiAppRef.current = undefined;
        };
    }, []);

    function isSymbol(instruction_ID: string): boolean {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(instruction_ID);
    }

    function computeRenderString(num_iterations: number, initial: string, operators: Operator[], symbols: Symbol[],): string {
        let render_string = initial;

        const rules = {};

        operators.forEach((symbol: Operator) => {
            rules[symbol.name] = symbol.name;
        });
        symbols.forEach((symbol: Symbol) => {
            rules[symbol.name] = symbol.replacement_rule;
        });
    
        for(let i = 0; i < num_iterations; i++) {
            let new_string = "";
            for(let instruction_ID of render_string) {
                const substitution = rules[instruction_ID];
                if(substitution !== undefined)
                    new_string += rules[instruction_ID];
            }
            render_string = new_string;
        }
        
        return render_string;
    }

    function getOperatorRotation(operator_ID: string): number {
        const operator = props.operators.find((operator) => operator.name === operator_ID);
        if(operator === undefined)
            return 0;
        return operator.rotation;
    }

    function getDrawPattern(instruction_ID: string): Pattern {
        const found_pattern: Pattern = props.patterns.find((pattern: Pattern) => {
            for(let i = 0; i < pattern.symbol_names.length; i++) {
                if(pattern.symbol_names[i] === instruction_ID)
                    return true;
            }
        })
        if(found_pattern !== undefined)
            return found_pattern;
        return {
            symbol_names: [],
            points: [],
            start_position: [],
            end_position: [],
        } as Pattern;
    }


    const CELL_WIDTH = 16;

    function drawShape(graphics: Pixi.Graphics, x:number, y: number):void {
            graphics.beginFill(0x0e782b);
            graphics.drawRect(CELL_WIDTH*x, CELL_WIDTH*y, CELL_WIDTH, CELL_WIDTH);
            graphics.endFill();
        }

    function createTextures(patterns: Pattern[]): TextureContainer[] {
        const PixiApp = PixiAppRef.current;
        const sprites: TextureContainer[] = [];
        patterns.forEach((pattern: Pattern) => {
            const graphics = new Pixi.Graphics();
            pattern.points.forEach((point: Point) => {
                drawShape(graphics, point.x, point.y)
            })
            const texture = PixiApp.renderer.generateTexture(graphics);
            
            sprites.push({
                symbol_names: pattern.symbol_names,
                texture: texture,
            } as TextureContainer);
            graphics.destroy();
            //texture.destroy();
        });
        return sprites;
    }

    function getTexture(textures: TextureContainer[], instruction_ID: string): Pixi.RenderTexture {
        return textures.find((sprite_container: TextureContainer) => {
            for(let i = 0; i < sprite_container.symbol_names.length; i++) {
                if(sprite_container.symbol_names[i] === instruction_ID)
                    return true;
            }
        }).texture;
    }


    function drawTexture(parent: Viewport, texture: Pixi.RenderTexture, 
        x: number, y: number, angle: number): void {
        
            let graphics: Pixi.Graphics= new Pixi.Graphics();
            graphics.beginFill(0xABCDEF);
            graphics.drawRect(x*32,y*32,32,32)
            //graphics.drawCircle(0,-100*(change_state+1), 100)
            //graphics.drawRect(0,100*change_state,100,100);
            graphics.endFill();
            texture = PixiAppRef.current.renderer.generateTexture(graphics);
            graphics.destroy(true);
        
        
            const sprite = new Pixi.Sprite(texture);
        
        if(texture.orig === null)
        console.log('SCREAM!');
        //console.log(texture);
        sprite.x = CELL_WIDTH*x;
        sprite.y = CELL_WIDTH*y;
        sprite.angle = -angle;
        parent.addChild(sprite);
    }


    // run with every data change
    useEffect(() => {
        const viewport = viewportRef.current
        viewport.children.forEach((child) => {
            child.destroy(true);
        })
        // const graphics = graphicsRef.current
        // graphics.clear();
        const graphics = new Pixi.Graphics();

        const render_string = computeRenderString(props.num_iterations, props.initial, props.operators, props.symbols);
        // const textures = createTextures(props.patterns);

        let current_start_position = [0,0];
        let current_direction = 0;

        let max_x = 0, min_x = 0, max_y = 0, min_y = 0;

        const startTime = performance.now();
        console.log("starting rendering");
        for(let instruction_ID of render_string) {
            if(isSymbol(instruction_ID)) {
                const pattern = getDrawPattern(instruction_ID);
                
                const direction_radians = current_direction*Math.PI/180.0;
                // drawTexture(viewport, getTexture(textures, instruction_ID), 
                //     Math.round(current_start_position[0]), Math.round(current_start_position[1]), current_direction);

                pattern.points.forEach((value: Point) => {
                    const relative_x = value.x - pattern.start_position[0];
                    const relative_y = value.y - pattern.start_position[1];
    
                    const transformed_x = relative_x*Math.cos(direction_radians) - relative_y*Math.sin(direction_radians);
                    const transformed_y = relative_x*Math.sin(direction_radians) + relative_y*Math.cos(direction_radians);
    
                    const absolute_x = (current_start_position[0] + transformed_x);
                    const absolute_y = (current_start_position[1] + transformed_y);

                    if(absolute_x > max_x) max_x = absolute_x;
                    if(absolute_y > max_y) max_y = absolute_y;
                    if(absolute_x < min_x) min_x = absolute_x;
                    if(absolute_y < min_y) min_y = absolute_y;

                    drawShape(graphics, absolute_x, absolute_y);
                })

                const displacement = [pattern.end_position[0] - pattern.start_position[0], pattern.end_position[1] - pattern.start_position[1]]
                current_start_position = [
                    current_start_position[0] + displacement[0]*Math.cos(direction_radians) - displacement[1]*Math.sin(direction_radians),
                    current_start_position[1] + displacement[0]*Math.sin(direction_radians) + displacement[1]*Math.cos(direction_radians),
                ];
            } else {
                const rotation = getOperatorRotation(instruction_ID);
                current_direction += rotation;
                if(current_direction > 180)
                    current_direction -= 360;
                else if (current_direction < -180)
                    current_direction += 360;
            }
        }
        viewport.addChild(graphics);

        const fill_screen_height = container_ref.current.clientHeight/CELL_WIDTH, 
        fill_screen_width = container_ref.current.clientWidth/CELL_WIDTH;
        const distance_span_y = Math.abs(max_y-min_y)+1,
        distance_span_x = Math.abs(max_x - min_x)+1;

        // decreases zoom close to 1 and asymptotically approaches 0.75
        function getProperZoomLevel(max_fill_zoom: number): number {
            return (-0.75/(1/max_fill_zoom+1) + 0.75)*max_fill_zoom;
        }
        const max_fill_zoom_level = Math.min(fill_screen_height/ distance_span_y, fill_screen_width/ distance_span_x);
        //console.log(getProperZoomLevel(max_fill_zoom_level));
        const center_x = (max_x-min_x)/2 + min_x, center_y = (max_y-min_y)/2 + min_y;
        // graphics.beginFill(0xFFF000);
        // graphics.drawCircle(center_x*CELL_WIDTH, center_y*CELL_WIDTH, 100);
        // graphics.endFill();

        if(render_string.length < 200000) {
            viewport.animate({
                time: 500,
                scale: getProperZoomLevel(max_fill_zoom_level),
                position: {
                    x: CELL_WIDTH/2 + CELL_WIDTH*center_x,
                    y: CELL_WIDTH/2 + CELL_WIDTH*center_y,
                },
                ease: 'easeInOutSine',
                removeOnInterrupt: true,
            })
        } else {
            viewport.setTransform(
                container_ref.current.clientWidth/2 - CELL_WIDTH/2 - CELL_WIDTH*center_x,  
                container_ref.current.clientHeight/2 - CELL_WIDTH/2 - CELL_WIDTH*center_y)
                .setZoom(getProperZoomLevel(max_fill_zoom_level), true)
        }
        
        const endTime = performance.now();

        console.log(`Render took ${(endTime- startTime).toFixed(1)} milliseconds`);
            // viewport.setTransform(
            //     container_ref.current.clientWidth/2 - CELL_WIDTH/2 - CELL_WIDTH*center_x,  
            //     container_ref.current.clientHeight/2 - CELL_WIDTH/2 - CELL_WIDTH*center_y)
            //     .setZoom(getProperZoomLevel(max_fill_zoom_level), true)
        // console.log(`Center X ${center_x}`)
        // console.log(`Center Y ${center_y}`)
        // console.log(`Max X ${max_x}`)
        // console.log(`Max Y ${max_y}`)
        // console.log(`Min X ${min_x}`)
        // console.log(`Min Y ${min_y}`)
        // console.log(viewport.getGlobalPosition());
        // console.log({
        //     x: container_ref.current.clientWidth/2 - CELL_WIDTH/2 - CELL_WIDTH*center_x,
        //     y: container_ref.current.clientHeight/2 - CELL_WIDTH/2 - CELL_WIDTH*center_y,
        // });

        
    }, [props.initial, props.num_iterations, props.patterns, props.operators, props.symbols]);

    useEffect(() => {
        const PixiApp = PixiAppRef.current;
        PixiApp.renderer.backgroundColor = props.background_color;
        PixiApp.renderer.render(PixiApp.stage);
    },[props.background_color]);

    
    // This doesn't work
    // useEffect(() => {
    //     console.log("attempt to rerender antialias")
    //     console.log(props.antialias)
    //     const PixiApp = PixiAppRef.current;
    //     PixiApp.renderer = new Pixi.Renderer({
    //         antialias: props.antialias
    //     })
    //     PixiApp.renderer.render(PixiApp.stage);
    // }, [props.antialias])

    return (<div ref = {container_ref} className="fractal-renderer_container">
        
    </div>);
}

export default FractalRenderer;