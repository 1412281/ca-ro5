import React from 'react';

export default class Square extends React.Component {

    render() {
        var nameclass = "square";
        if (this.props.currently) {
            nameclass = "square-bold";
        }

        return (
            <button style={this.props.style} className={nameclass} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}
