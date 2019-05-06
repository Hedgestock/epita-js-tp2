import React from "react";

const cellStyle = {
  display: "block",
  backgroundColor: "white",
  width: "200px",
  height: "200px",
  border: "1px solid #333",
  outline: "none",
  textAlign: "center",
  lineHeight: "200px",
  cursor: "pointer"
};

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseOutHandler = this.onMouseOutHandler.bind(this);
    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);

    this.state = cellStyle; // Feels crappy but handles the object merging for me. Still need to look for that one. 
  }

  onMouseOutHandler() {
    this.setState({backgroundColor: "white"});
  }
  
  onMouseOverHandler() {
    this.setState({backgroundColor: "grey"});
  }

  render() {
    const { content, onClickHandler } = this.props;
    return <div style={this.state}
                onMouseOut={this.onMouseOutHandler}
                onMouseOver={this.onMouseOverHandler}
                onClick={onClickHandler}>
                {content}
            </div>;
  }
}

export default Cell;
