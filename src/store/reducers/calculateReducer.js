import * as types from '../types';
import calculate from '../../utils/calculate';
import { changeOperators } from '../../utils/constants';

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
            if ( /^\d/.test(action.payload) && !expression ) {
               return `${''}${action.payload}`;
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
                total: /[/*-+.]/.test(expression[expression.length - 1]) ? 
                    expression[expression.length - 1]
                        .replace(/[*/]/g, ex => { return changeOperators[ex]}) :
                    ''
            }

        case types.CLEAR_EXPRESSION:
            return {
                ...state,
                expression: '',
                total: 0
            }

        case types.DELETE_LAST_EXPRESSION_ENTRY:
            let newExpression = state.expression; 

            if (!state.expression)
                newExpression = state.total.toString();

            if (['\u232B'].includes(newExpression))
                return state;

            newExpression = newExpression.split('').slice(0, newExpression.length - 1).join('');

            return {
                ...state,
                expression: newExpression,
                total: '\u232B'
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