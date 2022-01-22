import React, {useState} from "react";
import PatternEditOptions from "./Options";
import {PatternEditState} from "./PatternEdit";

import "./Sidebar.css"

type Props = {
    editorState: PatternEditState,
    onEditorStateUpdate: (newEditorState: PatternEditState) => void,
    optionStatus: boolean[],
}

const Sidebar = (props: Props) => {
    
    const [currentEditorState, setCurrentEditorState] = useState(props.editorState);
    
    const onOptionClick = (new_editor_state: PatternEditState): void => {
        if(!(new_editor_state === currentEditorState)) {
            props.onEditorStateUpdate(new_editor_state);
            setCurrentEditorState(new_editor_state);
        }
    }

    return (<div className="fractal-initial-sidebar_container">
        <PatternEditOptions
            title='Select Cells'
            hint='Select one or more cells'
            is_selected={props.editorState === PatternEditState.SELECT_REGULAR}
            done={props.optionStatus[PatternEditState.SELECT_REGULAR]}
            associated_editor_state={PatternEditState.SELECT_REGULAR}
            onClick={onOptionClick}/>
        <PatternEditOptions
            title='Select Start Point'
            hint='Select 1 start point'
            is_selected={props.editorState === PatternEditState.SELECT_START}
            done={props.optionStatus[PatternEditState.SELECT_START]}
            associated_editor_state={PatternEditState.SELECT_START}
            onClick={onOptionClick}/>
        <PatternEditOptions
            title='Select End Point'
            hint='Select 1 end point'
            is_selected={props.editorState === PatternEditState.SELECT_END}
            done={props.optionStatus[PatternEditState.SELECT_END]}
            associated_editor_state={PatternEditState.SELECT_END}
            onClick={onOptionClick}/>
    </div>)
}

export default Sidebar;