import React from 'react'
import Square from './Square'

export  default  class Board extends React.Component {

    renderSquare(index) {
        let currently = false;
        if (this.props.currently === index) {
            currently = true;
        }
        return <Square
             value = {this.props.squares[index]}
             //value = {index}
            i = {index}
            onClick = {() => this.props.onClick(index)}
             currently = {currently}
        />;
    }


    renderRowAndCol() {
        // console.log(this.state.squares[1]);
        const n = this.props.n;
        const data = [];
        for(let i = 0; i < n; i++) {
            const list_row = [];
            for(let j = 0; j < n; j++) {

                list_row.push(this.renderSquare(i*n + j));
            }
            const row = <div className="board-row">{list_row}</div>;
            data.push(row);
        }
        return data;
    }

    render() {

        return (
            <div>


                {this.renderRowAndCol()}

            </div>
        );
    }
}

