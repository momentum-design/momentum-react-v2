import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonCircle from './';

const mockCallback = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

//TODO: get rid of ButtonCircle.unit.test.tsx and move over snapshot tests, after it has been discussed with the team

it('should have provided title when title is provided', () => {
  const buttonTitleMock = 'Example Title';
  render(<ButtonCircle title={buttonTitleMock} />);

  expect(screen.getByTitle(buttonTitleMock)).toBeVisible();
});

it('should disable button as expected', () => {
  const buttonLabelMock = 'Test Button';
  render(<ButtonCircle onPress={mockCallback} aria-label={buttonLabelMock} disabled />);

  userEvent.click(screen.getByRole('button', { name: buttonLabelMock }));
  expect(mockCallback).not.toHaveBeenCalled();
});

it('should fire onClick callback as expected after clicking', () => {
  const buttonLabelMock = 'Test Button';
  render(<ButtonCircle onPress={mockCallback} aria-label={buttonLabelMock} />);

  userEvent.click(screen.getByRole('button', { name: buttonLabelMock }));
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it('should fire onClick callback as expected after keyboard interaction', () => {
  const buttonLabelMock = 'Test Button';
  render(<ButtonCircle onPress={mockCallback} aria-label={buttonLabelMock} />);

  userEvent.tab();
  userEvent.keyboard('{enter}');
  expect(mockCallback).toHaveBeenCalledTimes(1);

  userEvent.keyboard('{space}');
  expect(mockCallback).toHaveBeenCalledTimes(2);
});
