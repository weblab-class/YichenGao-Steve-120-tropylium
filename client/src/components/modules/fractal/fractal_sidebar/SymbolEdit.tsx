import React, { useRef } from "react";
import { Symbol } from "../../../../constants/Types";
import "./SymbolEdit.css";

type Props = {
    symbol: Symbol
    updateSymbol: (new_symbol: Symbol) => void; 
}

const SymbolEdit = (props: Props) => {
    const input_ref = useRef(undefined);

    function updateReplacementRule(raw_replacement_rule: string): void {
        const new_symbol = {
            name: props.symbol.name,
            replacement_rule: raw_replacement_rule
        } as Symbol
        props.updateSymbol(new_symbol);
    }

    return (<div className="symbol-edit_container">
    <div className="symbol-edit-name_text">
        {props.symbol.name}
    </div>
    <div className="spacer"/>
    <input className = 'symbol-edit_input' ref = {input_ref}
        type='text' value={props.symbol.replacement_rule}
        onChange={(event) => updateReplacementRule(event.target.value.toUpperCase())}/>
</div>);
}

export default SymbolEdit;