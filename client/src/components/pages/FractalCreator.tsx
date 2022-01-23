import { RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import { Operator, Pattern, Symbol } from "../../constants/Types";
import FractalRenderer from "../modules/fractal/FractalRenderer";
import PatternEditor from "../modules/fractal/fractal_pattern_edit/PatternEditor";
import FractalSidebar from "../modules/fractal/fractal_sidebar/FractalSidebar";
import "./FractalCreator.css";



type FractalCreatorProps = RouteComponentProps & {
    is_new_project: boolean;
}

const FractalCreator = (props: FractalCreatorProps) => {
    
    // project states 
    // TODO: load and save these props from/to database
    const [title, setTitle] = useState("");
    const [patterns, setPatterns] = useState([{
        id: 0,
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

    const [is_editor_open, setEditorOpen] = useState(false); 
    const [editing_pattern, setEditingPattern] = useState({
        id: 0,
        symbol_names: [],
        points: [],
        start_position: [],
        end_position: [],
    } as Pattern);

    function updatePattern(new_pattern: Pattern): void {
        console.log("new pattenrn")
        console.log(new_pattern);
        const new_patterns: Pattern[] = [];
        for(let old_pattern of patterns) {
            if(old_pattern.id === new_pattern.id)
                new_patterns.push(new_pattern)
            else
                new_patterns.push(old_pattern)
        }
        setPatterns(new_patterns)
        console.log(new_patterns);
        setEditorOpen(false);
    }

    function onPatternClick(pattern: Pattern) {
        console.log(patterns);
        console.log(pattern.id);
        setEditingPattern(pattern);
        setEditorOpen(true);
    }

    function onRenderStart(): void {

    }

    function onRenderEnd(renderTimeMilli: number): void {

    }
    
    return (<div className = 'fractal-creator_container'>
        <div className = {`fractal-creator-initial_container 
            ${is_editor_open
                ? 'editor-open'
                : ''
            }`}>
            <PatternEditor 
                pattern={editing_pattern} 
                onPatternUpdate={updatePattern}/>
        </div>
        <FractalRenderer
            num_iterations={num_iterations}
            initial={initial}
            patterns={patterns}
            symbols={symbols}
            operators={operators}
            background_color={background_color}
            onRenderStart={onRenderStart}
            onRenderEnd={onRenderEnd}
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
            onPatternClick={onPatternClick}
            initial={initial}
            updateInitial={setInitial}
            numIterations={num_iterations}
            updateNumIterations={setNumIterations}
            backgroundColor={background_color}
            updateBackgroundColor={setBackgroundColor}
        />
    </div>);
};

export default FractalCreator;
