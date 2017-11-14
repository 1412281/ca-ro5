import React from 'react'
import Square from './Square'

export  default  class Board extends React.Component {
    constructor(props) {
        super(props);
        if (this.n === undefined || this.n === null || this.n === 0) this.n = 20;
        this.state = {
            squares: Array(this.n*this.n).fill(null),
            xIsNext: true,
        }
    }
    renderSquare(index) {
        return <Square
             value = {this.state.squares[index]}
             //value = {index}
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

    for(let row = 0; row < n - 4; row++) {
        for(let col = 0; col < n; col++) {
            const team = squares[row*n + col];
            if (team == null) continue;
            let i;
            // right left
            if (col <= n - 4) {
                for (i = 1; i < 5; i++) {
                    if (squares[row * n + col + i] !== team) {
                        break;
                    }
                }
                if (i === 5) {
                    console.log(team);
                    return team;
                }
            }

            // front 2 bottom
            for(i = 1; i < 5; i++) {
                if (squares[row*n + i*n + col] !== team) {
                    console.log(row*n + i*n + col);
                    break;
                }
            }
            if (i === 5) {
                console.log(team);
                return team;
            }

            //diagonal right left
            for(i = 1; i < 5; i++) {
                if (squares[row*n + i*n + col + i] !== team) {
                    // console.log(row*n + i*n + col + i);
                    break;
                }
            }
            if (i === 5) {
                console.log(team);
                return team;
            }
            //diagonal left right
            if (col >= 4) {
                for (i = 1; i < 5; i++) {
                    if (squares[row * n + i * n + col - i] !== team) {
                        // console.log(row*n + i*n + col + i);
                        break;
                    }
                }
                if (i === 5) {
                    console.log(team);
                    return team;
                }
            }


        }
    }
    return null;
}