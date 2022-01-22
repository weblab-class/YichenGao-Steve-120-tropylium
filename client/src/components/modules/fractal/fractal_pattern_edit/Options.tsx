import React, {useState} from "react";
import { PatternEditState} from "./PatternEdit";

import "./Options.css";

type Props = {
    title: string,
    hint: string,
    is_selected: boolean,
    done: boolean,
    associated_editor_state: PatternEditState,
    onClick: (newEditorState: PatternEditState) => void,
}

const PatternEditOptions = (props: Props) => {
    const onClickOption = (event) => {
        props.onClick(props.associated_editor_state);
    }
    return (
    <div 
        className = {`fractal-initial-option_container ${
            props.is_selected ? 'selected' : (props.done ? 'done': '')}`}
        onClick = {onClickOption}>
        <div className="fractal-initial-option-title">
            {props.title}
        </div>
        <div className="fractal-initial-option-hint">
            {props.hint + (props.done ? ' DONE' : '')}
        </div>
    </div>)
}

export default PatternEditOptions;