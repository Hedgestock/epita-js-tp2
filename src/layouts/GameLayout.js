import React from "react";
import Board from "../components/Board";
import GameInfo from "../components/GameInfo";

import { checkWinner } from "../helpers/helpers";

const gameLayoutStyle = {
  width: 650,
  height: `calc(90%)`,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto"
};

class GameLayout extends React.Component {

  players = ["player 1","player 2"];

  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);

    this.state = {
      cells: Array(9).fill(null),
      currentPlayer: 0,
      winner: null,
    };
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    state.winner = checkWinner(state.cells, 3);
    return state;
  }



  onClickHandler(index) {
    return () => {
      let tempCells = this.state.cells;
      if (tempCells[index] === null) {
        tempCells[index] = this.state.currentPlayer;
      }
      this.setState({cells: tempCells});
    };
  }

  render() {
    const { cells, currentPlayer, winner } = this.state;
      if (winner !== null) {
        if (winner === -1) {
          alert("Draw.");
        } else {
          alert("AND THE WINNER IS... " + this.players[winner] + "!!!");
        }
      }
    return (
      <div
        style={gameLayoutStyle}
        onClick={() => this.setState({ currentPlayer: currentPlayer ? 0 : 1})}
      >
        <GameInfo currentPlayer={this.players[currentPlayer]}/>
        <Board cells={cells} cellClickHandler={this.onClickHandler}/>
      </div>
    );
  }
}

export default GameLayout;
