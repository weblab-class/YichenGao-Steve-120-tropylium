import React, {useState, useRef} from "react";
import { Project, Symbol, Operator, Pattern, Point } from "../../../../constants/Types";

import "./OperatorEdit.css";

type OperatorEditProps = {
    operator: Operator
    updateOperator: (newOperator: Operator) => void;
}

const OperatorEdit = (props: OperatorEditProps) => {
    const input_ref = useRef(undefined);
    // clockwise = true, counterclockwise = false
    const [orientation, setOrientation] = useState(props.operator.rotation >= 0);

    function updateOperator(raw_rotation_value: number, orientation: boolean): void {
        const new_rotation_value = (orientation ? raw_rotation_value : -raw_rotation_value);
        console.log(`new rotation value for ${props.operator.name}: ${new_rotation_value}`)
        const new_Operator = {
            name: props.operator.name,
            rotation: new_rotation_value,
        } as Operator;
        props.updateOperator(new_Operator);
    }

    function updateOrientation(new_orientation: boolean) {
        if(new_orientation !== orientation) {
            setOrientation(new_orientation);
            updateOperator(Number(input_ref.current.value), new_orientation);
        }
    }
    
    return (<div className="operator-edit_container">
        <div className="operator-edit-name_text">
            {props.operator.name}
        </div>
        <input className = 'operator-edit_input' ref = {input_ref}
            type='number' value={Math.abs(props.operator.rotation)} min={0} max={180} step={15} 
            onChange={(event) => updateOperator(Number(event.target.value), orientation)}/>
        <div className="spacer"/>
        <div className={`operator-edit_button ${orientation ? 'selected' : ''}`} 
            onClick={(event) => updateOrientation(true)}>
            CW
        </div>
        <div className={`operator-edit_button ${orientation ? '' : 'selected'}`} 
            onClick={(event) => updateOrientation(false)}>
            CCW
        </div>
        
    </div>);
}

export default OperatorEdit;