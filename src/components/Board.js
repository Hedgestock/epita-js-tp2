import React from "react";
import Cell from "./Cell";

const boardStyle = {
  display: "grid",
  width: "600px",
  height: "calc(100%)",
  grid: "auto-flow dense / 1fr 1fr 1fr",
  gridAutoRows: "auto"
};

const Board = ({ cells = [], cellClickHandler : onClickHandler = () => null }) => (
  <div style={boardStyle}>{cells.map((c, i) => <Cell key={i} content={c} onClickHandler={onClickHandler(i)}/>)}</div>
);

export default Board;
