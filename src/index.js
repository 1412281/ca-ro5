import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.n = 10;
        this.state = {
            i: 1,
            game: ()=> <Game i={this.state.i} n={this.n} />,
        }
    }
    newGame() {
        let i = this.state.i + 1;
        let n = this.n;
        if (n === undefined || n === null || n === 0) n = 10;
        this.setState({
            i: i,
            game: () => <Game i={i} n={n} />,
        });
    }

    handleChange(e){
        let n = e.target.value;
        console.log(this.n);
        if (n === undefined || n === null || n === 0) return;
        if (n > 40) {n = 40;}
        this.n = n;

    }

    render() {
        const MainGame = this.state.game();
        return (
            <div key={this.state.i}>
                <div >
                    <input type="text" onChange={this.handleChange.bind(this)}/>
                    <button type="button" onClick={this.newGame.bind(this)}>New Game</button>
                </div>
                <br/>
                {MainGame}

            </div>
        );
    }
}
// ========================================

ReactDOM.render(

    <App />,
    document.getElementById('root')
);
