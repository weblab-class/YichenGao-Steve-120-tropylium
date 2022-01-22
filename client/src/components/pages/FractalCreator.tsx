import React, {useEffect, useState, useRef} from "react"
import { RouteComponentProps } from "@reach/router"

import PatternEdit from "../modules/fractal/fractal_pattern_edit/PatternEdit"
import FractalSidebar from "../modules/fractal/fractal_sidebar/FractalSidebar";
import FractalRenderer from "../modules/fractal/FractalRenderer";
import { Project, Symbol, Operator, Pattern, Point } from "../../constants/Types";

import "./FractalCreator.css";

type FractalCreatorProps = RouteComponentProps & {
    is_new_project: boolean;
}

const FractalCreator = (props: FractalCreatorProps) => {
    
    // project states 
    // TODO: load and save these props from/to database
    const [title, setTitle] = useState("");
    const [patterns, setPatterns] = useState([{
        symbol_names: ["A", "B"],
        points: [],
        start_position: [],
        end_position: [],
    } as Pattern,    
    ]);
    const [symbols, setSymbols] = useState([
        {
            name: "A",
            replacement_rule: "A+B",
        } as Symbol, 
        {
            name: "B",
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
        setPatterns([newPattern])
        setEditorOpen(false);
    }

    function getTempPattern(): Pattern {
        return patterns[0];
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
            <PatternEdit 
                pattern={getTempPattern()} 
                onPatternUpdate={updatePattern}/>
        </div>
        <FractalRenderer
            num_iterations={num_iterations}
            initial={initial}
            patterns={patterns}
            symbols={symbols}
            operators={operators}
            background_color={background_color}
            />
        <FractalSidebar 
            title= {title}
            updateTitle={setTitle}
            operators={operators}
            updateOperators={setOperators}
            symbols={symbols}
            updateSymbols={setSymbols}
            patterns={patterns}
            updatePatterns={setPatterns}
            onPatternClick={openInitialEditor}
            initial={initial}
            updateInitial={setInitial}
            numIterations={num_iterations}
            updateNumIterations={updateNumIterations}
            backgroundColor={background_color}
            updateBackgroundColor={setBackgroundColor}
        />
    </div>);
};

export default FractalCreator;
