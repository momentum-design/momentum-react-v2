import React from 'react';
import { mount } from 'enzyme';

import TextToast, { TEXT_TOAST_CONSTANTS as CONSTANTS } from './';
import Text from '../Text/Text';
import { mountAndWait } from '../../../test/utils';
import Icon from '../Icon';

const textMock =
  'Lorem ipsum dolor site aw aetns ctetuer adipiscing elit nullam amarte adipiscing elit nullam amarte.';
const iconPropsMock = {
  name: 'noise-removal',
};

describe('<TextToast />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<TextToast text={textMock} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<TextToast text={textMock} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<TextToast text={textMock} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<TextToast text={textMock} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with textAlignment `left`', () => {
      expect.assertions(1);

      const container = mount(<TextToast text={textMock} textAlignment="left" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<TextToast text={textMock} iconProps={iconPropsMock} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<TextToast text={textMock} />)
        .find(TextToast)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<TextToast text={textMock} className={className} />)
        .find(TextToast)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<TextToast text={textMock} id={id} />)
        .find(TextToast)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = `color: ${style.color};`;

      const element = mount(<TextToast text={textMock} style={style} />)
        .find(TextToast)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should not render when an empty text is provided', () => {
      expect.assertions(1);

      const element = mount(<TextToast text="" />)
        .find(TextToast)
        .getDOMNode();

      expect(element).toBeNull();
    });

    it('should have provided text when text is provided', () => {
      expect.assertions(1);

      const element = mount(<TextToast text={textMock} />)
        .find(Text)
        .getDOMNode();

      expect(element.textContent).toBe(textMock);
    });

    it('should have provided data-text-alignment when textAlignment is provided', () => {
      expect.assertions(1);

      const textAlignmentMock = 'left';
      const element = mount(<TextToast text={textMock} textAlignment={textAlignmentMock} />)
        .find(TextToast)
        .getDOMNode();

      expect(element.getAttribute('data-text-alignment')).toBe(textAlignmentMock);
    });

    it('should show icon when iconProps are provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<TextToast text={textMock} iconProps={iconPropsMock} />);
      const reactElement = wrapper.find(Icon);

      expect(reactElement.props()).toEqual(iconPropsMock);
    });
  });
});
