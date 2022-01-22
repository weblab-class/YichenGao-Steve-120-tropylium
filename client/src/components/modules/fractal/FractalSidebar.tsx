import React, {useState} from "react";
import { Pattern, Symbol } from "../../pages/FractalCreator";
import FractalPreviewRenderer from "./FractalPreviewRenderer";

import "./FractalSidebar.css";

type FractalSidebarProps = {
    title: string
    updateTitle: (new_title: string) => void
    symbols: Symbol[]
    updateSymbols: (new_symbols: Symbol[]) => void
    onPatternClick: (symbol_ID: string) => void
    numIterations: number
    updateNumIterations: (new_num_iterations: number) => void
    backgroundColor: number
    updateBackgroundColor: (new_background_color: number) => void
    //antialias: boolean
    //updateAntialias: (new_antialias: boolean) => void
}

const FractalSidebar = (props: FractalSidebarProps) => {
    function getTempPattern(): Pattern {
        const operator = props.symbols.find((symbol: Symbol) => symbol.name === "A");
        return operator.pattern;
    }
    
    return <div className ='fractal-sidebar_container'>
        <input className="fractal-sidebar_input" 
            type="text" value = {props.title} placeholder="New Project"
            onChange={(event) => props.updateTitle(event.target.value)}/>
        <div className = 'fractal-sidebar-open-initial_button' 
            onClick = {() => {props.onPatternClick("A")}}>
            Open Initial Editor
        </div>
        <FractalPreviewRenderer
            pattern={getTempPattern()}/>
        <div>
            Number of Iterations
        </div>
        <input className = 'fractal-sidebar_input'
            type='number' value={props.numIterations} min={0} max={20} step={1} 
            onChange={(event) => props.updateNumIterations(Number(event.target.value))}/>
        <div>
            Background Color
        </div>
        <input 
            type='color' value={props.backgroundColor < 0x100000 ? "#0" + props.backgroundColor.toString(0x10) : "#" + props.backgroundColor.toString(0x10)}
            onChange={(event) => {props.updateBackgroundColor(parseInt(event.target.value.substring(1), 16))}}/>
        {/* <div>
            Antialiasing on
        </div>
        <input 
            type='checkbox' checked={props.antialias}
            onChange={(event) => {props.updateAntialias(event.target.checked)}}/> */}
        
            
    </div>
}

export default FractalSidebar;