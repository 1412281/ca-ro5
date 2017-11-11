import React from 'react'
import Square from './Square'

export  default  class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(this.props.n).fill(null),
            xIsNext: true,
        }
    }
    renderSquare(index) {
        return <Square
            value = {this.state.squares[index]}
            i = {index}
            onClick = {() => this.handleClick(index)}
        />;
    }

    handleClick(index) {
        const squares = this.state.squares.slice();
        squares[index] = this.state.xIsNext ? 'X' : 'O';

        console.log(squares);
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    createSquare(n){

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
                <div className="status">
                    <h3>Next player: {this.state.xIsNext ? 'X' : 'O'}</h3>
                </div>

                {this.renderRowAndCol()}

            </div>
        );
    }
}