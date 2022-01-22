import React from "react";
import { Operator, Pattern, Symbol } from "../../../../constants/Types";
import "./FractalSidebar.css";
import OperatorEdit from "./OperatorEdit";
import PreviewRenderer from "./PreviewRenderer";
import SymbolEdit from "./SymbolEdit";

type Props = {
    title: string
    updateTitle: (new_title: string) => void
    patterns: Pattern[]
    updatePatterns: (new_patterns: Pattern[]) => void
    onPatternClick: (pattern: Pattern) => void
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

    function getInvalidInstructions(initial: string):string[] {
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
        const invalid_instructions = getInvalidInstructions(raw_initial)
        
        if(invalid_instructions.length === 0) 
            props.updateInitial(raw_initial);
        //setInitialInputInvalid(invalid_instructions);
    }

    function onSymbolUpdate(new_symbol: Symbol): void {
        if(getInvalidInstructions(new_symbol.replacement_rule).length === 0) {
            const new_symbols: Symbol[] = [];
            props.symbols.forEach((old_symbol: Symbol) => {
                if(old_symbol.name === new_symbol.name)
                    new_symbols.push(new_symbol);
                else 
                    new_symbols.push(old_symbol);
            });
            props.updateSymbols(new_symbols);
        }
    }

    function onOperatorUpdate(new_operator: Operator): void {
        if(typeof new_operator.rotation === "number") {
            const new_operators: Operator[] = [];
            props.operators.forEach((old_operator: Operator) => {
                if(old_operator.name === new_operator.name)
                    new_operators.push(new_operator);
                else 
                    new_operators.push(old_operator);
            });
            props.updateOperators(new_operators);
        }
    }
    
    return <div className ='sidebar_container'>
        <input className="sidebar_input" 
            type="text" value = {props.title} placeholder="Project Title"
            onChange={(event) => props.updateTitle(event.target.value)}/>
        <div className = 'sidebar-open-initial_button' 
            onClick = {() => {props.onPatternClick(props.patterns[0])}}>
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
        {
            props.symbols.map((symbol: Symbol) => 
                <SymbolEdit key = {symbol.name} symbol={symbol} updateSymbol={onSymbolUpdate}/>
            )

        }
        <div>
            Operators
        </div>
        {
            props.operators.map((operator: Operator) => 
                <OperatorEdit key = {operator.name} operator={operator} updateOperator={onOperatorUpdate}/>
            )
        } 
    </div>
}

export default FractalSidebar;