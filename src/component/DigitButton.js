import { ACTION_TYPES } from "../App";

const DigitButton = ({dispatch, digit}) => {

    const dispatchDigitHandler = () => {
            
        dispatch({type: ACTION_TYPES.ADD_DIGIT, payload: {digit}})
        
    }
    

    return (
        <button onClick={dispatchDigitHandler}>{digit}</button>
    )
}

export default DigitButton;

