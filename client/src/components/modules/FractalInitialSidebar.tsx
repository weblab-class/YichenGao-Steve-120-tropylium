import React, {useState} from "react";
import FractalInitialOption from "./FractalInitialOption";
import {InitialEditorState,} from "./FractalInitial";

type FractalInitialSidebarProps = {
    editorState: InitialEditorState,
    onEditorStateUpdate: (newEditorState: InitialEditorState) => void,
    optionStatus: boolean[],
}

const FractalInitialSidebar = (props: FractalInitialSidebarProps) => {
    
    const [currentEditorState, setCurrentEditorState] = useState(props.editorState);
    
    const onOptionClick = (new_editor_state: InitialEditorState): void => {
        if(!(new_editor_state === currentEditorState)) {
            props.onEditorStateUpdate(new_editor_state);
            setCurrentEditorState(new_editor_state);
        }
    }

    return (<div className="fractal-initial-sidebar_container">
        <FractalInitialOption
            title='Select Cells'
            hint='Select one or more cells'
            is_selected={props.editorState === InitialEditorState.SELECT_REGULAR}
            done={props.optionStatus[InitialEditorState.SELECT_REGULAR]}
            associated_editor_state={InitialEditorState.SELECT_REGULAR}
            onClick={onOptionClick}/>
        <FractalInitialOption
            title='Select Start Point'
            hint='Select 1 start point'
            is_selected={props.editorState === InitialEditorState.SELECT_START}
            done={props.optionStatus[InitialEditorState.SELECT_START]}
            associated_editor_state={InitialEditorState.SELECT_START}
            onClick={onOptionClick}/>
        <FractalInitialOption
            title='Select End Point'
            hint='Select 1 end point'
            is_selected={props.editorState === InitialEditorState.SELECT_END}
            done={props.optionStatus[InitialEditorState.SELECT_END]}
            associated_editor_state={InitialEditorState.SELECT_END}
            onClick={onOptionClick}/>
    </div>)
}

export default FractalInitialSidebar;