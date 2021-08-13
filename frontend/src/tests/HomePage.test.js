import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import HomePage from '../Pages/HomePage';

test('renders home page text', () => {
  render(<HomePage />);
  const textElement = screen.getByText(/csv upload/i);
  expect(textElement).toBeInTheDocument();
});
