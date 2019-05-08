import React from "react";

const GameInfo = ({ gameState = "stale", currentPlayer = "unkown" }) => (
  gameState === "playing" ?
  <h3>It's your turn {currentPlayer}</h3>
  : gameState === "draw" ?
  <h3 style={{color: "blue"}}>Draw.</h3>
  : gameState === "over" ?
  <h3 style={{color: "red"}}>AND THE WINNER IS... {currentPlayer}!!!</h3>
  : <h3>wrong gameState</h3>
);

export default GameInfo;
