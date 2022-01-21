import React, {useEffect, useState} from "react";

import InitialRenderer from "./InitialRenderer"

import { Pattern, Point } from "../../pages/FractalCreator"
import "./FractalInitial.css"
import FractalInitialSidebar from "./FractalInitialSidebar";

type FractalInitialProps = {
    pattern: Pattern,
    onPatternUpdate: (newPattern: Pattern) => void,
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
    const [rectData, setRectData] = useState(getRectData(props.pattern));
    const [optionStatus, setOptionStatus] = useState(
        [
            props.pattern.points.length > 0,
            props.pattern.start_position.length > 0,
            props.pattern.end_position.length > 0,
        ]
    );
    function getRectData(pattern: Pattern): RectData[][] {
        
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
        pattern.points.forEach((element: Point) => {
            rect_info[element.x][element.y].is_selected = true;
        });

        if(pattern.start_position.length > 0)
            rect_info[pattern.start_position[0]][ 
            pattern.start_position[1]].is_startpoint = true;
        if(pattern.end_position.length > 0)
            rect_info[pattern.end_position[0]][ 
            pattern.end_position[1]].is_endpoint = true;
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

    const savePattern = (event) => {
        if(optionStatus[0]&&optionStatus[1]&&optionStatus[2]) {
            const newState = {
                points: [],
                start_position: [],
                end_position: [],
            } as Pattern;
            for(let i = 0; i < GRID_SIZE; i++) {
                for(let j = 0; j < GRID_SIZE; j++) {
                    const rect = rectData[i][j];
                    if(rect.is_selected)
                        newState.points.push({
                            x:i,
                            y:j,
                            color: 0x0,
                            shape: ""
                        } as Point);
                    if(rect.is_startpoint)
                        newState.start_position.push(i,j);
                    if(rect.is_endpoint)
                        newState.end_position.push(i,j);
                }
            }
            props.onPatternUpdate(newState);
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
                onClick = {savePattern}>
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