import React from 'react'
import Square from './Square'

export  default  class Board extends React.Component {

    renderSquare(index) {
        var sStyle = {};
        if (this.props.lineWin !== null && this.checkInlineWin(index)) {
            sStyle = {background: '#56ff00'};
        }
        let currently = false;
        if (this.props.currently === index) {
            currently = true;
        }
        return <Square style = {sStyle}
             value = {this.props.squares[index]}
            onClick = {() => this.props.onClick(index)}
             currently = {currently}
        />;
    }

    checkInlineWin(index) {
        const line = this.props.lineWin;
        for(var i = 0; i < line.length; i++) {
            if (line[i] === index) {
                return true;
            }
        }
        return false;
    }
    renderRowAndCol() {
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

