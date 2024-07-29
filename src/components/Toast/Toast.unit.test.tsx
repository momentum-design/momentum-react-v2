import React, { ReactElement } from 'react';
import { mountAndWait } from '../../../test/utils';

import Avatar from '../Avatar';
import ButtonCircle from '../ButtonCircle';
import ButtonControl, { ButtonControlProps } from '../ButtonControl';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup';
import ButtonPill from '../ButtonPill';
import Icon from '../Icon';
import ToastContent, { ToastContentProps } from '../ToastContent';
import ToastDetails, { ToastDetailsProps, TOAST_DETAILS_CONSTANTS } from '../ToastDetails';
import Text from '../Text';

import Toast, { TOAST_CONSTANTS as CONSTANTS } from './';

describe('<Toast />', () => {
  let actions: ReactElement<ButtonGroupProps>;
  let controls: Array<ReactElement<ButtonControlProps>>;
  let content: ReactElement<ToastContentProps>;
  let details: ReactElement<ToastDetailsProps>;

  beforeEach(() => {
    actions = (
      <ButtonGroup spaced>
        <ButtonCircle outline size={28}>
          <Icon name="alarm" weight="bold" autoScale={125} />
        </ButtonCircle>
        <ButtonPill color="message" size={28}>
          Message
        </ButtonPill>
        <ButtonPill color="cancel" size={28}>
          Cancel
        </ButtonPill>
        <ButtonPill color="join" size={28}>
          Join
        </ButtonPill>
      </ButtonGroup>
    );

    controls = [
      <ButtonControl key={0} control="close" />,
      <ButtonControl key={1} control="maximize" />,
      <ButtonControl key={2} control="minimize" />,
    ];

    content = (
      <ToastContent action="Action" actionColor="success" actions={actions} actor="Actor">
        Lorem ipsum dolor site aw aetns ctetuer adipiscing
      </ToastContent>
    );

    details = (
      <ToastDetails
        image={<Avatar initials="T" />}
        info="Information"
        infoColor="join"
        subject="Subject"
      >
        Details Title
      </ToastDetails>
    );
  });

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <Toast content={content} controls={controls} details={details} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(
        <Toast className={className} content={content} controls={controls} details={details} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(
        <Toast id={id} content={content} controls={controls} details={details} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-live', async () => {
      expect.assertions(1);

      const ariaLive = 'off';

      const container = await mountAndWait(
        <Toast ariaLive={ariaLive} content={content} controls={controls} details={details} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(
        <Toast style={style} content={content} controls={controls} details={details} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', async () => {
      expect.assertions(1);

      const title = 'Title';

      const container = await mountAndWait(
        <Toast content={content} controls={controls} details={details} title={title} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with content children and details prop', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <Toast controls={controls} details={details}>
          {content}
        </Toast>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with details children and content prop', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <Toast content={content} controls={controls}>
          {details}
        </Toast>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with details and content children', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <Toast controls={controls}>
          {details}
          {content}
        </Toast>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Toast />);
      const element = wrapper.find(Toast).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<Toast className={className} />);
      const element = wrapper.find(Toast).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<Toast id={id} />);
      const element = wrapper.find(Toast).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided aria-live when aria-live is provided', async () => {
      expect.assertions(1);

      const ariaLive = 'off';

      const wrapper = await mountAndWait(<Toast ariaLive={ariaLive} />);
      const element = wrapper.find(Toast).getDOMNode();

      expect(element.getAttribute('aria-live')).toBe(ariaLive);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<Toast style={style} />);
      const element = wrapper.find(Toast).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided content when content prop is provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Toast content={content} />);
      const target = wrapper.find(ToastContent);

      expect(target.exists()).toBe(true);
    });

    it('should have provided content when content child is provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Toast>{content}</Toast>);
      const target = wrapper.find(ToastContent);

      expect(target.exists()).toBe(true);
    });

    it('should have provided details when details prop is provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Toast details={details} />);
      const target = wrapper.find(ToastDetails);

      expect(target.exists()).toBe(true);
    });

    it('should have provided details when details child is provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Toast>{details}</Toast>);
      const target = wrapper.find(ToastDetails);

      expect(target.exists()).toBe(true);
    });

    it('should have provided controls when controls and title props are provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <Toast controls={controls} title="Toast Title">
          {content}
          {details}
        </Toast>
      );

      const element = wrapper.find(Toast).getDOMNode();
      const target = element.getElementsByClassName(CONSTANTS.STYLE.controls)[0];

      expect(target.childNodes.length === controls.length).toBe(true);
    });

    it('checks that default titleTagName is h2', async () => {

      const wrapper = await mountAndWait(
        <Toast controls={controls} title="Toast Title">
          {content}
          {details}
        </Toast>
      );

      expect(wrapper.find(Text).props()).toEqual({
        tagName: 'h2',
        type: 'label-compact',
        className: 'md-toast-title',
        children: 'Toast Title'
      });
    });

    it('checks provided titleTagName', async () => {

      const wrapper = await mountAndWait(
        <Toast controls={controls} title="Toast Title" titleTagName='h3'>
          {content}
          {details}
        </Toast>
      );

      expect(wrapper.find(Text).props()).toEqual({
        tagName: 'h3',
        type: 'label-compact',
        className: 'md-toast-title',
        children: 'Toast Title'
      });
    });

    it('should pass provided controls to ToastDetails when controls prop is provided without title', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <Toast controls={controls}>
          {content}
          {details}
        </Toast>
      );

      const element = wrapper.find(ToastDetails).getDOMNode();
      const target = element.getElementsByClassName(TOAST_DETAILS_CONSTANTS.STYLE.controls)[0];

      expect(target.childNodes.length === controls.length).toBe(true);
    });

    it('should ignore controls if details and title props are not provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Toast controls={controls} />);

      const element = wrapper.find(Toast).getDOMNode();
      const target = element.getElementsByClassName(CONSTANTS.STYLE.controls);

      expect(target.length === 0).toBe(true);
    });
  });
});
