import React from 'react';
import { mount } from 'enzyme';

import AriaToolbar, { ARIA_TOOLBAR_CONSTANTS as CONSTANTS } from './';
import ButtonSimple from '../ButtonSimple';
import { triggerPress } from '../../../test/utils';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AriaToolbarItem from '../AriaToolbarItem';

describe('<AriaToolbar />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<AriaToolbar ariaLabel="test" ariaToolbarItemsSize={0} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <AriaToolbar ariaLabel="test" className={className} ariaToolbarItemsSize={0} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<AriaToolbar ariaLabel="test" id={id} ariaToolbarItemsSize={0} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(
        <AriaToolbar ariaLabel="test" style={style} ariaToolbarItemsSize={0} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should set tab index appropriately - horizontal orientation', () => {
      expect.assertions(4);

      const container = mount(
        <AriaToolbar ariaLabel="test" ariaToolbarItemsSize={3}>
          <AriaToolbarItem itemIndex={0}>
            <ButtonSimple />
          </AriaToolbarItem>
          <AriaToolbarItem itemIndex={1}>
            <ButtonSimple />
          </AriaToolbarItem>
          <AriaToolbarItem itemIndex={2}>
            <ButtonSimple />
          </AriaToolbarItem>
        </AriaToolbar>
      );

      expect(container).toMatchSnapshot();

      triggerPress(container.find(ButtonSimple).at(2));

      expect(container).toMatchSnapshot();

      container.find(ButtonSimple).at(2).simulate('keyDown', { key: 'ArrowLeft' });

      expect(container).toMatchSnapshot();

      container.find(ButtonSimple).at(1).simulate('keyDown', { key: 'ArrowRight' });

      expect(container).toMatchSnapshot();
    });

    it('should set tab index appropriately - vertical orientation', () => {
      expect.assertions(4);

      const container = mount(
        <AriaToolbar orientation="vertical" ariaLabel="test" ariaToolbarItemsSize={3}>
          <AriaToolbarItem itemIndex={0}>
            <ButtonSimple />
          </AriaToolbarItem>
          <AriaToolbarItem itemIndex={1}>
            <ButtonSimple />
          </AriaToolbarItem>
          <AriaToolbarItem itemIndex={2}>
            <ButtonSimple />
          </AriaToolbarItem>
        </AriaToolbar>
      );

      expect(container).toMatchSnapshot();

      triggerPress(container.find(ButtonSimple).at(2));

      expect(container).toMatchSnapshot();

      container.find(ButtonSimple).at(2).simulate('keyDown', { key: 'ArrowUp' });

      expect(container).toMatchSnapshot();

      container.find(ButtonSimple).at(1).simulate('keyDown', { key: 'ArrowDown' });

      expect(container).toMatchSnapshot();
    });

    it('should update order if triggered externally', async () => {
      expect.assertions(7);
      const user = userEvent.setup();
      const { getAllByRole, container } = render(
        <AriaToolbar orientation="vertical" ariaLabel="test" ariaToolbarItemsSize={3}>
          <AriaToolbarItem itemIndex={0}>
            <ButtonSimple />
          </AriaToolbarItem>
          <AriaToolbarItem itemIndex={1}>
            <ButtonSimple />
          </AriaToolbarItem>
          <AriaToolbarItem itemIndex={2}>
            <ButtonSimple />
          </AriaToolbarItem>
        </AriaToolbar>
      );

      expect(container).toMatchSnapshot();

      const buttons = getAllByRole('button');

      buttons[2].focus();

      expect(buttons[2]).toHaveFocus();
      expect(container).toMatchSnapshot();

      await user.keyboard('{ArrowUp}');

      expect(buttons[1]).toHaveFocus();
      expect(container).toMatchSnapshot();

      await user.keyboard('{ArrowDown}');

      expect(buttons[2]).toHaveFocus();
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with data-test', () => {
      expect.assertions(1);

      const dataTest = 'data-test';

      const container = mount(
        <AriaToolbar ariaLabel="test" data-test={dataTest} ariaToolbarItemsSize={0} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<AriaToolbar ariaLabel="test" ariaToolbarItemsSize={0} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(
        <AriaToolbar ariaLabel="test" className={className} ariaToolbarItemsSize={0} />
      )
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<AriaToolbar ariaLabel="test" id={id} ariaToolbarItemsSize={0} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<AriaToolbar ariaLabel="test" style={style} ariaToolbarItemsSize={0} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided aria-controls when ariaControls is provided', () => {
      expect.assertions(1);

      const ariaControls = 'testid';

      const element = mount(
        <AriaToolbar ariaLabel="test" ariaControls={ariaControls} ariaToolbarItemsSize={0} />
      )
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.getAttribute('aria-controls')).toBe(ariaControls);
    });

    it('should have provided aria-label when ariaLabel is provided', () => {
      expect.assertions(1);

      const ariaLabel = 'test label';

      const element = mount(<AriaToolbar ariaLabel={ariaLabel} ariaToolbarItemsSize={0} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
    });
  });

  describe('actions', () => {
    it('onTabPress', () => {
      expect.assertions(1);

      const onTabPress = jest.fn();

      const element = mount(
        <AriaToolbar ariaLabel="test" onTabPress={onTabPress} ariaToolbarItemsSize={1}>
          <AriaToolbarItem itemIndex={0}>
            <ButtonSimple>test button</ButtonSimple>
          </AriaToolbarItem>
        </AriaToolbar>
      );

      element.find(ButtonSimple).simulate('keyDown', { key: 'Tab' });

      expect(onTabPress).toBeCalled();
    });

    it('child onPress is still called', () => {
      expect.assertions(1);

      const onPress = jest.fn();

      const element = mount(
        <AriaToolbar ariaLabel="test" ariaToolbarItemsSize={1}>
          <AriaToolbarItem itemIndex={0}>
            <ButtonSimple onPress={onPress}>test button</ButtonSimple>
          </AriaToolbarItem>
        </AriaToolbar>
      );

      triggerPress(element.find(ButtonSimple));

      expect(onPress).toBeCalled();
    });

    it('keydown events propagate up', () => {
      const onKeyDown = jest.fn();

      const element = mount(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={onKeyDown}>
          <AriaToolbar ariaLabel="test" ariaToolbarItemsSize={1}>
            <AriaToolbarItem itemIndex={0}>
              <ButtonSimple>test button</ButtonSimple>
            </AriaToolbarItem>
          </AriaToolbar>
        </div>
      );

      element.find(ButtonSimple).simulate('keyDown', { key: 'Escape' });
      element.find(ButtonSimple).simulate('keyDown', { key: 'Tab' });

      expect(onKeyDown.mock.calls[0][0].key).toBe('Escape');
      expect(onKeyDown.mock.calls[1][0].key).toBe('Tab');
    });
  });
});
