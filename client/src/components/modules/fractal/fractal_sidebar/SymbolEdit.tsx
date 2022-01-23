import React, { useRef } from "react";
import { Symbol } from "../../../../constants/Types";
import "./SymbolEdit.css";

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
    <div className="symbol-edit-name_text">
        {props.symbol.name}
    </div>
    <div className="spacer"/>
    <input className = 'symbol-edit_input' ref = {input_ref}
        type='text' value={props.symbol.replacement_rule}
        onChange={(event) => updateReplacementRule(event.target.value.toUpperCase())}/>
    <div className="symbol-edit-remove_button"
            onClick={(event) => removeSymbol()}>
            Remove
        </div>
</div>);
}

export default SymbolEdit;