import React, {useState} from "react";
import { Pattern } from "../../../../constants/Types";

import "./FractalSidebar.css";
import PatternEdit from "./PatternEdit";

type Props = {
    patterns: Pattern[]
    updatePatterns: (new_patterns: Pattern[]) => void
    onPatternClick: (pattern: Pattern) => void
}

const PatternEditList = (props: Props) => {
    function updatePattern(new_pattern: Pattern): void {
        const new_patterns: Pattern[] = [];
        for(let old_pattern of props.patterns) {
            if(old_pattern.id === new_pattern.id)
                new_patterns.push(new_pattern)
            else
                new_patterns.push(old_pattern)
        }
        props.updatePatterns(new_patterns);
    }

    function removePattern(remove_pattern: Pattern): void {
        const new_patterns: Pattern[] = [];
        for(let old_pattern of props.patterns) {
            if(old_pattern.id !== remove_pattern.id)
                new_patterns.push(old_pattern)
        }
        props.updatePatterns(new_patterns);
    }

    function getNewPatternID(): number {
        let new_id = 0;
        while(true) {
            if(undefined === props.patterns.find(
                (pattern: Pattern) => pattern.id === new_id))
                return new_id;
            new_id++;
        }
    }

    function addPattern(): void {
        props.updatePatterns([...props.patterns].concat({
            id: getNewPatternID(),
            symbol_names: [],
            points: [],
            start_position: [],
            end_position: [],
        } as Pattern));
    }
    
    return (<div>
        <div>
            Patterns
        </div>
        {
            props.patterns.map((pattern: Pattern, index: number) => 
                <PatternEdit key = {index} 
                    pattern={pattern} 
                    updatePattern={updatePattern}
                    removePattern={removePattern}
                    onPatternClick={props.onPatternClick}
                    />
            )
        }
        <div onClick={(event) => addPattern()}>
            Add Pattern
        </div> 
    </div>);
}

export default PatternEditList;