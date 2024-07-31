import React from 'react';
import { mount } from 'enzyme';

import Accordion, { ACCORDION_CONSTANTS as CONSTANTS } from './';
import type { Props } from './Accordion.types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Accordion />', () => {
  const defaultProps: Props = {
    heading: 'Heading text',
    ariaLevel: 5,
    id: 'accordion-id', // prop is optional, but needed in tests so snapshots stay consistent
  };

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Accordion {...defaultProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Accordion {...defaultProps} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Accordion {...defaultProps} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Accordion {...defaultProps} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with headingRightContent', () => {
      expect.assertions(1);

      const headingRightContent = 'Some content on the right';

      const container = mount(
        <Accordion {...defaultProps} headingRightContent={headingRightContent} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Accordion {...defaultProps} />)
        .find(Accordion)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Accordion {...defaultProps} className={className} />)
        .find(Accordion)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Accordion {...defaultProps} id={id} />)
        .find(Accordion)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Accordion {...defaultProps} style={style} />)
        .find(Accordion)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should populate the ids (default) and their references correctly', () => {
      const component = mount(<Accordion {...defaultProps} id="undefined" />).find(Accordion);

      const button = component.find('button');
      const panel = component.find('div[role="region"]');

      expect(button.prop('id')).toEqual(expect.any(String));
      expect(panel.prop('id')).toEqual(expect.any(String));
      expect(button.prop('aria-controls')).toBe(panel.prop('id'));
      expect(panel.prop('aria-labelledby')).toBe(button.prop('id'));
    });

    it('should populate the ids (custom) and their references correctly', () => {
      const component = mount(<Accordion {...defaultProps} id="custom-id" />).find(Accordion);

      const button = component.find('button');
      const panel = component.find('div[role="region"]');

      expect(button.prop('id')).toBe('custom-id-header-button');
      expect(panel.prop('id')).toBe('custom-id-panel');
      expect(button.prop('aria-controls')).toBe(panel.prop('id'));
      expect(panel.prop('aria-labelledby')).toBe(button.prop('id'));
    });

    it('should be expanded by default', () => {
      const component = mount(<Accordion {...defaultProps} />).find(Accordion);

      expect(component.find('button').prop('aria-expanded')).toBe(true);
      expect(component.find('div[role="region"]').exists()).toBe(true);
      expect(component.find('Icon').props()).toStrictEqual({
        name: 'arrow-down',
        scale: 12,
      });
    });

    it('should be collapsed if defaultExpanded is false', () => {
      const component = mount(<Accordion {...defaultProps} defaultExpanded={false} />).find(
        Accordion
      );

      expect(component.find('button').prop('aria-expanded')).toBe(false);
      expect(component.find('div[role="region"]').exists()).toBe(false);
      expect(component.find('Icon').props()).toStrictEqual({
        name: 'arrow-right',
        scale: 12,
      });
    });
  });

  describe('actions', () => {
    it('should toggle between expanded and not when the header is clicked on', async () => {
      const user = userEvent.setup();
      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button');

      // initial: open
      expect(button.getAttribute('aria-expanded')).toBe('true');
      expect(screen.queryByRole('region')).not.toBeNull();

      await user.click(button);

      // after click: close
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('region')).toBeNull();

      await user.click(button);

      // after click: open
      expect(button.getAttribute('aria-expanded')).toBe('true');
      expect(screen.queryByRole('region')).not.toBeNull();

      await user.click(button);

      // after click: close
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('region')).toBeNull();
    });

    it('should toggle between expanded and not when an "enter" keydown event is sent to the header', async () => {
      const user = userEvent.setup();
      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button');

      button.focus();

      // initial: open
      expect(button.getAttribute('aria-expanded')).toBe('true');
      expect(screen.queryByRole('region')).not.toBeNull();

      await user.keyboard('[Enter]');

      // after click: close
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('region')).toBeNull();

      await user.keyboard('[Enter]');

      // after click: open
      expect(button.getAttribute('aria-expanded')).toBe('true');
      expect(screen.queryByRole('region')).not.toBeNull();

      await user.keyboard('[Enter]');

      // after click: close
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('region')).toBeNull();
    });
  });
});
