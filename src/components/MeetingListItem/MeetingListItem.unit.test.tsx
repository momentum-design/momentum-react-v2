import React from 'react';
import { mount } from 'enzyme';

import MeetingListItem, { MEETING_LIST_ITEM_CONSTANTS as CONSTANTS } from './';
import ButtonGroup from '../ButtonGroup';
import Icon from '../Icon';

describe('<MeetingListItem />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<MeetingListItem />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<MeetingListItem className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<MeetingListItem id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<MeetingListItem style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const isDisabled = true;

      const container = mount(<MeetingListItem isDisabled={isDisabled} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with buttonGroup', () => {
      expect.assertions(1);

      const buttonGroup = <ButtonGroup />;

      const container = mount(<MeetingListItem buttonGroup={buttonGroup} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = 'join';

      const container = mount(<MeetingListItem color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with startImage', () => {
      expect.assertions(1);

      const startImage = <Icon name="placeholder" />;

      const container = mount(<MeetingListItem startImage={startImage} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<MeetingListItem />)
        .find(MeetingListItem)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<MeetingListItem className={className} />)
        .find(MeetingListItem)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<MeetingListItem id={id} />)
        .find(MeetingListItem)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<MeetingListItem style={style} />)
        .find(MeetingListItem)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-disabled when isDisabled is provided', () => {
      expect.assertions(1);

      const isDisabled = true;

      const container = mount(<MeetingListItem isDisabled={isDisabled}>Test</MeetingListItem>);

      const element = container.find(MeetingListItem).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe('true');
    });

    it('should have provided data-size', () => {
      expect.assertions(1);

      const container = mount(<MeetingListItem>Test</MeetingListItem>);

      const element = container.find(MeetingListItem).getDOMNode();

      expect(element.getAttribute('data-size')).toBe('50');
    });

    it('should have provided data-shape', () => {
      expect.assertions(1);

      const container = mount(<MeetingListItem>Test</MeetingListItem>);

      const element = container.find(MeetingListItem).getDOMNode();

      expect(element.getAttribute('data-shape')).toBe('rectangleNoPadding');
    });

    it('should have provided role', () => {
      expect.assertions(1);

      const container = mount(<MeetingListItem>Test</MeetingListItem>);

      const element = container.find(MeetingListItem).getDOMNode();

      expect(element.getAttribute('role')).toBe('listitem');
    });
  });
});
