import { mount } from 'enzyme';
import React from 'react';

import { STYLE } from './Flex.constants';

import Flex from '.';

describe('Flex', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<Flex>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<Flex className={className}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<Flex id={id}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<Flex style={style}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with justifyContent', () => {
      expect.assertions(1);

      const justifyContent = 'center';

      container = mount(<Flex justifyContent={justifyContent}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with alignContent', () => {
      expect.assertions(1);

      const alignContent = 'center';

      container = mount(<Flex alignContent={alignContent}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with alignItems', () => {
      expect.assertions(1);

      const alignItems = 'center';

      container = mount(<Flex alignItems={alignItems}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with wrap', () => {
      expect.assertions(1);

      const wrap = 'wrap-reverse';

      container = mount(<Flex wrap={wrap}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with xgap', () => {
      expect.assertions(1);

      const xgap = '1rem';

      container = mount(<Flex xgap={xgap}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ygap', () => {
      expect.assertions(1);

      const ygap = '1rem';

      container = mount(<Flex ygap={ygap}>Test</Flex>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      container = mount(<Flex>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<Flex className={className}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<Flex id={id}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<Flex style={style}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.getAttribute('style').indexOf(styleString)).not.toBe(-1);
    });

    it('should have provided justifyContent when justifyContent is provided', () => {
      expect.assertions(1);

      const justifyContent = 'center';
      const className = 'md-flex-justify-content-center';

      container = mount(<Flex justifyContent={justifyContent}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided alignContent when alignContent is provided', () => {
      expect.assertions(1);

      const alignContent = 'center';
      const className = 'md-flex-align-content-center';

      container = mount(<Flex alignContent={alignContent}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided alignItems when alignItems is provided', () => {
      expect.assertions(1);

      const alignItems = 'center';
      const className = 'md-flex-align-items-center';

      container = mount(<Flex alignItems={alignItems}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided direction when direction is provided', () => {
      expect.assertions(1);

      const direction = 'row-reverse';
      const className = 'md-flex-direction-row-reverse';

      container = mount(<Flex direction={direction}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided wrap when wrap is provided', () => {
      expect.assertions(1);

      const wrap = 'wrap-reverse';
      const className = 'md-flex-wrap-reverse';

      container = mount(<Flex wrap={wrap}>Test</Flex>);

      const element = container.find(Flex).getDOMNode();
      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided xgap when xgap is provided', () => {
      expect.assertions(2);

      const xgap = '1rem';
      const cssVar = '--md-globals-flex-xgap-size: 1rem;';

      container = mount(
        <Flex direction="row" xgap={xgap}>
          Test
        </Flex>
      );

      const element = container.find(Flex).getDOMNode();

      expect(element.getAttribute('data-xgap')).toBe('true');
      expect(element.getAttribute('style').indexOf(cssVar)).not.toBe(-1);
    });

    it('should have provided ygap when ygap is provided', () => {
      expect.assertions(2);

      const ygap = '1rem';
      const cssVar = '--md-globals-flex-ygap-size: 1rem;';

      container = mount(
        <Flex direction="column" ygap={ygap}>
          Test
        </Flex>
      );

      const element = container.find(Flex).getDOMNode();

      expect(element.getAttribute('data-ygap')).toBe('true');
      expect(element.getAttribute('style').indexOf(cssVar)).not.toBe(-1);
    });
  });
});
