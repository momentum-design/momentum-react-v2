import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BUTTON_SIMPLE_CONSTANTS } from '../ButtonSimple';

import Card, { CARD_CONSTANTS as CONSTANTS } from './';
import { CARD_STATUS_CONSTANTS as STATUS_CONSTANTS } from './CardStatus';
import { isDisabled } from '@testing-library/user-event/dist/utils';

describe('<Card />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const { container } = render(<Card />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with class name', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = render(<Card className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = render(<Card id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = render(<Card style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = <div>example child</div>;

      const { container } = render(<Card>{children}</Card>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const { container } = render(<Card color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with height', () => {
      expect.assertions(1);

      const height = Object.values(CONSTANTS.HEIGHTS).pop();

      const { container } = render(<Card height={height} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline', () => {
      expect.assertions(1);

      const outline = true;

      const { container } = render(<Card outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with rounding', () => {
      expect.assertions(1);

      const rounding = Object.values(CONSTANTS.ROUNDINGS).pop();

      const { container } = render(<Card rounding={rounding} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with statusColor', () => {
      expect.assertions(1);

      const statusColor = Object.values(STATUS_CONSTANTS.COLORS).pop();

      const { container } = render(<Card statusColor={statusColor} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with statusStriped', () => {
      expect.assertions(1);

      const statusStriped = true;

      const { container } = render(<Card statusStriped={statusStriped} />);

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const isDisabled = true;

      const { container } = render(<Card isDisabled={isDisabled} />);

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot with isStatic', () => {
      expect.assertions(1);

      const isStatic = true;

      const { container } = render(<Card isStatic={isStatic} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    const testid = 'test-id';

    it('should have class attribute when className prop is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      render(<Card className={className} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains(className)).toBe(true);
    });

    it('should have id attribute when id prop is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      render(<Card id={id} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.id).toBe(id);
    });

    it('should have style attribute when style prop is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      render(<Card style={style} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.style.color).toBe(style.color);
    });

    it('should have child nodes when children prop is provided', async () => {
      expect.assertions(1);

      render(
        <Card>
          <div data-testid={testid}>example-text</div>
        </Card>
      );

      const component = await screen.findByTestId(testid);

      expect(component).toBeTruthy();
    });

    it('should have data-color attribute when color prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-color';
      const color = Object.values(CONSTANTS.COLORS).pop();

      render(<Card color={color} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(color);
    });

    it('should have data-height attribute when height prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-height';
      const height = Object.values(CONSTANTS.HEIGHTS).pop();

      render(<Card height={height} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(height);
    });

    it('should have data-outline attribute when outline prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-outline';
      const outline = true;

      render(<Card outline={outline} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(`${outline}`);
    });

    it('should have data-rounding attribute when rounding prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-rounding';
      const rounding = Object.values(CONSTANTS.ROUNDINGS).pop();

      render(<Card rounding={rounding} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(`${rounding}`);
    });

    it('should have status with data-color attribute when statusColor prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-color';
      const statusColor = Object.values(STATUS_CONSTANTS.COLORS).pop();

      render(<Card statusColor={statusColor} data-testid={testid} />);

      const component = await screen.findByTestId(testid);
      const target = component.firstElementChild;

      expect(target.getAttribute(attribute)).toBe(statusColor);
    });

    it('should have status with data-striped attribute when statusStriped prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-striped';
      const statusStriped = true;

      render(<Card statusStriped={statusStriped} data-testid={testid} />);

      const component = await screen.findByTestId(testid);
      const target = component.firstElementChild;

      expect(target.getAttribute(attribute)).toBe(`${statusStriped}`);
    });

    it('should have data-static when isStatic prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-static';
      const isStatic = true;

      render(<Card isStatic={isStatic} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(`${isStatic}`);
    });
    it('should have data-disabled when isDisabled prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-disabled';
      const isDisabled = true;

      render(<Card isDisabled={isDisabled} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(`${isDisabled}`);
    });

    it('should extend ButtonSimple', async () => {
      expect.assertions(1);

      render(<Card data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains(BUTTON_SIMPLE_CONSTANTS.STYLE.wrapper)).toBe(true);
    });
  });
});
