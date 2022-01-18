import React, {useState} from "react";
import { InitialState } from "../pages/FractalCreator";
import FractalPreviewRenderer from "./FractalPreviewRenderer";

import "./FractalSidebar.css";

type FractalSidebarProps = {
    initialState: InitialState;
    onInitialStateClick: (event) => void;
    numIterations: number
    updateNumIterations: (number) => void
}

const FractalSidebar = (props: FractalSidebarProps) => {
    return <div className ='fractal-sidebar_container'>
        <div className = 'fractal-sidebar-open-initial_button' 
            onClick = {props.onInitialStateClick}>
            Open Initial Editor
        </div>
        <FractalPreviewRenderer
            initialState={props.initialState}/>
        <div>
            Number of Iterations
        </div>
        <input className = 'fractal-sidebar-iterations_input'
            type='number' value={props.numIterations} min={1} max={12} step={1} 
            onChange={(event) => props.updateNumIterations(event.target.value)}/>
    </div>
}

export default FractalSidebar;