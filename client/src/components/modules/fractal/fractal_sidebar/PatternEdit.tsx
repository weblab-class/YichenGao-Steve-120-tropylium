import React, {useState} from "react";
import { Pattern, Symbol } from "../../../../constants/Types";
import PatternPreviewRenderer from "./PatternPreviewRenderer";

import "./FractalSidebar.css";

type Props = {
    pattern: Pattern
    updatePattern: (new_pattern: Pattern, new_pattern_symbol_name: string) => void
    removePattern: (remove_pattern: Pattern) => void
    onPatternClick: (pattern: Pattern) => void
    symbol_names: string[]
}

const PatternEdit = (props: Props) => {
    
    function removeSymbol(symbol_name: string): void {
        props.updatePattern({
            id: props.pattern.id,
            symbol_names: props.pattern.symbol_names.filter(
                (name: string) => name !== symbol_name),
            points: props.pattern.points,
            start_position: props.pattern.start_position,
            end_position: props.pattern.end_position,
        } as Pattern, undefined);
    }

    function addSymbol(symbol_name: string): void {
        props.updatePattern({
            id: props.pattern.id,
            symbol_names: [...props.pattern.symbol_names].concat(symbol_name),
            points: props.pattern.points,
            start_position: props.pattern.start_position,
            end_position: props.pattern.end_position,
        } as Pattern, symbol_name);
    }

    return (<div>
        <div>
            {`Pattern for`}
        </div>
        <div className="pattern-edit-symbol-names_container">
            {
                props.pattern.symbol_names.map((name: string) => 
                    <div key={name} className="pattern-edit-symbol-name_text" 
                            onClick={(event) => removeSymbol(name)}>
                        {name}
                    </div>
                )   
            }
            <div className="pattern-edit-symbol-dropdown_container">
                <div className="pattern-edit-symbol-add_button" >
                    Add
                </div>
                <div className="pattern-edit-symbol-dropdown-content_container">
                {
                    props.symbol_names.filter((symbol_name: string) => 
                        props.pattern.symbol_names.find(
                            (current_symbol_name: string) => 
                                symbol_name === current_symbol_name
                        ) === undefined
                    ).map((other_symbol_name: string) => 
                    <div 
                    key={other_symbol_name}
                    onClick={(event) => addSymbol(other_symbol_name)}>
                        {other_symbol_name}
                    </div>    
                    )
                }
                </div>
            </div>
            
        </div>
        <PatternPreviewRenderer 
            pattern={props.pattern}
            onPreviewClick={(event) => props.onPatternClick(props.pattern)}/>
        <div onClick = {(event) => props.removePattern(props.pattern)}>
            Remove
        </div>
    </div>);
}

export default PatternEdit;