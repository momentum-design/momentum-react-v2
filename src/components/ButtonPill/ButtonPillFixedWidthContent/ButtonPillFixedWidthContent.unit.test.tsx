import React from 'react';
import { mount } from 'enzyme';

import ButtonPillFixedWidthContent from '.';
import Icon from '../../Icon';
import Text from '../../Text';
import { STYLE } from './ButtonPillFixedWidthContent.constants';

describe('<ButtonPillFixedWidthContent />', () => {
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
        <ButtonPillFixedWidthContent
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
          includeIcon
          buttonPillSize={40}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <ButtonPillFixedWidthContent
          className={className}
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
          includeIcon
          buttonPillSize={40}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with stringContentVariations', () => {
      expect.assertions(1);

      const container = mount(
        <ButtonPillFixedWidthContent
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample2}
          includeIcon
          buttonPillSize={40}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with buttonPillSize', () => {
      expect.assertions(1);

      const buttonPillSize = 24;

      const container = mount(
        <ButtonPillFixedWidthContent
          buttonPillSize={buttonPillSize}
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
          includeIcon
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', () => {
      expect.assertions(1);

      const container = mount(
        <ButtonPillFixedWidthContent
          includeIcon
          children={snapshotChildren}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={40}
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
        <ButtonPillFixedWidthContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          includeIcon
          buttonPillSize={40}
        />
      )
        .find(ButtonPillFixedWidthContent)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass the buttonPillSize prop through correctly', () => {
      expect.assertions(4);

      const buttonPillSize = 32;

      const divElements = mount(
        <ButtonPillFixedWidthContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={buttonPillSize}
          includeIcon={false}
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
        <ButtonPillFixedWidthContent
          className={className}
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={40}
          includeIcon={false}
        />
      )
        .find(ButtonPillFixedWidthContent)
        .find('div')
        .at(4)
        .getDOMNode();

      expect(element.className.includes(className)).toBe(true);
    });

    it('should have a text component for each string content variation', () => {
      expect.assertions(3);

      const textElements = mount(
        <ButtonPillFixedWidthContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={40}
          includeIcon={false}
        />
      )
        .find(ButtonPillFixedWidthContent)
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
        <ButtonPillFixedWidthContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={24}
          includeIcon
        />
      )
        .find(ButtonPillFixedWidthContent)
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

    it('should have icon components with correct icon scale that corresponds to the button size', () => {
      expect.assertions(3);

      const iconElements = mount(
        <ButtonPillFixedWidthContent
          children={childrenWithIcon}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={24}
          includeIcon
        />
      )
        .find(ButtonPillFixedWidthContent)
        .find(Icon);

      const firstIconElementProps = iconElements.at(0).props();
      const secondIconElementProps = iconElements.at(1).props();
      const thirdIconElementProps = iconElements.at(2).props();

      const iconProps = { name: 'placeholder', scale: 16 };

      expect(firstIconElementProps).toStrictEqual(iconProps);
      expect(secondIconElementProps).toStrictEqual(iconProps);
      expect(thirdIconElementProps).toStrictEqual(iconProps);
    });

    it('should have an icon component for each string content variation when includeIcon = true ', () => {
      expect.assertions(3);

      const iconElements = mount(
        <ButtonPillFixedWidthContent
          children={childrenWithIcon}
          stringContentVariations={stringContentVariationsExample}
          includeIcon
          buttonPillSize={40}
        />
      )
        .find(ButtonPillFixedWidthContent)
        .find(Icon);

      const firstIconElementProps = iconElements.at(0).props();
      const secondIconElementProps = iconElements.at(1).props();
      const thirdIconElementProps = iconElements.at(2).props();

      const iconProps = { name: 'placeholder', scale: 20 };

      expect(firstIconElementProps).toStrictEqual(iconProps);
      expect(secondIconElementProps).toStrictEqual(iconProps);
      expect(thirdIconElementProps).toStrictEqual(iconProps);
    });

    it('should not have an icon component for each string content variation when includeIcon = false ', () => {
      expect.assertions(1);

      const iconElements = mount(
        <ButtonPillFixedWidthContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          includeIcon={false}
          buttonPillSize={40}
        />
      )
        .find(ButtonPillFixedWidthContent)
        .find(Icon);

      expect(iconElements.length).toEqual(0);
    });

    it('should have children wrapped in a div with attribute data-hidden = false ', () => {
      expect.assertions(1);

      const element = mount(
        <ButtonPillFixedWidthContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          includeIcon={false}
          buttonPillSize={40}
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
        <ButtonPillFixedWidthContent
          children={children}
          stringContentVariations={stringContentVariationsExample}
          buttonPillSize={buttonPillSize}
          includeIcon
        />
      ).find('div');

      for (let i = 1; i < 4; i++) {
        const divElement = divElements.at(i).getDOMNode();

        expect(divElement.getAttribute('data-hidden')).toEqual('true');
      }
    });
  });
});
