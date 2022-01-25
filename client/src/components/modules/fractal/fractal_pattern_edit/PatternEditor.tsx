import React, {useEffect, useState} from "react";

import PatternEditorRenderer from "./PatternEditorRenderer"
import PatternEditorSidebar from "./PatternEditorSidebar";

import { Project, Symbol, Operator, Pattern, Point } from "../../../../constants/Types";
import "./PatternEditor.css"
import PatternEditorCell from "./PatternEditorCell";


type PatternEditorProps = {
    pattern: Pattern,
    onPatternUpdate: (newPattern: Pattern) => void,
}

// careful about changing the order of these, the numbering is important for optionstatus
enum PatternEditorState {
    SELECT_REGULAR=0,
    SELECT_START,
    SELECT_END,
}

type RectData = {
    point: Point
    is_selected: boolean
}

const PatternEditor = (props: PatternEditorProps) => {
    
    const WIDTH = 800, HEIGHT = 800, C_X = WIDTH/2, C_Y = HEIGHT/2;
    const GRID_SIZE = 10;
    const [selected_color, setSelectedColor] = useState(0x000);
    const [selected_shape, setSelectedShape] = useState('rect');
    const [focus_point, setFocusPoint] = useState<Point>({
        x: undefined,
        y: undefined,
        color: selected_color,
        shape: selected_shape,
    });
    const [rectData, setRectData] = useState(getRectData(props.pattern));
    const [start_point, setStartPoint] = useState(props.pattern.start_position);
    const [end_point, setEndPoint] = useState(props.pattern.end_position);
    const [is_apply_to_future_selection, setApplyToFutureSelection] = useState(true);

    useEffect(() => {
        setRectData(getRectData(props.pattern))
        setStartPoint(props.pattern.start_position)
        setEndPoint(props.pattern.end_position)
    }, [props.pattern]);

    useEffect(() => {
        setFocusPoint({
            x: focus_point.x,
            y: focus_point.y,
            color: selected_color,
            shape: selected_shape,
        })
        if(focus_point.x && focus_point.y) {
            const newRectData = [...rectData];
            const rect = newRectData[focus_point.x][focus_point.y];
            rect.point.color = selected_color;
            setRectData(newRectData);
        }
        
    }, [selected_color])

    useEffect(() => {
        setFocusPoint({
            x: focus_point.x,
            y: focus_point.y,
            color: selected_color,
            shape: selected_shape,
        })
        if(focus_point.x && focus_point.y) {
            const newRectData = [...rectData];
            const rect = newRectData[focus_point.x][focus_point.y];
            rect.point.shape = selected_shape;
            setRectData(newRectData);
        }
        
    }, [selected_shape])

    const [editorState, setEditorState] = useState(PatternEditorState.SELECT_REGULAR);
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
                    point: {
                        x: i,
                        y: j,
                        color: selected_color,
                        shape: selected_shape,
                    } as Point,
                    is_selected: false,
                } as RectData)
            }
        };
        pattern.points.forEach((element: Point) => {
            rect_info[element.x][element.y].is_selected = true;
            rect_info[element.x][element.y].point = element;
        });

        return rect_info;
    }

    const onRectClick = (x: number, y: number): void => {
        
        const newRectData = [...rectData];
        const newOptionStatus = [...optionStatus];
        const rect = newRectData[x][y];
        
        switch(editorState) {
            case PatternEditorState.SELECT_REGULAR:
                if(rectData[x][y].is_selected)
                    setFocusPoint(rectData[x][y].point);
                else
                    setFocusPoint({
                        x: x,
                        y: y,
                        color: selected_color,
                        shape: selected_shape,
                    } as Point)

                if(!rect.is_selected) {
                    rect.is_selected = true;
                    rect.point.color = selected_color;
                    rect.point.shape = selected_shape;
                    newOptionStatus[PatternEditorState.SELECT_REGULAR] = true;
                } else if(focus_point.x && focus_point.y && focus_point.x === x && focus_point.y === y && rect.is_selected) {
                    rect.is_selected = false;

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
                    newOptionStatus[PatternEditorState.SELECT_REGULAR] = any_selected;
                }
                break;
            case PatternEditorState.SELECT_START:
                setStartPoint([x,y]);
                newOptionStatus[PatternEditorState.SELECT_START] = true;
                break;
            case PatternEditorState.SELECT_END:
                setEndPoint([x,y]);
                newOptionStatus[PatternEditorState.SELECT_END] = true;
                break;
        }
        setRectData(newRectData);
        setOptionStatus(newOptionStatus);
    }

    // const onRectClick = (x: number, y: number): void => {
    //     const newRectData = [...rectData];
    //     const newOptionStatus = [...optionStatus];
    //     const rect = newRectData[x][y];
    //     switch(editorState) {
    //         case PatternEditorState.SELECT_START:
    //             const nextStartState = !rect.is_startpoint;
    //             if(nextStartState) {
    //                 rect.is_selected = true;
    //                 for(let i = 0; i < GRID_SIZE; i++) {
    //                     for(let j = 0; j < GRID_SIZE; j++) {
    //                         newRectData[i][j].is_startpoint = false;
    //                     }
    //                 }
    //                 if(rect.is_endpoint) {
    //                     rect.is_endpoint = false;
    //                     newOptionStatus[PatternEditorState.SELECT_END] = false;
    //                 }
    //                 newOptionStatus[PatternEditorState.SELECT_REGULAR] = true
    //             }
    //             newOptionStatus[PatternEditorState.SELECT_START] = nextStartState;

    //             rect.is_startpoint = nextStartState; 
                
    //             break;
    //         case PatternEditorState.SELECT_END:
    //             const nextEndState = !rect.is_endpoint;
    //             if(nextEndState) {
    //                 rect.is_selected = true;
    //                 for(let i = 0; i < GRID_SIZE; i++) {
    //                     for(let j = 0; j < GRID_SIZE; j++) {
    //                         newRectData[i][j].is_endpoint = false;
    //                     }
    //                 }
    //                 if(rect.is_startpoint) {
    //                     rect.is_startpoint = false;
    //                     newOptionStatus[PatternEditorState.SELECT_START] = false;
    //                 }
    //                 newOptionStatus[PatternEditorState.SELECT_REGULAR] = true
    //             }
    //             newOptionStatus[PatternEditorState.SELECT_END] = nextEndState;

    //             rect.is_endpoint = nextEndState;

    //             break;
    //         case PatternEditorState.SELECT_REGULAR:
    //             const nextRegularState = !rect.is_selected;
    //             if(!nextRegularState) {
    //                 if(rect.is_startpoint) {
    //                     rect.is_startpoint = false;
    //                     newOptionStatus[PatternEditorState.SELECT_START] = false;
    //                 }
    //                 if(rect.is_endpoint) {
    //                     rect.is_endpoint = false;
    //                     newOptionStatus[PatternEditorState.SELECT_END] = false;
    //                 }
    //                 rect.is_selected = nextRegularState;
    //                 let any_selected = false;
    //                 for(let i = 0; i < GRID_SIZE; i++) {
    //                     for(let j = 0; j < GRID_SIZE; j++) {
    //                         if(newRectData[i][j].is_selected) {
    //                             any_selected = true;
    //                             i = GRID_SIZE; //breaks out of outer loop
    //                             break;
    //                         }
    //                     }
    //                 }
    //                 newOptionStatus[PatternEditorState.SELECT_REGULAR] = any_selected;
    //             } else {
    //                 newOptionStatus[PatternEditorState.SELECT_REGULAR] = true;
    //             }
    //             rect.is_selected = nextRegularState;

    //             break;
                        
    //     }

    
    //     setRectData(newRectData);
    //     setOptionStatus(newOptionStatus);
    // }

    const updateEditorState = (newState: PatternEditorState) => {
        setEditorState(newState);
    }

    const savePattern = (event) => {
        if(optionStatus.every((status) => status)) {
            const newState = {
                id: props.pattern.id,
                symbol_names: props.pattern.symbol_names,
                points: [],
                start_position: [],
                end_position: [],
            } as Pattern;
            for(let i = 0; i < GRID_SIZE; i++) {
                for(let j = 0; j < GRID_SIZE; j++) {
                    const rect = rectData[i][j];
                    if(rect.is_selected)
                        newState.points.push(rect.point);
                }
            }
            newState.start_position = start_point;
            newState.end_position = end_point;
            props.onPatternUpdate(newState);
        }
    }

    return (
    <div className = "create-initial_container">
        <div className="create-initial_container2">
            <div className="create-initial-title_text">
                Create the initial pattern
            </div>
            <div className={`create-initial-save-button ${
                (optionStatus.every((status) => status))
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
            <PatternEditorRenderer 
                editorState={editorState}
                rectData={rectData}
                start_point={start_point}
                end_point={end_point}
                focus_point={focus_point}
                onRectClick={onRectClick}
                selected_color={selected_color}
                selected_shape={selected_shape}/>
            <PatternEditorSidebar
                editorState={editorState}
                onEditorStateUpdate={updateEditorState}
                optionStatus={optionStatus}/>
            <PatternEditorCell
                editorState={editorState}
                focus_point={focus_point}
                updateSelectedColor={setSelectedColor}
                updateSelectedShape={setSelectedShape}
                />
        </div>
    </div>);
}

export default PatternEditor;
export {PatternEditorState, RectData};