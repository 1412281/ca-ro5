import React from 'react'
import Board from './Board'

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 10,
        }
    }

    handleChange(e){
        let n = e.target.value;
        if (n > 50) {
            n = 50;
        }
        this.setState({n: n});
    }

    render() {
        return (

            <div className="game">
                <div><input type="text" value={this.state.n} onChange={this.handleChange.bind(this)} /></div>
                <div className="game-board">
                    <Board n={this.state.n} />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
