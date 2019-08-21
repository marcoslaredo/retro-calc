import React, { Component } from 'react';
import { keypadKeys } from '../../utils/constants';
import Calculator from '../calculator';

export default class Keypad extends Component {
    handleClick = (key)=>{
        this.props.calculate(key);
    };
    
    buttonMap = (key) =>{
        return (
            <Calculator.Button
                key={key}
                onButtonClick={this.handleClick}
                buttonKey={key}
            />
        )
    };

    blockMap = (block, index)=>{
        return (
            <div key={index} className="block">
                { block.map( this.buttonMap ) }
            </div>
        )
    };

    render() {
        return (
            <div className="keypad">
                { keypadKeys.map( this.blockMap ) }
            </div>
        )
    };
};
