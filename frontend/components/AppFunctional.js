import React, { useState, useCallback } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);


  function getXY() {
    const x = index % 3 + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    let newIndex = index;
    switch (direction) {
      case 'up':
        if (index >= 3) newIndex -= 3;
        break;
      case 'down':
        if (index < 6) newIndex += 3;
        break;
      case 'left':
        if (index % 3 !== 0) newIndex -= 1;
        break;
      case 'right':
        if (index % 3 !== 2) newIndex += 1;
        break;
    }
    return newIndex;
  }

  const move = useCallback((evt) => {
    const newIndex = getNextIndex(evt.target.id);
    if (newIndex !== index) {
      setIndex(newIndex);
      setSteps(steps + 1);
    }
  }, [index, steps]);

  const onChange = useCallback((evt) => {
    setEmail(evt.target.value);
  }, []);

  const onSubmit = useCallback(async (evt) => {
    evt.preventDefault();
    const { x, y } = getXY();
    try {
      const response = await axios.post('http://localhost:9000/api/result', { x, y, steps, email });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while submitting the form.');
    }
  }, [email, steps]);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
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
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
