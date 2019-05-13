import React from "react";
import cross from '../../public/cross.png';
import circle from '../../public/circle.png';
import cross2 from '../../public/cross2.png';
import circle2 from '../../public/circle2.png';


const cellStyle = {
  display: "block",
  backgroundColor: "white",
  width: "100%",
  height: "100%",
  border: "1px solid #333",
  outline: "none",
  textAlign: "center",
  lineHeight: "200px",
  cursor: "pointer",
  backgroundSize: "contain"
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

  static getDerivedStateFromProps(props, state) {
    let backgroundImage = "";
    let backgroundColor = "red";
    if (props.content === 0) {
      backgroundImage = "url(" + cross + ")";
    } else if (props.content === 1) {
      backgroundImage = "url(" + circle + ")";
    } else if (props.content === 2) {
      backgroundImage = "url(" + cross2 + ")";
    } else if (props.content === 3) {
      backgroundImage = "url(" + circle2 + ")";
    }
    if (props.isAllowed) {
      backgroundColor = "green";
    } else if (props.isAllowed === null) {
      backgroundColor = state.backgroundColor; // Kind of unsatisfying...
    }

    return {backgroundColor, backgroundImage};
  }

  render() {
    const { onClickHandler } = this.props;
    return <div style={this.state}
                onMouseOut={this.onMouseOutHandler}
                onMouseOver={this.onMouseOverHandler}
                onClick={onClickHandler}>
            </div>;
  }
}

export default Cell;
