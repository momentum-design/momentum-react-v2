import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MeetingCardContainerStatus, {
  MEETING_CARD_CONTAINER_STATUS_CONSTANTS as CONSTANTS,
} from './';

describe('<MeetingCardContainerStatus />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const { container } = render(<MeetingCardContainerStatus />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with class name', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = render(<MeetingCardContainerStatus className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = render(<MeetingCardContainerStatus id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = render(<MeetingCardContainerStatus style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const { container } = render(<MeetingCardContainerStatus color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with striped', () => {
      expect.assertions(1);

      const striped = true;

      const { container } = render(<MeetingCardContainerStatus striped={striped} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    const testid = 'test-id';

    it('should have class attribute when className prop is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      render(<MeetingCardContainerStatus className={className} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains(className)).toBe(true);
    });

    it('should have id attribute when id prop is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      render(<MeetingCardContainerStatus id={id} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.id).toBe(id);
    });

    it('should have style attribute when style prop is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      render(<MeetingCardContainerStatus style={style} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.style.color).toBe(style.color);
    });

    it('should have data-color attribute when color prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-color';
      const color = Object.values(CONSTANTS.COLORS).pop();

      render(<MeetingCardContainerStatus color={color} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(color);
    });

    it('should have data-striped attribute when striped prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-striped';
      const striped = true;

      render(<MeetingCardContainerStatus striped={striped} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(`${striped}`);
    });
  });
});
