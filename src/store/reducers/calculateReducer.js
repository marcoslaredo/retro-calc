import * as types from '../types';
import calculate from '../../utils/calculate';

let initialState = {
    expression: '',
    total: 0
};

function setExpression ({ expression, total}, action) {
    if (
        /[\d]*[-+%*/.]$/.exec(expression) && 
        /[-+%*/.]/.exec(action.payload)
    ) {
        console.log('b', expression);
        expression = expression.slice(0, expression.length - 1);
        console.log('a', expression);
    }

    switch (action.type) {
        case types.SET_EXPRESSION:
            if ( ['+','/','*','%'].includes(action.payload) && !expression ) {
                return `${total}${action.payload}`;
            }
            return `${!expression && total ? total : ''}${expression + action.payload}`;
    
        default: return expression;
    }
};

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.SET_EXPRESSION:
            let expression = setExpression(state, action);
            return {
                ...state,
                expression,
                total: calculate(expression) || state.total
            }

        case types.CLEAR_EXPRESSION:
            return {
                ...state,
                expression: '',
                total: 0
            }

        case types.DELETE_LAST_EXPRESSION_ENTRY:
            let newExpression = state.expression;
            newExpression = newExpression.split('').slice(0, newExpression.length - 1).join('');
            return {
                ...state,
                expression: newExpression,
                total: calculate(newExpression)
            }

        case types.EVALUATE_EXPRESSION:
            return {
                ...state,
                expression: '',
                total: calculate(state.expression) || state.expression || state.total
            }

        default: 
            return state;
    }
};