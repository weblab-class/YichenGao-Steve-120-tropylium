import React, {useState} from "react";
import { Project, Symbol, Operator, Pattern, Point } from "../../../../constants/Types";
import PreviewRenderer from "./PreviewRenderer";
import OperatorEdit from "./OperatorEdit";

import "./FractalSidebar.css";

type Props = {
    title: string
    updateTitle: (new_title: string) => void
    patterns: Pattern[]
    updatePatterns: (new_patterns: Pattern[]) => void
    onPatternClick: (symbol_ID: string) => void
    operators: Operator[]
    updateOperators: (new_operators: Operator[]) => void
    symbols: Symbol[]
    updateSymbols: (new_symbols: Symbol[]) => void
    numIterations: number
    updateNumIterations: (new_num_iterations: number) => void
    initial: string
    updateInitial: (new_initial: string) => void
    backgroundColor: number
    updateBackgroundColor: (new_background_color: number) => void
    //antialias: boolean
    //updateAntialias: (new_antialias: boolean) => void
}

const FractalSidebar = (props: Props) => {
    //const [initial_input_invalid, setInitialInputInvalid] = useState([] as string[]);
    
    function getValidatedColorString(hex_color: number): string {
        const raw_string = props.backgroundColor.toString(0x10);
        return "#" + "0".repeat(6-raw_string.length) + raw_string;
    }

    function getTempPattern(): Pattern {
        return props.patterns[0];
    }

    function isInitialValid(initial: string):string[] {
        const invalid_instructions: string[] = [];
        for(let instruction of initial) {
            const is_operator = props.operators.find(
                (operator: Operator) => operator.name === instruction
            ) !== undefined;
            const is_symbol = props.symbols.find(
                (symbol: Symbol) => symbol.name === instruction
            ) !== undefined;
            // console.log(`${instruction} is operator ${is_operator}`)
            // console.log(`${instruction} is symbol ${is_symbol}`)
            if(!is_operator && !is_symbol) {
                invalid_instructions.push(instruction);
            }
        }
        return invalid_instructions;
    }

    function onInitialUpdate(raw_initial: string):void {
        const invalid_instructions = isInitialValid(raw_initial)
        console.log(invalid_instructions);
        if(invalid_instructions.length === 0) 
            props.updateInitial(raw_initial);
        //setInitialInputInvalid(invalid_instructions);
    }

    function onOperatorUpdate(new_operator: Operator): void {
        const new_operators: Operator[] = [];
        props.operators.forEach((old_operator: Operator) => {
            if(old_operator.name === new_operator.name)
                new_operators.push(new_operator);
            else 
                new_operators.push(old_operator);
        });
        props.updateOperators(new_operators);
    }
    
    return <div className ='sidebar_container'>
        <input className="sidebar_input" 
            type="text" value = {props.title} placeholder="Project Title"
            onChange={(event) => props.updateTitle(event.target.value)}/>
        <div className = 'sidebar-open-initial_button' 
            onClick = {() => {props.onPatternClick("A")}}>
            Open Initial Editor
        </div>
        <PreviewRenderer
            pattern={getTempPattern()}/>
        <div>
            Initial Pattern
        </div>
        <div>
            {`Available Operators: 
            ${props.operators.map((operator: Operator) => operator.name).join(', ')}`
            }
        </div>
        <div>
            {`Available Symbols: 
            ${props.symbols.map((symbol: Symbol) => symbol.name).join(', ')}`
            }
        </div>
        <input className="sidebar_input" 
            type="text" 
            value = {props.initial} 
            placeholder={
                props.operators.map((operator: Operator) => operator.name).join(', ') + 
                ', ' + 
                props.symbols.map((symbol: Symbol) => symbol.name).join(', ')} 
            maxLength={10}
            onChange={(event) => onInitialUpdate(event.target.value.toUpperCase())}/> 
        {/* <div className={`-sidebar-warning_text 
            ${initial_input_invalid.length === 0} 
                ? '' 
                : 'invalid'`}>
                {`${initial_input_invalid.join(', ')} not found among operators or symbols`}
        </div> */}
        <div>
            Number of Iterations
        </div>
        <input className = 'sidebar_input'
            type='number' 
            value={props.numIterations} 
            min={0} 
            max={20} 
            step={1} 
            onChange={(event) => props.updateNumIterations(Number(event.target.value))}
        />
        <div>
            Background Color
        </div>
        <input 
            type='color' 
            value={getValidatedColorString(props.backgroundColor)}
            onChange={(event) => {
                props.updateBackgroundColor(parseInt(event.target.value.substring(1), 16))}}
        />
        <div> 
            Symbols
        </div>
        <div>
            Operators
        </div>
        {
            props.operators.map((operator: Operator) => 
                <OperatorEdit key = {operator.name} operator={operator} updateOperator={onOperatorUpdate}/>
            )
        }
        {/* <div>
            Antialiasing on
        </div>
        <input 
            type='checkbox' checked={props.antialias}
            onChange={(event) => {props.updateAntialias(event.target.checked)}}/> */}
        
            
    </div>
}

export default FractalSidebar;