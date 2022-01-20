import React, {useEffect, useState} from "react"
import { RouteComponentProps } from "@reach/router"

import FractalInitial from "../modules/fractal/FractalInitial"
import FractalSidebar from "../modules/fractal/FractalSidebar";
import "./FractalCreator.css";
import FractalRenderer from "../modules/fractal/FractalRenderer";

type FractalCreatorProps = RouteComponentProps & {
    is_new_project: boolean;
}

// note: start and end points should also be considered as selected
type InitialState = {
    selected_points: number[][],
    start_point: number[],
    end_point: number[],
}

type DrawData = {
    start_point: number[]
    start_direction: number
    drawType: string
}

const FractalCreator = (props: FractalCreatorProps) => {
    const [initial_state, setInitialState] = useState({
        selected_points: [],
        start_point: [],
        end_point: [],
    } as InitialState);
    const [is_editor_open, setEditorOpen] = useState(props.is_new_project); 
    const [num_iterations, setNumIterations] = useState(0);
    
    function updateInitialState(newInitialState: InitialState): void {
        setInitialState(newInitialState);
        setEditorOpen(false);
    }

    function openInitialEditor(event): void {
        setEditorOpen(true);
    }

    function updateNumIterations(new_num_iterations: number): void {
        setNumIterations(new_num_iterations);
    }

    function getDrawData(initial_state: InitialState): DrawData[] {
        if(initial_state.start_point.length != 2 && initial_state.end_point.length != 2)
            return [];

        let render_string = "A";
        const rules = {
            "A": "A+B",
            "B": "A-B",
            "+": "+",
            "-": "-",
        }
        for(let i = 0; i < num_iterations; i++) {
            let new_string = "";
            for(let char of render_string) {
                new_string += rules[char];
            }
            render_string = new_string;
        }
        
        const translation = initial_state.end_point.map(
            (value: number, index: number) => (value - initial_state.start_point[index]));
        
        let current_start = [0,0];
        let current_direction = 0.0;

        const draw_data: DrawData[] = [];
        for(let char of render_string) {
            if("QWERTYUIOPASDFGHJKLZXCVBNM".includes(char)) {
                const direction_radians = current_direction*Math.PI/180.0;
                draw_data.push({
                    start_point: current_start,
                    start_direction: current_direction,
                    drawType: char,
                } as DrawData);
                const x = translation[0], y = translation[1];
                current_start = [
                    current_start[0] + x*Math.cos(direction_radians) - y*Math.sin(direction_radians),
                    current_start[1] + x*Math.sin(direction_radians) + y*Math.cos(direction_radians),
                ];
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
        return draw_data;
    }
    
    function getInitialStateFromDrawType(draw_type: string): InitialState {
        switch(draw_type) {
            case "A":
                return initial_state;
        }
        return {
            selected_points: [],
            start_point: [],
            end_point: [],
        } as InitialState
    }
    
    return (<div className = 'fractal-creator_container'>
        <div className = {`fractal-creator-initial_container 
            ${is_editor_open 
                ? 'editor-open'
                : ''}`}>
            <FractalInitial 
                initialState={initial_state} 
                onInitialStateUpdate={updateInitialState}/>
        </div>
        <FractalRenderer
            draw_data={getDrawData(initial_state)}
            num_iterations={num_iterations}
            getInitialStateFromDrawType={getInitialStateFromDrawType}/>
        <FractalSidebar 
            initialState={initial_state}
            onInitialStateClick={openInitialEditor}
            numIterations={num_iterations}
            updateNumIterations={updateNumIterations}/>
    </div>);
};

export default FractalCreator;
export type { InitialState, DrawData };