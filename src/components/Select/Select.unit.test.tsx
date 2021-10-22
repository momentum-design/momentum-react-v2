import Select from '.';
import React from 'react';
import { Item } from '@react-stately/collections';
import { DIRECTIONS, STYLE } from './Select.constants';
import { mountAndWait, triggerPress, waitForComponentToPaint } from '../../../test/utils';
import ListBoxBase from '../ListBoxBase';

jest.mock('@react-aria/utils');

describe('Select', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      container = await mountAndWait(
        <Select id="test-id" className={className} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      container = await mountAndWait(
        <Select id={id} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = await mountAndWait(
        <Select id="test-id" style={style} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with placeholder', async () => {
      expect.assertions(1);

      const placeholder = 'Select an option';

      container = await mountAndWait(
        <Select id="test-id" placeholder={placeholder} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with direction', async () => {
      expect.assertions(1);

      const direction = DIRECTIONS.top;

      container = await mountAndWait(
        <Select id="test-id" direction={direction} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with listbox opened', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" isOpen={true}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disabled option', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" isOpen={true} disabledKeys={['$.0']}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected option and listbox closed', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" defaultSelectedKey={'$.0'}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected option and listbox open', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" isOpen={true} defaultSelectedKey={'$.0'}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot before and after opening select dropdown', async () => {
      expect.assertions(2);

      container = await mountAndWait(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();

      const button = container.find('.md-select-dropdown-input');

      triggerPress(button);

      await waitForComponentToPaint(container);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', async () => {
      expect.assertions(1);

      const title = 'Example text';

      container = await mountAndWait(
        <Select title={title}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      container = await mountAndWait(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = container.find(Select).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);
      const className = 'example-class';

      container = await mountAndWait(
        <Select id="test-id" className={className} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      const element = container.find(Select).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(
        <Select id={id} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = wrapper.find(Select).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(
        <Select id="test-id" style={style} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = wrapper.find(Select).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have listbox open when isOpen prop is set to true', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <Select id="test-id" isOpen={true} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = wrapper.find(ListBoxBase).getDOMNode();

      expect(element).toBeDefined();
    });

    it('should display tick next to selected option', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <Select id="test-id" isOpen={true} label="test" defaultSelectedKey={'$.0'}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const svg = wrapper.find('li[data-key="$.0"] svg').getDOMNode();

      expect(svg).toBeDefined();
    });

    it('should have provided title when title is provided', async () => {
      expect.assertions(1);

      const title = 'Example Text';

      const wrapper = await mountAndWait(
        <Select title={title}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const button = wrapper.find('.md-select-dropdown-input').getDOMNode();

      expect(button.getAttribute('title')).toBe(title);
    });
  });
});
