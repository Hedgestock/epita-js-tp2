import React from "react";
import Board from "../components/Board";
import MetaBoard from "../components/MetaBoard";
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

    this.metaCellClickHandler = this.metaCellClickHandler.bind(this);
    this.cellClickHandler = this.cellClickHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.clearBoard = this.clearBoard.bind(this);

    this.state = {
      cells: Array(9).fill(null),
      metaCells: Array(9).fill().map(() => ({winner: null, cells: Array(9).fill(null)})),//Avoid shallow copy
      gameState: "playing",
      currentPlayer: 0,
      players: ["player 1","player 2"],
      mode: "classic",
    };
  }
  
  clearBoard() {
    this.setState({
      cells: Array(9).fill(null),
      metaCells: Array(9).fill().map(() => ({winner: null, cells: Array(9).fill(null)})),
      currentPlayer: 0,
      gameState: "playing",
    });
  }

  inputHandler(event) {
    let players = this.state.players;
    players[event.target.name] = event.target.value;
    this.setState({players: players});
  }

  cellClickHandler(index) {
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

    metaCellClickHandler(metaIndex) {
      return (index) => {
        let tempMetaCells = this.state.metaCells;
        let tempCells = this.state.metaCells[metaIndex].cells;
        return () => {
          const { currentPlayer, gameState } = this.state;
          if ((gameState === "playing") && (tempCells[index] === null)) {
            tempCells[index] = currentPlayer;
            tempMetaCells[metaIndex].cells = tempCells;
            this.setState({
              metaCells: tempMetaCells,
              currentPlayer: currentPlayer ? 0 : 1});
            }
          };
      }
    }
        
    // getDerivedStateFromProps is called before every render,
    // use it to infer new state values from props or state changes.
    static getDerivedStateFromProps(props, state) {
      let winner;
      if (state.mode === "classic")
      {
        winner = checkWinner(state.cells, 3);
      } else {

        winner = checkWinner(state.metaCells.map(mc => mc.winner), 3);

      }
      if (winner === -1) {
        state.gameState = "draw";
      } else if (winner !== null) {
        state.gameState = "over";
        state.currentPlayer = winner;
      } 
      return state;
    }
    
   
    render() {
    const { cells, currentPlayer, players, gameState, metaCells, mode } = this.state;
    return (
      <div style={gameLayoutStyle}>
        <GameInfo currentPlayer={players[currentPlayer]} gameState={gameState}/>
        <input name={0} type="text" value={players[0]} onChange={this.inputHandler}/>
        <input name={1} type="text" value={players[1]} onChange={this.inputHandler}/> {/* The name could be cleaner but it does the job for now */ }
        {mode === "classic" ? 
          <div style={{height: "600px", width: "600px"}}>
            <Board cells={cells} cellClickHandler={this.cellClickHandler}/>
          </div>
        : <MetaBoard cells={metaCells} metaCellClickHandler={this.metaCellClickHandler}/>
        }
        <button onClick={this.clearBoard}>Clear Board</button>
        <button onClick={() => {this.clearBoard(); this.setState({mode: mode === "classic" ? "strategic" : "classic"})}}>
          Play {mode === "classic" ? "strategic" : "classic"}
        </button>

      </div>
    );
  }
}

export default GameLayout;
