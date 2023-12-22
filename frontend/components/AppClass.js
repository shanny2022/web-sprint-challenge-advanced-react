import React from 'react';
import axios from 'axios';

const initialMessage = "";
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

class AppClass extends React.Component {
  state = {
    gridIndex: 0,
    email: '',
    message: '',
  }

  getXY() {
    const { index } = this.state;
    const x = index % 3 + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  getXYMessage() {
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  }

  handlereset = () => {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    });
  }

  getNextIndex(direction) {
    let { index } = this.state;
    let message = '';
    let canMove = true;

    switch (direction) {
      case 'up':
        if (index >= 3) {
          index -= 3;
        } else {
          message = "You can't go up";
          canMove = false;
        }
        break;
      case 'left':
        if (index % 3 !== 0) {
          index -= 1;
        } else {
          message = "You can't go left";
          canMove = false;
        }
        break;
      case 'right':
        if (index % 3 !== 2) {
          index += 1;
        } else {
          message = "You can't go right";
          canMove = false;
        }
        break;
      // similar changes for 'down'
    }

    this.setState({ message });

    if (canMove) {
      this.setState({ index });
    }
  }

  move = (evt) => {
    this.getNextIndex(evt.target.id);
  }

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  }
  onSubmit = async (evt) => {
    evt.preventDefault();
    const { gridIndex, email } = this.state;
    const x = gridIndex % 3 + 1;
    const y = Math.floor(gridIndex / 3) + 1;
    const response = await axios.post('http://localhost:9000/api/result', { x, y, steps: 1, email });
    this.setState({ message: response.data.message });
  }
  render() {
    const { message, email, steps, index } = this.state;
    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.handlereset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={email} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

export default AppClass;
