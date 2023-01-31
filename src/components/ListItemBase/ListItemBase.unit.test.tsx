import ListItemBaseSection from '../ListItemBaseSection';
import ButtonPill from '../ButtonPill';
import ListItemBase from '.';
import { mount } from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom';
import { STYLE } from './ListItemBase.constants';
import * as ListContext from '../List/List.utils';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

describe('ListItemBase', () => {
  let container;

  describe('snapshot', () => {
    beforeEach(() => {
      jest
        .spyOn(ListContext, 'useListContext')
        .mockImplementation(() => ({ currentFocus: 0, shouldFocusOnPres: false }));
    });

    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ListItemBase>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBase className={className}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBase id={id}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<ListItemBase style={style}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItemBase isDisabled={isDisabled}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = 40;

      container = mount(<ListItemBase size={size}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with shape', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(<ListItemBase shape={shape}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItemBase role={role}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected', () => {
      expect.assertions(1);

      const isSelected = true;

      container = mount(<ListItemBase isSelected={isSelected}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      container = mount(<ListItemBase>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBase className={className}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBase id={id}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<ListItemBase style={style}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-disabled when isDisabled is provided', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItemBase isDisabled={isDisabled}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe('true');
    });

    it('should have provided data-padding when isPadded is provided', () => {
      expect.assertions(1);

      const isPadded = true;

      container = mount(<ListItemBase isPadded={isPadded}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-padded')).toBe('true');
    });

    it('should have provided data-size when size is provided', () => {
      expect.assertions(1);

      const size = 32;

      container = mount(<ListItemBase size={size}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size.toString());
    });

    it('should have provided data-shape when shape is provided', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(<ListItemBase shape={shape}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(shape);
    });

    it('should have provided role when role is provided', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItemBase role={role}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('role')).toBe(role);
    });

    it('should have provided active class when isSelected is provided', () => {
      expect.assertions(1);

      const isSelected = true;

      container = mount(<ListItemBase isSelected={isSelected}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains('active')).toBe(true);
    });

    it('should have provided data-interactive when interactive is provided', () => {
      expect.assertions(1);

      const interactive = false;

      container = mount(<ListItemBase interactive={interactive}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-interactive')).toBe(`${interactive}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ListItemBase onPress={mockCallback} />).find(ListItemBase);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
        altKey: false,
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });

  describe('keydown', () => {
    const renderWithButtons = () => {
      container = render(
        <ListItemBase data-testid="list-item-1" itemIndex={0}>
          <ListItemBaseSection position="end">
            <ButtonPill data-testid="first-button-1" color="join" size={24}>
              Join
            </ButtonPill>
          </ListItemBaseSection>
          <ListItemBaseSection position="end">
            <ButtonPill data-testid="second-button-1" color="join" size={24}>
              Join
            </ButtonPill>
          </ListItemBaseSection>
        </ListItemBase>
      );
    };

    it('should handle right arrow key', async () => {
      const user = userEvent.setup();
      renderWithButtons();

      const { getByTestId } = container;
      await user.tab();
      await user.keyboard('{ArrowRight}');
      expect(getByTestId('first-button-1')).toHaveFocus();
      await user.keyboard('{ArrowRight}');
      expect(getByTestId('second-button-1')).toHaveFocus();
      // loop back
      await user.keyboard('{ArrowRight}');
      expect(getByTestId('first-button-1')).toHaveFocus();
    });

    it('should handle left arrow key', async () => {
      const user = userEvent.setup();
      renderWithButtons();

      const { getByTestId } = container;
      await user.tab();
      await user.keyboard('{ArrowLeft}');
      expect(getByTestId('second-button-1')).toHaveFocus();
      await user.keyboard('{ArrowLeft}');
      expect(getByTestId('first-button-1')).toHaveFocus();
      // loop back
      await user.keyboard('{ArrowLeft}');
      expect(getByTestId('second-button-1')).toHaveFocus();
    });
  });
});
