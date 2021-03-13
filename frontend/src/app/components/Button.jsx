import React from 'react';
import './Button.css';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <button className={this.props.className + " tstBtn"} onClick={this.props.onClick}>
                <span className="btn__text">{this.props.children}</span>
            </button>
        );
    }
}