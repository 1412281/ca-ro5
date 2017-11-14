import React from 'react'
import Square from './Square'

export  default  class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(this.props.n*this.props.n).fill(null),
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
        if (checkWin(squares, this.props.n)) {
            console.log(index);
            return;
        }
        squares[index] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
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
        const winner = checkWin(this.state.squares, this.props.n);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">
                    <h3>{status}</h3>
                </div>

                {this.renderRowAndCol()}

            </div>
        );
    }
}

function checkWin(squares, n){

    console.log(n);
    for(let row = 0; row < n; row++) {
        for(let col = 0; col < n; col++) {
            const team = squares[row*n + col];
            if (team == null) continue;
            // row left
            // row right
            // col up
            // col down
            // 
            let i;
            for(i = col + 1; i < col + 5; i++) {
                if (squares[i] !== team) {
                    break;
                }
            }
            if (i === col + 5) {
                console.log(team);
                return team;
            }

        }
    }
    return null;
}