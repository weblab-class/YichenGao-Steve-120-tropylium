import React, {useEffect, useState} from "react"
import { RouteComponentProps } from "@reach/router"

import FractalInitial from "../modules/fractal/FractalInitial"
import FractalSidebar from "../modules/fractal/FractalSidebar";
import "./FractalCreator.css";
import FractalRenderer from "../modules/fractal/FractalRenderer";

type FractalCreatorProps = RouteComponentProps & {
    is_new_project: boolean;
}

type Project = {
    id: string
    title: string
    symbols: Symbol[]
    operators: Operator[]
    initial: string;
    iterations: number;
    background_color: number;
}

type Symbol = {
    name: string;
    pattern: Pattern;
    replacement_rule: string;
}

type Operator = {
    name: string;
    rotation: number;
}

type Pattern = {
    points: Point[],
    start_position: number[],
    end_position: number[],
}

type Point = {
    x: number;
    y: number;
    color: number;
    shape: string;
}

const FractalCreator = (props: FractalCreatorProps) => {
    const [initial_state, setPattern] = useState({
        points: [],
        start_position: [],
        end_position: [],
    } as Pattern);
    const [is_editor_open, setEditorOpen] = useState(props.is_new_project); 
    const [num_iterations, setNumIterations] = useState(0);
    
    function updatePattern(newPattern: Pattern): void {
        setPattern(newPattern);
        setEditorOpen(false);
    }

    function openInitialEditor(event): void {
        setEditorOpen(true);
    }

    function updateNumIterations(new_num_iterations: number): void {
        if(new_num_iterations > 20) //pls don't go higher lol
            new_num_iterations = 20;
        setNumIterations(new_num_iterations);
    }

    function getDrawData(initial_state: Pattern):string {
        if(initial_state.start_position.length != 2 && initial_state.end_position.length != 2)
            return "";

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
        
        return render_string;

        // const translation = initial_state.end_position.map(
        //     (value: number, index: number) => (value - initial_state.start_position[index]));
        
        // let current_start = [0,0];
        // let current_direction = 0.0;

        // const draw_data: DrawData[] = [];
        // for(let char of render_string) {
        //     if("QWERTYUIOPASDFGHJKLZXCVBNM".includes(char)) {
        //         const direction_radians = current_direction*Math.PI/180.0;
        //         draw_data.push({
        //             start_point: current_start,
        //             start_direction: current_direction,
        //             drawType: char,
        //         } as DrawData);
        //         const x = translation[0], y = translation[1];
        //         current_start = [
        //             current_start[0] + x*Math.cos(direction_radians) - y*Math.sin(direction_radians),
        //             current_start[1] + x*Math.sin(direction_radians) + y*Math.cos(direction_radians),
        //         ];
        //     } else {
        //         switch(char) {
        //             case '+':
        //                 current_direction += 270;
        //                 break;
        //             case '-':
        //                 current_direction += 90;
        //                 break;
        //         }
        //         if(current_direction > 360)
        //             current_direction -= 360;
        //     }
        // }
        // return draw_data;
    }
    
    function getDrawPattern(pattern_ID: string): Pattern {
        //console.log(draw_type);
        switch(pattern_ID) {
            case "A":
                return initial_state;
            case "B":
                return initial_state;
        }
        return {
            points: [],
            start_position: [],
            end_position: [],
        } as Pattern
    }

    function getOperatorRotation(operator_ID: string): number {
        switch(operator_ID) {
            case '+':
                return -90;
            case '-':
                return 90;
        }
        return 0;
    }
    
    return (<div className = 'fractal-creator_container'>
        <div className = {`fractal-creator-initial_container 
            ${is_editor_open 
                ? 'editor-open'
                : ''}`}>
            <FractalInitial 
                pattern={initial_state} 
                onPatternUpdate={updatePattern}/>
        </div>
        <FractalRenderer
            renderString={getDrawData(initial_state)}
            getDrawPattern={getDrawPattern}
            getOperatorRotation={getOperatorRotation}/>
        <FractalSidebar 
            pattern={initial_state}
            onPatternClick={openInitialEditor}
            numIterations={num_iterations}
            updateNumIterations={updateNumIterations}/>
    </div>);
};

export default FractalCreator;
export type { Project, Symbol, Operator, Pattern, Point };