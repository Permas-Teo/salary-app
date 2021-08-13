import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import NotFoundPage from '../Pages/NotFoundPage';

test('renders not found page text', () => {
  render(<NotFoundPage />);
  const textElement = screen.getByText(/i cannot be found./i);
  expect(textElement).toBeInTheDocument();
});
