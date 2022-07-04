import { useReducer } from 'react';
import DigitButton from './component/DigitButton';
import OperationButton from './component/OperationButton';

import './styles.css';

export const ACTION_TYPES = {
  ADD_DIGIT: 'ADD_DIGIT',
  DELETE_DIGIT: 'DELETE_DIGIT',
  RESET_CALCULATOR: 'RESET_CALCULATOR',
  CALCULATE_TOTAL: 'CALCULATE_TOTAL',
  CHOOSE_OPERATION: 'CHOOSE_OPERATION'
}

const initialState = {
  currentOperand: null, 
  previousOperand: null
}


const reducer = (state, action) => {
    const {type, payload} = action;
    const {currentOperand, previousOperand, operation} = state;


    switch(type){
        case ACTION_TYPES.ADD_DIGIT:
          
          if(payload.digit === '0' && currentOperand === '0'){
            return state;
          }
          if(payload.digit === '.' && currentOperand.includes('.')){
            return state;
          }
          return {
            ...state, 
            currentOperand:`${currentOperand || ''}${payload.digit}`
          }

        case ACTION_TYPES.RESET_CALCULATOR:
          return {}

        case ACTION_TYPES.CHOOSE_OPERATION: 
          if(currentOperand == null && previousOperand == null){
            return state
          }

          if(previousOperand == null){
            return {
            operation: payload.operation,
            previousOperand: currentOperand,
            currentOperand: null
            }
          }

          if(currentOperand == null){
            return state;
          }


        
          return {
            previousOperand: `${'test'}${payload.operation}`,
            currentOperand: null
          }

        default:
          return state
    } 

}



function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, initialState);

  

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={() => dispatch({type: ACTION_TYPES.RESET_CALCULATOR})} className='span-two'>AC</button>
      <button>DEL</button>
      <OperationButton operation={"÷"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch}/>
      <DigitButton digit={"2"} dispatch={dispatch}/>
      <DigitButton digit={"3"} dispatch={dispatch}/>
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch}/>
      <DigitButton digit={"5"} dispatch={dispatch}/>
      <DigitButton digit={"6"} dispatch={dispatch}/>
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch}/>
      <DigitButton digit={"8"} dispatch={dispatch}/>
      <DigitButton digit={"9"} dispatch={dispatch}/>
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch}/>
      <button className='span-two'>=</button>
    </div>
  );
}

export default App;

