import { ACTION_TYPES } from "../App"

const OperationButton = ({dispatch, operation}) => {

    const dispatchOperationtHandler = () => {
            
        dispatch({type: ACTION_TYPES.CHOOSE_OPERATION, payload: {operation}});
        
    }

    return (
        <button onClick={dispatchOperationtHandler}>{operation}</button>
    )
}

export default OperationButton;

