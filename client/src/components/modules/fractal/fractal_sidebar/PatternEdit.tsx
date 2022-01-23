import React, {useState} from "react";
import { Pattern } from "../../../../constants/Types";
import PreviewRenderer from "./PreviewRenderer";

import "./PatternEdit.css";

type Props = {
    pattern: Pattern
    onPatternClick: (pattern: Pattern) => void
}

const PatternEdit = (props: Props) => {
    return (<div>
        <div>
            {`Pattern for ${props.pattern.symbol_names.join(', ')}`}
        </div>
        <PreviewRenderer 
            pattern={props.pattern}
            onPreviewClick={props.onPatternClick}/>
    </div>);
}

export default PatternEdit;