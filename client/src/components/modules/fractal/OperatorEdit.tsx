import React, {useState} from "react";
import { Operator } from "../../pages/FractalCreator";

import "./OperatorEdit.css";

type OperatorEditProps = {
    operator: Operator
    updateOperator: (newOperator: Operator) => void;
}

const OperatorEdit = (props: OperatorEditProps) => {
    
    // clockwise = true, counterclockwise = false
    const [orientation, setOrientation] = useState(true);

    function updateOperator(new_rotation_value: number): void {
        const new_rotation = (orientation ? -new_rotation_value : new_rotation_value);
    }
    
    return (<div className="operator-edit_container">
        <div className="operator-edit-name_text">
            {props.operator.name}
        </div>
        <input className = 'operator-edit_input'
            type='number' value={props.operator.rotation} min={0} max={180} step={1} 
            onChange={(event) => updateOperator(Number(event.target.value))}/>
        <div className="operator-edit_button">
            CW
        </div>
        <div className="operator-edit_button">
            CCW
        </div>
        
    </div>);
}

export default OperatorEdit;