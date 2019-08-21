import React, { Component } from 'react';
import { keypadKeys } from '../../utils/constants';
import Calculator from '../calculator';

export default class Keypad extends Component {
    handleClick = (key)=>{
        this.props.calculate(key);
    };
    render() {
        return (
            keypadKeys.map( line =>{
                return line.map( key =>(
                    <Calculator.Button
                        key={key}
                        onButtonClick={this.handleClick}
                        buttonKey={key}
                    />
                ))
            })
        )
    };
};
