import React, {useState} from "react";
import { Pattern } from "../../pages/FractalCreator";
import FractalPreviewRenderer from "./FractalPreviewRenderer";

import "./FractalSidebar.css";

type FractalSidebarProps = {
    pattern: Pattern;
    onPatternClick: (event) => void;
    numIterations: number
    updateNumIterations: (number) => void
}

const FractalSidebar = (props: FractalSidebarProps) => {
    return <div className ='fractal-sidebar_container'>
        <div className = 'fractal-sidebar-open-initial_button' 
            onClick = {props.onPatternClick}>
            Open Initial Editor
        </div>
        <FractalPreviewRenderer
            pattern={props.pattern}/>
        <div>
            Number of Iterations
        </div>
        <input className = 'fractal-sidebar-iterations_input'
            type='number' value={props.numIterations} min={0} max={20} step={1} 
            onChange={(event) => props.updateNumIterations(event.target.value)}/>
    </div>
}

export default FractalSidebar;