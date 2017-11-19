import React from 'react'
import Board from './Board'

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        if (this.n === undefined || this.n === null || this.n === 0) this.n = 10;
        this.state = {
            stepNumber: 0,
            history: [{squares: Array(this.n * this.n).fill(null)}],
            xIsNext: true,
            move: [{moves: null}],
            desc: false
        }
    }

    handleClick(index) {

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const moves = this.state.move.slice(0, this.state.stepNumber + 1);
        const cur_square = history[history.length - 1].squares;

        const squares = cur_square.slice();

        if (squares[index] !== null) { return }

        if (checkWin(squares, this.props.n)) {
            return;
        }
        squares[index] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{squares: squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            move: moves.concat([{moves: index}]),
        });
    }

    jumpTo(step) {

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleSortButton() {
        this.setState({desc: !this.state.desc});
    }

    moveToString(index, n) {
        const row = Math.floor(index / n) + 1;
        const col = index % n + 1;
        return '(' + (row) + ',' + (col) + ')';
    }

    render() {
        const history = this.state.history;
        const squares = history[this.state.stepNumber].squares;
        let currently = this.state.move[this.state.stepNumber].moves;

        let moves = history.map((step, i) => {

            const desc = this.state.move[i].moves === null ? 'Start' :
                this.moveToString(this.state.move[i].moves, this.props.n);
            return (
                <li key={i}>
                    <button onClick={() => this.jumpTo(i)}>{desc}</button>
                </li>
            );

        });

        let status;
        let line_win = null;
        const winner = checkWin(squares, this.props.n);
        if (winner !== null) {
            status = 'Winner: ' + winner.team;
            line_win = winner.squares;

        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (this.state.desc) {
            moves.reverse();
        }
        return (

            <div className="game">

                <div className="game-board">
                    <Board
                        n={this.props.n}
                        squares={squares}
                        currently={currently}
                        lineWin = {line_win}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div><b>{status}</b></div>
                    <button onClick={this.handleSortButton.bind(this)}>Sort move</button>
                    <ol>{moves}</ol>
                </div>
                <br/>
                <div></div>
            </div>
        );
    }
}

function checkWin(squares, n) {
    var result = {
        team: '',
        squares: [],
    }
    for (let row = 0; row < n - 4; row++) {
        for (let col = 0; col < n; col++) {
            const team = squares[row * n + col];
            if (team == null) continue;
            result.team = team;
            let i;

            // right left
            if (col <= n - 4) {
                result.squares = [];
                result.squares.push(row*n + col);
                for (i = 1; i < 5; i++) {
                    result.squares.push(row*n + col + i);
                    if (squares[row * n + col + i] !== team) {
                        break;
                    }
                }
                if (i === 5) {
                    return result;
                }
            }

            // front 2 bottom
            result.squares = [];
            result.squares.push(row*n + col);
            for (i = 1; i < 5; i++) {
                result.squares.push(row*n + col + i * n);
                if (squares[row * n + i * n + col] !== team) {
                    break;
                }
            }
            if (i === 5) {
                return result;
            }

            //diagonal right left
            result.squares = [];
            result.squares.push(row*n + col);
            for (i = 1; i < 5; i++) {
                result.squares.push(row * n + i * n + col + i);
                if (squares[row * n + i * n + col + i] !== team) {
                    break;
                }
            }
            if (i === 5) {
                return result;
            }
            //diagonal left right
            result.squares = [];
            result.squares.push(row*n + col);
            if (col >= 4) {
                for (i = 1; i < 5; i++) {
                    result.squares.push(row * n + i * n + col - i);
                    if (squares[row * n + i * n + col - i] !== team) {
                        break;
                    }
                }
                if (i === 5) {
                    return result;
                }
            }


        }
    }
    return null;
}