import React from 'react';
import { mount } from 'enzyme';

import AriaToolbar, { ARIA_TOOLBAR_CONSTANTS as CONSTANTS } from './';
import ButtonSimple from '../ButtonSimple';
import { triggerPress } from '../../../test/utils';

describe('<AriaToolbar />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<AriaToolbar ariaLabel="test" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<AriaToolbar ariaLabel="test" className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<AriaToolbar ariaLabel="test" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<AriaToolbar ariaLabel="test" style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should set tab index appropriately', () => {
      expect.assertions(2);

      const container = mount(
        <AriaToolbar ariaLabel="test">
          <ButtonSimple />
          <ButtonSimple />
          <ButtonSimple />
        </AriaToolbar>
      );

      expect(container).toMatchSnapshot();

      triggerPress(container.find(ButtonSimple).at(2));

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<AriaToolbar ariaLabel="test" />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<AriaToolbar ariaLabel="test" className={className} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<AriaToolbar ariaLabel="test" id={id} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<AriaToolbar ariaLabel="test" style={style} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided aria-controls when ariaControls is provided', () => {
      expect.assertions(1);

      const ariaControls = 'testid';

      const element = mount(<AriaToolbar ariaLabel="test" ariaControls={ariaControls} />)
        .find(AriaToolbar)
        .getDOMNode();

      expect(element.getAttribute('aria-controls')).toBe(ariaControls);
    });

    it('should have provided aria-label when ariaLabel is provided', () => {
      expect.assertions(1);

      const ariaLabel = 'test label';

      const element = mount(<AriaToolbar ariaLabel={ariaLabel} />)
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
        <AriaToolbar ariaLabel="test" onTabPress={onTabPress}>
          <ButtonSimple>test button</ButtonSimple>
        </AriaToolbar>
      );

      element.find(ButtonSimple).simulate('keyDown', { key: 'Tab' });

      expect(onTabPress).toBeCalled();
    });

    // it('should set current focus on press', () => {
    //   expect.assertions(1);

    //   const onTabPress = jest.fn();

    //   const element = mount(
    //     <AriaToolbar ariaLabel='test' onTabPress={onTabPress} >
    //       <ButtonSimple>test button</ButtonSimple>
    //       <ButtonSimple>test button</ButtonSimple>
    //       <ButtonSimple>test button</ButtonSimple>
    //     </AriaToolbar>);

    //   triggerPress(element.find(ButtonSimple).at(2));

    //   expect(document.activeElement).toEqual('test');
    // });
  });
});
