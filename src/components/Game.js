import React from 'react'
import Board from './Board'

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        if (this.n === undefined || this.n === null || this.n === 0) this.n = 10;
        this.state = {
            number: 1,
            stepNumber: 0,
            history: [{squares: Array(this.n*this.n).fill(null)}],
            currently: null,
            xIsNext: true,
            str_move: [{moves: ''}],
            move: [{moves: null}],
        }
    }

    handleClick(index) {
        const n = this.props.n;
        const move = index;
        const row = Math.floor(index/n)+1;
        const col = index%n + 1;
        const smove = this.state.number + '. (' + (row) + ',' + (col) + ')';
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const moves = this.state.move.slice(0, this.state.stepNumber + 1);
        const cur_square = history[history.length - 1].squares;

        const squares = cur_square.slice();
        if (checkWin(squares, this.props.n)) {
            console.log(index);
            return;
        }
        squares[index] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{squares: squares}]),
            currently: index,
            xIsNext: !this.state.xIsNext,
            str_move: this.state.str_move.concat([{moves: smove}]),
            number: this.state.number + 1,
            stepNumber: history.length,
            move: moves.concat([{moves: index}]),
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            currently: this.state.move[step].moves,
        });
    }

    render() {
        const history = this.state.history;
        const squares = history[this.state.stepNumber].squares;
        const winner = checkWin(squares, this.props.n);
        const currently = this.state.currently;
        const xIsNext = this.state.xIsNext;

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        let str_move = this.state.str_move;
        const moves = history.map((step, i) => {
            const desc = str_move ?
                '' + str_move[i].moves :
                'Start';
            return (
                <li key={i}>
                    <button onClick={() => this.jumpTo(i)}>{desc}</button>
                </li>
            );
        });
        return (

            <div className="game">

                <div className="game-board">
                    <Board
                        n = {this.props.n}
                        squares={squares}
                        currently={this.state.currently}
                        xIsNext={xIsNext}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <br/>
                <div></div>
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