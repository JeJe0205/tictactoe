import React from "react";
import { Component } from "react";
import Square from "./Square.js";


export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		};
	}

	renderSquare(i) {
		const val = this.state.squares[i];
		return <Square value={val} onClick={() => this.handleClick(i)} />;
	}

	handleClick(i) {
		const squares = [...this.state.squares];
		const xIsNext = this.state.xIsNext;
		if (squares[i] || this.determineWinner(squares)) return;
		squares[i] = xIsNext ? "x" : "o";
		this.setState({ squares, xIsNext: !xIsNext });
	}

	determineWinner(sqr) {
		const indecies = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		const winnerRow = indecies.find(
			([a, b, c]) => sqr[a] && sqr[a] == sqr[b] && sqr[b] == sqr[c]
		);

		return winnerRow ? sqr[winnerRow[0]]: false;
	}

    isDraw(sqr) {
        return !(this.determineWinner(sqr) || sqr.some(e=>!e));
    }

	render() {
		const winner = this.determineWinner(this.state.squares);
		const player = this.state.xIsNext ? "X" : "O";
		const status = winner
			? `Player ${winner} won!`
            : this.isDraw(this.state.squares)
            ? `It's a Draw!`
			: `Next player: ${player}`;

		return (
			<div className="game-wrapper">
				<div className="status">{status}</div>
				<div className="board-wrapper">
					<div className="board">
						{[...Array(9)].map((_, i) => this.renderSquare(i))}
					</div>
				</div>
			</div>
		);
	}
}
