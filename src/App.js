import { useReducer } from 'react';
import { act } from 'react-dom/test-utils';

import './styles.css';

const calculatorInputs = ['AC','DEL', '÷', 1,2,3,'*',4,5,6,'+',7,8,9,'-','.',0,'=']

const ACTION_TYPES = {
  ADD_DIGIT: 'ADD_DIGIT',
  DELETE_DIGIT: 'DELETE_DIGIT',
  RESET_CALCULATOR: 'RESET_CALCULATOR',
  CALCULATE_TOTAL: 'CALCULATE_TOTAL',
  CHOOSE_OPERATION: 'CHOOSE_OPERATION'
}

const reducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case ACTION_TYPES.ADD_DIGIT:
          return {...state, currentOperand: `${currentOperand || ''}${payload.digit}`}

        default:
          return state
    } 

}

function App() {

  const [state, dispatch] = useReducer(reducer, {});
  const {currentOperand, previousOperand, operation} = state;

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      
      {calculatorInputs.map((input) => {
        return (
          <button className={input === 'AC' || input === '=' ? 'span-two' : ''}>{input}</button>
        )
      })}
    </div>
  );
}

export default App;

