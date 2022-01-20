import React, {useEffect, useState} from "react";

import InitialRenderer from "./InitialRenderer"

import { InitialState } from "../../pages/FractalCreator"
import "./FractalInitial.css"
import FractalInitialSidebar from "./FractalInitialSidebar";

type FractalInitialProps = {
    initialState: InitialState,
    onInitialStateUpdate: (newInitialState: InitialState) => void,
}

// careful about changing the order of these, the numbering is important for optionstatus
enum InitialEditorState {
    SELECT_REGULAR=0,
    SELECT_START,
    SELECT_END,
}

type RectData = {
    x: number,
    y: number,
    is_selected: boolean;
    is_startpoint: boolean;
    is_endpoint: boolean;
}

const FractalInitial = (props: FractalInitialProps) => {
    
    const WIDTH = 800, HEIGHT = 800, C_X = WIDTH/2, C_Y = HEIGHT/2;
    const GRID_SIZE = 10;
    const [editorState, setEditorState] = useState(InitialEditorState.SELECT_REGULAR);
    const [rectData, setRectData] = useState(getRectData(props.initialState));
    const [optionStatus, setOptionStatus] = useState(
        [
            props.initialState.selected_points.length > 0,
            props.initialState.start_point.length > 0,
            props.initialState.end_point.length > 0,
        ]
    );
    function getRectData(initialState: InitialState): RectData[][] {
        
        const rect_info: RectData[][] = [];
        for(let i = 0; i < GRID_SIZE; i++) {
            rect_info.push([]);
            for(let j = 0; j < GRID_SIZE; j++) {
                rect_info[i].push({
                    x: i,
                    y: j,
                    is_selected: false,
                    is_startpoint: false,
                    is_endpoint: false,
                } as RectData)
            }
        };
        // rect_info.push([
        //     {
        //     x: 3,
        //     y: 2,
        //     is_selected: false,
        //     is_startpoint: false,
        //     is_endpoint: false,
        // } as RectData]);

        //hello
        initialState.selected_points.forEach(element => {
            rect_info[element[0]][element[1]].is_selected = true;
        });

        if(initialState.start_point.length > 0)
            rect_info[initialState.start_point[0]][ 
            initialState.start_point[1]].is_startpoint = true;
        if(initialState.end_point.length > 0)
            rect_info[initialState.end_point[0]][ 
            initialState.end_point[1]].is_endpoint = true;
        return rect_info;
    }

    const onRectClick = (x: number, y: number): void => {
        const newRectData = [...rectData];
        const newOptionStatus = [...optionStatus];
        const rect = newRectData[x][y];
        switch(editorState) {
            case InitialEditorState.SELECT_START:
                const nextStartState = !rect.is_startpoint;
                if(nextStartState) {
                    rect.is_selected = true;
                    for(let i = 0; i < GRID_SIZE; i++) {
                        for(let j = 0; j < GRID_SIZE; j++) {
                            newRectData[i][j].is_startpoint = false;
                        }
                    }
                    if(rect.is_endpoint) {
                        rect.is_endpoint = false;
                        newOptionStatus[InitialEditorState.SELECT_END] = false;
                    }
                    newOptionStatus[InitialEditorState.SELECT_REGULAR] = true
                }
                newOptionStatus[InitialEditorState.SELECT_START] = nextStartState;

                rect.is_startpoint = nextStartState; 
                
                break;
            case InitialEditorState.SELECT_END:
                const nextEndState = !rect.is_endpoint;
                if(nextEndState) {
                    rect.is_selected = true;
                    for(let i = 0; i < GRID_SIZE; i++) {
                        for(let j = 0; j < GRID_SIZE; j++) {
                            newRectData[i][j].is_endpoint = false;
                        }
                    }
                    if(rect.is_startpoint) {
                        rect.is_startpoint = false;
                        newOptionStatus[InitialEditorState.SELECT_START] = false;
                    }
                    newOptionStatus[InitialEditorState.SELECT_REGULAR] = true
                }
                newOptionStatus[InitialEditorState.SELECT_END] = nextEndState;

                rect.is_endpoint = nextEndState;

                break;
            case InitialEditorState.SELECT_REGULAR:
                const nextRegularState = !rect.is_selected;
                if(!nextRegularState) {
                    if(rect.is_startpoint) {
                        rect.is_startpoint = false;
                        newOptionStatus[InitialEditorState.SELECT_START] = false;
                    }
                    if(rect.is_endpoint) {
                        rect.is_endpoint = false;
                        newOptionStatus[InitialEditorState.SELECT_END] = false;
                    }
                    rect.is_selected = nextRegularState;
                    let any_selected = false;
                    for(let i = 0; i < GRID_SIZE; i++) {
                        for(let j = 0; j < GRID_SIZE; j++) {
                            if(newRectData[i][j].is_selected) {
                                any_selected = true;
                                i = GRID_SIZE; //breaks out of outer loop
                                break;
                            }
                        }
                    }
                    newOptionStatus[InitialEditorState.SELECT_REGULAR] = any_selected;
                } else {
                    newOptionStatus[InitialEditorState.SELECT_REGULAR] = true;
                }
                rect.is_selected = nextRegularState;

                break;
                        
        }

    
        setRectData(newRectData);
        setOptionStatus(newOptionStatus);
    }

    const updateEditorState = (newState: InitialEditorState) => {
        setEditorState(newState);
    }

    const saveInitialState = (event) => {
        if(optionStatus[0]&&optionStatus[1]&&optionStatus[2]) {
            const newState = {
                selected_points: [],
                start_point: [],
                end_point: [],
            } as InitialState;
            for(let i = 0; i < GRID_SIZE; i++) {
                for(let j = 0; j < GRID_SIZE; j++) {
                    const rect = rectData[i][j];
                    if(rect.is_selected)
                        newState.selected_points.push([i,j]);
                    if(rect.is_startpoint)
                        newState.start_point.push(i,j);
                    if(rect.is_endpoint)
                        newState.end_point.push(i,j);
                }
            }
            props.onInitialStateUpdate(newState);
        }
    }
//hello
    return (
    <div className = "create-initial_container">
        <div className="create-initial_container2">
            <div className="create-initial-title_text">
                Create the initial pattern
            </div>
            <div className={`create-initial-save-button ${
                (optionStatus[0]&&optionStatus[1]&&optionStatus[2])
                ? 'finished'
                : ''
                }`}
                onClick = {saveInitialState}>
                Save and Continue
            </div>
        </div>
        <div className="create-initial_container3">
            {/* <div className="create-initial-hint_text">
                Select the boxes to make up the pattern and select one start point and one endpoint. 
            </div> */}
            <InitialRenderer 
                rectData={rectData}
                onRectClick={onRectClick}
                editorState={editorState}/>
            <FractalInitialSidebar
                editorState={editorState}
                onEditorStateUpdate={updateEditorState}
                optionStatus={optionStatus}/>
        </div>
    </div>);
}

export default FractalInitial;
export {InitialEditorState, RectData};