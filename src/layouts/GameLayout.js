import React from "react";
import Board from "../components/Board";
import GameInfo from "../components/GameInfo";

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

    this.state = {
      cells: Array(9).fill(null),
      currentPlayer: 0,
    };
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    return state;
  }

  render() {
    const { currentPlayer } = this.state;
    return (
      <div
        style={gameLayoutStyle}
        onClick={() => this.setState({ currentPlayer: currentPlayer ? 0 : 1})}
      >
        <GameInfo currentPlayer={this.players[currentPlayer]}/>
        <Board />
      </div>
    );
  }
}

export default GameLayout;
