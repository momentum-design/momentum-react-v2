import React, { ReactElement } from 'react';
import { mountAndWait } from '../../../test/utils';
import Icon, { IconProps } from '../Icon';
import ButtonPill, { ButtonPillProps } from '../ButtonPill';
import ButtonCircle from '../ButtonCircle';

import ToastNotification, { TOAST_NOTIFICATION_CONSTANTS as CONSTANTS } from './';

describe('<ToastNotification />', () => {
  let leadingVisual: ReactElement<IconProps>;
  let buttonGroup: ReactElement<ButtonPillProps>;
  let onClose;

  beforeEach(() => {
    leadingVisual = <Icon name="help-circle" scale={24} weight="bold" />;
    buttonGroup = (
      <>
        <ButtonPill size={28}>Button</ButtonPill>
        <ButtonPill outline size={28}>
          Button
        </ButtonPill>
      </>
    );
    onClose = () => {
      alert('Hello');
    };
  });

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ToastNotification />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<ToastNotification className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<ToastNotification id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<ToastNotification style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with text', async () => {
      expect.assertions(1);

      const text = 'Example text';

      const container = await mountAndWait(<ToastNotification text={text} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with leading visual', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <ToastNotification text="Example text" leadingVisual={leadingVisual} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with button group', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <ToastNotification text="Example text" buttonGroup={buttonGroup} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ToastNotification />);
      const element = wrapper.find(ToastNotification).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<ToastNotification className={className} />);
      const element = wrapper.find(ToastNotification).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<ToastNotification id={id} />);
      const element = wrapper.find(ToastNotification).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<ToastNotification style={style} />);
      const element = wrapper.find(ToastNotification).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should wrap the onClose inside when onClose is provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ToastNotification onClose={onClose} />);
      const element = wrapper.find('.md-toast-notification-close-button').getDOMNode();

      expect(element).toBeDefined();
    });

    it('should wrap Icon inside leadingVisual when Icon is provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ToastNotification leadingVisual={leadingVisual} />);
      const element = wrapper.find(Icon).getDOMNode();

      expect(element).toBeDefined();
    });

    it('should wrap Buttons inside button group when buttons are provided', async () => {
      expect.assertions(2);

      const wrapper = await mountAndWait(<ToastNotification buttonGroup={buttonGroup} />);
      const element1 = wrapper.find(ButtonPill).at(0).getDOMNode();
      const element2 = wrapper.find(ButtonPill).at(1).getDOMNode();

      expect(element1).toBeDefined();
      expect(element2).toBeDefined();
    });
  });

  describe('actions', () => {
    it('should handle mouse press events on close button if method is provided', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const wrapper = await mountAndWait(<ToastNotification onClose={mockCallback} />);
      const component = wrapper.find(ButtonCircle);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
        altKey: false,
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
