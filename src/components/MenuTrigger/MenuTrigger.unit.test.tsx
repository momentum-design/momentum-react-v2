import React from 'react';
import { Item } from '@react-stately/collections';

import MenuTrigger, { MENU_TRIGGER_CONSTANTS as CONSTANTS } from './';
import ButtonPill from '../ButtonPill';
import Menu from '../Menu';
import { mountAndWait, triggerPress } from '../../../test/utils';
import { act } from 'react-dom/test-utils';

describe('<MenuTrigger />', () => {
  const defaultProps = {
    children: [
      <ButtonPill key="1">Hello world</ButtonPill>,
      <Menu selectionMode="single" key="2">
        <Item key="one">One</Item>
        <Item key="two">Two</Item>
        <Item key="three">Three</Item>
      </Menu>,
      <Menu selectionMode="multiple" key="4">
        <Item key="asd">Four</Item>
        <Item key="ff">Five</Item>
        <Item key="d">Six</Item>
      </Menu>,
    ],
    'aria-label': 'Menu Trigger Component ',
  };
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<MenuTrigger {...defaultProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<MenuTrigger {...defaultProps} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<MenuTrigger {...defaultProps} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<MenuTrigger {...defaultProps} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot correctly when closeOnSelect is true', async () => {
      expect.assertions(3);

      const container = await mountAndWait(<MenuTrigger {...defaultProps} />);

      expect(container).toMatchSnapshot();

      triggerPress(container.find('button'));

      expect(container).toMatchSnapshot();

      const listItem = container.find(`li[data-key="one"]`);

      await act(async () => {
        triggerPress(listItem);
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot correctly when closeOnSelect is false', async () => {
      expect.assertions(3);

      const container = await mountAndWait(<MenuTrigger {...defaultProps} closeOnSelect={false} />);

      expect(container).toMatchSnapshot();

      triggerPress(container.find('button'));

      expect(container).toMatchSnapshot();

      const listItem = container.find(`li[data-key="one"]`);

      await act(async () => {
        triggerPress(listItem);
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} />))
        .find(MenuTrigger)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} className={className} />))
        .find(MenuTrigger)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} id={id} />))
        .find(MenuTrigger)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} style={style} />))
        .find(MenuTrigger)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });
});
