import React, { Component } from 'react'

export default class Button extends Component {
    render(){
        return (
            <div className={`column-${this.props.cols}`}>
                <button className="btn" onClick={() => this.props.action(this.props.symbol)}>{this.props.symbol}</button>
            </div>
        )
    }
}
