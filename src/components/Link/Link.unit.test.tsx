import React from 'react';
import { mount } from 'enzyme';
import { DEFAULTS, STYLE } from './Link.constants';
import { IconNext, LinkNext, TooltipNext,  } from '@momentum-ui/react-collaboration';
import { mountAndWait } from '../../../test/utils';
jest.unmock('@react-aria/utils');
describe('Link', () => {
  describe('snapshot', () => {
    let container;

    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<LinkNext>LinkNext</LinkNext>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      container = mount(<LinkNext disabled={disabled}>LinkNext</LinkNext>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when inverted', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      container = mount(<LinkNext inverted={inverted}>Hyperlink</LinkNext>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<LinkNext title={title} />);

      expect(container).toMatchSnapshot();
    });

  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<LinkNext />)
        .find(LinkNext)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have custom class if provided', async () => {
      const testClass = 'testClass';

      const wrapper = await mount(<LinkNext className={testClass} />);

      const element = wrapper.find('a').getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
      expect(element.classList.contains(testClass)).toBe(true);
    });

    it('should pass disabled prop', async () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;
      const wrapper = await mountAndWait(<LinkNext disabled={disabled} />);

      const element = wrapper.find('a').getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass inverted prop', async () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;
      const wrapper = await mountAndWait(<LinkNext inverted={inverted} />);

      const element = wrapper.find('a').getDOMNode();

      expect(element.getAttribute('data-inverted')).toBe(`${inverted}`);
    });

    it('should pass child prop', async () => {
      expect.assertions(1);

      const child = '1';

      const wrapper = await mountAndWait(<LinkNext>{child}</LinkNext>);

      const element = wrapper.find('a').getDOMNode();

      expect(element.innerHTML).toBe(child);
    });

    it('should have provided title when title is provided', async () => {
      expect.assertions(1);

      const title = 'Example Text';

      const wrapper = await mountAndWait(<LinkNext title={title} />);

      const element = wrapper.find('a').getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should have Tooltip when opensNewTabIndicatorLabel is provided', async () => {
      expect.assertions(1);

      const opensNewTabIndicatorLabel = 'open a new window';

      const wrapper = await mountAndWait(<LinkNext opensNewTabIndicatorLabel={opensNewTabIndicatorLabel} />);

      const element = wrapper.find(TooltipNext);

      expect(element.props()).toEqual({
        type: 'description',
        placement: 'bottom',
        triggerComponent: expect.any(Object),
        children: opensNewTabIndicatorLabel,
      });
    });

    it('should have icon when isWithIcon is provided', async () => {
      expect.assertions(1);

      const opensNewTabIndicatorLabel = 'open a new window';

      const wrapper = await mountAndWait(<LinkNext opensNewTabIndicatorLabel={opensNewTabIndicatorLabel} hasIcon={true} />);

      const element = wrapper.find(IconNext);

      expect(element.props()).toEqual({
        className: STYLE.icon,
        scale: 16,
        name: 'pop-out',
      });
    });
    it('should have icon props when iconProps is provided', async () => {
      expect.assertions(1);

      const opensNewTabIndicatorLabel = 'open a new window';

      const wrapper = await mountAndWait(<LinkNext opensNewTabIndicatorLabel={opensNewTabIndicatorLabel} hasIcon={true} iconProps={{ id: '1123' }} />);

      const element = wrapper.find(IconNext);

      expect(element.props()).toEqual({
        className: STYLE.icon,
        scale: 16,
        name: 'pop-out',
        id: '1123',
      });
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);
      const mockCallback = jest.fn();
      const component = mount(<LinkNext onPress={mockCallback} />).find(LinkNext);
      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        altKey: false,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
        continuePropagation: expect.any(Function),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
