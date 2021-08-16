import Select from '.';
import { mount } from 'enzyme';
import React from 'react';
import { Item } from '@react-stately/collections';
import { DIRECTIONS } from './Select.constants';
import { mountAndWait } from '../../../test/utils';

jest.mock('@react-aria/utils', () => {
  const originalModule = jest.requireActual('@react-aria/utils');

  return {
    ...originalModule,
    useId: () => {
      return `react-spectrum-0`;
    },
  };
});

describe('Select', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select label="Label">
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
        <Select className={className} label="Label">
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
        <Select id={id} label="Label">
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
        <Select style={style} label="Label">
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
        <Select placeholder={placeholder} label="Label">
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
        <Select direction={direction} label="Label">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have X value', () => {
      /* ...attribute tests... */
    });
  });
});
