import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import ProfilePage from '../Pages/ProfilePage';

test('renders profile page text', () => {
  render(<ProfilePage />);
  const textElement = screen.getByText(/i am profile page/i);
  expect(textElement).toBeInTheDocument();
});
