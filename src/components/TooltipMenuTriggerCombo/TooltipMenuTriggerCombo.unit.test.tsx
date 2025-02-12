import React from 'react';
import { mount } from 'enzyme';

import TooltipMenuTriggerCombo, { TOOLTIP_MENU_TRIGGER_COMBO_CONSTANTS as CONSTANTS } from './';

describe('<TooltipMenuTriggerCombo />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<TooltipMenuTriggerCombo />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<TooltipMenuTriggerCombo className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<TooltipMenuTriggerCombo id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<TooltipMenuTriggerCombo style={style} />);

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<TooltipMenuTriggerCombo />)
        .find(TooltipMenuTriggerCombo)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<TooltipMenuTriggerCombo className={className} />)
        .find(TooltipMenuTriggerCombo)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<TooltipMenuTriggerCombo id={id} />)
        .find(TooltipMenuTriggerCombo)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<TooltipMenuTriggerCombo style={style} />)
        .find(TooltipMenuTriggerCombo)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    /* ...additional attribute tests... */
  });

  describe('actions', () => {
    /* ...action tests... */
  });
});
