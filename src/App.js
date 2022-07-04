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
  previousOperand: null,
  operation: null,
  overwrite: false
}


const reducer = (state, action) => {
    const {type, payload} = action;
    const {currentOperand, previousOperand, operation, overwrite} = state;


    switch(type){
        case ACTION_TYPES.ADD_DIGIT:

          if(overwrite){
            return {
              ...state,
              currentOperand: payload.digit,
              overwrite: false
            }
          }
          
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
          return {initialState};

        case ACTION_TYPES.CHOOSE_OPERATION: 
          if(currentOperand == null && previousOperand == null){
            return {
            operation: null,
            previousOperand: null,
            currentOperand: null
            }
          }

          if(previousOperand == null){
            return {
            operation: payload.operation,
            previousOperand: currentOperand,
            currentOperand: null
            }
          }

          if(currentOperand == null){
            return {
              ...state,
              operation: payload.operation,
            }
          }

          return {
            ...state,
            previousOperand: evalulate(state),
            operation: payload.operation,
            currentOperand: null
            
          }

        case ACTION_TYPES.CALCULATE_TOTAL: 

          if(previousOperand === null && operation === null && currentOperand === null){
            console.log('nothing');
            return {};
          }

          if(previousOperand === null || operation === null ){
            return {initialState};
          }

          if(currentOperand === null){
            console.log('no current Op');
            return{
            ...state,
            currentOperand: evalulateEqualSign(state).toString(),
            operation: null,
            previousOperand: null,
            overwrite: true
            }
          }

          console.log('last return');
          return{
            ...state,
            currentOperand: evalulate(state),
            operation: null,
            previousOperand: null,
            overwrite: true
          }  

        default:
          return state
    } 

}

const evalulate = (state) => {
    const {currentOperand, previousOperand, operation} = state;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if(operation === '+'){
      return (prev + curr).toString();
    } else if(operation === '÷'){
      return (prev / curr).toString();
    } else if(operation === '-'){
      return (prev - curr).toString();
    } else if(operation === '*'){
      return (prev * curr).toString();
    } 
    return null;
}
const evalulateEqualSign = (state) => {
    const {currentOperand, previousOperand, operation} = state;
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);

    if(currentOperand === null){

      if(operation === '+'){
        return (prev + prev).toString();
      } else if(operation === '÷'){
        return (prev + prev).toString();
      } else if(operation === '-'){
        return (prev + prev).toString();
      } else if(operation === '*'){
        return (prev + prev).toString();
      } 
      return null;
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
      <button onClick={() => dispatch({type: ACTION_TYPES.CALCULATE_TOTAL})} className='span-two'>=</button>
    </div>
  );
}

export default App;

