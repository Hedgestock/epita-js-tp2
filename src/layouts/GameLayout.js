import React from "react";
import Board from "../components/Board";
import MetaBoard from "../components/MetaBoard";
import GameInfo from "../components/GameInfo";

import { checkWinner, nextPlayer } from "../helpers/helpers";

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
      allowedMetaCells:  Array(9).fill().map((_, i) => i),
      gameState: "playing",
      currentPlayer: 0,
      players: ["player 1","player 2","player 3","player 4"],
      playersCount: 2,
      mode: "classic",
      lastMetaCellUpdated: 0,
    };
  }
  
  clearBoard() {
    this.setState({
      cells: Array(9).fill(null),
      metaCells: Array(9).fill().map(() => ({winner: null, cells: Array(9).fill(null)})),
      allowedMetaCells:  Array(9).fill().map((_, i) => i),
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
      const { cells : tempCells, currentPlayer, gameState, playersCount } = this.state;
      if ((gameState === "playing") && (tempCells[index] === null)) {
        tempCells[index] = currentPlayer;
        this.setState({
          cells: tempCells,
          currentPlayer: nextPlayer(currentPlayer, playersCount)});
        }
      };
    }

    metaCellClickHandler(metaIndex) {
      return (index) => {
        let tempMetaCells = this.state.metaCells;
        let tempCells = this.state.metaCells[metaIndex].cells;
        return () => {
          const { currentPlayer, gameState, playersCount } = this.state;
          if ((gameState === "playing") && this.state.allowedMetaCells.includes(metaIndex) && (tempCells[index] === null)) {
            tempCells[index] = currentPlayer;
            tempMetaCells[metaIndex].cells = tempCells;
            this.setState({
              metaCells: tempMetaCells,
              currentPlayer: nextPlayer(currentPlayer, playersCount),
              lastMetaCellUpdated: metaIndex,
              allowedMetaCells: [index]});
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
        state.metaCells[state.lastMetaCellUpdated].winner = checkWinner(state.metaCells[state.lastMetaCellUpdated].cells, 3)
        winner = checkWinner(state.metaCells.map(mc => mc.winner), 3);
      }
      if (winner === -1) {
        state.gameState = "draw";
      } else if (winner !== null) {
        state.gameState = "over";
        state.currentPlayer = winner;
      }
      if (winner === null && state.metaCells[state.allowedMetaCells[0]].winner !== null) {
        state.allowedMetaCells = state.metaCells.map((mc, i) => (mc.winner === null ? i : null)).filter(e => e !== null);
        // Need to check that here in case of winning move in a metaCell, also reduce might give an optimization, uncertain.
      } else if (winner !== null) {
        state.allowedMetaCells = [];
      }
      return state;
    }
    
   
    render() {
    const { allowedMetaCells, cells, currentPlayer, players, gameState, metaCells, mode, playersCount } = this.state;
    return (
      <div style={gameLayoutStyle}>
        <GameInfo currentPlayer={players[currentPlayer]} gameState={gameState}/>
        {Array(playersCount).fill().map((_, i) => <input name={i} type="text" value={players[i]} onChange={this.inputHandler}/>) 
        /* The name could be cleaner but it does the job for now */ }
        {mode === "classic" ? 
          <div style={{height: "600px", width: "600px"}}>
            <Board cells={cells} cellClickHandler={this.cellClickHandler}/>
          </div>
        : 
        <div>
          <MetaBoard cells={metaCells} metaCellClickHandler={this.metaCellClickHandler} allowedMetaCells={allowedMetaCells}/>
          <button onClick={() => {this.clearBoard(); this.setState({playersCount: 2})}}>2 players</button>
          <button onClick={() => {this.clearBoard(); this.setState({playersCount: 3})}}>3 players</button>
          <button onClick={() => {this.clearBoard(); this.setState({playersCount: 4})}}>4 players</button>

        </div>
        }
        <button onClick={this.clearBoard}>Clear Board</button>
        <button onClick={() => {this.clearBoard(); this.setState({mode: mode === "classic" ? "strategic" : "classic", playersCount: 2})}}>
          Play {mode === "classic" ? "strategic" : "classic"}
        </button>

      </div>
    );
  }
}

export default GameLayout;
