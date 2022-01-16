import { RouteComponentProps } from "@reach/router";
import React, {useState, useRef} from "react";

import "./FractalCreatorTest.css"

type FractalCreatorProps = RouteComponentProps & {

}


const FractalCreatorTest = (props: FractalCreatorProps) => {
    return (<div className = "create-container">
        Fractal Creator
    </div>);
}

export default FractalCreatorTest;