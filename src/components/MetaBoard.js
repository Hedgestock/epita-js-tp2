import React from "react";
import Board from "./Board";

const metaBoardStyle = {
  display: "grid",
  width: "600px",
  height: "600px",
  grid: "auto-flow dense / 1fr 1fr 1fr",
  gridAutoRows: "auto"
};

const MetaBoard = ({ cells = [], metaCellClickHandler = () => console.error("no metaCellClickHandler specified") }) => (
  <div style={metaBoardStyle}>{cells.map((c, i) => <Board key={i} cells={c.cells} cellClickHandler={metaCellClickHandler(i)}/>)}</div>
);

export default MetaBoard;
