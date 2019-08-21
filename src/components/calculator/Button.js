import React from 'react'

export default ({ onButtonClick, buttonKey }) => {
    const handleClick = ()=>{ onButtonClick(buttonKey) };
    return (
        <button onClick={ handleClick }>
            { buttonKey }
        </button>
    );
};
