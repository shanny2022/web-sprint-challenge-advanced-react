/* eslint-disable no-extra-semi */
/* eslint-disable no-unreachable */
import React, { useState } from 'react'
import axios from 'axios';

// Suggested initial states

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [XY, setXY] = useState({ X: 2, Y: 2 });
  const [index, setIndex] = useState(4);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  function getXY(value) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const X = parseInt(value / 3) + 1;
    const Y = value % 3 + 1;
    setXY({ X, Y });
  };

  function reset() {
    // Use this helper to reset all states to their initial values.
    setXY({ X: 2, Y: 2 });
    setIndex(4);
    setSteps(0);
    setMessage('');
    setEmail('');
  };

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    switch (direction) {
      case 'left':
        if (index % 3 === 0) return index;
        else {
          const nextIndex = index - 1;
          setIndex(nextIndex)
          return nextIndex;
        }
        break;
      case 'right':
        if (index % 3 == 2) return index;
        else {
          const nextIndex = index + 1;
          setIndex(nextIndex)
          return nextIndex;
        }
        break;
      case 'up':
        if (parseInt(index / 3) == 0) return index;
        else {
          const nextIndex = index - 3;
          setIndex(nextIndex)
          return nextIndex;
        }
        break;
      case 'down':
        if (parseInt(index / 3) == 2) return index;
        else {
          const nextIndex = index + 3;
          setIndex(nextIndex)
          return nextIndex;
        }
        break;
      default:
        break;
    }
  };

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setMessage('')
    let nextValue;
    switch (evt) {
      case 'left':
        nextValue = getNextIndex('left');
        if (index === nextValue) setMessage("You can't go left");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;
      case 'right':
        nextValue = getNextIndex('right');
        if (index === nextValue) setMessage("You can't go right");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;
      case 'up':
        nextValue = getNextIndex('up');
        if (index === nextValue) setMessage("You can't go up");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;
      case 'down':
        nextValue = getNextIndex('down');
        if (index === nextValue) setMessage("You can't go down");
        else {
          setIndex(nextValue);
          getXY(nextValue);
          setSteps(steps + 1);
        }
        break;

      default:
        break;
    }
  };

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios.post('http://localhost:9000/api/result', {
      email, x: XY.X, y: XY.Y, steps
    }).then(res => {
      setMessage(res.data.message)
    })
    setEmail('')
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({XY.X}, {XY.Y})</h3>
        <h3 id="steps">You moved {steps} {steps == 1? 'time': 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
