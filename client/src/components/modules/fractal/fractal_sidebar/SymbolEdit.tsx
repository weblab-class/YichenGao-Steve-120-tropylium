import React, { useRef } from "react";
import { Symbol } from "../../../../constants/Types";
import "./SymbolEdit.css";
import delete_icon from "../../../../images/delete.svg"

type Props = {
    symbol: Symbol
    updateSymbol: (new_symbol: Symbol) => void; 
    removeSymbol: (remove_symbol: Symbol) => void;
    getInvalidInstructions: (replacement_rule: string) => string[]
}

const SymbolEdit = (props: Props) => {
    const input_ref = useRef(undefined);

    function updateReplacementRule(raw_replacement_rule: string): void {
        if(props.getInvalidInstructions(raw_replacement_rule).length === 0) {
            const new_symbol = {
                name: props.symbol.name,
                replacement_rule: raw_replacement_rule
            } as Symbol
            props.updateSymbol(new_symbol);
        }
    }

    function removeSymbol() {
        props.removeSymbol(props.symbol);
    }

    return (<div className="symbol-edit_container">
        <div className="symbol-edit_container2">
            <div className="instruction-icon symbol box-shadow">
                        <div>
                        {props.symbol.name}
                        </div>
                    </div>
            <div className="fractal-sidebar-edit-remove_button"
            onClick={(event) => removeSymbol()}>
            <img src={delete_icon}/>
            </div>        
        </div>
        <div className="fractal-sidebar-edit-hint_text symbol-edit-hint_text">
            Replacement Rule:
        </div>
                
                
                <input className = 'symbol-edit_input symbol-edit_input' ref = {input_ref}
                    type='text' value={props.symbol.replacement_rule}
                    onChange={(event) => updateReplacementRule(event.target.value.toUpperCase())}/>
                
                    <div className="fractal-sidebar_divider">
                    </div>
            </div>);
}

export default SymbolEdit;