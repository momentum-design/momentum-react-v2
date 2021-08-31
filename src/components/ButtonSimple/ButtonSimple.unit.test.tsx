<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
import ListItemBaseSection from '.';
import { mount } from 'enzyme';
=======
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx
import React from 'react';
import { mount } from 'enzyme';

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
describe('ListItemBaseSection', () => {
  let container;
=======
import ButtonSimple from './';
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

describe('<ButtonSimple />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection>Test</ListItemBaseSection>);
=======
      const container = mount(<ButtonSimple />);
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = 'example';

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection className={className}>Test</ListItemBaseSection>);
=======
      const container = mount(<ButtonSimple>{children}</ButtonSimple>);
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection id={id}>Test</ListItemBaseSection>);
=======
      const container = mount(<ButtonSimple className={className} />);
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection style={style}>Test</ListItemBaseSection>);
=======
      const container = mount(<ButtonSimple id={id} />);
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection position={position}>Test</ListItemBaseSection>);
=======
      const container = mount(<ButtonSimple style={style} />);
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection className={className}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();
=======
      const element = mount(<ButtonSimple className={className} />)
        .find(ButtonSimple)
        .getDOMNode();
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection id={id}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();
=======
      const element = mount(<ButtonSimple id={id} />)
        .find(ButtonSimple)
        .getDOMNode();
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection style={style}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();
=======
      const element = mount(<ButtonSimple style={style} />)
        .find(ButtonSimple)
        .getDOMNode();
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(element.getAttribute('style')).toBe(styleString);
    });

    /* ...additional attribute tests... */
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

<<<<<<< HEAD:src/components/ListItemBaseSection/ListItemBaseSection.unit.test.tsx
      container = mount(<ListItemBaseSection position={position}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();
=======
      const component = mount(<ButtonSimple onPress={mockCallback} />).find(ButtonSimple);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });
>>>>>>> master:src/components/ButtonSimple/ButtonSimple.unit.test.tsx

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
