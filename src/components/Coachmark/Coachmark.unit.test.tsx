import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ButtonPill from '../ButtonPill';

import Coachmark from './';

describe('<Coachmark />', () => {
  describe('snapshot', () => {
    it('should match snapshot without header', async () => {
      expect.assertions(1);

      const { container } = render(
        <Coachmark
          actions={[
            <ButtonPill key={0}>Button A</ButtonPill>,
            <ButtonPill key={1}>Button B</ButtonPill>,
          ]}
          isVisible
          triggerComponent={<div />}
        >
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with header', async () => {
      expect.assertions(1);

      const { container } = render(
        <Coachmark
          actions={[
            <ButtonPill key={0}>Button A</ButtonPill>,
            <ButtonPill key={1}>Button B</ButtonPill>,
          ]}
          icon="placeholder"
          image={
            <img
              alt="example"
              src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png"
            />
          }
          isVisible
          title="Title"
          triggerComponent={<div />}
        >
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should allow actions', async () => {
      expect.assertions(2);

      const onPressMock = jest.fn();

      render(
        <Coachmark
          actions={[
            <ButtonPill key={0} onPress={onPressMock}>
              Button A
            </ButtonPill>,
          ]}
          isVisible
          triggerComponent={<div />}
        >
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      const button = screen.getByRole('button', { name: 'Button A' });

      expect(button).toBeVisible();

      userEvent.click(button);

      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('should allow icon', async () => {
      expect.assertions(1);

      render(
        <Coachmark isVisible icon="placeholder" triggerComponent={<div />}>
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      const icon = screen.getByTestId('placeholder');

      expect(icon).toBeVisible();
    });

    it('should allow image', async () => {
      expect.assertions(2);

      const alt = 'example';
      const src =
        'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder-1024x1024.png';

      render(
        <Coachmark isVisible image={<img alt={alt} src={src} />} triggerComponent={<div />}>
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      const image = screen.getByAltText<HTMLImageElement>(alt);

      expect(image).toBeVisible();
      expect(image.src).toBe(src);
    });

    it('should allow dismiss via keypress', async () => {
      expect.assertions(3);

      const mockDismiss = jest.fn();

      render(
        <Coachmark isVisible onDismiss={mockDismiss} triggerComponent={<div />}>
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      const dismissButton = screen.getByRole('button', { name: 'dismiss' });

      expect(dismissButton).toBeVisible();

      userEvent.tab();
      userEvent.keyboard('{enter}');

      await waitFor(() => {
        expect(screen.queryByText('Children')).not.toBeInTheDocument();
      });

      expect(mockDismiss).toHaveBeenCalledTimes(1);
    });

    it('should allow dismiss via click', async () => {
      expect.assertions(3);

      const mockDismiss = jest.fn();

      render(
        <Coachmark isVisible onDismiss={mockDismiss} triggerComponent={<div />}>
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      const dismissButton = screen.getByRole('button', { name: 'dismiss' });

      expect(dismissButton).toBeVisible();

      userEvent.click(dismissButton);

      await waitFor(() => {
        expect(screen.queryByText('Children')).not.toBeInTheDocument();
      });

      expect(mockDismiss).toHaveBeenCalledTimes(1);
    });

    it('should respond to isVisible prop', async () => {
      expect.assertions(3);

      const { rerender } = render(
        <Coachmark isVisible triggerComponent={<div />}>
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      expect(screen.getByText('Children')).toBeVisible();

      rerender(<Coachmark triggerComponent={<div />}>Children</Coachmark>);

      await waitFor(() => {
        expect(screen.queryByText('Children')).not.toBeInTheDocument();
      });

      rerender(
        <Coachmark isVisible triggerComponent={<div />}>
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      expect(screen.getByText('Children')).toBeVisible();
    });

    it('should allow title', async () => {
      expect.assertions(1);

      const title = 'Title';

      render(
        <Coachmark isVisible title={title} triggerComponent={<div />}>
          Children
        </Coachmark>
      );

      await screen.findByText('Children');

      expect(screen.getByText(title)).toBeVisible();
    });
  });
});
