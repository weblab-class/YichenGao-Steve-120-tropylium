import React, {useEffect, useState, useRef} from "react"
import { RouteComponentProps } from "@reach/router"

import FractalInitial from "../modules/fractal/FractalInitial"
import FractalSidebar from "../modules/fractal/FractalSidebar";
import "./FractalCreator.css";
import FractalRenderer from "../modules/fractal/FractalRenderer";

type FractalCreatorProps = RouteComponentProps & {
    is_new_project: boolean;
}

type Project = {
    id: string
    title: string
    symbols: Symbol[]
    operators: Operator[]
    initial: string
    iterations: number
    background_color: number
    //antialias: boolean
}

type Symbol = {
    name: string;
    pattern_same_as: string;
    pattern: Pattern;
    replacement_rule: string;
}
type Operator = {
    name: string;
    rotation: number;
}
type Pattern = {
    points: Point[],
    start_position: number[],
    end_position: number[],
}
type Point = {
    x: number;
    y: number;
    color: number;
    shape: string;
}

const FractalCreator = (props: FractalCreatorProps) => {
    
    // project states 
    // TODO: load and save these props from/to database
    const [title, setTitle] = useState("");
    const [symbols, setSymbols] = useState([
        {
            name: "A",
            pattern_same_as: "",
            pattern: {
                points: [],
                start_position: [],
                end_position: [],
            } as Pattern,
            replacement_rule: "A+B",
        } as Symbol, 
        {
            name: "B",
            pattern_same_as: "A",
            pattern: {
                points: [],
                start_position: [],
                end_position: [],
            } as Pattern,
            replacement_rule: "A-B",
        } as Symbol, 
    ]);
    const [operators, setOperators] = useState([
        {
            name: "+",
            rotation: 90,
        } as Operator,
        {
            name: "-",
            rotation: -90,
        } as Operator
    ]);
    const [initial, setInitial] = useState("A");
    const [num_iterations, setNumIterations] = useState(0);
    const [background_color, setBackgroundColor] = useState(0xFFFFFF);
    //const [antialias, setAntialias] = useState(true);

    const [is_editor_open, setEditorOpen] = useState(false); 

    function updatePattern(newPattern: Pattern): void {
        const newSymbols = [...symbols];
        const operator = newSymbols.find((symbol: Symbol) => symbol.name === "A");
        operator.pattern = newPattern;
        setSymbols(newSymbols);
        setEditorOpen(false);
    }

    function getTempPattern(): Pattern {
        const operator = symbols.find((symbol: Symbol) => symbol.name === "A");
        return operator.pattern;
    }

    function openInitialEditor(event): void {
        setEditorOpen(true);
    }

    function updateNumIterations(new_num_iterations: number): void {
        if(new_num_iterations > 20) //pls don't go higher lol
            new_num_iterations = 20;
        setNumIterations(new_num_iterations);
    }
    
    return (<div className = 'fractal-creator_container'>
        <div className = {`fractal-creator-initial_container 
            ${is_editor_open 
                ? 'editor-open'
                : ''
            }`}>
            <FractalInitial 
                pattern={getTempPattern()} 
                onPatternUpdate={updatePattern}/>
        </div>
        <FractalRenderer
            num_iterations={num_iterations}
            initial={initial}
            symbols={symbols}
            operators={operators}
            background_color={background_color}
            />
        <FractalSidebar 
            title= {title}
            updateTitle={setTitle}
            symbols={symbols}
            updateSymbols={setSymbols}
            onPatternClick={openInitialEditor}
            numIterations={num_iterations}
            updateNumIterations={updateNumIterations}
            backgroundColor={background_color}
            updateBackgroundColor={setBackgroundColor}
        />
    </div>);
};

export default FractalCreator;
export type { Project, Symbol, Operator, Pattern, Point };