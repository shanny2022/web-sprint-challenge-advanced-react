import React from 'react';
import axios from 'axios';

const initialMessage = "You can't go up";
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    };
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
    switch (direction) {
      case 'up':
        if (index >= 3) index -= 3;
        else message = "You can't go up";
        break;
      case 'down':
        if (index < 6) index += 3;
        else message = "You can't go down";
        break;
      case 'left':
        if (index % 3 !== 0) index -= 1;
        else message = "You can't go left";
        break;
      case 'right':
        if (index % 3 !== 2) index += 1;
        else message = "You can't go right";
        break;
    }
    this.setState({ message });
    return index;
  }

  move = (evt) => {
    const newIndex = this.getNextIndex(evt.target.id);
    this.setState({ index: newIndex });
  }

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    const { x, y, steps, email } = this.state;
    if (!email) {
      this.setState({ message: 'Ouch: email is required' });
    } else if (email === 'foo@bar.baz') {
      this.setState({ message: 'foo@bar.baz failure #71' });
    } else {
      const response = await axios.post('http://localhost:9000/api/result', { x, y, steps, email });
      this.setState({ message: response.data.message });
    }
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
          <button id="reset" onClick={this.reset}>reset</button>
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
