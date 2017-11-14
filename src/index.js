import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            n: 10,
            game: ()=> <Game i={this.state.i} n={this.state.n} />,
        }
    }
    newGame() {
        let i = this.state.i + 1;
        this.setState({
            i: i,
            n: this.n,
            game: () => <Game i={i} n={this.state.n} />,
        });
    }

    handleChange(e){
        const value = e.target.value;
        this.n = value;
        console.log(this.n);
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
