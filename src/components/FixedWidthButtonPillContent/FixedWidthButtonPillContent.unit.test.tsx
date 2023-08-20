import React from 'react';
import { mount } from 'enzyme';

import FixedWidthButtonPillContent, {
  FIXED_WIDTH_BUTTON_PILL_CONTENT_CONSTANTS as CONSTANTS,
} from './';
import Icon from '../Icon';
import Text from '../Text';

describe('<FixedWidthButtonPillContent />', () => {
  describe('snapshot', () => {
    const snapshotChildren = (
      <>
        <Icon name="placeholder" scale={20} />
        <Text>Example</Text>
      </>
    );
    const stringContentVariationsExample = ['long', 'longer', 'longest'];
    const stringContentVariationsExample2 = ['test', 'testing'];

    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <FixedWidthButtonPillContent
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <FixedWidthButtonPillContent
          className={className}
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with stringContentVariations', () => {
      expect.assertions(1);

      const container = mount(
        <FixedWidthButtonPillContent
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample2}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with buttonPillSize', () => {
      expect.assertions(1);

      const buttonPillSize = 24;

      const container = mount(
        <FixedWidthButtonPillContent
          buttonPillSize={buttonPillSize}
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', () => {
      expect.assertions(1);

      const container = mount(
        <FixedWidthButtonPillContent
          icon
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with iconScale', () => {
      expect.assertions(1);

      const iconScale = 16;

      const container = mount(
        <FixedWidthButtonPillContent
          iconScale={iconScale}
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon and iconScale', () => {
      expect.assertions(1);

      const iconScale = 16;

      const container = mount(
        <FixedWidthButtonPillContent
          icon
          iconScale={iconScale}
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    const children = (
      <>
        <Text>Example</Text>
      </>
    );
    const childrenWithIcon = (
      <>
        <Icon name="placeholder" scale={20} />
        <Text>Example</Text>
      </>
    );
    const stringContentVariationsExample = ['long', 'longer', 'longest'];

    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(
        <FixedWidthButtonPillContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
        />
      )
        .find(FixedWidthButtonPillContent)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should pass the buttonPillSize prop through correctly', () => {
      expect.assertions(4);

      const buttonPillSize = 32;

      const divElements = mount(
        <FixedWidthButtonPillContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={buttonPillSize}
        />
      ).find('div');

      for (let i = 1; i < 5; i++) {
        const divElement = divElements.at(i).getDOMNode();

        expect(divElement.getAttribute('data-size')).toEqual(`${buttonPillSize}`);
      }
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'class-name-example';

      const element = mount(
        <FixedWidthButtonPillContent
          className={className}
          children={children}
          stringContentVariations={stringContentVariationsExample}
        />
      )
        .find(FixedWidthButtonPillContent)
        .find('div')
        .at(4)
        .getDOMNode();

      expect(element.className.includes(className)).toBe(true);
    });

    it('should have a text component for each string content variation', () => {
      expect.assertions(3);

      const textElements = mount(
        <FixedWidthButtonPillContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
        />
      )
        .find(FixedWidthButtonPillContent)
        .find(Text);

      const firstTextElementProps = textElements.at(0).props();
      const secondTextElementProps = textElements.at(1).props();
      const thirdTextElementProps = textElements.at(2).props();

      expect(firstTextElementProps).toStrictEqual({ type: 'subheader-primary', children: 'long' });
      expect(secondTextElementProps).toStrictEqual({
        type: 'subheader-primary',
        children: 'longer',
      });
      expect(thirdTextElementProps).toStrictEqual({
        type: 'subheader-primary',
        children: 'longest',
      });
    });

    it('should have text components with correct text type that corresponds to the button size', () => {
      expect.assertions(3);

      const textElements = mount(
        <FixedWidthButtonPillContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={24}
        />
      )
        .find(FixedWidthButtonPillContent)
        .find(Text);

      const firstTextElementProps = textElements.at(0).props();
      const secondTextElementProps = textElements.at(1).props();
      const thirdTextElementProps = textElements.at(2).props();

      expect(firstTextElementProps).toStrictEqual({ type: 'body-compact', children: 'long' });
      expect(secondTextElementProps).toStrictEqual({
        type: 'body-compact',
        children: 'longer',
      });
      expect(thirdTextElementProps).toStrictEqual({
        type: 'body-compact',
        children: 'longest',
      });
    });

    it('should have an icon component for each string content variation when icon = true ', () => {
      expect.assertions(3);

      const iconElements = mount(
        <FixedWidthButtonPillContent
          children={childrenWithIcon}
          stringContentVariations={stringContentVariationsExample}
          icon
        />
      )
        .find(FixedWidthButtonPillContent)
        .find(Icon);

      const firstIconElementProps = iconElements.at(0).props();
      const secondIconElementProps = iconElements.at(1).props();
      const thirdIconElementProps = iconElements.at(2).props();

      const iconProps = { name: 'placeholder', scale: 32 };

      expect(firstIconElementProps).toStrictEqual(iconProps);
      expect(secondIconElementProps).toStrictEqual(iconProps);
      expect(thirdIconElementProps).toStrictEqual(iconProps);
    });

    it('should have an icon component for each string content variation when icon = true with correct iconScale ', () => {
      expect.assertions(3);

      const iconScale = 16;

      const iconElements = mount(
        <FixedWidthButtonPillContent
          children={childrenWithIcon}
          stringContentVariations={stringContentVariationsExample}
          icon
          iconScale={iconScale}
        />
      )
        .find(FixedWidthButtonPillContent)
        .find(Icon);

      const firstIconElementProps = iconElements.at(0).props();
      const secondIconElementProps = iconElements.at(1).props();
      const thirdIconElementProps = iconElements.at(2).props();

      const iconProps = { name: 'placeholder', scale: iconScale };

      expect(firstIconElementProps).toStrictEqual(iconProps);
      expect(secondIconElementProps).toStrictEqual(iconProps);
      expect(thirdIconElementProps).toStrictEqual(iconProps);
    });

    it('should not have an icon component for each string content variation when icon = false ', () => {
      expect.assertions(1);

      const iconElements = mount(
        <FixedWidthButtonPillContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
        />
      )
        .find(FixedWidthButtonPillContent)
        .find(Icon);

      expect(iconElements.length).toEqual(0);
    });

    it('should have children wrapped in a div with attribute data-hidden = false ', () => {
      expect.assertions(1);

      const element = mount(
        <FixedWidthButtonPillContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
        />
      )
        .find('div')
        .at(4)
        .getDOMNode();

      expect(element.getAttribute('data-hidden')).toBe('false');
    });

    it('should have mimicked button content wrapped in a div with attribute data-hidden = true ', () => {
      expect.assertions(3);

      const buttonPillSize = 32;

      const divElements = mount(
        <FixedWidthButtonPillContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={buttonPillSize}
        />
      ).find('div');

      for (let i = 1; i < 4; i++) {
        const divElement = divElements.at(i).getDOMNode();

        expect(divElement.getAttribute('data-hidden')).toEqual('true');
      }
    });
  });
});
