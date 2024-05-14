import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';

import AriaGroup from '.';
import ButtonSimple from '../ButtonSimple';

describe('<AriaGroup />', () => {
  const children = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        width: 'fit-content',
        flexDirection: 'column',
      }}
    >
      <ButtonSimple>Button 1</ButtonSimple>
      <ButtonSimple>Button 2</ButtonSimple>
      <ButtonSimple>Button 3</ButtonSimple>
    </div>
  );

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<AriaGroup />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabel', () => {
      expect.assertions(1);

      const ariaLabel = 'example aria label';

      const container = mount(<AriaGroup ariaLabel={ariaLabel} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabelledby', () => {
      expect.assertions(1);

      const ariaLabelledby = 'example aria labelled by';

      const container = mount(<AriaGroup ariaLabelledby={ariaLabelledby} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<AriaGroup className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const container = mount(<AriaGroup children={children} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its role', () => {
      expect.assertions(1);

      const element = mount(<AriaGroup children={children} />)
        .find(AriaGroup)
        .getDOMNode();

      expect(element.getAttribute('role')).toBe('group');
    });

    it('should have provided ariaLabel if provided', () => {
      expect.assertions(1);

      const ariaLabel = 'example aria label';

      const element = mount(<AriaGroup ariaLabel={ariaLabel} children={children} />)
        .find(AriaGroup)
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
    });

    it('should have provided ariaLabelledby if provided', () => {
      expect.assertions(1);

      const ariaLabelledby = 'example ariaLabelledby';

      const element = mount(<AriaGroup ariaLabelledby={ariaLabelledby} children={children} />)
        .find(AriaGroup)
        .getDOMNode();

      expect(element.getAttribute('aria-labelledby')).toBe(ariaLabelledby);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<AriaGroup children={children} className={className} />)
        .find(AriaGroup)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });
  });
});
