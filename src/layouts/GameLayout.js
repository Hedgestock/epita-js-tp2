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


  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.clearBoard = this.clearBoard.bind(this);

    this.state = {
      cells: Array(9).fill(null),
      gameState: "playing",
      currentPlayer: 0,
      players: ["player 1","player 2"],
    };
  }
  
  clearBoard() {
    this.setState({
      cells: Array(9).fill(null),
      currentPlayer: 0,
    });
  }

  inputHandler(event) {
    let players = this.state.players;
    players[event.target.name] = event.target.value;
    this.setState({players: players});
  }

  onClickHandler(index) {
    return () => {
      const { cells : tempCells, currentPlayer, gameState } = this.state;
      if ((gameState === "playing") && (tempCells[index] === null)) {
        tempCells[index] = currentPlayer;
        this.setState({
          cells: tempCells,
          currentPlayer: currentPlayer ? 0 : 1});
        }
      };
    }
        
    // getDerivedStateFromProps is called before every render,
    // use it to infer new state values from props or state changes.
    static getDerivedStateFromProps(props, state) {
      const winner = checkWinner(state.cells, 3);
      if (winner === -1) {
        state.gameState = "draw";
      } else if (winner !== null) {
        state.gameState = "over";
        state.currentPlayer = winner;
      } 
      
      return state;
    }
    
   
    render() {
    const { cells, currentPlayer, players, gameState } = this.state;
    return (
      <div style={gameLayoutStyle}>
        <GameInfo currentPlayer={players[currentPlayer]} gameState={gameState}/>
        <input name={0} type="text" value={players[0]} onChange={this.inputHandler}/>
        <input name={1} type="text" value={players[1]} onChange={this.inputHandler}/> {/* The name could be cleaner but it does the job for now */ }
        <Board cells={cells} cellClickHandler={this.onClickHandler}/>
        <button onClick={this.clearBoard}>Clear Board</button>
      </div>
    );
  }
}

export default GameLayout;
