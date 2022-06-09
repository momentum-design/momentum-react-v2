import React from 'react';
import { mount } from 'enzyme';

import Icon from '../Icon';
import Avatar from '../Avatar';
import Text from '../Text';

import Chip, { CHIP_CONSTANTS, CHIP_CONSTANTS as CONSTANTS } from './';
import { BUTTON_PILL_CONSTANTS } from '../ButtonPill';

const text = 'Some chip text';
const exampleIcon = <Icon name="placeholder" scale={16} />;
const exampleRightIcon = <Icon name="cancel" scale={16} />;
const exampleAvatar = <Avatar>AA</Avatar>;
const outline = !CHIP_CONSTANTS.DEFAULTS.OUTLINE;
const disabled = !CHIP_CONSTANTS.DEFAULTS.DISABLED;
const error = !CHIP_CONSTANTS.DEFAULTS.ERROR;

describe('<Chip />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Chip />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Chip className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Chip id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Chip style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with text', () => {
      const container = mount(<Chip text={text} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with left icon', () => {
      const container = mount(<Chip leftIcon={exampleIcon} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with right icon', () => {
      const container = mount(<Chip rightIcon={exampleIcon} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with avatar', () => {
      const container = mount(<Chip avatar={exampleAvatar} />);

      expect(container).toMatchSnapshot();
    });

    it('it should match snapshot with outline', () => {
      const container = mount(<Chip outline={true} />);

      expect(container).toMatchSnapshot();
    });

    it('it should match snapshot with disabled', () => {
      const container = mount(<Chip disabled={true} />);

      expect(container).toMatchSnapshot();
    });

    it('it should match snapshot with error', () => {
      const container = mount(<Chip error={true} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Chip />)
        .find(Chip)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Chip className={className} />)
        .find(Chip)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Chip id={id} />)
        .find(Chip)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Chip style={style} />)
        .find(Chip)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have text when provided', () => {
      const element = mount(<Chip text={text} />)
        .find(Text)
        .at(0)
        .getDOMNode();

      expect(element.innerHTML).toBe(text);
    });

    it('should have rightIcon when provided', () => {
      const element = mount(<Chip rightIcon={exampleIcon} />)
        .find(Icon)
        .exists();

      expect(element).toBe(true);
    });

    it('should have leftIcon when provided', () => {
      const element = mount(<Chip leftIcon={exampleIcon} />)
        .find(Icon)
        .exists();
      expect(element).toBe(true);
    });
    it('should have both icons when provided', () => {
      const element = mount(
        <Chip text={text} leftIcon={exampleIcon} rightIcon={exampleRightIcon} />
      );
      const iconLeft = element.find(Icon).at(0).exists();
      const iconRight = element.find(Icon).at(1).exists();
      expect(iconLeft).toBe(true);
      expect(iconRight).toBe(true);
    });

    it('should have avatar when provided', () => {
      const element = mount(<Chip avatar={exampleAvatar} />)
        .find(Avatar)
        .exists();

      expect(element).toBe(true);
    });

    it('should have outline set when provided', () => {
      const element = mount(<Chip outline={outline} />)
        .find(Chip)
        .getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(String(outline));
    });

    it('should have disabled set when provided', () => {
      const element = mount(<Chip disabled={disabled} />)
        .find(Chip)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(String(disabled));
    });

    it('should have error set when provided', () => {
      const element = mount(<Chip error={error} />)
        .find(Chip)
        .getDOMNode();

      expect(element.getAttribute('data-error')).toBe(String(error));
    });
    it('should extend ButtonPill', () => {
      const element = mount(<Chip text={text} />)
        .find(Chip)
        .getDOMNode();

      expect(element.classList.contains(BUTTON_PILL_CONSTANTS.STYLE.wrapper));
    });
  });
});
