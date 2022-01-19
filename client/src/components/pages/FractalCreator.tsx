import React, {useState} from "react"
import { RouteComponentProps } from "@reach/router"

import FractalInitial from "../modules/FractalInitial"
import FractalSidebar from "../modules/FractalSidebar";
import "./FractalCreator.css";
import FractalRenderer from "../modules/FractalRenderer";

type FractalCreatorProps = RouteComponentProps & {
    is_new_project: boolean;
}

// note: start and end points should also be considered as selected
type InitialState = {
    selected_points: number[][],
    start_points: number[],
    end_points: number[],
}

const FractalCreator = (props: FractalCreatorProps) => {
    const [initialState, setInitialState] = useState({
        selected_points: [],
        start_points: [],
        end_points: [],
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
    
    return (<div className = 'fractal-creator_container'>
        <div className = {`fractal-creator-initial_container 
            ${is_editor_open 
                ? 'editor-open'
                : ''}`}>
            <FractalInitial 
                initialState={initialState} 
                onInitialStateUpdate={updateInitialState}/>
        </div>
        <FractalRenderer
            initialState={initialState}
            numIterations={num_iterations}/>
        <FractalSidebar 
            initialState={initialState}
            onInitialStateClick={openInitialEditor}
            numIterations={num_iterations}
            updateNumIterations={updateNumIterations}/>
    </div>);
};

export default FractalCreator;
export type { InitialState };