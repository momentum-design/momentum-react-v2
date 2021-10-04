import React from 'react';
import { mount } from 'enzyme';

import MeetingListItem, { MEETING_LIST_ITEM_CONSTANTS as CONSTANTS } from './';
import ButtonGroup from '../ButtonGroup';
import Icon from '../Icon';
import Avatar from '../Avatar';
import ButtonPill from '../ButtonPill';
import ButtonCircle from '../ButtonCircle';
import { mountAndWait } from '../../../test/utils';

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

    it('should match snapshot with image', async () => {
      expect.assertions(1);

      const image = <Icon name="placeholder" />;

      const container = await mountAndWait(<MeetingListItem image={image} />);

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

    it('should have provided role', () => {
      expect.assertions(1);

      const container = mount(<MeetingListItem>Test</MeetingListItem>);

      const element = container.find(MeetingListItem).getDOMNode();

      expect(element.getAttribute('role')).toBe('listitem');
    });

    it('should have appropriate sizes for button group', async () => {
      expect.assertions(5);

      const container = await mountAndWait(
        <MeetingListItem
          buttonGroup={
            <ButtonGroup>
              <ButtonPill className="button-pill" />
              <ButtonCircle className="button-circle">
                <Icon name="chat" />
              </ButtonCircle>
              <Icon name="placeholder" />
              <Avatar className="avatar" />
            </ButtonGroup>
          }
        />
      );

      const element = container.find(MeetingListItem).getDOMNode();

      expect(element.getElementsByClassName('button-pill')[0].getAttribute('data-size')).toBe('28');
      expect(element.getElementsByClassName('button-circle')[0].getAttribute('data-size')).toBe(
        '32'
      );
      expect(element.getElementsByTagName('svg')[0].getAttribute('data-autoscale')).toBe('true');
      expect(element.getElementsByTagName('svg')[1].getAttribute('data-autoscale')).toBe('true');
      expect(element.getElementsByClassName('avatar')[0].getAttribute('data-size')).toBe('32');
    });
  });
});
