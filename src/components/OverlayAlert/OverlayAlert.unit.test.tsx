import React from 'react';
import { mount } from 'enzyme';

import ButtonControl from '../ButtonControl';
import ButtonPill from '../ButtonPill';
import ModalContainer, { MODAL_CONTAINER_CONSTANTS } from '../ModalContainer';
import Overlay, { OVERLAY_CONSTANTS } from '../Overlay';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import OverlayAlert, { OVERLAY_ALERT_CONSTANTS as CONSTANTS, OVERLAY_ALERT_CONSTANTS } from './';
import { STYLE as OVERLAY_STYLE } from '../Overlay/Overlay.constants';
import Text from '../Text';

jest.mock('uuid', () => {
  return {
    v4: () => 'test-ID',
  };
});

describe('<OverlayAlert />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<OverlayAlert />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<OverlayAlert className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<OverlayAlert id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<OverlayAlert style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'example-title';

      const container = mount(<OverlayAlert title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with details', () => {
      expect.assertions(1);

      const details = 'example-details';

      const container = mount(<OverlayAlert details={details} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with actions', () => {
      expect.assertions(1);

      const actions = <ButtonPill>Button Pill</ButtonPill>;

      const container = mount(<OverlayAlert actions={actions} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with multiple actions', () => {
      expect.assertions(1);

      const actions = (
        <>
          <ButtonPill key={0}>Button Pill</ButtonPill>,<ButtonPill key={1}>Button Pill</ButtonPill>,
          <ButtonPill key={2}>Button Pill</ButtonPill>,
        </>
      );

      const container = mount(<OverlayAlert actions={actions} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with controls', () => {
      expect.assertions(1);

      const controls = <ButtonControl control="close" />;

      const container = mount(<OverlayAlert controls={controls} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with multiple controls', () => {
      expect.assertions(1);

      const controls = (
        <>
          <ButtonControl key={0} control="close" />,
          <ButtonControl key={1} control="favorite" />,
          <ButtonControl key={2} control="maximize" />,
        </>
      );

      const container = mount(<OverlayAlert controls={controls} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with details and children', () => {
      expect.assertions(1);

      const details = 'example-details';
      const children = 'example-children';

      const container = mount(<OverlayAlert details={details}>{children}</OverlayAlert>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabel', () => {
      expect.assertions(1);

      const ariaLabel = 'test-aria-label';
      const children = 'example-children';

      const container = mount(<OverlayAlert ariaLabel={ariaLabel}>{children}</OverlayAlert>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<OverlayAlert />)
        .find(`.${OVERLAY_STYLE.wrapper}`) // OverlayAlert passes its class names to Overlay
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<OverlayAlert className={className} />)
        .find(`.${OVERLAY_STYLE.wrapper}`) // OverlayAlert passes its class names to Overlay
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<OverlayAlert id={id} />)
        .find(`.${OVERLAY_STYLE.wrapper}`) // OverlayAlert passes other props to Overlay
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<OverlayAlert style={style} />)
        .find(`.${OVERLAY_STYLE.wrapper}`) // OverlayAlert passes other props to Overlay
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should provided the local <Overlay /> with the "secondary" color by default', () => {
      expect.assertions(1);

      const overlayColor = OVERLAY_ALERT_CONSTANTS.DEFAULTS.OVERLAY_COLOR;

      const element = mount(<OverlayAlert />).find(Overlay);

      expect(element.props().color).toBe(overlayColor);
    });

    it('should provide the local <Overlay /> with its respective color', () => {
      expect.assertions(1);

      const overlayColor = Object.values(OVERLAY_CONSTANTS.COLORS).shift();

      const element = mount(<OverlayAlert overlayColor={overlayColor} />).find(Overlay);

      expect(element.props().color).toBe(overlayColor);
    });

    it('should provide the local <ModalContainer /> with its respective color', () => {
      expect.assertions(1);

      const modalColor = Object.values(MODAL_CONTAINER_CONSTANTS.COLORS).pop();

      const element = mount(<OverlayAlert modalColor={modalColor} />).find(ModalContainer);

      expect(element.props().color).toBe(modalColor);
    });

    it('should have provided actions when actions is provided', () => {
      expect.assertions(1);

      const innerHTML = 'Button Pill';
      const actions = <ButtonPill>{innerHTML}</ButtonPill>;

      const component = mount(<OverlayAlert actions={actions} />).find(OverlayAlert);

      const target = component.find(ButtonPill).html();

      expect(target.includes(innerHTML)).toBe(true);
    });

    it('should have provided controls when controls are provided', () => {
      expect.assertions(1);

      const control = 'close';
      const controls = <ButtonControl control={control} />;

      const component = mount(<OverlayAlert controls={controls} />).find(OverlayAlert);

      const target = component.find(ButtonControl);

      expect(target.props().control).toBe(control);
    });

    it('should have provided details when details are provided', () => {
      expect.assertions(1);

      const details = 'details-example';

      const component = mount(<OverlayAlert details={details} />).find(`.${OVERLAY_STYLE.wrapper}`);

      const target = component
        .getDOMNode()
        .getElementsByClassName(OVERLAY_ALERT_CONSTANTS.STYLE.details)[0];

      expect(target.innerHTML).toBe(details);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'title-example';

      const component = mount(<OverlayAlert title={title} />).find(`.${OVERLAY_STYLE.wrapper}`);

      const target = component
        .getDOMNode()
        .getElementsByClassName(OVERLAY_ALERT_CONSTANTS.STYLE.title)[0];

      expect(target.innerHTML.includes(title)).toBe(true);
    });

    it('should have correct text type for title when title provided', () => {
      expect.assertions(1);

      const title = 'title-example';

      const component = mount(<OverlayAlert title={title} />).find(`.${OVERLAY_STYLE.wrapper}`);

      const titleComponent = component.find(Text).filter({ className: OVERLAY_ALERT_CONSTANTS.STYLE.title });

      expect(titleComponent.props().type).toStrictEqual('title');
    });

    it('should have aria-labelledby and id when title is provided', () => {
      expect.assertions(2);

      const title = 'title-example';

      const component = mount(<OverlayAlert title={title} />).find(`.${OVERLAY_STYLE.wrapper}`);

      const titleComponent = component.find(Text).filter({ type: 'title' });

      const modalContainerComponent = component.find(ModalContainer);

      expect(titleComponent.props().id).toStrictEqual('test-ID');
      expect(modalContainerComponent.props()['aria-labelledby']).toStrictEqual('test-ID');
    });

    it('should not have aria-labelledby when title is not provided', () => {
      expect.assertions(1);

      const component = mount(<OverlayAlert />).find(`.${OVERLAY_STYLE.wrapper}`);

      const modalContainerComponent = component.find(ModalContainer);

      expect(modalContainerComponent.props()['aria-labelledby']).toBe(undefined);
    });

    it('should pass aria-label through to ModalContiner when ariaLabel is provided', () => {
      expect.assertions(1);

      const ariaLabel = 'test-aria-label';

      const component = mount(<OverlayAlert ariaLabel={ariaLabel} />).find(`.${OVERLAY_STYLE.wrapper}`);

      const modalContainerComponent = component.find(ModalContainer);

      expect(modalContainerComponent.props()['aria-label']).toBe(ariaLabel);
    });

    it('should not render an empty div when no title is provided', () => {
      expect.assertions(1);

      const component = mount(<OverlayAlert />).find(`.${OVERLAY_STYLE.wrapper}`);

      const target = component
        .getDOMNode()
        .getElementsByClassName(OVERLAY_ALERT_CONSTANTS.STYLE.title)[0];

      expect(target).toBeUndefined();
    });

    it('should have provided children when details and children are provided', () => {
      expect.assertions(2);

      const children = 'children-example';
      const details = 'details-example';

      const tree = mount(<OverlayAlert details={details}>{children}</OverlayAlert>)
        .find(OverlayAlert)
        .html();

      expect(tree.includes(children)).toBe(true);
      expect(tree.includes(details)).toBe(false);
    });
  });

  describe('actions', () => {
    it('should fire onClose if Escape is pressed', async () => {
      const onCloseFn = jest.fn();
      const contentText = 'test 123';

      const user = userEvent.setup();

      render(
        <OverlayAlert onClose={onCloseFn}>
          <button>{contentText}</button>
        </OverlayAlert>
      );
      await user.keyboard('{Escape}');

      expect(onCloseFn).toHaveBeenCalledTimes(1);
    });
  });

  it('should lock focus by default', async () => {
    const Component = () => {
      return (
        <>
          <button>button3</button>
          <OverlayAlert>
            <button>button1</button>
            <button>button2</button>
          </OverlayAlert>
        </>
      );
    };

    const user = userEvent.setup();

    render(<Component />);

    const button1 = screen.getByRole('button', {name: 'button1'});
    const button2 = screen.getByRole('button', {name: 'button2'});
    const button3 = screen.getByRole('button', {name: 'button3'});

    expect(button1).toHaveFocus();
    expect(button3).not.toHaveFocus();

    await user.tab();

    expect(button2).toHaveFocus();
    expect(button3).not.toHaveFocus();

    await user.tab();

    expect(button1).toHaveFocus();
    expect(button3).not.toHaveFocus();
  });
});
