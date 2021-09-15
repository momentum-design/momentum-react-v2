import React from 'react';
import { mount } from 'enzyme';

import Tab, { TAB_CONSTANTS as CONSTANTS } from './';
const { DEFAULTS } = CONSTANTS;
import { mountAndWait } from '../../../test/utils';
import Icon from '../Icon';
import Text from '../Text';
import Badge from '../Badge';

describe('<Tab />', () => {
  describe('snapshot', () => {
    describe('string children', () => {
      it('should match snapshot', () => {
        expect.assertions(1);

        const container = mount(<Tab>Example label</Tab>);

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with className', () => {
        expect.assertions(1);

        const className = 'example-class';

        const container = mount(<Tab className={className} />);

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with id', () => {
        expect.assertions(1);

        const id = 'example-id';

        const container = mount(<Tab id={id} />);

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with style', () => {
        expect.assertions(1);

        const style = { color: 'pink' };

        const container = mount(<Tab style={style} />);

        expect(container).toMatchSnapshot();
      });
      it('should match snapshot with active', () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const container = mount(<Tab active={active} />);

        expect(container).toMatchSnapshot();
      });
      it('should match snapshot with disabled', () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const container = mount(<Tab disabled={disabled} />);

        expect(container).toMatchSnapshot();
      });
    });
    describe('Icon children', () => {
      it('should match snapshot', async () => {
        expect.assertions(1);

        const container = await mountAndWait(
          <Tab>{[<Icon key="0" name="plus" scale={12} weight="bold" />]}</Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with className', async () => {
        expect.assertions(1);

        const className = 'example-class';

        const container = await mountAndWait(
          <Tab className={className}>{[<Icon key="1" name="plus" scale={12} weight="bold" />]}</Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with id', async () => {
        expect.assertions(1);

        const id = 'example-id';

        const container = await mountAndWait(
          <Tab id={id}>{[<Icon key="2" name="plus" scale={12} weight="bold" />]}</Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with style', async () => {
        expect.assertions(1);

        const style = { color: 'pink' };

        const container = await mountAndWait(
          <Tab style={style}>{[<Icon key="3" name="plus" scale={12} weight="bold" />]}</Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with active', async () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const container = await mountAndWait(
          <Tab active={active}>{[<Icon key="4" name="plus" scale={12} weight="bold" />]}</Tab>
        );

        expect(container).toMatchSnapshot();
      });
      it('should match snapshot with disabled', async () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const container = await mountAndWait(
          <Tab disabled={disabled}>{[<Icon key="5" name="plus" scale={12} weight="bold" />]}</Tab>
        );

        expect(container).toMatchSnapshot();
      });
    });
    describe('Text children', () => {
      it('should match snapshot', () => {
        expect.assertions(1);

        const container = mount(
          <Tab>
            {[
              <Text key="1" type="subheader-secondary">
                Example Text
              </Text>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with className', () => {
        expect.assertions(1);

        const className = 'example-class';

        const container = mount(
          <Tab className={className}>
            {[
              <Text key="2" type="subheader-secondary">
                Example Text
              </Text>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with id', () => {
        expect.assertions(1);

        const id = 'example-id';

        const container = mount(
          <Tab id={id}>
            {[
              <Text key="3" type="subheader-secondary">
                Example Text
              </Text>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with style', () => {
        expect.assertions(1);

        const style = { color: 'pink' };

        const container = mount(
          <Tab style={style}>
            {[
              <Text key="4" type="subheader-secondary">
                Example Text
              </Text>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });
      it('should match snapshot with active', () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const container = mount(
          <Tab active={active}>
            {[
              <Text key="5" type="subheader-secondary">
                Example Text
              </Text>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });
      it('should match snapshot with disabled', () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const container = mount(
          <Tab disabled={disabled}>
            {[
              <Text key="6" type="subheader-secondary">
                Example Text
              </Text>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });
    });
    describe('Badge children', () => {
      it('should match snapshot', () => {
        expect.assertions(1);

        const container = mount(
          <Tab>
            {[
              <Badge key="1" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with className', () => {
        expect.assertions(1);

        const className = 'example-class';

        const container = mount(
          <Tab className={className}>
            {[
              <Badge key="2" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with id', () => {
        expect.assertions(1);

        const id = 'example-id';

        const container = mount(
          <Tab id={id}>
            {[
              <Badge key="3" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });

      it('should match snapshot with style', () => {
        expect.assertions(1);

        const style = { color: 'pink' };

        const container = mount(
          <Tab style={style}>
            {[
              <Badge key="4" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });
      it('should match snapshot with active', () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const container = mount(
          <Tab active={active}>
            {[
              <Badge key="5" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });
      it('should match snapshot with disabled', () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const container = mount(
          <Tab disabled={disabled}>
            {[
              <Badge key="6" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('attributes', () => {
    describe('no children', () => {
      it('should have its wrapper class', () => {
        expect.assertions(1);

        const element = mount(<Tab />)
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
      });

      it('should have provided class when className is provided', () => {
        expect.assertions(1);

        const className = 'example-class';

        const element = mount(<Tab className={className} />)
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided id when id is provided', () => {
        expect.assertions(1);

        const id = 'example-id';

        const element = mount(<Tab id={id} />)
          .find(Tab)
          .getDOMNode();

        expect(element.id).toBe(id);
      });

      it('should have provided style when style is provided', () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const element = mount(<Tab style={style} />)
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('style')).toBe(styleString);
      });

      it('should have provided id when data-active id is provided', () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const element = mount(<Tab active={active} />)
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-active')).toBe(`${active}`);
      });

      it('should have provided data-disabled when disabled provided', () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const element = mount(<Tab disabled={disabled} />)
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
      });
    });
    describe('string children', () => {
      it('should have its wrapper class', () => {
        expect.assertions(1);

        const element = mount(<Tab>Example Text</Tab>)
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
      });

      it('should have provided class when className is provided', () => {
        expect.assertions(1);

        const className = 'example-class';

        const element = mount(<Tab className={className}>Example Text</Tab>)
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided id when id is provided', () => {
        expect.assertions(1);

        const id = 'example-id';

        const element = mount(<Tab id={id}>Example Text</Tab>)
          .find(Tab)
          .getDOMNode();

        expect(element.id).toBe(id);
      });

      it('should have provided style when style is provided', () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const element = mount(<Tab style={style}>Example Text</Tab>)
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('style')).toBe(styleString);
      });

      it('should have provided id when data-active id is provided', () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const element = mount(<Tab active={active}>Example Text</Tab>)
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-active')).toBe(`${active}`);
      });

      it('should have provided data-disabled when disabled provided', () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const element = mount(<Tab disabled={disabled}>Example Text</Tab>)
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
      });
    });
    describe('Text children', () => {
      it('should have its wrapper class', () => {
        expect.assertions(1);

        const element = mount(
          <Tab>
            {[
              <Text key="1" type="subheader-secondary">
                Icon and Label
              </Text>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
      });

      it('should have provided class when className is provided', () => {
        expect.assertions(1);

        const className = 'example-class';

        const element = mount(
          <Tab className={className}>
            {[
              <Text key="2" type="subheader-secondary">
                Icon and Label
              </Text>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided id when id is provided', () => {
        expect.assertions(1);

        const id = 'example-id';

        const element = mount(
          <Tab id={id}>
            {[
              <Text key="3" type="subheader-secondary">
                Icon and Label
              </Text>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.id).toBe(id);
      });

      it('should have provided style when style is provided', () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const element = mount(
          <Tab style={style}>
            {[
              <Text key="4" type="subheader-secondary">
                Icon and Label
              </Text>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('style')).toBe(styleString);
      });

      it('should have provided id when data-active id is provided', () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const element = mount(
          <Tab active={active}>
            {[
              <Text key="5" type="subheader-secondary">
                Icon and Label
              </Text>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-active')).toBe(`${active}`);
      });

      it('should have provided data-disabled when disabled provided', () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const element = mount(
          <Tab disabled={disabled}>
            {[
              <Text key="6" type="subheader-secondary">
                Icon and Label
              </Text>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
      });
    });
    describe('Badge children', () => {
      it('should have its wrapper class', () => {
        expect.assertions(1);

        const element = mount(
          <Tab>
            {[
              <Badge key="1" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
      });

      it('should have provided class when className is provided', () => {
        expect.assertions(1);

        const className = 'example-class';

        const element = mount(
          <Tab className={className}>
            {[
              <Badge key="2" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided id when id is provided', () => {
        expect.assertions(1);

        const id = 'example-id';

        const element = mount(
          <Tab id={id}>
            {[
              <Badge key="3" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.id).toBe(id);
      });

      it('should have provided style when style is provided', () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const element = mount(
          <Tab style={style}>
            {[
              <Badge key="4" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('style')).toBe(styleString);
      });

      it('should have provided id when data-active id is provided', () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const element = mount(
          <Tab active={active}>
            {[
              <Badge key="5" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-active')).toBe(`${active}`);
      });

      it('should have provided data-disabled when disabled provided', () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const element = mount(
          <Tab disabled={disabled}>
            {[
              <Badge key="6" size={18}>
                2
              </Badge>,
            ]}
          </Tab>
        )
          .find(Tab)
          .getDOMNode();

        expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
      });
    });
    describe('Icon children', () => {
      it('should have its wrapper class', async () => {
        expect.assertions(1);

        const wrapper = await mountAndWait(
          <Tab>{[<Icon key="1" name="arrow-down" scale={12} weight="filled" />]}</Tab>
        );

        const element = wrapper.find(Tab).getDOMNode();

        expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
      });

      it('should have provided class when className is provided', async () => {
        expect.assertions(1);

        const className = 'example-class';

        const wrapper = await mountAndWait(
          <Tab className={className}>
            {[<Icon key="2" name="arrow-down" scale={12} weight="filled" />]}
          </Tab>
        );

        const element = wrapper.find(Tab).getDOMNode();

        expect(element.classList.contains(className)).toBe(true);
      });

      it('should have provided id when id is provided', async () => {
        expect.assertions(1);

        const id = 'example-id';

        const wrapper = await mountAndWait(
          <Tab id={id}>{[<Icon key="3" name="arrow-down" scale={12} weight="filled" />]}</Tab>
        );

        const element = wrapper.find(Tab).getDOMNode();

        expect(element.id).toBe(id);
      });

      it('should have provided style when style is provided', async () => {
        expect.assertions(1);

        const style = { color: 'pink' };
        const styleString = 'color: pink;';

        const wrapper = await mountAndWait(
          <Tab style={style}>{[<Icon key="4" name="arrow-down" scale={12} weight="filled" />]}</Tab>
        );

        const element = wrapper.find(Tab).getDOMNode();

        expect(element.getAttribute('style')).toBe(styleString);
      });

      it('should have provided id when data-active id is provided', async () => {
        expect.assertions(1);

        const active = DEFAULTS.ACTIVE;

        const wrapper = await mountAndWait(
          <Tab active={active}>
            {[<Icon key="5" name="arrow-down" scale={12} weight="filled" />]}
          </Tab>
        );

        const element = wrapper.find(Tab).getDOMNode();

        expect(element.getAttribute('data-active')).toBe(`${active}`);
      });

      it('should have provided data-disabled when disabled provided', async () => {
        expect.assertions(1);

        const disabled = DEFAULTS.DISABLED;

        const wrapper = await mountAndWait(
          <Tab disabled={disabled}>
            {[<Icon key="6" name="arrow-down" scale={12} weight="filled" />]}
          </Tab>
        );

        const element = wrapper.find(Tab).getDOMNode();

        expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
      });
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<Tab onPress={mockCallback} />).find(Tab);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
