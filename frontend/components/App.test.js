import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the grid', () => {
  const { getByText } = render(<App />);
  const gridElement = getByText(/B/i);
  expect(gridElement).toBeInTheDocument();
});

test('renders the coordinates', () => {
  const { getByText } = render(<App />);
  const coordinatesElement = getByText(/Coordinates: 1, 1/i);
  expect(coordinatesElement).toBeInTheDocument();
});

test('renders the steps', () => {
  const { getByText } = render(<App />);
  const stepsElement = getByText(/Steps: 0/i);
  expect(stepsElement).toBeInTheDocument();
});

test('updates the input value when typing', () => {
  const { getByLabelText } = render(<App />);
  const inputElement = getByLabelText(/Email/i);
  fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
  expect(inputElement.value).toBe('test@example.com');
});

test('renders the submit button', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Submit/i);
  expect(buttonElement).toBeInTheDocument();
});
