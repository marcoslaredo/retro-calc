import React, { Component } from 'react';
import { keypadKeys } from '../../utils/constants';
import Calculator from '../calculator';

export default class Keypad extends Component {
    handleClick = (key) => {
        switch (key) {
            case 'C':      this.props.clear();        break;
            case '\u232B': this.props.delete();       break;
            case '=':      this.props.evaluate();     break;
            default:       this.props.calculate(key); break;
        };
    };
    
    buttonMap = (key) => {
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
