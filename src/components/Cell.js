import React from "react";
import cross from '../../public/cross.png';
import circle from '../../public/circle.png';


const cellStyle = {
  display: "block",
  backgroundColor: "white",
  width: "200px",
  height: "200px",
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
    if (props.content === 0) {
      state = { backgroundImage: "url(" + cross + ")" };
    } else if (props.content === 1) {
      state = { backgroundImage: "url(" + circle + ")" };
    }
    else {
      state = { backgroundImage: "" };
    }
    return state;
  }
  render() {
    const onClickHandler = this.props.onClickHandler;
    return <div style={this.state}
                onMouseOut={this.onMouseOutHandler}
                onMouseOver={this.onMouseOverHandler}
                onClick={onClickHandler}>
            </div>;
  }
}

export default Cell;
