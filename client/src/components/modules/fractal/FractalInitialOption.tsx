import React, {useState} from "react";
import { InitialEditorState} from "./FractalInitial";

import "./FractalInitialOption.css";

type FractalInitialOptionsProps = {
    title: string,
    hint: string,
    is_selected: boolean,
    done: boolean,
    associated_editor_state: InitialEditorState,
    onClick: (newEditorState: InitialEditorState) => void,
}

const FractalInitialOptions = (props: FractalInitialOptionsProps) => {
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

export default FractalInitialOptions;