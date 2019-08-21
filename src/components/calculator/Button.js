import React from 'react'
import { operators, specialOperators } from '../../utils/constants';

export default ({ onButtonClick, buttonKey }) => {
    const handleClick = (e) => { onButtonClick(e.target.name) };
    let classNames = [
        'btn',
        operators.includes(buttonKey) ? 'btn--orange' : '',
        specialOperators.includes(buttonKey) ? 'btn--grey' : '',
        (buttonKey === 'C' || buttonKey === '0') ? 'btn--zero' : ''
    ];

    return (
        <button
            name={ buttonKey }
            className={ classNames.join(' ').trim() }
            onClick={ handleClick }
        >
            { buttonKey === '*' ? 'x' : buttonKey }
        </button>
    );
};
